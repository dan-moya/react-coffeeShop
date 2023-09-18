import { Outlet } from 'react-router-dom';
import '../scroll.css'

export default function AuthLayout() {
	return (

		<main className={`
				max-w-4xl m-auto mt-7
			`}>
		{/* <main className={`
				max-w-4xl m-auto mt-10 flex flex-col items-center
				md:flex-row md:mt-10
			`}> */}
			<div className='flex flex-col items-center justify-center md:flex-row'>
				<img src="../img/logo.svg" alt="Imagen logotipo" className='w-24 sm:w-11 md:w-20 lg:w-32 xl:w-80 2xl:w-96'/>

				<div className='px-10 py-5 w-full sm:p-10'>
					<Outlet />
				</div>
			</div>
		</main>
	);
}
