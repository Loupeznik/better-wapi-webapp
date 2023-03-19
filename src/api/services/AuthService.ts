/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { models_Login } from '../models/models_Login';
import type { models_TokenResponse } from '../models/models_TokenResponse';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Get token
     * @param request Request body
     * @returns models_TokenResponse OK
     * @throws ApiError
     */
    public static postAuthToken(
request: models_Login,
): CancelablePromise<models_TokenResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/token',
            body: request,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }

}
