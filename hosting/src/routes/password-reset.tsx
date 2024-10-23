import { createFileRoute } from '@tanstack/react-router';
import { Formik } from 'formik';
import passwordResetImage from '@/assets/password-reset.png';
import { InputAuth } from '@/components/custom/auth-input';
import { AiOutlineIdcard } from "react-icons/ai";
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/password-reset')({
  component: PasswordReset,

});

function PasswordReset() {
    return (
        <>
            <Formik
                initialValues={{ cpf: '' }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {() => (
                    <div
                        className="flex flex-col sm:px-0 justify-center min-h-screen items-center w-full h-screen pt-16 px-2"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        <div
                            className="flex flex-col md:flex-row w-full max-w-6xl h-full md:h-[600px] rounded-xl shadow-lg overflow-hidden"
                            style={{ backgroundColor: 'white' }}
                        >
                            <div
                                className="w-full md:w-1/2 flex justify-center items-center bg-blue-600 md:h-auto h-[300px] sm:h-[400px]"
                            >
                                <img
                                    src={passwordResetImage}
                                    alt="Imagem de redefinição de senha"
                                    className="w-[200px] h-[200px] md:w-[400px] md:h-[400px]"
                                />
                            </div>


                            <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                                <h1
                                    className="text-[24px] md:text-[28px] font-extrabold mb-2 text-center"
                                    style={{ color: 'rgba(12, 64, 143, 1)' }}
                                >
                                    Redefinição de Senha
                                </h1>

                                <div className="mt-4">
                                    <p className="text-[16px] md:text-[18px] text-blue-600 text-left ml-9 mb-4">
                                        Informe seu CPF para a redefinição de senha
                                    </p>

                                    <div className="w-full">
                                        <div className="w-full flex flex-col items-start mb-2 text-blue-600 px-4 space-y-2">
                                            <div className="w-full">
                                                <InputAuth
                                                    icon={<AiOutlineIdcard />}
                                                    placeholder="000.000.000-00"
                                                    id="cpf"
                                                    name="cpf"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col justify-center mt-4 w-full gap-3 ml-4">
                                    <Button
                                        variant="blueButton"
                                        size="Login"
                                    >
                                        Solicitar redefinição
                                    </Button>
                                    <Button
                                        variant="blueButton"
                                        size="Login"
                                    >
                                        Retornar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
}

export default PasswordReset;
