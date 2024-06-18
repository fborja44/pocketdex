import { Outlet } from 'react-router-dom';
import './css/tailwind.css';
import Menubar from './components/Menubar/Menubar';

function App() {
	return (
		<main className='overflow-hidden'>
			<Outlet />
			<Menubar />
		</main>
	);
}

export default App;
