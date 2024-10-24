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
                        className="flex flex-col justify-center items-center w-full min-h-screen overflow-y-auto px-4 sm:px-8"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        <div
                            className="flex flex-col md:flex-row w-full max-w-6xl h-auto md:h-[600px] rounded-xl shadow-lg overflow-hidden"
                            style={{ backgroundColor: 'white' }}
                        >
                            <div
                                className="w-full md:w-1/2 flex justify-center items-center bg-blue-600 h-[250px] sm:h-[350px] md:h-auto"
                            >
                                <img
                                    src={passwordResetImage}
                                    alt="Imagem de redefinição de senha"
                                    className="w-[200px] h-[200px] sm:w-[285px] sm:h-[285px] md:w-[500px] md:h-[500px]"
                                />
                            </div>

                            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
                                <h1
                                    className="text-[22px] sm:text-[24px] md:text-[28px] font-extrabold mb-2 text-center"
                                    style={{ color: 'rgba(12, 64, 143, 1)' }}
                                >
                                    Redefinição de Senha
                                </h1>

                                <div className="mt-4">
                                    <p className="text-[14px] sm:text-[16px] md:text-[18px] text-blue-600 text-left mb-4 ml-5">
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

                                <div className="mt-6 w-full space-y-2 px-4">
                                    <Button
                                        variant="blueButton"
                                        size="Login"
                                        className="w-full py-2 sm:py-3 text-sm sm:text-base"
                                    >
                                        Solicitar redefinição
                                    </Button>
                                    <Button
                                        variant="blueButton"
                                        size="Login"
                                        className="w-full py-2 sm:py-3 text-sm sm:text-base"
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