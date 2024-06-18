import PageLayout from '../components/PageLayout/PageLayout';

interface ErrorPageProps {
	message?: string;
}

export const ErrorBody = ({ message }: ErrorPageProps) => {
	return (
		<div className='flex flex-col items-center justify-center h-3/4'>
			<h1>Oops!</h1>
			<div className='text-center'>{message ?? 'Something went wrong.'}</div>
		</div>
	);
};

const ErrorPage = ({ message }: ErrorPageProps) => {
	return (
		<PageLayout>
			<ErrorBody message={message} />
		</PageLayout>
	);
};

export default ErrorPage;
