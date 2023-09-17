import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

export default function Registro() {

    // estas variables van a leer lo que el usuario ingrese en los inputs del form registro
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([]);
    const {registro} = useAuth({middleware: 'guest', url: '/'})

    // esto sería con un action="" del form, pero lo estamos haciendo con react
    const handleSubmit = async e => {
        e.preventDefault();

        // y estos datos son los que vamos a enviar a Laravel, por lo que tiene que ser igual a lo que tenemos en el Request
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        registro(datos, setErrores)
    }

	return (
		<>
			<h1 className="text-4xl font-black">Crea tu cuenta</h1>
			<p>Crea tu cuenta llenando el formulario</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    {/** el {error} dentro de Alerta, es el children que está en el archivo Alerta.jsx */}
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

                    <div className="mb-4">
                        <label htmlFor="name" className="text-slate-800">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1.5 w-full p-3 bg-gray-50"
                            name="name"
                            placeholder="Escribe tu nombre"
                            ref={nameRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="text-slate-800">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1.5 w-full p-3 bg-gray-50"
                            name="email"
                            placeholder="Escribe tu correo"
                            ref={emailRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="text-slate-800">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1.5 w-full p-3 bg-gray-50"
                            name="password"
                            placeholder="Escribe tu contraseña"
                            ref={passwordRef}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password_confirmation" className="text-slate-800">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            className="mt-1.5 w-full p-3 bg-gray-50"
                            name="password_confirmation"
                            placeholder="Escribe nuevamente tu contraseña"
                            ref={passwordConfirmationRef}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Crear Cuenta"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md"
                    />
                </form>
            </div>

            <nav className="mt-5">
                <Link to="/auth/login">
                    Ya tienes una cuenta? Inicia Sesión
                </Link>
            </nav>
		</>
	);
}
