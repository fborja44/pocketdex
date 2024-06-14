import { Outlet } from 'react-router-dom';
import './css/tailwind.css';

function App() {
	return (
		<main className='overflow-hidden'>
			<Outlet />
		</main>
	);
}

export default App;
