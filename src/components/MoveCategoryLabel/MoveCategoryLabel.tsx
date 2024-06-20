import { MoveCategory } from '../../types';

interface MoveCategoryLabelProps {
	category: MoveCategory;
}

const MoveCategoryLabel = ({ category }: MoveCategoryLabelProps) => {
	return (
		<img src={`/assets/img/moves/${category}.png`} alt='' className='w-11' />
	);
};

export default MoveCategoryLabel;
