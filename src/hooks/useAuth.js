import { useEffect } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import clienteAxios from "../config/axios"

export const useAuth = ({middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()

    // mutate es una función incluida en SWR, y básicamente lo que hace es revalidar toda la función de abajo, porque puede ser que algo haya cambiado
    const { data: user, error, mutate } = useSWR('/api/user', () =>
        // lo que esté dentro de useSWR y clienteAxios debe ser siempre igual, en este caso ('/api/user')
        clienteAxios('/api/user', {
            // Authorization y el token es el que identifican al usuario con sanctum
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

    // Y en este caso no lo vamos a colocar en un context, porque la autenticación no tiene que ser global, sino que la podemos inicializar en cada componente según sea necesario
    const login = async (datos, setErrores) => {
        try {
            const {data} = await clienteAxios.post('/api/login', datos)
            // console.log(data.token)
			localStorage.setItem('AUTH_TOKEN', data.token);
			// si todo esta bien sin errores, entonces regresamos el [] de errores vacío
			setErrores([]);
            await mutate()
        } catch (error) {
			// console.log(error)
            setErrores(Object.values(error.response.data.errors))
        }
    }

    const registro = async (datos, setErrores) => {
        try {
            const {data} = await clienteAxios.post('/api/registro', datos)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrores([])
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
        }
    }

    const logout = async () => {
        //console.log('click')
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined) // para que no nos lleve de un lugar a otro, es decir, bucle de redirecciones
        } catch (error) {
            setErrores(Object.values(error.response.data.errors))
        }
    }

    // console.log(user)
    // console.log(error)

    useEffect(() => {
        if (middleware === 'guest' && url && user) {
            navigate(url)
        }

        // redireccionar a los admins a la página de admins
        if (middleware === 'guest' && user && user.admin) {
            navigate('/admin')
        }

        // Si el middleware es de 'admin' y tenemos un usuario y el usaurio no es administrador, entonces no puede acceder a la ruta del admin y se va a donde pertenece (a la ruta para hacer pedidos)
        if (middleware === 'admin' && user && !user.admin) {
            navigate('/')
        }

        if (middleware === 'auth' && error) {
            navigate('/auth/login')
        }
    }, [user, error]) // cuando estos valores estén cambiando (porque van a cambiar), ya sea que el user se autentique correctamente o no lo haga, entonces este useEffect va a estar escuchando por ambos

    return {
        login,
        registro,
        logout,
        user,
        error
    }
}

export default useAuth;