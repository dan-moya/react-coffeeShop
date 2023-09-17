/** La ventaja de llamarlo index.js es que cuando lo importemos no tendremos que escribir "index.js", sino únicamente el nombre del archivo */
export const formatearDinero = (cantidad) => {
    /** No convierte de USD a BOB como tal, sino que solo es la representación de la moneda */
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'BOB'
    });
}