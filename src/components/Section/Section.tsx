import Label from '../Label/Label';

interface SectionProps {
	label: string;
	iconSrc?: string;
	children: React.ReactNode;
}

export const Section = ({ label, iconSrc, children }: SectionProps) => {
	return (
		<section className='flex flex-col gap-y-2 w-full'>
			<Label iconSrc={iconSrc}>{label}</Label>
			<div className='text-sm leading-tight text-stone-600'>{children}</div>
		</section>
	);
};
