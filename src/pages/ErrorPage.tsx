import { useRouteError } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import Spinda from '../assets/sprites/ui/spinda.gif';

interface ErrorPageProps {
	children?: React.ReactNode;
}

export const ErrorBody = ({ children }: ErrorPageProps) => {
	return (
		<div className='flex flex-col items-center justify-center h-5/6'>
			<img src={Spinda} alt='' className='w-12 h-12' />
			<h1 className='text-2xl'>Oops!</h1>
			<div className='text-center w-4/5 mt-2 text-stone-500'>
				{children ?? 'Something went wrong.'}
			</div>
		</div>
	);
};

const ErrorPage = ({ children }: ErrorPageProps) => {
	const error = useRouteError();
	console.error(error);

	return (
		<PageLayout>
			<ErrorBody>{children}</ErrorBody>
		</PageLayout>
	);
};

export default ErrorPage;
