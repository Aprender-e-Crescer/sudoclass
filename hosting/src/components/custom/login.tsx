import { Formik, Form, Field, FieldProps } from 'formik';
import login from '@/assets/login.png'; // Mantém a imagem anterior
import { AiOutlineIdcard } from 'react-icons/ai';
import { InputAuth } from '@/components/custom/auth-input'; // Importação atualizada
import { FaKey } from "react-icons/fa6";


function Login() {
    return (
        <Formik
            initialValues={{ cpf: '' }}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            {() => (
                <div
                    className="flex justify-center items-center min-h-screen bg-gray-100"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    <div
                        className="flex w-full max-w-4xl h-auto rounded-xl shadow-lg overflow-hidden"
                        style={{ backgroundColor: 'white' }}
                    >
                        {/* Seção da imagem à esquerda */}
                        <div
                            className="w-1/2 flex justify-center items-center"
                            style={{ backgroundColor: 'rgba(26, 115, 232, 1)' }}
                        >
                            <img
                                src={login} // Mantém a imagem anterior
                                alt="Login do usuário"
                                className="w-[480px] h-[480px] max-w-full"
                            />
                        </div>

                        {/* Seção do formulário à direita */}
                        <div className="w-1/2 p-8 flex flex-col justify-center  ">
                            <h1
                                className="text-[28px] font-bold mb-2"
                                style={{ color: 'rgba(12, 64, 143, 1)' }}
                            >
                                Bem-vindo
                            </h1>
                            <span className="text-[32px] font-bold text-blue-600 mb-30"> {/* Aumentando a margem inferior */}
                                Sudotec
                            </span>
                           

                            
                            <div className="w-full flex items-center mb-2">
                               
                                <div className='w-full h-12 text-lg px-4'>
                                    <p className=''>CPF</p>
                                    <InputAuth
                                        
                                        icon={<AiOutlineIdcard />}
                                        placeholder="000.000.000-00"
                                        id="cpf"
                                        name="cpf"
                                    />

                                    <p className='w-full h-12 text-lg px-4'>Senha</p>
                                    <InputAuth
                                        icon={<FaKey />}
                                        placeholder="************"
                                        id="senha"
                                        name="senha"
                                    />
                                    
                                </div>

                                




                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default Login;
