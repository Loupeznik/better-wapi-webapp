import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { models_Domain } from "../models/models_Domain";
export class DomainsService {
	/**
	 * Get list of all domains
	 * @returns models_Domain OK
	 * @throws ApiError
	 */
	public static getV2Domains(): CancelablePromise<Array<models_Domain>> {
		return __request(OpenAPI, {
			method: "GET",
			url: "/v2/domains",
			errors: {
				401: `Unauthorized`,
				500: `Internal Server Error`,
			},
		});
	}
}
