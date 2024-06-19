import { Ability, Item, Move, Pokemon } from 'pokenode-ts';
import { formatId } from '../../utils/string';
import LeftArrow from '../../assets/sprites/ui/left-arrow.png';
import RightArrow from '../../assets/sprites/ui/right-arrow.png';

interface PageHeaderProps {
	id: string | number;
	minId: string | number;
	maxId: string | number;
	data: Pokemon | Ability | Move | Item;
	name?: string;
	handlePrev: () => void;
	handleNext: () => void;
}

const PageHeader = ({
	id,
	minId,
	maxId,
	data,
	name,
	handlePrev,
	handleNext,
}: PageHeaderProps) => {
	return (
		<section className='flex flex-row items-start'>
			<BrowseButton
				disabled={id === minId}
				handleClick={handlePrev}
				src={LeftArrow}
			/>
			<div className='container-col w-full items-start z-20'>
				<h1 className='text-2xl uppercase text-gray-700 leading-5'>
					{name ?? data.name ?? 'Unknown'}
				</h1>
				<div className='text-md text-gray-500 leading-snug'>
					{formatId(data.id)}
				</div>
			</div>
			<BrowseButton
				disabled={id === maxId}
				handleClick={handleNext}
				src={RightArrow}
			/>
		</section>
	);
};

export default PageHeader;

interface BrowseButtonProps {
	src: string;
	handleClick: () => void;
	disabled?: boolean;
}

const BrowseButton = ({ src, disabled, handleClick }: BrowseButtonProps) => {
	return (
		<button
			className='disabled:opacity-50 hover:brightness-90 transition-all'
			disabled={disabled}
			onClick={handleClick}
		>
			<img src={src} className='h-5' />
		</button>
	);
};
