import { useEffect } from 'react'; // Importando o useEffect
import { Formik } from 'formik';
import login from '@/assets/login.png';
import { AiOutlineIdcard } from 'react-icons/ai';
import { InputAuth } from '@/components/custom/auth-input';
import { FaKey } from 'react-icons/fa6';
import { InputCheckbox } from '@/components/custom/checkbox-input';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/custom/header';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  component: Login,
});

export function Login() {
  const checkboxOptions = [{ value: 'Lembre-me', label: 'Lembre-me' }];

  // useEffect para remover a rolagem ao carregar o componente
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Impede a rolagem

    // Limpeza ao desmontar o componente para restaurar a rolagem
    return () => {
      document.body.style.overflow = ''; // Permite a rolagem novamente
    };
  }, []);

  return (
    <Formik
      initialValues={{ cpf: '', senha: '', termos: false }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <div>
        <Header avatarFallBack="" avatarImage=" " />

        {/* Container principal */}
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 font-poppins px-4  sm:px-0 mb-100">
          {/* Título para telas pequenas */}
          <div className="w-full text-center md:hidden mb-4">
            <h1 className="text-[30px] font-bold text-blue-600">
              Bem-vindo a
            </h1>
            <span className="text-[40px] font-bold text-blue-900">
              Sudotec
            </span>
          </div>

          <div className="flex w-full max-w-6xl h-full md:h-[600px] rounded-xl shadow-lg overflow-hidden bg-white flex-col md:flex-row mb-36">

            {/* Imagem da esquerda (em telas grandes) e em cima dos campos (em telas menores) */}
            <div className="w-full flex justify-center items-center bg-blue-600 h-[250px] md:h-full md:w-1/2">
              <img
                src={login}
                alt="Login do usuário"
                className="w-[285px] h-[285px] md:w-[500px] md:h-[500px]"
              />
            </div>

            {/* Seção do formulário */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center h-full space-y-4">
              {/* Título para telas maiores */}
              <div className="hidden md:block text-center">
                <h1 className="text-[40px] font-bold text-blue-600">
                  Bem-vindo a
                </h1>
                <span className="text-[50px] font-bold text-blue-900 mb-4">
                  Sudotec
                </span>
              </div>

              <div className="w-full">
                <div className="w-full flex flex-col items-start mb-2 text-blue-600 px-4 space-y-2">
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
                      id="senha"
                      name="senha"
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

                {/* Centralizando o botão */}
                <div className="flex justify-center mt-4 w-full">
                  <Button
                    variant="blueButton"
                    size="login"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
}

export default Login;
