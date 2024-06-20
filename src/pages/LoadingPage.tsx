import { motion } from 'framer-motion';
import LogoAlt from '../assets/sprites/ui/logo-alt.png';

const LoadingPage = () => {
	return (
		<div className='flex grow flex-col items-center justify-center pb-4'>
			<motion.img
				src={LogoAlt}
				animate={{ rotate: 360 }} // Full rotation
				transition={{
					repeat: Infinity,
					repeatType: 'loop',
					duration: 2, // Shorter duration for smoother spin
					type: 'spring',
					stiffness: 100, // Controls the bounce and smoothness
					damping: 100, // Reduces the oscillation for smooth motion
				}}
				className='w-12 h-12'
			/>
		</div>
	);
};

export default LoadingPage;
