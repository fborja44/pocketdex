import { Outlet } from 'react-router-dom';
import './css/tailwind.css';
import Layout from './Layout';

function App() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}

export default App;
