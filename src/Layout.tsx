import './css/tailwind.css';
import Menubar from './components/Menubar/Menubar';
import Titlebar from './components/Titlebar/Titlebar';

interface LayoutProps {
	children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
	return (
		<main className='overflow-hidden flex flex-col h-screen'>
			<Titlebar />
			{children}
			<Menubar />
		</main>
	);
}

export default Layout;
