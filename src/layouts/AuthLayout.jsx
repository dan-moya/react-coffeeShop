import { Outlet } from 'react-router-dom';
import '../scroll.css'

export default function AuthLayout() {
	return (

		<main className={`
				max-w-4xl m-auto mt-7 md:h-screen md:flex md:items-center lg:mt-0 2xl:max-w-6xl
			`}>
		{/* <main className={`
				max-w-4xl m-auto mt-10 flex flex-col items-center
				md:flex-row md:mt-10
			`}> */}
			<div className='flex flex-col items-center justify-center md:flex-row sm:relative md:w-screen'>
				<img
					src="../img/logo.svg"
					alt="Imagen logotipo"
					className='w-24
								sm:w-32 sm:absolute sm:top-0 sm:left-14
								md:w-32 md:ml-16
								lg:w-60 lg:relative lg:ml-0 lg:left-0
								xl:w-64
								2xl:w-80'
				/>

				<div className='px-10 py-5 w-full sm:p-10'>
					<Outlet />
				</div>
			</div>
		</main>
	);
}
