/** useState es un hook incluido en React, en useState iremos definiendo los datos que pueden cambiar a futuro en nuestra aplicación con base a ciertas interacciones de los usuario (Ej. Si un user está autenticado o no). No todo se coloca en el State, sino únicamente las partes más dinámicas de nuestra aplicación, las partes cuyo valor pueden ser diferentes a futuro son las que tenemos que colocar en un State */
import { createContext, useState, useEffect } from "react";
/** toast contiene el evento y el tipo de toast que queremos mostrar */
import { toast } from "react-toastify";
//import { categorias as categoriasDB } from "../data/categorias"; // la api manual
import axios from "axios"; // como creamos en la carpeta config/axios.js ya no es necesario importar esto sino lo otro (clienteAxios)
import clienteAxios from "../config/axios";

/** La variable "KioscoContext" va a tener acceso a un método llamado Provider que se coloca en el return */
const  KioscoContext = createContext();


/** KioscoProvider toma un prop especial llamado "children". Y este callback debemos registrarlo (importarlo) en el main.jsx */
const KioscoProvider = ({children}) => {

    /** Hay 3 partes cuando utilizamos useState, las 2 primeras ocurren del signo de igual (=) hacia la izquierda y la 3ra ocurren dentro del paréntesis de useState.
     * Dentro de los corchetes ([]), se aplica "arrayDestructory", y retonará 2 valores que podamos nombrar como deseemos. El 1er valor será el state (en este caso "categorias", y el 2do valor va a ser una función que modifica ese State (lo importante es que esa función, siempre que queramos reescribir el State o cambiarlo debemos utilizar esa función), y hay una convención en React que primero debemos utilizar "set" y seguido del nombre del State (en este caso setCategorias).
     * La tercera parte ocurre dentro del useState(), lo cual será el valor inicial
    */
    //const [ categorias, setCategorias ] = useState(categoriasDB); // con la api manual
    const [ categorias, setCategorias ] = useState([]); // con la api real
    const [categoriaActual, setCategoriaActual] = useState({}); // colocamos {} para decirle que inicia como un obj vacio
    const [modal, setModal] = useState(false); // será true solo cuando el usuario presione el botón de "Agregar"
    const [producto, setProducto] = useState({}); // en este caso los productos son objetos, por lo tanto inicia como un objeto vacío
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0)

    /** Utilizaremos useEffect para calcular automáticamente el total del pedido (la suma de los subtotales).*/
    /** Cada que pedido cambie, queremos que esta función se ejecute para ir calculando el total */
    useEffect(() => {
        /** total va a ser un acumulado y producto va a ser el elemento por el cual está iterando */
        const nuevoTotal = pedido.reduce( (total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    /** Acá es donde ya consumimos la API real y no manual */
    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            /** Y la ruta a la cual queremos consumir cambiará cuando esté en producción, y es por eso que se crea VARIABLES DE ENTORNO (crear un archivo .env.local) y es allí donde se define la ruta que utilizaremos, en este caso localhost, pero cuando ya esté en producción solo será reemplazarlo.
             * Y para acceder a esa variable de entorno es de la siguiente manera:
             * Primero se hizo con axios(`${import.meta.env.VITE_API_URL}/api/categorias)`, pero como creamos un cliente de axios, ya directamente llamamos a ese cliente y eliminamos "${import.meta.env.VITE_API_URL}" porque eso ya está en su baseURL del cliente, y sería de la siguiente forma: clienteAxios('/api/categorias')
             */
            const {data} = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); // 'data' es por defecto de axios, entonces accedemos a ellos con {data} (aplicamos). Y como vamos a hacer varios llamados a esa URL, la mejor opción siempre es crear un cliente de axios, porque la base de todos estos llamados va a ser la misma y podemos simplificar un poco nuestro código
            // Una vez que tenemos las categorias desde la API de Laravel, podemos setearla en el State (setCategorias)
            setCategorias(data.data) // data es la variable que creamos, y accedemos al otro 'data' que manda por defecto el resource de LARAVEL
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    // y cuándo obtendremos estas categorias (obtenerCategorias) ? Pues tan pronto como cargue este componente, y colocamos un arreglo vacío para que solo sesa cuando cargue este componente (useEffect)
    useEffect(() => {
        obtenerCategorias()
    }, []);


    /** En React hay una conveción, que cuando hay un click o en submit, se presenta un evento tiene que iniciar con "handle", después del handle se coloca el nombre del evento.
     * este función toma el parámetro 'id' que es el id de las categorias, y después desde el componente pasarle un argumento
    */
    const handleClickCategoria = (id) => {
        /** La variable "categoria" dentro del filter es solo interno de ello */
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        /** siempre que queramos modificar el primer valor del State (categoriaActual), debemos utilizar la función modificadora (setCategoriaActual, y nunca por asignación utilizando un signo igual
         * (Ej. categoriaActual = categoria)) */
        setCategoriaActual(categoria)
    }

    /** Esta función cambia el estado del modal a true, cuando presione el usuario. */
    const handleClickModal = () => {
        setModal(!modal); // en vez de crear una función para que el valor sea true (cuando abra el modal) y otra función para que el valor de false (cuando cierre el modal), podemos negar directamente el valor de "modal"
        // setModal(true)
    }

    // el "producto" viene desde el componente, es el que se va a habilitar o agregar al presionar para abrir el modal
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    /** En este caso los 3 puntos (...) determina que atributos del objeto no queremos tomar en cuenta, pero no los elimina como tal, sino los excluye */
    const handleAgregarProducto = ({categoria_id, ...producto}) => {

        /** La lógica es la siguiente, primero revisar que exista un elemento en el arreglo y entonces reescribimos ya sea la cantidad o actualizamos la cantidad que el usuario ha decidido que quiere ordenar de un determinado producto, en resumen para actualizar o guardar desde la selección del mismo botón de agregar */
        if (pedido.some( pedidoState => pedidoState.id === producto.id )) {
            // y si el producto ya está en la lista, necesitamos extraer la cantidad (y esa cantidad está en pedido)
            /** la variable pedidoActualizado es para modificar el producto sin alterar el original, porque map no modifica el arreglo original, sino que retorna un arreglo nuevo modificado sin alterar original*/
            const pedidoActualizado = pedido.map( pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Guardado Correctamente')
        } else {
            setPedido([...pedido, producto]) // toma una copia de lo que haya en pedido y agrega este producto nuevo, y de esa forma se irán agregando elementos
            toast.success('Agregado al Pedido')
        }
    };

    /** Para editar el producto seleccionado desde el lado del resumen, es decir, desde el ícono de lápiz */
    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)//lo contrario a lo que haya en el modal
    }

    /** Para eliminar un producto del pedido (del resúmen) */
    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminado del Pedido')
    }

    const handleSubmitNuevaOrden = async (logout) => {

        const token = localStorage.getItem('AUTH_TOKEN');

        try {
            const {data} = await clienteAxios.post('/api/pedidos',
            {
                total,
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                }) // renombramos el pedido a productos
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success(data.message);

            setTimeout(() => {
                setPedido([]) // después de 1s, setPedido va a estar de nuevo vacío
            }, 1000);

            // Cerrar la sesión de usuario
            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN');
                logout()
            }, 2500);

        } catch (error) {
            console.log(error)
        }
    }

    const handleClickCompletarPedido = async id => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickProductoAgotado = async id => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            // el null, es porque no hay payload, es decir, no estamos enviando nada desde aquí, sino desde el servidor (Laravel)
            await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    /** lo que coloquemos en este return va a ser diferente al de los componentes que es básicamente la prensentación (hmtl, css), porque este return retornará variables o funciones que podemos importar donde sea que deseemos utilizar este Provider */
    return (
        <KioscoContext.Provider
            /** La primera llave del "value" indica que lo que está dentro de ella es código de JS y la segunda llave es para pasarlo como un objeto.
             * Y todo lo que coloquemos dentro del value estará disponible dentro de toda nuestra aplicación.
             * Debemos definir primero nuestras funciones, etc (antes del return), para hacerlas disponibles al value y podremos importarlo en cualquier archivo llamando al hook (useKiosco)
            */
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarProducto,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}

        >{children}</KioscoContext.Provider>
    );
}

/** Exportamos KioscoProvider para que sea un export nombrado */
export { KioscoProvider }
export default KioscoContext