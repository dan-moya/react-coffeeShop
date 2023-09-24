import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import AdminSidebar from "../components/AdminSidebar";
import { useAuth } from "../hooks/useAuth";

export default function AdminLayout() {

    useAuth({middleware: 'admin'});

	return (
		<>
			<div className="md:flex">
				<AdminSidebar />

				<main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
					<Outlet />
				</main>
			</div>

			{/** Registramos el componente, pero lo deja ahí, y no lo va a mandar a llamar aún, porque nosotros decidimos en qué parte (y en este caso será en el provider) */}
			<ToastContainer />
		</>
	);
}
