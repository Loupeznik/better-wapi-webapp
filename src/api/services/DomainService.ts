/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { models_DeleteRowRequest } from '../models/models_DeleteRowRequest';
import type { models_Record } from '../models/models_Record';
import type { models_SaveRowRequest } from '../models/models_SaveRowRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DomainService {

    /**
     * Get all DNS records for a domain
     * @param domain Domain
     * @returns models_Record OK
     * @throws ApiError
     */
    public static getDomainInfo(
domain: string,
): CancelablePromise<Array<models_Record>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/domain/{domain}/info',
            path: {
                'domain': domain,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                409: `Conflict`,
                429: `Too Many Requests`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Update an existing record
     * @param request Request body
     * @param domain Domain
     * @returns any OK
     * @throws ApiError
     */
    public static putDomainRecord(
request: models_SaveRowRequest,
domain: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/domain/{domain}/record',
            path: {
                'domain': domain,
            },
            body: request,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                409: `Conflict`,
                429: `Too Many Requests`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create a new record
     * @param request Request body
     * @param domain Domain
     * @returns any OK
     * @throws ApiError
     */
    public static postDomainRecord(
request: models_SaveRowRequest,
domain: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/domain/{domain}/record',
            path: {
                'domain': domain,
            },
            body: request,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                409: `Conflict`,
                429: `Too Many Requests`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Delete an existing record
     * @param request Request body
     * @param domain Domain
     * @returns any OK
     * @throws ApiError
     */
    public static deleteDomainRecord(
request: models_DeleteRowRequest,
domain: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/domain/{domain}/record',
            path: {
                'domain': domain,
            },
            body: request,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                409: `Conflict`,
                429: `Too Many Requests`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Get DNS record for a specific subdomain
     * @param domain Domain
     * @param subdomain Subdomain
     * @returns models_Record OK
     * @throws ApiError
     */
    public static getDomainInfo1(
domain: string,
subdomain: string,
): CancelablePromise<models_Record> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/domain/{domain}/{subdomain}/info',
            path: {
                'domain': domain,
                'subdomain': subdomain,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                409: `Conflict`,
                429: `Too Many Requests`,
                500: `Internal Server Error`,
            },
        });
    }

}
