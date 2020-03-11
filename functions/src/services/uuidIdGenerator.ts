import { IdGeneratorGateway } from "../business/gateways/services/idGeneratorGateway";

import { v4 as uuidv4 } from 'uuid';

export class UuidIdGenerator implements IdGeneratorGateway {
    generate(): string {
        return uuidv4();
    }
}