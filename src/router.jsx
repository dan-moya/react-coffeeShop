import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Registro from './views/Registro';
import Ordenes from './views/Ordenes';
import Productos from './views/Productos';
import AdminLayout from './layouts/AdminLayout';

// esta función nos retonar la constante router

// para llamar componentes es <name_component />
const router = createBrowserRouter([
    /** el '/' es la página principal que se mostrará, y el element los componente a renderizar, es decir, "que cuando cargue la página principal ('/') quiero que cargue el siguiente <Layout/>" */
    /** "children", lo que esté definido dentro de "children" utilizará el layout principal que está en "element" */
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                //index: true, /** si elimanos el index, debemos colocar manualmente la ruta */
                path: '/auth/login',
                element: <Login />
            },
            {
                //index: true, /** si elimanos el index, debemos colocar manualmente la ruta */
                path: '/auth/registro',
                element: <Registro />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true, // esta será la ruta cuando vatamos a admin
                element: <Ordenes />
            },
            {
                path: '/admin/productos',
                element: <Productos />
            }
        ]
    }
]);

export default router