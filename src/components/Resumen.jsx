import { formatearDinero } from "../helpers";
import useKiosco from "../hooks/useKiosco";
import { useAuth } from "../hooks/useAuth";
import ResumenProducto from "./ResumenProducto";
import { useState } from "react";
import Loader from "./Loader";

export default function Resumen() {

    const { pedido, total, handleSubmitNuevaOrden } = useKiosco();
    const {logout} = useAuth({})
    const [confirmado, setConfirmado] = useState(false)

    const comprobarPedido = () => pedido.length === 0;  // comprueba si el pedido está vacío o no (vacío = true), es decir, que si retorna true lo deshabilita
    const handleSubmit = async e => {
        e.preventDefault();
        setConfirmado(true); // Establece confirmado a true para activar la redirección
        try {
            await handleSubmitNuevaOrden(logout);
        } catch (error) {
            console.error(error);
        } finally {
            setConfirmado(false);
        }
    }

	return (
        <aside className="w-72 h-screen overflow-y-scroll p-0">
            <div className="p-5">
                <h1 className="text-4xl font-bold">
                    Mi pedido
                </h1>
                <p className="text-lg my-4">
                    Aquí podras ver el resumen y totales de tu pedido
                </p>
                <hr />
                <div className="py-5 space-y-2">
                    {pedido.length === 0 ? (
                        <p className="text-center text-2xl">
                            No hay elementos en tu pedido aún
                        </p>
                    ) : (
                        /** la varible producto es temporal */
                        pedido.map(producto => (
                            <ResumenProducto
                                key={producto.id}
                                producto={producto}
                            />
                        ))
                    )}
                </div>
            </div>

            <div className="bottom-0 sticky bg-zinc-100 p-5">
                <p className="text-xl">
                    Total: {''}
                    {formatearDinero(total)}
                </p>

                <form
                    className="w-full"
                    onSubmit={handleSubmit}
                >
                    <div className="mt-5">
                        <button
                            type="submit"
                            className={`${comprobarPedido() || confirmado ?
                                'bg-indigo-300 cursor-no-drop' : 'bg-slate-700 hover:bg-slate-800' }
                                px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer tracking-wide`}
                            disabled={comprobarPedido() || confirmado}
                        >
                            {confirmado ? (
							<div className="flex items-center justify-center">
								<Loader /> <span className="capitalize">Procesando Pedido...</span>
							</div>
						) : (
							'Confirmar Pedido'
						)}
                        </button>
                    </div>
                </form>
            </div>

        </aside>
    );
}
