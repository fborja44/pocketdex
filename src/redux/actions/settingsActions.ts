import { createAction } from '@reduxjs/toolkit';

export const setLanguage = createAction('SET_LANGUAGE', (lang_code: string) => {
	return {
		payload: lang_code,
	};
});
