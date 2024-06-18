interface PageLayoutProps {
	children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
	return (
		<div className='flex flex-col relative w-screen h-screen p-2'>
			{children}
		</div>
	);
};

export default PageLayout;
