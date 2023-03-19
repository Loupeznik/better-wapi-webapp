/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { models_RecordType } from './models_RecordType';

export type models_SaveRowRequest = {
    autocommit?: boolean;
    data: string;
    subdomain: string;
    ttl?: number;
    type?: models_RecordType;
};
