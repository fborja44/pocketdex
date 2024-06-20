import { Outlet } from 'react-router-dom';
import './css/tailwind.css';
import Menubar from './components/Menubar/Menubar';
import Titlebar from './components/Titlebar/Titlebar';

function App() {
	return (
		<main className='overflow-hidden flex flex-col h-screen'>
			<Titlebar />
			<Outlet />
			<Menubar />
		</main>
	);
}

export default App;
