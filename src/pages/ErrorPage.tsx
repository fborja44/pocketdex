import PageLayout from '../components/PageLayout/PageLayout';

interface ErrorPageProps {
	children?: React.ReactNode;
}

export const ErrorBody = ({ children }: ErrorPageProps) => {
	return (
		<div className='flex flex-col items-center justify-center h-3/4'>
			<h1>Oops!</h1>
			<div className='text-center'>{children ?? 'Something went wrong.'}</div>
		</div>
	);
};

const ErrorPage = ({ children }: ErrorPageProps) => {
	return (
		<PageLayout>
			<ErrorBody>{children}</ErrorBody>
		</PageLayout>
	);
};

export default ErrorPage;
