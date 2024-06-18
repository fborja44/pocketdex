interface ErrorPageProps {
	message?: string;
}

const ErrorPage = ({ message }: ErrorPageProps) => {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<h1>Oops!</h1>
			<div>{message ?? 'Something went wrong.'}</div>
		</div>
	);
};

export default ErrorPage;
