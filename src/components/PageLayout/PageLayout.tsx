interface PageLayoutProps {
	children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
	return (
		<div className='flex flex-col relative w-screen h-page p-2'>{children}</div>
	);
};

export default PageLayout;