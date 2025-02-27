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
import { LessonPlan } from '@/models/lesson-plan-schema'
import { getLessonPlansQueryOptions } from '@/queries/use-list-lesson-plan'
import { firestore } from '@/services/firebase'
import { getStringInputValueFromDate, getStringTimeInputValueFromDate } from '@/utils/dateToStringInputValueFormatter'
import { genFirestoreId } from '@/utils/id-generator'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { addDays, isEqual, parse } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { doc, writeBatch } from 'firebase/firestore'
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
  const navigate = Route.useNavigate();

  const [open, setOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [currentCalendarEvent, setCurrentCalendarEvent] = useState<ReturnedEventParsed | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: lessonPlanningsList } = useQuery(getLessonPlansQueryOptions(idCourse, idClass, idSubject))

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
        id: lessonPlanning.id,
        begin: lessonPlanning.startDate,
        end: lessonPlanning.endDate,
      }
    }))
  }, [lessonPlanningsList])

  const { mutate: upsertEvents } = useMutation({
    mutationKey: ['calendar', 'update'],
    mutationFn: async ({ newLessonPlannings, oldLessonPlannings }: { oldLessonPlannings: LessonPlan[], newLessonPlannings: ReturnedEventParsed[] }) => {
      const batch = writeBatch(firestore);

      const newLessonPlanningsIdsSet = new Set(newLessonPlannings.map(lessonPlanning => lessonPlanning.id));
      const oldLessonPlanningsIdsSet = new Set(oldLessonPlannings.map(lessonPlanning => lessonPlanning.id));
      const lessonPlanningsToDelete = new Set(oldLessonPlanningsIdsSet)
        .difference(newLessonPlanningsIdsSet);

      lessonPlanningsToDelete.forEach(lessonPlanningId => {
        const lessonPlanningCollection = doc(firestore, 'courses', idCourse, 'classes', idClass, 'subjects', idSubject, 'lessonPlannings', lessonPlanningId);
        
        batch.delete(lessonPlanningCollection)
      })

      newLessonPlannings
        .filter(newLessonPlanning => {
          const oldLessonPlanning = oldLessonPlannings.find(lessonPlanning => lessonPlanning.id === newLessonPlanning.id);

          return !oldLessonPlanning || !isEqual(oldLessonPlanning.startDate, newLessonPlanning.begin) || !isEqual(oldLessonPlanning.endDate, newLessonPlanning.end);
        })
        .forEach(newLessonPlanning => {
          const lessonPlanningsCollection = doc(firestore, 'courses', idCourse, 'classes', idClass, 'subjects', idSubject, 'lessonPlannings', newLessonPlanning.id);
          const lessonPlanning = oldLessonPlannings.find(lessonPlanning => lessonPlanning.id === newLessonPlanning.id);

          const isNewDocument = !lessonPlanning;
          const data = {
            startDate: newLessonPlanning.begin,
            endDate: newLessonPlanning.end,
            ...(isNewDocument ? {
              isCallMade: false,
              teachingDetails: {
                content: '',
                methodology: '',
                resources: '',
              }
            } : {}),
          }

          batch.set(lessonPlanningsCollection, data, { merge: true });
        });

      await batch.commit();
    },
    onSuccess: () => {
      navigate({
        to: '/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/lesson-plan/view'
      })
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const initialValues = {
    date: getStringInputValueFromDate(currentCalendarEvent?.begin) ?? '',
    startTime: getStringTimeInputValueFromDate(currentCalendarEvent?.begin) ?? '',
    endTime: getStringTimeInputValueFromDate(currentCalendarEvent?.end) ?? '',
    repeats: 'no' as 'no' | 'daily' | 'weekly' | 'monthly',
    repeatUntil: '',
    weekDays: [] as string[],
  };

  const formikRef = useRef<FormikProps<typeof initialValues>>(null);

  const handleDelete = () => {
    if (!currentCalendarEvent?.id) return;

    setCalendar(oldCalendar =>
      oldCalendar.filter(event => event.id !== currentCalendarEvent.id)
    );

    setOpen(false);
  };

  const handleOnSubmit = async (values: typeof initialValues) => {
    const begin = parse(`${values.date} ${values.startTime}`, 'yyyy-MM-dd HH:mm', new Date());
    const end = parse(`${values.date} ${values.endTime}`, 'yyyy-MM-dd HH:mm', new Date());
    
    if (values.repeats === 'no') {
      setCalendar(oldCalendar => {
        if (currentCalendarEvent?.id === undefined) {
          return [
            ...oldCalendar,
            {
              id: genFirestoreId(),
              begin,
              end,
            }
          ];
        }

        return oldCalendar.map(event => {
          if (event.id !== currentCalendarEvent.id) return event;

          return {
            ...event,
            begin,
            end,
          };
        })
      });

      setOpen(false);

      return;
    }

    const repeatUntil = parse(values.repeatUntil, 'yyyy-MM-dd', new Date());

    switch (values.repeats) {
      case 'daily':
        const newCalendarEvents: ReturnedEventParsed[] = [];
        let currentBegin = begin;
        let currentEnd = end;

        do {
          newCalendarEvents.push({
            id: currentCalendarEvent?.id ?? genFirestoreId(),
            begin: currentBegin,
            end: currentEnd,
          });


          currentBegin = addDays(currentBegin, 1);
          currentEnd = addDays(currentEnd, 1);
        } while(currentBegin <= repeatUntil);

        setCalendar(oldCalendar => {
          const newCalendarEventsFiltered = currentCalendarEvent?.id ? oldCalendar.filter(event => event.id !== currentCalendarEvent.id) : oldCalendar;

          return [
            ...newCalendarEventsFiltered,
            ...newCalendarEvents,
          ].filter((event, index, self) => self.findIndex(e => e.id === event.id) === index);
        });
      case 'weekly':
        const newCalendarEventsWeekly: ReturnedEventParsed[] = [];
        const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        const selectedWeekDays = values.weekDays as string[];
        let currentBeginWeekly = begin;
        let currentEndWeekly = end;
        const duration = currentEndWeekly.getTime() - currentBeginWeekly.getTime();
      
        if (!selectedWeekDays.includes(dayNames[currentBeginWeekly.getDay()])) {
          const daysToAdd = selectedWeekDays.map(weekDay => {
            const weekDayIndex = dayNames.indexOf(weekDay);
            const diff = weekDayIndex - currentBeginWeekly.getDay();
            return diff <= 0 ? diff + 7 : diff;
          });
          const minDiff = Math.min(...daysToAdd);
          currentBeginWeekly = addDays(currentBeginWeekly, minDiff);
          currentEndWeekly = new Date(currentBeginWeekly.getTime() + duration);
        }
      
        while(currentBeginWeekly <= repeatUntil) {
          if(selectedWeekDays.includes(dayNames[currentBeginWeekly.getDay()])) {
            newCalendarEventsWeekly.push({
              id: currentCalendarEvent?.id ?? genFirestoreId(),
              begin: currentBeginWeekly,
              end: currentEndWeekly,
            });
          }
          
          const currentDay = currentBeginWeekly.getDay();
          const daysToAdd = selectedWeekDays.map(weekDay => {
            const weekDayIndex = dayNames.indexOf(weekDay);
            const diff = weekDayIndex - currentDay;
            return diff <= 0 ? diff + 7 : diff;
          });
          
          const minDiff = Math.min(...daysToAdd);
          currentBeginWeekly = addDays(currentBeginWeekly, minDiff);
          currentEndWeekly = new Date(currentBeginWeekly.getTime() + duration);
        }
        
        setCalendar(oldCalendar => {
          const newCalendarEventsFiltered = currentCalendarEvent?.id
            ? oldCalendar.filter(event => event.id !== currentCalendarEvent.id)
            : oldCalendar;
      
          return [
            ...newCalendarEventsFiltered,
            ...newCalendarEventsWeekly,
          ].filter(
            (event, index, self) => self.findIndex(e => e.id === event.id) === index
          );
        });
      break;
      case 'monthly':
        const newCalendarEventsMonthly: ReturnedEventParsed[] = [];
        let currentBeginMonthly = begin;
        let currentEndMonthly = end;

        do {
          newCalendarEventsMonthly.push({
            id: currentCalendarEvent?.id ?? genFirestoreId(),
            begin: currentBeginMonthly,
            end: currentEndMonthly,
          });

          currentBeginMonthly = addDays(currentBeginMonthly, 30);
          currentEndMonthly = addDays(currentEndMonthly, 30);
        } while(currentBeginMonthly <= repeatUntil);

        setCalendar(oldCalendar => {
          const newCalendarEventsFiltered = currentCalendarEvent?.id ? oldCalendar.filter(event => event.id !== currentCalendarEvent.id) : oldCalendar;

          return [
            ...newCalendarEventsFiltered,
            ...newCalendarEventsMonthly,
          ].filter((event, index, self) => self.findIndex(e => e.id === event.id) === index);
        });
      break;
    }

    setOpen(false);
    setIsPopoverOpen(false);
  };

  return (
    <div className='flex flex-col gap-4 p-6'>
      <div className='flex gap-2'>
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
        <Popover onOpenChange={setIsPopoverOpen} open={isPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='blueButton'
              size='medium'
              onClick={() => setCurrentCalendarEvent(null)}
            >
              Criar plano(s) de aula
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Formik
              innerRef={formikRef}
              initialValues={initialValues}
              enableReinitialize
              onSubmit={handleOnSubmit}
              validationSchema={toFormikValidationSchema(calendarSchema)}
            >
              {({ values }) => (
                <Form className='p-4'>
                  <h3 className='text-xl font-semibold'>Adicionar plano(s) de aula</h3>
                  <div className="p-2">
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
                  <div className='flex content-end justify-end gap-2'>
                    <button onClick={() => setIsPopoverOpen(false)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">Cancelar</button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Salvar</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </PopoverContent>
        </Popover>
        <span className='flex-1' />
        <Button
          variant='blueButton'
          size='medium'
          onClick={() => upsertEvents({ newLessonPlannings: calendar, oldLessonPlannings: lessonPlanningsList ?? [] })}
        >
          Salvar
        </Button>
      </div>
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
            <Form>
              <AlertDialogHeader className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <AlertDialogTitle>Alterar plano de aula</AlertDialogTitle>
                  <AlertDialogCancel className="border-0 p-0 hover:bg-transparent">
                    <X className="h-4 w-4 text-gray-500" />
                  </AlertDialogCancel>
                </div>
              </AlertDialogHeader>
              <div className="px-4 pt-4">
                <div className="flex gap-2">
                  <Input name="date" label="Dia" type="date" />
                  <div className='flex flex-1 gap-2 items-center'>
                    <Input name="startTime" label="Início" type="time" />
                    <div className='flex-1 flex justify-center'>-</div>
                    <Input name="endTime" label="Fim" type="time" />
                  </div>
                </div>
              </div>
              <AlertDialogFooter className="px-4 py-4">
                <button type="button" className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 h-9 px-4 py-2' onClick={handleDelete}>
                  <Trash className="mr-2 h-4 w-4" />
                  Excluir
                </button>
                <span className="flex-1" />
                <AlertDialogCancel className="mt-0 border-0 hover:bg-gray-100">Cancelar</AlertDialogCancel>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Salvar</Button>
              </AlertDialogFooter>
            </Form>
          </Formik>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default RouteComponent;