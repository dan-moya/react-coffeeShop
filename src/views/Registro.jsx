import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";

export default function Registro() {

    // estas variables van a leer lo que el usuario ingrese en los inputs del form registro
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([]);
    const [loading, setLoading] = useState(false);
    const {registro} = useAuth({middleware: 'guest', url: '/'})

    // esto sería con un action="" del form, pero lo estamos haciendo con react
    const handleSubmit = async e => {
        e.preventDefault();
		setLoading(true);

        // y estos datos son los que vamos a enviar a Laravel, por lo que tiene que ser igual a lo que tenemos en el Request
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        // Muestra el spinner hasta que devuelva error o éxito
		try {
            await registro(datos, setErrores)
		} catch (error) {
			console.error(error);
		}finally {
			setLoading(false);
		}
    }

	return (
		<>
            <div className="text-center sm:flex sm:flex-col sm:text-end sm:mx-2 md:mr-20 lg:text-start">
                <h1 className="text-4xl font-black 2xl:text-5xl">Crea tu cuenta</h1>
                <p className="2xl:text-xl">Crea tu cuenta llenando el formulario</p>
            </div>

            <div className="bg-white shadow-lg rounded-md mt-10 px-5 py-10 sm:py-5 2xl:text-xl">
                <form
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="on"
                >
                    {/** el {error} dentro de Alerta, es el children que está en el archivo Alerta.jsx */}
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

                    <div className="md:flex md:justify-between md:gap-x-5">
                        <div className="mb-4 md:w-full">
                            <label htmlFor="name" className="text-slate-800">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1.5 w-full p-3 bg-gray-50 rounded-md"
                                name="name"
                                placeholder="Escribe tu nombre"
                                ref={nameRef}
                            />
                        </div>

                        <div className="mb-4 md:w-full">
                            <label htmlFor="email" className="text-slate-800">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1.5 w-full p-3 bg-gray-50 rounded-md"
                                name="email"
                                placeholder="Escribe tu correo"
                                ref={emailRef}
                            />
                        </div>
                    </div>

                    <div className="sm:flex sm:gap-x-5">
                        <div className="mb-4 sm:w-full">
                            <label htmlFor="password" className="text-slate-800">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1.5 w-full p-3 bg-gray-50 rounded-md"
                                name="password"
                                placeholder="Escribe tu contraseña"
                                ref={passwordRef}
                            />
                        </div>

                        <div className="mb-4 sm:w-full">
                            <label htmlFor="password_confirmation" className="text-slate-800">Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                className="mt-1.5 w-full p-3 bg-gray-50 rounded-md"
                                name="password_confirmation"
                                placeholder="Escribe nuevamente tu contraseña"
                                ref={passwordConfirmationRef}
                            />
                        </div>
                    </div>

                    <div className="w-full sm:w-auto sm:flex sm:justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-indigo-600 hover:bg-indigo-800 text-white mt-5 p-3 sm:px-7 uppercase font-bold cursor-pointer rounded-md tracking-wide ${loading ? 'opacity-50 cursor-wait' : ''}`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <Loader /> Creando Cuenta ...
                                </div>
                            ) : (
                                'Crear Cuenta'
                            )}
                        </button>
                    </div>
                </form>
            </div>

            <nav className="mt-5 2xl:text-xl">
                <Link to="/auth/login">
                    Ya tienes una cuenta?
                    <span className="text-indigo-500 font-semibold underline px-1">Inicia Sesión</span>
                </Link>
            </nav>
		</>
	);
}
