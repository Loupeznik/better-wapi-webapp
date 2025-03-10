/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { models_DeleteRowRequest } from '../models/models_DeleteRowRequest';
import type { models_DeleteRowRequestV2 } from '../models/models_DeleteRowRequestV2';
import type { models_Record } from '../models/models_Record';
import type { models_SaveRowRequest } from '../models/models_SaveRowRequest';
import type { models_SaveRowRequestV2 } from '../models/models_SaveRowRequestV2';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DomainService {
    /**
     * Commit DNS changes
     * @param domain Domain
     * @returns any OK
     * @throws ApiError
     */
    public static postV1DomainCommit(
        domain: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/domain/{domain}/commit',
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
     * Get all DNS records for a domain
     * @param domain Domain
     * @returns models_Record OK
     * @throws ApiError
     */
    public static getV1DomainInfo(
        domain: string,
    ): CancelablePromise<Array<models_Record>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/domain/{domain}/info',
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
     * @returns void
     * @throws ApiError
     */
    public static putV1DomainRecord(
        request: models_SaveRowRequest,
        domain: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/domain/{domain}/record',
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
     * @returns any Created
     * @throws ApiError
     */
    public static postV1DomainRecord(
        request: models_SaveRowRequest,
        domain: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/domain/{domain}/record',
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
    public static deleteV1DomainRecord(
        request: models_DeleteRowRequest,
        domain: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/domain/{domain}/record',
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
    public static getV1DomainInfo1(
        domain: string,
        subdomain: string,
    ): CancelablePromise<models_Record> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/domain/{domain}/{subdomain}/info',
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
    /**
     * Update an existing record
     * @param request Request body
     * @param domain Domain
     * @param id Record ID
     * @returns void
     * @throws ApiError
     */
    public static putV2DomainRecord(
        request: models_SaveRowRequestV2,
        domain: string,
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v2/domain/{domain}/record/{id}',
            path: {
                'domain': domain,
                'id': id,
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
     * @param id Record ID
     * @returns void
     * @throws ApiError
     */
    public static deleteV2DomainRecord(
        request: models_DeleteRowRequestV2,
        domain: string,
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v2/domain/{domain}/record/{id}',
            path: {
                'domain': domain,
                'id': id,
            },
            body: request,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
}
