import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

export default function Login() {

	// estas variables van a leer lo que el usuario ingrese en los inputs del form registro
    const emailRef = createRef();
    const passwordRef = createRef();

    const [errores, setErrores] = useState([]);
	const { login } = useAuth({
		middleware: 'guest',
		url: '/', // en caso de que se haya autenticado, lo mandamos la página principal
	})

    // esto sería con un action="" del form, pero lo estamos haciendo con react
    const handleSubmit = async e => {
        e.preventDefault();

        // y estos datos son los que vamos a enviar a Laravel, por lo que tiene que ser igual a lo que tenemos en el Request
        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

		login(datos, setErrores)
    }

	return (
		<>
			<h1 className="text-4xl font-black">Iniciar Sesión</h1>
			<p>Para crear un pedido debes ingresar tus datos</p>

			<div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
				<form
					onSubmit={handleSubmit}
					noValidate
				>
					{/** el {error} dentro de Alerta, es el children que está en el archivo Alerta.jsx */}
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

					<div className="mb-4">
						<label htmlFor="email" className="text-slate-800">
							Email
						</label>
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
						<label htmlFor="password" className="text-slate-800">
							Contraseña
						</label>
						<input
							type="password"
							id="password"
							className="mt-1.5 w-full p-3 bg-gray-50"
							name="password"
							placeholder="Escribe tu contraseña"
							ref={passwordRef}
						/>
					</div>

					<input
						type="submit"
						value="Ingresar"
						className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md"
					/>
				</form>
			</div>

            <nav className="mt-5">
                <Link to="/auth/registro">
                    ¿No tienes una cuenta? Crea una
                </Link>
            </nav>
		</>
	);
}
