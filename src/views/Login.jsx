import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";
import Loader from "../components/Loader";


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
			<div className="text-center">
				<h1 className="text-4xl font-black">Iniciar Sesión</h1>
				<p>Para crear un pedido debes ingresar tus datos</p>
			</div>

			<div className="bg-white shadow-lg rounded-md mt-10 px-5 py-10">
				<form
					onSubmit={handleSubmit}
					noValidate
					autoComplete="on"
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
							className="mt-1.5 w-full p-3 bg-gray-50 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:rounded-md"
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
							className="mt-1.5 w-full p-3 bg-gray-50 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 focus:rounded-md"
							name="password"
							placeholder="Escribe tu contraseña"
							ref={passwordRef}
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className={`bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-md ${loading ? 'opacity-50 cursor-wait' : ''}`}
					>
						{loading ? (
							<div className="flex items-center justify-center">
								<Loader /> Ingresando...
							</div>
						) : (
							'Ingresar'
						)}
					</button>
				</form>
			</div>

            <nav className="mt-5">
                <Link to="/auth/registro">
                    ¿No tienes una cuenta?
					<span className="text-indigo-500 font-semibold underline px-1">Crea una</span>
                </Link>
            </nav>
		</>
	);
}
