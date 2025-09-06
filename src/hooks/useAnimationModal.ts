'use client';

import {useState, useCallback} from 'react';
import {AnimationModalState} from '@/types/companion';

function useAnimationModal() {
	const [modalState, setModalState] = useState<AnimationModalState>({isOpen: false, type: 'loading'});

	const showLoading = useCallback((message?: string) => {
		setModalState({isOpen: true, type: 'loading', message});
	}, []);

	const showSuccess = useCallback((title?: string, message?: string) => {
		setModalState({isOpen: true, type: 'success', title, message});
	}, []);

	const showError = useCallback((title?: string, message?: string) => {
		setModalState({isOpen: true, type: 'error', title, message});
	}, []);

	const close = useCallback(() => {
		setModalState(prev => ({...prev, isOpen: false}));
	}, []);

	const hide = useCallback(() => {
		setModalState(prev => ({...prev, isOpen: false}));
	}, []);

	return {modalState, showLoading, showSuccess, showError, close, hide};
}

export {useAnimationModal};
