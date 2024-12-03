import { Formik, Form, Field } from 'formik';
import { Button } from '@/components/ui/button';
import { InputForm } from '@/components/custom/text-input';
import { useUpdateLessonPlanMutation } from '@/mutations/use-update-lesson-plan';
import { Link } from "@tanstack/react-router";
import { createFileRoute } from '@tanstack/react-router';
import { LessonPlanUpdate } from '@/mutations/use-update-lesson-plan';

export const Route = createFileRoute(
  '/_authenticated/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/_mural/lesson-plan/$idLessonPlan/update-lesson-plan',
)( {
  component: UpdateLessonPlan,
});

function UpdateLessonPlan() {
  const { idLessonPlan, idCourse, idClass, idSubject, idProfessor } = Route.useParams(); 

  const { mutate, isLoading, isError } = useUpdateLessonPlanMutation({
    onSuccess: () => {
      alert('Plano de aula atualizado com sucesso!');
    },
    onError: (err) => {
      console.error('Erro ao atualizar o plano de aula:', err);
      alert('Houve um erro ao atualizar o plano de aula. Tente novamente mais tarde.');
    },
  });

  const initialValues = {
    id_professor: idProfessor || '', 
    id_turma: idClass || '',
    id_materia: idSubject || '',
    data_aula: '2000-10-20',
    inicio_aula: '10:10',
    fim_aula: '20:30',
    conteudoformativo: 'Conteúdo inicial',
    mododeensino: 'Metodologia inicial',
    recursosdidaticos: 'Recursos iniciais',
  };

  const handleSubmit = (values: { id_professor: any; id_turma: any; id_materia: any; data_aula: any; inicio_aula: any; fim_aula: any; conteudoformativo: any; mododeensino: any; recursosdidaticos: any; }) => {
    const transformedValues: LessonPlanUpdate = {
      id_planoaula: idLessonPlan,
      id_professor: values.id_professor || '',
      id_turma: values.id_turma || '',
      id_materia: values.id_materia || '',
      data_aula: values.data_aula || '',
      inicio_aula: values.inicio_aula || '',
      fim_aula: values.fim_aula || '',
      conteudoformativo: values.conteudoformativo || '',
      mododeensino: values.mododeensino || '',
      recursosdidaticos: values.recursosdidaticos || '',
    };

    // Verificando campos obrigatórios
    const missingFields = Object.keys(transformedValues).filter(
      key => !transformedValues[key]
    );

    if (missingFields.length > 0) {
      alert(`Campos obrigatórios ausentes: ${missingFields.join(', ')}`);
      return;
    }

    mutate(transformedValues); // Enviar os dados para a mutação
  };

  return (
    <div className="flex flex-row h-screen relative mx-5">
      <div className="flex-grow flex flex-col items-center justify-start mt-5">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col space-y-6 w-full">
            <div className="w-full border border-[#C6C6C6] rounded-lg p-5">
              <div>
                <h1>Data</h1>
                <Field name="data_aula">
                  {({ field }) => (
                    <InputForm
                      type="date"
                      placeholder="Selecione a data"
                      id="data_aula"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Hora de Início</h1>
                <Field name="inicio_aula">
                  {({ field }) => (
                    <InputForm
                      type="time"
                      placeholder="Selecione a hora de início"
                      id="inicio_aula"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Hora de Fim</h1>
                <Field name="fim_aula">
                  {({ field }) => (
                    <InputForm
                      type="time"
                      placeholder="Selecione a hora de fim"
                      id="fim_aula"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Conteúdo Formativo</h1>
                <Field name="conteudoformativo">
                  {({ field }) => (
                    <InputForm
                      type="text"
                      placeholder="Descreva o conteúdo formativo"
                      id="conteudoformativo"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Metodologia de Ensino</h1>
                <Field name="mododeensino">
                  {({ field }) => (
                    <InputForm
                      type="text"
                      placeholder="Descreva a metodologia de ensino"
                      id="mododeensino"
                      {...field}
                    />
                  )}
                </Field>
              </div>

              <div>
                <h1>Recursos Didáticos</h1>
                <Field name="recursosdidaticos">
                  {({ field }) => (
                    <InputForm
                      type="text"
                      placeholder="Descreva os recursos didáticos"
                      id="recursosdidaticos"
                      {...field}
                    />
                  )}
                </Field>
              </div>
            </div>

            <div className="flex justify-center mt-5 gap-2">
              <Link
                to="/courses/$idCourse/classes/$idClass/school-matrice/subjects/$idSubject/lesson-plan/$idLessonPlan/lesson-plan-view"
                params={undefined}
              >
                <Button
                  type="button"
                  variant="lightTextBlack"
                  size="large"
                >
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" size="large" disabled={isLoading}>
                {isLoading ? 'Atualizando...' : 'Atualizar'}
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default UpdateLessonPlan;
