'use client';

import {useEffect, useState} from 'react';
import {motion, Variants} from 'framer-motion';
import {getUserStreakData} from '@/lib/actions/companion.actions';

function StreakCounter({userId, className}: StreakCounterProps) {
	const containerVariants: Variants = {
		hidden: {opacity: 0, y: 20},
		visible: {
			opacity: 1,
			y: 0,
			transition: {duration: 0.6, staggerChildren: 0.1},
		},
	};

	const itemVariants: Variants = {
		hidden: {opacity: 0, scale: 0.8},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {duration: 0.4},
		},
	};

	const flameVariants: Variants = {
		active: {
			scale: [1, 1.1, 1],
			rotate: [0, 2, -2, 0],
			transition: {duration: 2, repeat: Infinity, ease: 'easeInOut'},
		},
		inactive: {scale: 1, rotate: 0},
	};

	const [streakData, setStreakData] = useState<StreakData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const getStreakMessage = (currentStreak: number, isActiveToday: boolean): string => {
		if (currentStreak === 0) return 'Start your learning streak!';
		if (currentStreak === 1) return isActiveToday ? 'Great start! Keep it up!' : 'Come back tomorrow to continue!';
		if (currentStreak < 7) return `${currentStreak} days strong! 🔥`;
		if (currentStreak < 30) return `Amazing ${currentStreak}-day streak! 🔥🔥`;
		return `Incredible ${currentStreak}-day streak! 🔥🔥🔥`;
	};

	const getFlameColor = (isActive: boolean): string => isActive ? '#FF6B35' : '#94A3B8';

	useEffect(() => {
		const fetchStreakData = async () => {
			try {
				setLoading(true);
				const data: StreakData = await getUserStreakData(userId);
				setStreakData(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to load streak data');
			} finally {
				setLoading(false);
			}
		}

		fetchStreakData();
	}, [userId]);

	if (loading) {
		return (
			<div className={`w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 ${className || ''}`}>
				<div className={'animate-pulse'}>
					<div className={'h-4 bg-gray-300 rounded w-1/3 mb-4'}/>
					<div className={'h-8 bg-gray-300 rounded w-1/2 mb-2'}/>
					<div className={'h-4 bg-gray-300 rounded w-2/3'}/>
				</div>
			</div>
		);
	}

	if (error || !streakData) {
		return (
			<div className={`w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 ${className || ''}`}>
				<p className={'text-red-500 text-center'}>Unable to load streak data</p>
			</div>
		);
	}

	return (
		<motion.div className={`w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 ${className || ''}`} variants={containerVariants} initial={'hidden'} animate={'visible'}>
			{/* Header */}
			<motion.div className={'flex items-center gap-3 mb-4'} variants={itemVariants}>
				<motion.div variants={flameVariants} animate={streakData.currentStreak > 0 ? 'active' : 'inactive'}>
					<svg width={'32'} height={'32'} viewBox={'0 0 24 24'} fill={'none'} xmlns={'http://www.w3.org/2000/svg'}>
						<path
							d={'M12 2C12 2 17 7 17 12C17 15.866 14.866 19 11 19C7.134 19 5 15.866 5 12C5 7 10 2 12 2Z'}
							fill={getFlameColor(streakData.currentStreak > 0)}
							stroke={getFlameColor(streakData.currentStreak > 0)}
							strokeWidth={'1.5'} strokeLinecap={'round'} strokeLinejoin={'round'}
						/>
						<path
							d={'M12 19C12 19 14 17 14 15C14 13.134 12.866 12 11 12C9.134 12 8 13.134 8 15C8 17 10 19 12 19Z'}
							fill={'#fbbf24'} stroke={'#fbbf24'}
							strokeWidth={'1.5'} strokeLinecap={'round'} strokeLinejoin={'round'}
						/>
					</svg>
				</motion.div>
				<h3 className={'text-xl font-bold text-gray-800'}>Learning Streak</h3>
			</motion.div>

			{/* Current Streak */}
			<motion.div className={'text-center mb-4'} variants={itemVariants}>
				<motion.div className={'text-4xl font-bold mb-2'} style={{color: streakData.currentStreak > 0 ? '#FF6B35' : '#94A3B8'}} animate={{scale: streakData.isActiveToday ? [1, 1.05, 1] : 1}}
				            transition={{duration: 2, repeat: streakData.isActiveToday ? Infinity : 0}}>
					{streakData.currentStreak}
				</motion.div>
				<p className={'text-lg text-gray-700'}>{streakData.currentStreak === 1 ? 'day' : 'days'}</p>
			</motion.div>

			{/* Streak Message */}
			<motion.div className={'text-center mb-4'} variants={itemVariants}>
				<p className={'text-gray-700 font-medium'}>{getStreakMessage(streakData.currentStreak, streakData.isActiveToday)}</p>
			</motion.div>

			{/* Stats Row */}
			<motion.div className={'flex justify-between items-center pt-4 border-t border-white/20'} variants={itemVariants}>
				<div className={'text-center'}>
					<p className={'text-2xl font-bold text-primary'}>{streakData.longestStreak}</p>
					<p className={'text-sm text-gray-600'}>Best Streak</p>
				</div>
				<div className={'text-center'}>
					<p className={'text-2xl font-bold'} style={{color: streakData.isActiveToday ? '#22C55E' : '#94A3B8'}}>{streakData.isActiveToday ? '✓' : '○'}</p>
					<p className={'text-sm text-gray-600'}>Today</p>
				</div>
				<div className={'text-center'}>
					<p className={'text-2xl font-bold text-gray-700'}>
						{streakData.lastActivityDate ? new Date(streakData.lastActivityDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'}) : '—'}
					</p>
					<p className={'text-sm text-gray-600'}>Last Session</p>
				</div>
			</motion.div>
		</motion.div>
	);
}

export {StreakCounter};
