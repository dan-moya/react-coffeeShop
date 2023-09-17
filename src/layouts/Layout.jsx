/**
 * No existe un orden específico para las importaciones, pero generalmente se sugiere:
 * Dependencias o hooks en la parte SUPERIOR,
 * después componentes, funciones y finalmente hojas de estilo css
*/
import { Outlet } from 'react-router-dom';
import Modal from 'react-modal';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Sidebar from '../components/Sidebar';
import Resumen from '../components/Resumen';
import useKiosco from '../hooks/useKiosco';
import ModalProducto from '../components/ModalProducto';
import { useAuth } from '../hooks/useAuth';
import '../scroll.css'


const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

Modal.setAppElement('#root'); /** root es el id del contenido del index.html */

export default function Layout() {

	// const { user, error } = useAuth({middleware: 'auth'})
	useAuth({middleware: 'auth'})
	const { modal } = useKiosco();

	// console.log(modal)
	/* console.log(user)
	console.log(error) */

	return (
		<>
			<div className='md:flex'>
				<Sidebar />

				<main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
					<Outlet />
				</main>

				<Resumen />
			</div>
			{/** Si modal esta como "true", entonces retona lo siguiente */}
			{/* {modal && ( */}
				{/** Este modal acepta 2 props que son importante, uno es, cuando queremos que cierre el modal, y el otro es el style */}
				<Modal
					isOpen={modal}
					style={customStyles}
				>
					<ModalProducto />
				</Modal>

				{/** Registramos el componente, pero lo deja ahí, y no lo va a mandar a llamar aún, porque nosotros decidimos en qué parte (y en este caso será en el provider) */}
				<ToastContainer />
			{/* )} */}
		</>
	);
}
