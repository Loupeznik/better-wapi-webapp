/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { models_RecordType } from './models_RecordType';

export type models_SaveRowRequestV2 = {
    autocommit?: boolean;
    data: string;
    ttl?: number;
    type?: models_RecordType;
};
