import { createAsyncThunk } from '@reduxjs/toolkit';
import type { models_Login } from '../../../api';
import { getToken } from '../../../helpers/SecurityHelpers';

const typePrefix = 'user/loginUser';

export const loginUser = createAsyncThunk(typePrefix, async (params: { credentials: models_Login }) => {
	const result = await getToken(params.credentials);

	return result.token;
});
