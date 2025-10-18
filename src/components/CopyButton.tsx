'use client';

import {useState} from 'react';
import {copyCompanionLink} from '@/lib/share';

function CopyButton({companionId, className}: CopyButtonProps) {
	const [isCopying, setIsCopying] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	const handleCopy = async () => {
		setIsCopying(true);
		setMessage(null);

		const result = await copyCompanionLink(companionId);

		setMessage(result.message);
		setIsCopying(false);

		if (result.success) {
			setTimeout(() => setMessage(null), 2000);
		}
	}

	return (
		<div className={`relative ${className || ''}`}>
			<button onClick={handleCopy} disabled={isCopying}
			        className={'px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium cursor-pointer'}
			        aria-label={'Copy companion link'}>
				{isCopying ? 'Copying...' : 'Copy Link'}
			</button>

			{message && (
				<div className={'absolute top-full mt-2 left-0 right-0 bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10'}>{message}</div>
			)}
		</div>
	);
}

export {CopyButton};
