import { Formik } from 'formik';
import login from '@/assets/login.png';
import { AiOutlineIdcard } from 'react-icons/ai';
import { InputAuth } from '@/components/custom/auth-input';
import { FaKey } from 'react-icons/fa6';
import { InputCheckbox } from '@/components/custom/checkbox-input';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import * as Yup from 'yup';
import { useLoginController } from '@/controllers/use-login-controller'; // Importa o controlador

export const Route = createFileRoute('/login')({
  component: Login,
});

export function Login() {p
  const checkboxOptions = [
    {
      value: 'Lembre-me',
      label: 'Lembre-me',
    },
  ];

  const initialValues = {
    cpf: '',
    password: '',
  };

  const userSchema = Yup.object().shape({
    cpf: Yup.string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido!')
      .required('Obrigatório'),
    password: Yup.string().min(6, 'Senha muito curta!').required('Obrigatório'),
  });

  const { handleLoginWithEmail, handleLoginAnonymously } = useLoginController(); // Chama o controlador

  const handleOnSubmitForm = async (values: { cpf: string; password: string }) => {
    console.log('Dados do formulário:', values);
    await handleLoginWithEmail(values.cpf, values.password); // Chama a função de login com os valores do formulário
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userSchema}
      onSubmit={handleOnSubmitForm}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}> {/* Adiciona o evento de submissão */}
          <div>
            <div className="flex flex-col justify-center items-center mb-24 min-h-screen mt-20 font-poppins px-4 sm:px-0">
              <div className="w-full text-center md:hidden mb-4">
                <h1 className="text-[30px] font-bold text-blue-600">Bem-vindo a</h1>
                <span className="text-[40px] font-bold text-blue-900">Sudotec</span>
              </div>

              <div className="flex w-full max-w-6xl h-full md:h-[600px] rounded-xl shadow-lg overflow-hidden bg-white flex-col md:flex-row mb-36">
                <div className="w-full flex justify-center items-center bg-blue-600 h-[250px] md:h-full md:w-1/2">
                  <img
                    src={login}
                    alt="Login do usuário"
                    className="w-[285px] h-[285px] md:w-[500px] md:h-[500px]"
                  />
                </div>

                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center h-full space-y-4">
                  <div className="hidden md:block text-center">
                    <h1 className="text-[40px] font-bold text-blue-600">Bem-vindo a</h1>
                    <span className="text-[50px] font-bold text-blue-900 mb-4">Sudotec</span>
                  </div>

                  <div className="w-full">
                    <div className="w-full flex flex-col items-start mb-2 text-blue-600 px-4 space-y-1">
                      <p>CPF</p>
                      <div className="w-full">
                        <InputAuth
                          icon={<AiOutlineIdcard />}
                          placeholder="000.000.000-00"
                          id="cpf"
                          name="cpf"
                        />
                      </div>

                      <p>Senha</p>
                      <div className="w-full">
                        <InputAuth
                          icon={<FaKey />}
                          placeholder=""
                          id="password"
                          name="password"
                          isPasswordInput={true}
                        />
                      </div>
                    </div>

                    <div className="text-blue-600 flex justify-between items-center gap-4 mr-4 ml-4">
                      <InputCheckbox checkboxValues={checkboxOptions} />
                      <Link to="/" className="text-blue-600 underline text-sm">
                        Esqueceu sua Senha?
                      </Link>
                    </div>

                    <div className="flex justify-between mt-4 w-full">
                      <Button variant="blueButton" size="Login" type="submit">
                        Login
                      </Button>
                      <Button
                        variant="blueButton"
                        size="Login"
                        type="button" // Tipo de botão para não enviar o formulário
                        onClick={handleLoginAnonymously} // Chamando a função de login anônimo
                      >
                        Login Anônimo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default Login;
