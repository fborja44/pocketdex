interface SpeciesSectionProps {
	children: React.ReactNode;
	title?: string;
}

const SpeciesSection = ({ children, title }: SpeciesSectionProps) => {
	return (
		<section className='flex flex-col grow pb-1 px-2 '>
			<SpeciesSectionTitle>{title}</SpeciesSectionTitle>
			<div className='text-stone-500 text-sm'>{children}</div>
		</section>
	);
};

export default SpeciesSection;

interface SpeciesSectionTitleProps {
	children: React.ReactNode;
}

export const SpeciesSectionTitle = ({ children }: SpeciesSectionTitleProps) => {
	return <h2 className='text-lg text-stone-700'>{children}</h2>;
};
