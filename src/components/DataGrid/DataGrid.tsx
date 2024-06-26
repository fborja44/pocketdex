interface DataGridProps {
	children: React.ReactNode;
}

const DataGrid = ({ children }: DataGridProps) => {
	return (
		<div className='grid grid-cols-2 gap-y-1 items-center'>{children}</div>
	);
};

export default DataGrid;

interface DataGridEntryProps {
	label: string | React.ReactNode;
	children: React.ReactNode;
	justify?: boolean;
}

export const DataGridEntry = ({
	label,
	justify,
	children,
}: DataGridEntryProps) => {
	return (
		<>
			<span className='relative top-[1px] uppercase text-stone-600'>
				{label}
			</span>
			<span
				className={`text-[17px] text-stone-800 ${
					justify ? 'justify-self-end' : ''
				}`}
			>
				{children}
			</span>
		</>
	);
};
