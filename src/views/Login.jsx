import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";
import LoadingIndicator from "../components/LoadingIndicator";


export default function Login() {

	// estas variables van a leer lo que el usuario ingrese en los inputs del form registro
    const emailRef = createRef();
    const passwordRef = createRef();

    const [errores, setErrores] = useState([]);
    const [loading, setLoading] = useState(false);
	const { login } = useAuth({
		middleware: 'guest',
		url: '/', // en caso de que se haya autenticado, lo mandamos la página principal
	})

    // esto sería con un action="" del form, pero lo estamos haciendo con react
    const handleSubmit = async e => {
        e.preventDefault();
		setLoading(true);

        // y estos datos son los que vamos a enviar a Laravel, por lo que tiene que ser igual a lo que tenemos en el Request
        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

		// Muestra el spinner hasta que devuelva error o éxito
		try {
			await login(datos, setErrores)
		} catch (error) {
			console.error(error);
		}finally {
			setLoading(false);
		}
    }

	return (
		<>
			<div className="text-center sm:flex sm:flex-col sm:text-end sm:mx-2 md:mr-20 lg:text-start">
				<h1 className="text-4xl font-black 2xl:text-5xl">Iniciar Sesión</h1>
				<p className="2xl:text-xl">Para crear un pedido debes ingresar tus datos</p>
			</div>

			<div className="bg-white shadow-lg rounded-md mt-10 px-5 py-10 sm:py-5 md:w-4/5 md:flex md:mx-auto lg:w-full">
				<form
					onSubmit={handleSubmit}
					noValidate
					autoComplete="on"
					className="md:w-full"
				>
					{/** el {error} dentro de Alerta, es el children que está en el archivo Alerta.jsx */}
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}

					<div className="2xl:text-xl">
						<div className="mb-4">
							<label htmlFor="email" className="text-slate-800">
								Email
							</label>
							<input
								type="email"
								id="email"
								className="mt-1.5 w-full p-3 bg-gray-50 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:rounded-md rounded-md"
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
								className="mt-1.5 w-full p-3 bg-gray-50 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:rounded-md rounded-md"
								name="password"
								placeholder="Escribe tu contraseña"
								ref={passwordRef}
							/>
						</div>
					</div>
					<div className="w-full sm:w-auto sm:flex sm:justify-center 2xl:text-xl">
						<button
							type="submit"
							disabled={loading}
							className={`bg-indigo-600 hover:bg-indigo-800 text-white mt-5 p-3 sm:px-3.5 uppercase font-bold cursor-pointer rounded-md tracking-wide ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
						>
							{loading ? (
								<div className="flex items-center justify-center">
									<LoadingIndicator show={loading} text="Ingresando..." />
								</div>
							) : (
								'Ingresar'
							)}
						</button>
					</div>

				</form>
			</div>

            <nav className="mt-5 md:flex md:justify-center lg:justify-start 2xl:text-xl">
                <Link to="/auth/registro">
                    ¿No tienes una cuenta?
					<span className="text-indigo-500 font-semibold underline px-1">Crea una</span>
                </Link>
            </nav>
		</>
	);
}
