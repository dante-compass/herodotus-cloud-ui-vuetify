import { Conditions, AbstractEntity, AbstractAuditEntity } from '@herodotus/core';
export interface Characteristic {
    identifier: string;
    name: string;
}
export interface Specification<T> extends Characteristic {
    dataType: T;
}
type NumberSpecs = {
    unit?: string;
    unitName?: string;
    min: string;
    max: string;
    step: string;
};
export type IntegerSpecs = {
    type: 'int';
    specs: NumberSpecs;
};
export type FloatSpecs = {
    type: 'float';
    specs: NumberSpecs;
};
export type DoubleSpecs = {
    type: 'double';
    specs: NumberSpecs;
};
export type TextSpecs = {
    type: 'text';
    specs: {
        length: string;
    };
};
export type DateSpecs = {
    type: 'date';
    specs: {};
};
export type BoolSpecs = {
    type: 'bool';
    specs: {
        '0': string;
        '1': string;
    };
};
export type EnumSpecs = {
    type: 'enum';
    specs: Record<string, string>;
};
export type StructSpecs = {
    type: 'struct';
    specs: Array<Specification<Specs>>;
};
export type Specs = IntegerSpecs | FloatSpecs | DoubleSpecs | TextSpecs | DateSpecs | BoolSpecs | EnumSpecs | StructSpecs;
export interface TslUnitEntity extends AbstractEntity {
    id: string;
    name: string;
    symbol: string;
}
interface AbstractTslArgument extends AbstractAuditEntity, Characteristic {
    type: string;
    specs: Specification<Specs>;
}
export interface TslArgumentEntity extends AbstractTslArgument {
    id: string;
    output: boolean;
}
export interface TslFunctionEntity extends AbstractTslArgument {
    id: string;
    productId: string;
    productKey: string;
    dimension: string;
    accessMode: string;
    eventType: string;
    callType: string;
    required: boolean;
    correlationId: string;
    method: string;
    description: string;
    arguments: Array<TslArgumentEntity>;
}
export interface TslUnitConditions extends Conditions {
}
export interface TslArgumentConditions extends Conditions {
}
export interface TslFunctionConditions extends Conditions {
    productId: string;
}
export type TslUnitProps = keyof TslUnitEntity;
export type TslArgumentProps = keyof TslArgumentEntity;
export type TslFunctionProps = keyof TslFunctionEntity;
export {};
