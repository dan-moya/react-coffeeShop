import { useContext } from "react";
import KioscoContext from "../context/KioscoProvider"; //es el export default de KioscoProvider.jsx

/** El hecho de llamar useNombre, es decir, colocar al inicio "use", React realiza una serie de mejoras en el código y lo integra mejor con React.
 * Los hooks no son para crear funciones reutilizables, sino que un hook y nombre por delante con un "use" lo integra a React y realiza mejora de código en cuanto al performance
*/
const useKiosco = () => {
    return useContext(KioscoContext)
}

/** Entonces de esta forma, cuando mandemos a llamar este hook de "useKiosco", utilizará el context de KioscoContext y tendrá acceso a toda la información que está en el value = {{  }} de KioscoProvider */

export default useKiosco