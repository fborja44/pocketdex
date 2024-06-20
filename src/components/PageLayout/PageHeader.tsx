import { Ability, Item, Move, Pokemon } from 'pokenode-ts';
import { formatId } from '../../utils/string';
import LeftArrow from '../../assets/sprites/ui/left-arrow.png';
import RightArrow from '../../assets/sprites/ui/right-arrow.png';
import { SearchbarDevice, SearchbarProps } from '../Searchbar/Searchbar';

interface PageHeaderProps {
	id: string | number;
	minId: string | number;
	maxId: string | number;
	data: Pokemon | Ability | Move | Item;
	name?: string;
	iconSrc?: string;
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

export const PageHeaderDevice = ({
	id,
	minId,
	maxId,
	data,
	name,
	iconSrc,
	handlePrev,
	handleNext,
	handleSearch,
	placeholder,
}: PageHeaderProps & SearchbarProps) => {
	return (
		<section className='relative -top-[8px] '>
			<SearchbarDevice handleSearch={handleSearch} placeholder={placeholder} />
			<div className='container-row device-bg w-full h-[45px] border-b-2 border-dex box-content relative'>
				<div className='flex flex-row items-center w-full px-2 '>
					<BrowseButton
						disabled={id === minId}
						handleClick={handlePrev}
						src={LeftArrow}
					/>
					<div className='container-col w-full items-start z-20'>
						<h1 className='relative container-row text-2xl uppercase text-white leading-5'>
							<span className='text-base text-stone-400 mr-3'>#{data.id}:</span>
							<span>{name ?? data.name ?? 'Unknown'}</span>
							{iconSrc && (
								<img src={iconSrc} className='right-0 w-8 h-8 ml-1' alt='' />
							)}
						</h1>
					</div>
					<BrowseButton
						disabled={id === maxId}
						handleClick={handleNext}
						src={RightArrow}
					/>
				</div>
				<span className='bg-device-200 h-[2px] w-full absolute -bottom-[4px]'></span>
			</div>
		</section>
	);
};

interface BrowseButtonProps {
	src: string;
	handleClick: () => void;
	disabled?: boolean;
}

const BrowseButton = ({ src, disabled, handleClick }: BrowseButtonProps) => {
	return (
		<button
			className='disabled:opacity-20 hover:brightness-75 transition-all'
			disabled={disabled}
			onClick={handleClick}
		>
			<img src={src} className='h-5' />
		</button>
	);
};
