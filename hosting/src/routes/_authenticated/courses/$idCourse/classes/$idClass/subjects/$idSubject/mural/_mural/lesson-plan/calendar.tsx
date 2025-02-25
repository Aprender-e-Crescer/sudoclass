import { Calendar, ReturnedEventParsed } from '@/components/custom/calendar'
import { Input } from '@/components/custom/form/input'
import { Select } from '@/components/custom/form/select'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { Calendar as CalendarUI } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getLessonPlansQueryOptions } from '@/queries/use-list-lesson-plan'
import { firestore } from '@/services/firebase'
import { getStringInputValueFromDate, getStringTimeInputValueFromDate } from '@/utils/dateToStringInputValueFormatter'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { addDays, addMonths, parse } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import { Form, Formik, FormikProps, useFormikContext } from 'formik'
import { CalendarIcon, Trash, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

const calendarSchema = z
  .object({
    date: z.string().nonempty({ message: "O dia é obrigatório" }),
    startTime: z.string().nonempty({ message: "O horário de início é obrigatório" }),
    endTime: z.string().nonempty({ message: "O horário de fim é obrigatório" }),
    repeats: z.enum(['no', 'daily', 'weekly', 'monthly']),
    repeatUntil: z.string().optional(),
    weekDays: z.array(z.enum(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'])).optional(),
  })
  .superRefine((data, ctx) => {
    // If repeats is not 'no', then repeatUntil must have a value
    if (!(data.repeats === 'no' || (data.repeats === 'daily' || data.repeats === 'weekly' || data.repeats === 'monthly') && data.repeatUntil !== undefined)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "O campo 'Repetir até' é obrigatório quando repetir está selecionado",
        path: ['repeatUntil'],
      });
    }
    // If repeats is weekly, then weekDays must not be empty
    if (data.repeats === 'weekly' && (!data.weekDays || data.weekDays.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione ao menos um dia da semana",
        path: ['weekDays'],
      });
    }
  });

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/lesson-plan/calendar',
)({
  component: RouteComponent,
});

