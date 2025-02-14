import { CustomLoading } from '@/components/custom/custom-loading';
import { useUpdateActivityMutation } from '@/mutations/use-update-activity-mutation';
import { getActivityByIdFirestoreQuery, getActivityByIdQueryOptions } from '@/queries/use-get-activity-by-id';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import * as Switch from '@radix-ui/react-switch';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Field, Formik } from 'formik';
import { ClipboardList } from 'lucide-react';

import { FormBody } from '@/components/custom/form/body';
import { Input } from '@/components/custom/form/input';
import { InputFile } from '@/components/custom/form/input-file';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useFirestoreRealtimeQuery } from '@/hooks/use-firestore-realtime-query';

const updateActivitySchema = z.object({
  title: z.string(),
  description: z.string(),
  deliveryDate: z.date(),
  isAcceptingSubmits: z.boolean(),
  attachments: z.array(z.instanceof(File)),
});

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/_mural/activities/$idActivity/update-activity',
)({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { idClass, idCourse, idSubject, idActivity } = Route.useParams();

  const activityByIdFirestoreQuery = getActivityByIdFirestoreQuery(idCourse, idClass, idSubject, idActivity);
  const activityByIdQueryOptions = getActivityByIdQueryOptions(idCourse, idClass, idSubject, idActivity);
  const { data: dataActivity, isLoading } = useSuspenseQuery(activityByIdQueryOptions);
  const { mutate: mutateActivity, isPending } = useUpdateActivityMutation();

  useFirestoreRealtimeQuery(activityByIdQueryOptions.queryKey, activityByIdFirestoreQuery)

  const initialValues = {
    id: dataActivity.id || '',
    title: dataActivity.title || '',
    description: dataActivity.description || '',
    deliveryDate: dataActivity.deliveryDate || new Date(),
    postingDate: dataActivity.postingDate || new Date(),
    attachments: dataActivity.attachments || [],
    isAcceptingSubmits: dataActivity.isAcceptingSubmits || false,
  };

  if (isLoading || !initialValues) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <CustomLoading message="Carregando atividade..." size={70} />
      </div>
    );
  }

  async function handleSubmit(values: typeof initialValues) {
    mutateActivity(
      {
        idCourse,
        idClass,
        idSubject,
        idActivity,
        title: values.title,
        description: values.description,
        deliveryDate: values.deliveryDate,
        isAcceptingSubmits: values.isAcceptingSubmits,
        attachments: values.attachments,
        oldAttachments: dataActivity.attachments,
      },
      {
        onSuccess: () => {
          navigate({
            to: '/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities',
            params: { idCourse, idClass, idSubject },
          });
        },
      },
    );
  }

  return (
    <div className="flex w-full h-full">
      <div className="w-full h-16">
        <div className="flex border mx-4 my-4 p-5 rounded-xl items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-yellow-400 h-10 w-10 rounded-full flex items-center justify-center">
              <ClipboardList className="h-5 w-5 text-gray-700" color="white" />
            </AvatarFallback>
          </Avatar>
          Atividade
        </div>

        <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize validationSchema={toFormikValidationSchema(updateActivitySchema)}>
          <FormBody cancelTo="/courses/$idCourse/classes/$idClass/subjects/$idSubject/mural/activities">
            <Input name="title" label="Título" type="text" placeholder="Digite o título" />
            <Input name="description" label="Instruções" type="text" placeholder="Digite as instruções" />
            <Input name="deliveryDate" label="Data de entrega" type="date" placeholder="Data de entrega" />

            <div>
              <InputFile
                name="attachments"
                label="Anexar documentos"
                type="file"
                multiple
              />
            </div>

            <div className="flex gap-2 items-center">
              <label className="block text-sm font-medium">Aceita envios?</label>
              <Field name="isAcceptingSubmits">
                {({ field, form }: { field: any; form: any }) => (
                  <Switch.Root
                    checked={field.value}
                    onCheckedChange={(value) => form.setFieldValue(field.name, value)}
                    className="bg-gray-300 w-10 h-6 rounded-full relative data-[state=checked]:bg-blue-500"
                  >
                    <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform translate-x-1 data-[state=checked]:translate-x-5" />
                  </Switch.Root>
                )}
              </Field>
            </div>
          </FormBody>
        </Formik>
      </div>
    </div>
  );
}