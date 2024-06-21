interface PageLayoutProps {
	children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
	return (
		<div className='flex flex-col grow relative w-screen max-h-page'>
			{children}
		</div>
	);
};

export default PageLayout;
