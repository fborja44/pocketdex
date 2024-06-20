import { formatId } from '../../utils/string';
import LeftArrow from '../../assets/sprites/ui/left-arrow.png';
import RightArrow from '../../assets/sprites/ui/right-arrow.png';
import { SearchbarDevice, SearchbarProps } from '../Searchbar/Searchbar';
import { EntryData } from '../../types';
import { Pokemon } from 'pokenode-ts';

interface PageHeaderProps {
	id: string | number;
	minId?: string | number;
	maxId?: string | number;
	data: EntryData | null;
	name?: string;
	iconSrc?: string;
	handlePrev?: () => void;
	handleNext?: () => void;
}

interface SpeciesHeaderProps extends PageHeaderProps {
	data: Pokemon;
}

const PageHeader = ({
	id,
	minId,
	maxId,
	data,
	name,
	handlePrev,
	handleNext,
}: SpeciesHeaderProps) => {
	return (
		<section className='flex flex-row items-start'>
			<BrowseButton
				disabled={id === minId}
				handleClick={handlePrev}
				src={LeftArrow}
			/>
			<div className='container-col w-full items-start z-20'>
				{data && (
					<>
						<h1 className='text-2xl uppercase text-gray-700 leading-5'>
							{name ?? data.name ?? 'Unknown'}
						</h1>
						<div className='text-md text-gray-500 leading-snug'>
							{formatId(data.id)}
						</div>
					</>
				)}
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

interface DeviceHeaderProps extends PageHeaderProps {
	data: Exclude<EntryData, Pokemon> | null;
}

interface PageHeaderLayoutProps {
	children: React.ReactNode;
}

export const PageHeaderLayout = ({ children }: PageHeaderLayoutProps) => {
	return <section className='relative -top-[8px] '>{children}</section>;
};

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
}: DeviceHeaderProps & SearchbarProps) => {
	name = data?.names.find((entry: any) => entry.language.name === 'en')?.name;

	return (
		<PageHeaderLayout>
			<SearchbarDevice handleSearch={handleSearch} placeholder={placeholder} />
			<DeviceBar
				id={id}
				minId={minId}
				maxId={maxId}
				data={data}
				name={name}
				iconSrc={iconSrc}
				handlePrev={handlePrev}
				handleNext={handleNext}
			/>
		</PageHeaderLayout>
	);
};

interface DeviceBarProps extends PageHeaderProps {
	simple?: boolean;
}

export const DeviceBar = ({
	simple,
	id,
	minId,
	maxId,
	data,
	name,
	iconSrc,
	handlePrev,
	handleNext,
}: DeviceBarProps) => {
	return (
		<div className='container-row device-bg w-full h-[45px] border-b-2 border-dex box-content relative'>
			<div className='flex flex-row items-center w-full px-2 '>
				{!simple && (
					<BrowseButton
						disabled={id === minId}
						handleClick={handlePrev}
						src={LeftArrow}
					/>
				)}
				<div className='container-col w-full items-start z-20'>
					<>
						<h1 className='relative container-row text-2xl uppercase text-white leading-5'>
							{!simple && data && (
								<span className='text-base text-stone-400 mr-2'>
									{formatId(data.id)}:
								</span>
							)}
							<span>{name ?? data?.name ?? 'Loading'}</span>
							{iconSrc && (
								<img src={iconSrc} className='right-0 w-8 h-8 ml-1' alt='' />
							)}
						</h1>
					</>
				</div>
				{!simple && (
					<BrowseButton
						disabled={id === maxId}
						handleClick={handleNext}
						src={RightArrow}
					/>
				)}
			</div>
			<span className='bg-device-200 h-[2px] w-full absolute -bottom-[4px]' />
		</div>
	);
};

interface BrowseButtonProps {
	src: string;
	handleClick?: () => void;
	disabled?: boolean;
}

const BrowseButton = ({ src, disabled, handleClick }: BrowseButtonProps) => {
	return (
		<button
			className='disabled:opacity-20 hover:brightness-75 transition-all'
			disabled={disabled || !handleClick}
			onClick={handleClick}
		>
			<img src={src} className='h-5' />
		</button>
	);
};
