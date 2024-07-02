import useAudio from '../../hooks/useAudio';
import { Gender } from '../../types';

interface GenderButtonProps {
	disabled: boolean;
	value: Gender;
	setValue: React.Dispatch<React.SetStateAction<Gender>>;
}

const GenderButton = ({ disabled, value, setValue }: GenderButtonProps) => {
	if (value === 'genderless') return <span />;

	return value === 'male' ? (
		<CustomButton
			disabled={disabled}
			color='text-cyan-400'
			onClick={() => {
				setValue('female');
			}}
		>
			♂
		</CustomButton>
	) : (
		<CustomButton
			disabled={disabled}
			color='text-red-500'
			onClick={() => {
				setValue('male');
			}}
		>
			♀
		</CustomButton>
	);
};

interface CustomButtonProps {
	children: React.ReactNode;
	color: string;
	disabled: boolean;
	onClick: () => void;
}

const CustomButton = ({
	children,
	disabled,
	color,
	onClick,
}: CustomButtonProps) => {
	const { playAudio } = useAudio('/assets/audio/sparkle.wav');

	return (
		<button
			disabled={disabled}
			onClick={() => {
				onClick();
				playAudio();
			}}
			className={`${color} shadow-button text-3xl leading-[20px] hover:brightness-90 disabled:hover:brightness-100`}
		>
			{children}
		</button>
	);
};

export default GenderButton;
