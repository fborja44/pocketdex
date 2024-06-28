import { formatId } from '../../utils/string';
import LeftArrow from '../../assets/sprites/ui/left-arrow.png';
import RightArrow from '../../assets/sprites/ui/right-arrow.png';
import Searchbar, { SearchbarProps } from '../Searchbar/Searchbar';
import { EntryData } from '../../types';
import { Pokemon } from 'pokenode-ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBaseRoute } from '../../utils/path';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';

interface DeviceHeaderLayoutProps {
	children: React.ReactNode;
}

export const DeviceHeaderLayout = ({ children }: DeviceHeaderLayoutProps) => {
	return (
		<AnimatePresence mode='wait'>
			<motion.section
				key='anim-header'
				// initial={{ y: -50 }} // Initial position above
				// animate={{ y: 0 }} // Final position (normal)
				// transition={{ duration: 0.2 }} // Animation duration
				className='relative -top-[8px] '
			>
				{children}
			</motion.section>
		</AnimatePresence>
	);
};

interface PageHeaderProps {
	minId?: string | number;
	maxId?: string | number;
	data?: EntryData;
	name?: string;
	iconSrc?: string;
}

interface SpeciesHeaderProps extends PageHeaderProps {
	data?: Pokemon;
}

const PageHeader = ({ minId, maxId, data, name }: SpeciesHeaderProps) => {
	return (
		<section className='flex flex-row items-start z-20 relative'>
			{data && (
				<BrowseButton
					disabled={data.id === minId}
					newId={data.id - 1}
					src={LeftArrow}
				/>
			)}
			<div className='container-col w-full items-start z-20'>
				{data && (
					<>
						<h1 className='text-2xl uppercase text-gray-700 leading-5'>
							{name ?? data.name ?? 'Loading'}
						</h1>
						<div className='text-md text-gray-500 leading-snug'>
							{formatId(data.id)}
						</div>
					</>
				)}
			</div>
			{data && (
				<BrowseButton
					disabled={data.id === maxId}
					newId={data.id + 1}
					src={RightArrow}
				/>
			)}
		</section>
	);
};

export default PageHeader;

interface DeviceHeaderProps extends PageHeaderProps {
	data: Exclude<EntryData, Pokemon>;
}

export const PageHeaderDevice = ({
	minId,
	maxId,
	data,
	name,
	iconSrc,
	handleSearch,
	placeholder,
}: DeviceHeaderProps & SearchbarProps) => {
	const { lang_code } = useSelector((state: AppState) => state.settingsState);

	// Get proper version of the name + language
	name =
		data?.names.find((entry: any) => entry.language.name === lang_code)?.name ??
		data?.names.find((entry: any) => entry.language.name === 'en')?.name ??
		name;

	return (
		<DeviceHeaderLayout>
			<Searchbar handleSearch={handleSearch} placeholder={placeholder} device />
			<DeviceBar
				minId={minId}
				maxId={maxId}
				data={data}
				name={name}
				iconSrc={iconSrc}
			/>
		</DeviceHeaderLayout>
	);
};

interface DeviceBarProps extends PageHeaderProps {
	simple?: boolean;
}

export const DeviceBar = ({
	simple,
	minId,
	maxId,
	data,
	name,
	iconSrc,
}: DeviceBarProps) => {
	return (
		<div className='container-row device-bg w-full h-[45px] border-b-2 border-dex box-content relative z-20'>
			<div className='flex flex-row items-center w-full px-2 '>
				{!simple && data && (
					<BrowseButton
						disabled={data.id === minId}
						newId={data.id - 1}
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
				{!simple && data && (
					<BrowseButton
						disabled={data.id === maxId}
						newId={data.id + 1}
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
	newId: number;
	disabled?: boolean;
}

const BrowseButton = ({ src, disabled, newId }: BrowseButtonProps) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const handleBrowse = () => {
		const baseRoute = getBaseRoute(pathname);
		navigate(`${baseRoute}/${newId}`);
	};

	return (
		<button
			className='disabled:opacity-20 hover:brightness-75 transition-all'
			disabled={disabled}
			onClick={handleBrowse}
		>
			<img src={src} className='h-5' />
		</button>
	);
};
