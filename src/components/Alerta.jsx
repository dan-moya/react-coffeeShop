

// colocar children es una buena forma de crear un componente reutilizable
export default function Alerta({children}) {
  return (
    <div className="text-center my-2 bg-red-600 text-white font-bold p-3 uppercase">
        {children}
    </div>
  )
}
