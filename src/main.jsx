import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { KioscoProvider } from './context/KioscoProvider'
import router from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <KioscoProvider> {/** Nuestro Provider debe rodear toda nuestra aplicación y toda la información estará disponible de forma global, es decir, todo nuestro estado va a estar sincronizado en todos los componentes */}
            <RouterProvider router={ router } /> {/** lo que está dentro de las llaves es la variable que llama desde el archivo router.jsx, y accedemos gracias a ello porque lo estamos importando debido a que ese archivo tiene el "export default router" */}
        </KioscoProvider>
    </React.StrictMode>,
)
