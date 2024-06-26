import { Type } from '../../types';

interface TypeLabelProps {
	type: Type;
}

const TypeLabel = ({ type }: TypeLabelProps) => {
	return <img src={`/assets/img/types/${type}.png`} alt='' className='w-11' />;
};

export default TypeLabel;
