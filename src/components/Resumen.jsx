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
        <aside className="w-screen h-screen overflow-y-scroll p-0 sm:h-auto xl:w-72 xl:h-screen">
            <div className="p-5">
                <h1 className="text-4xl sm:text-3xl font-bold 2xl:text-4xl">
                    Mi pedido
                </h1>
                <p className="text-lg my-4 sm:my-2.5 2xl:text-xl">
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
                        <div className="grid grid-cols-1 gap-3.5
                                        sm:grid sm:grid-cols-2 sm:gap-2
                                        min-[920px]:grid-cols-3
                                        xl:grid-cols-1">
                            {pedido.map(producto => (
                                <ResumenProducto
                                    key={producto.id}
                                    producto={producto}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="bottom-0 sticky bg-zinc-100 p-5 sm:flex sm:justify-between sm:items-center lg:flex-col lg:items-start">
                <p className="text-xl sm:w-auto 2xl:text-2xl">
                    Total: {''}
                    <span className="sm:font-semibold">{formatearDinero(total)}</span>
                </p>

                <form
                    className="w-full sm:w-auto xl:w-full"
                    onSubmit={handleSubmit}
                >
                    <div className="mt-5 xl:mt-3">
                        <button
                            type="submit"
                            className={`${comprobarPedido() || confirmado ?
                                'bg-indigo-300 cursor-no-drop' : 'bg-slate-700 hover:bg-slate-800' }
                                px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer tracking-wide 2xl:text-lg`}
                            disabled={comprobarPedido() || confirmado}
                        >
                            {confirmado ? (
                                <div className="flex items-center justify-center">
                                    <Loader /> <span className="capitalize">Procesando Orden...</span>
                                </div>
                            ) : (
                                'Confirmar Orden'
                            )}
                        </button>
                    </div>
                </form>
            </div>

        </aside>
    );
}