function WeekDaysSelect() {
  const { values, setFieldValue } = useFormikContext<any>();
  const weekDaysOptions = [
    { value: 'sun', label: 'Domingo' },
    { value: 'mon', label: 'Segunda' },
    { value: 'tue', label: 'Terça' },
    { value: 'wed', label: 'Quarta' },
    { value: 'thu', label: 'Quinta' },
    { value: 'fri', label: 'Sexta' },
    { value: 'sat', label: 'Sábado' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);

    setFieldValue('weekDays', selectedOptions);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Dias da Semana</label>
      <select
        multiple
        name="weekDays"
        value={values.weekDays || []}
        onChange={handleChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {weekDaysOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

function RouteComponent() {
  const { idClass, idCourse, idSubject } = Route.useParams()
  const [open, setOpen] = useState(false);
  const [currentCalendarEvent, setCurrentCalendarEvent] = useState<ReturnedEventParsed | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: lessonPlanningsList  } = useQuery(getLessonPlansQueryOptions(idCourse, idClass, idSubject))

  const [calendar, setCalendar] = useState<ReturnedEventParsed[]>(() => {
    if (!lessonPlanningsList) return [];

    return lessonPlanningsList.map(lessonPlanning => ({
      id: lessonPlanning.id,
      begin: lessonPlanning.startDate,
      end: lessonPlanning.endDate,
    }));
  });

  useEffect(() => {
    if (!lessonPlanningsList) return;

    setCalendar(lessonPlanningsList?.map((lessonPlanning) => {
      return {
        id: Number(lessonPlanning.id),
        begin: lessonPlanning.startDate,
        end: lessonPlanning.endDate,
      }
    }))
  }, [lessonPlanningsList])

  const { mutate: upsertEvent } = useMutation({
    mutationKey: ['calendar', 'update'],
    onMutate: async (newCalendar: ReturnedEventParsed) => {
      const lessonPlanningsCollection = doc(firestore, 'courses', idCourse, 'classes', idClass, 'subjects', idSubject, 'lessonPlannings', newCalendar.id.toString());

      const isNewDocument = !(await getDoc(lessonPlanningsCollection)).exists();

      return setDoc(lessonPlanningsCollection, {
        startDate: newCalendar.begin,
        endDate: newCalendar.end,
        ...(isNewDocument ? {
            isCallMade: false,
            teachingDetails: {
              content: '',
              methodology: '',
              resources: '',
            }
          } : {}),
      }, { merge: true });
    },
  })

  const { mutate: deleteEvent, error } = useMutation({
    mutationKey: ['calendar', 'delete'],
    onMutate: async (newCalendar: ReturnedEventParsed) => {
      const lessonPlanningsCollection = doc(firestore, 'courses', idCourse, 'classes', idClass, 'subjects', idSubject, 'lessonPlannings', newCalendar.id.toString());

      return deleteDoc(lessonPlanningsCollection);
    },
  })

  const initialValues = {
    date: getStringInputValueFromDate(currentCalendarEvent?.begin) ?? '',
    startTime: getStringTimeInputValueFromDate(currentCalendarEvent?.begin) ?? '',
    endTime: getStringTimeInputValueFromDate(currentCalendarEvent?.end) ?? '',
    repeats: 'no' as 'no' | 'daily' | 'weekly' | 'monthly',
    repeatUntil: '', // New field for repeat until date (yyyy-MM-dd)
    weekDays: [] as string[], // New field for days of week (only used for weekly repeats)
  };

  const formikRef = useRef<FormikProps<typeof initialValues>>(null);

  const handleDelete = () => {
    if (!currentCalendarEvent?.id) return;

    setCalendar(oldCalendar =>
      oldCalendar.filter(event => event.id !== currentCalendarEvent.id)
    );

    deleteEvent(currentCalendarEvent);

    setOpen(false);
  };

  const handleOnSubmit = (values: typeof initialValues) => {
    if (!currentCalendarEvent?.id) return;
  
    const baseId = currentCalendarEvent.id;
  
    const newBegin = parse(
      `${values.date} ${values.startTime}`,
      'yyyy-MM-dd HH:mm',
      new Date()
    );
    const newEnd = parse(
      `${values.date} ${values.endTime}`,
      'yyyy-MM-dd HH:mm',
      new Date()
    );
  
    // Helper to remove any event that is part of the current series
    const removeSeries = (oldCalendar: ReturnedEventParsed[]) =>
      oldCalendar.filter(
        event =>
          event.id !== baseId &&
          Math.floor(event.id / 10000) !== baseId // Filters out repeated events based on our id generation
      );
  
    if (values.repeats === 'no' || values.repeatUntil.trim() === '') {
      const singleEvent: ReturnedEventParsed = {
        id: baseId,
        begin: newBegin,
        end: newEnd,
      };
      setCalendar(oldCalendar => {
        const filtered = removeSeries(oldCalendar);
        return [...filtered, singleEvent];
      });
      setOpen(false);
      return;
    }
  
    // Parse the repeatUntil date (assumed format: yyyy-MM-dd)
    const repeatUntil = parse(values.repeatUntil, 'yyyy-MM-dd', new Date());
  
    let repeatedEvents: ReturnedEventParsed[] = [];
  
    if (values.repeats === 'weekly') {
      // Map week day strings to numbers (0 for Sunday, etc.)
      const daysMap: Record<string, number> = {
        sun: 0,
        mon: 1,
        tue: 2,
        wed: 3,
        thu: 4,
        fri: 5,
        sat: 6,
      };
      // Calculate the event duration in milliseconds
      const duration = newEnd.getTime() - newBegin.getTime();
      let currentDate = newBegin;
      while (currentDate <= repeatUntil) {
        // Find the weekday string for the current date
        const dayString = Object.keys(daysMap).find(
          key => daysMap[key] === currentDate.getDay()
        );
        if (dayString && values.weekDays.includes(dayString)) {
          repeatedEvents.push({
            id: baseId * 10000 + repeatedEvents.length,
            begin: currentDate,
            end: new Date(currentDate.getTime() + duration),
          });
        }
        currentDate = addDays(currentDate, 1);
      }
    } else {
      // For daily and monthly repeats, use a simple shift approach.
      let addFunction = (date: Date, shift: number) => date;
      switch (values.repeats) {
        case 'daily':
          addFunction = (date, shift) => addDays(date, shift);
          break;
        case 'monthly':
          addFunction = (date, shift) => addMonths(date, shift);
          break;
      }
      let shift = 0;
      let currentBegin = newBegin;
      let currentEnd = newEnd;
      while (currentBegin <= repeatUntil) {
        repeatedEvents.push({
          id: baseId * 10000 + shift,
          begin: currentBegin,
          end: currentEnd,
        });
        shift++;
        currentBegin = addFunction(newBegin, shift);
        currentEnd = addFunction(newEnd, shift);
      }
    }
  
    setCalendar(oldCalendar => {
      const filtered = removeSeries(oldCalendar);
      return [...filtered, ...repeatedEvents];
    });
    setOpen(false);
  };

  // TODO: remove this and resolve desnecessary updates
  const lastEventsRef = useRef(JSON.stringify(calendar))

  useEffect(() => {
    if (!calendar) return;

    const calendarString = JSON.stringify(calendar);

    if (lastEventsRef.current === calendarString) return;

    console.log(`Updating calendar with ${calendar.length} events`);

    lastEventsRef.current = calendarString;

    calendar.forEach((e) => {
      upsertEvent(e);
    })
  }, [calendar])

  return (
    <div className='flex flex-col gap-4 p-6'>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='blueButton'
            size='medium'
            icon={<CalendarIcon className="ml-auto h-4 w-4 opacity-50 color-white" />}
          >
            Trocar data
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarUI
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
          />
        </PopoverContent>
      </Popover>
      <Calendar
        timezone="America/Sao_Paulo"
        locale={ptBR}
        startDate={date}
        value={calendar}
        onChange={(e) => {
          setCalendar(e)
        }}
        onEventClick={(e) => {
          setCurrentCalendarEvent(e);
          setOpen(true)
        }}
      />
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-md gap-0 p-0">
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            enableReinitialize
            onSubmit={handleOnSubmit}
            validationSchema={toFormikValidationSchema(calendarSchema)}
          >
            {({ values }) => (
              <Form>
                <AlertDialogHeader className="p-4 pb-0">
                  <div className="flex items-center justify-between">
                    <AlertDialogTitle>Adicionar título</AlertDialogTitle>
                    <AlertDialogCancel className="border-0 p-0 hover:bg-transparent">
                      <X className="h-4 w-4 text-gray-500" />
                    </AlertDialogCancel>
                  </div>
                </AlertDialogHeader>
                <div className="p-4">
                  <div className="flex gap-2 pb-4">
                    <Input name="date" label="Dia" type="date" />
                    <div className='flex flex-1 gap-2 items-center'>
                      <Input name="startTime" label="Início" type="time" />
                      <div className='flex-1 flex justify-center'>-</div>
                      <Input name="endTime" label="Fim" type="time" />
                    </div>
                  </div>
                  <Select
                    name="repeats"
                    label="Repetir"
                    options={() => (
                      <>
                        <option disabled value="">Selecione uma opção</option>
                        {[
                          { value: 'no', label: 'Não repetir' },
                          { value: 'daily', label: 'Diariamente' },
                          { value: 'weekly', label: 'Semanalmente' },
                          { value: 'monthly', label: 'Mensalmente' },
                        ].map(({ label, value }) => (
                          <option value={value} key={value}>{label}</option>
                        ))}
                      </>
                    )}
                  />
                  {values.repeats === 'weekly' && <WeekDaysSelect />}
                  <Input name="repeatUntil" label="Repetir até" type="date" />
                </div>
                <AlertDialogFooter className="px-4 py-4">
                  <button type="button" className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2' onClick={handleDelete}>
                    <Trash className="mr-2 h-4 w-4" />
                    Excluir
                  </button>
                  <AlertDialogCancel className="mt-0 border-0 hover:bg-gray-100">Cancelar</AlertDialogCancel>
                  <Button onClick={() => formikRef.current?.submitForm()} type="submit" className="bg-blue-600 hover:bg-blue-700">Salvar</Button>
                </AlertDialogFooter>
              </Form>
            )}
          </Formik>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default RouteComponent;