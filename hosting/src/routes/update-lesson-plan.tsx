import { createFileRoute } from '@tanstack/react-router';
import { Formik, Form, Field, FieldProps } from 'formik';
import { z } from 'zod';
import { InputForm } from '@/components/custom/text-input';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/custom/header';
import { MenuItem } from '@/components/custom/menu-item';
import { CourseItem } from '@/components/custom/menu-item-courses';
import { SubHeader } from '@/components/custom/subheader';
import { useState } from 'react';
import { BsGrid } from 'react-icons/bs';
import { CalendarIcon, SettingsIcon, GraduationCapIcon, UsersIcon, LockIcon } from 'lucide-react';
import { BarChart } from 'lucide-react';

const validationSchema = z.object({
  data: z.string().min(8, 'A data é obrigatória.'),
  horaInicio: z.string().min(4, 'A hora de início é obrigatória.'),
  horaFim: z.string().min(4, 'A hora de fim é obrigatória.'),
});

interface FormValues {
  data: string;
  horaInicio: string;
  horaFim: string;
}

export const Route = createFileRoute('/update-lesson-plan')({
  component: () => {
    const [activeItem, setActiveItem] = useState('Início');
    const [activeCourse, setActiveCourse] = useState('');

    const handleMenuClick = (name: string) => {
      setActiveItem(name);
    };

    const handleCourseClick = (course: string) => {
      setActiveCourse(course);
    };

    const courses = ['Curso 1', 'Curso 2', 'Curso 3', 'Curso 4'];

    return (
      <div>
        <Header avatarImage="@/src/assets/avatarLogo.svg" avatarFallBack="@/src/assets/avatarLogo.svg" />
        <div className="flex flex-row h-screen relative"> 
          {/* Menu na lateral esquerda */}
          <div>
            <div className='my-7 '>
              <MenuItem
                nameItem="Início"
                activeItem={activeItem}
                onClick={handleMenuClick}
                Icon={BsGrid}
              />
              <MenuItem
                nameItem="Agenda"
                activeItem={activeItem}
                onClick={handleMenuClick}
                Icon={CalendarIcon}
              />
              <MenuItem
                nameItem="Professores"
                activeItem={activeItem}
                onClick={handleMenuClick}
                Icon={GraduationCapIcon}
              />
              <MenuItem
                nameItem="Alunos"
                activeItem={activeItem}
                onClick={handleMenuClick}
                Icon={UsersIcon}
              />
              <MenuItem
                nameItem="Formulários"
                activeItem={activeItem}
                onClick={handleMenuClick}
                Icon={BarChart}
              />
              <MenuItem
                nameItem="Solicitação de Senhas"
                activeItem={activeItem}
                onClick={handleMenuClick}
                Icon={LockIcon}
              />
              <MenuItem
                nameItem="Configurações"
                activeItem={activeItem}
                onClick={handleMenuClick}
                Icon={SettingsIcon}
              />
            </div>

            <div className="border-t border-gray-300 my-4"></div>

            <div className="my-7 w-full">
              <h2 className="text-lg font-semibold mb-3">Cursos</h2>
              {courses.map((course, index) => (
                <CourseItem
                  key={index}
                  course={course}
                  activeItem={activeCourse}
                  onClick={handleCourseClick}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Linha vertical */}
          <div className="absolute top-0 right-0 h-full w-px bg-gray-300" /> {/* Linha vertical */}

          {/* Conteúdo principal */}
          <div className="flex-grow flex flex-col">
            <SubHeader hasPrivilege='' />
            {/* Conteúdo abaixo do Header */}
            <div className="flex-grow flex flex-col items-center justify-start mt-5 overflow-auto">
              <div className="border border-[#C6C6C6] rounded-lg p-5 w-full">
                <Formik<FormValues>
                  initialValues={{
                    data: '18/10/2020',
                    horaInicio: '18:30',
                    horaFim: '20:30',
                  }}
                  validate={async (values) => {
                    const errors: any = {};
                    try {
                      await validationSchema.parseAsync(values);
                    } catch (error) {
                      const fieldErrors = (error as any).flatten().fieldErrors;
                      Object.assign(errors, fieldErrors);
                    }
                    return errors;
                  }}
                  onSubmit={(values) => {
                    console.log('Valores do formulário:', values);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col space-y-6">
                      <div>
                        <h1>Data</h1>
                        <Field name="data">
                          {({ field }: FieldProps) => (
                            <InputForm
                              type="date"
                              placeholder="Selecione a data"
                              id="data"
                              {...field}
                            />
                          )}
                        </Field>
                        {errors.data && touched.data && <div>{errors.data}</div>}
                      </div>

                      <div>
                        <h1>Início</h1>
                        <Field name="horaInicio">
                          {({ field }: FieldProps) => (
                            <InputForm
                              type="time"
                              placeholder="Hora de início"
                              id="horaInicio"
                              {...field}
                            />
                          )}
                        </Field>
                        {errors.horaInicio && touched.horaInicio && <div>{errors.horaInicio}</div>}
                      </div>

                      <div>
                        <h1>Fim</h1>
                        <Field name="horaFim">
                          {({ field }: FieldProps) => (
                            <InputForm
                              type="time"
                              placeholder="Hora de fim"
                              id="horaFim"
                              {...field}
                            />
                          )}
                        </Field>
                        {errors.horaFim && touched.horaFim && <div>{errors.horaFim}</div>}
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="flex justify-center mt-5 gap-2 mx-2">
                <Button variant="lightTextBlack" size="large">Cancelar</Button>
                <Button size="large">Atualizar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
