/**
 * Generates a shareable URL for a companion
 */
export const generateCompanionUrl = (companionId: string): string => {
	if (typeof window === 'undefined') return '';

	const baseUrl = window.location.origin;
	return `${baseUrl}/companions/${companionId}`;
}

/**
 * Copies the companion link to clipboard
 */
export const copyCompanionLink = async (companionId: string): Promise<ShareResult> => {
	try {
		const url = generateCompanionUrl(companionId);

		if (navigator.clipboard && navigator.clipboard.writeText) {
			await navigator.clipboard.writeText(url);
			return {success: true, message: 'Link copied!'};
		} else {
			const textArea = document.createElement('textarea');
			textArea.value = url;
			textArea.style.position = 'fixed';
			textArea.style.left = '-999999px';
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();

			try {
				document.execCommand('copy');
				document.body.removeChild(textArea);
				return {success: true, message: 'Link copied!'};
			} catch (error: any) {
				document.body.removeChild(textArea);
				return {success: false, message: 'Failed to copy link'};
			}
		}
	} catch (error: any) {
		return {success: false, message: 'Failed to copy link'};
	}
}
