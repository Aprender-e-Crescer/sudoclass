import { Button } from '@/components/ui/button';
import { InputTextarea } from '@/components/custom/textarea-input';
import { Formik, Form } from 'formik';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/syllabus')({
  component: Menu,
});

export function Menu() {
  return (
    <Formik
      initialValues={{ text: '' }}
      onSubmit={(values) => {
        console.log('Form Submitted:', values);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full p-5">
          <div className='flex justify-between'>
            <div>
                <p>Ementa Aprender e crescer</p>
            </div>
            <div>
              <Button type="submit" variant="blueButton">
                Editar ementa
              </Button>
            </div>
          </div>
          <div className=' h-96'>
            <InputTextarea 
              placeholder="Insira a ementa do curso"
              id="id"
              name="ementaCurso"
              customStyle="h-96"
            />
          </div>

        </Form>
      )}
    </Formik>
  );
}
