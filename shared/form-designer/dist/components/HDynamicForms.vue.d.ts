import { PropType } from 'vue';
import { FormDesignerResources, DynamicFormEntity } from '../declarations';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    instance: {
        type: PropType<FormDesignerResources>;
        required: true;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    container: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    item: {
        type: PropType<DynamicFormEntity>;
        default: () => {};
    };
}>, {
    leftDrawerOpen: import('vue').Ref<boolean, boolean>;
    toggleLeftDrawer(): void;
    rightDrawerOpen: import('vue').Ref<boolean, boolean>;
    toggleRightDrawer(): void;
    openPreview: import('vue').Ref<boolean, boolean>;
    openUpload: import('vue').Ref<boolean, boolean>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "close"[], "close", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    instance: {
        type: PropType<FormDesignerResources>;
        required: true;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    container: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    item: {
        type: PropType<DynamicFormEntity>;
        default: () => {};
    };
}>> & Readonly<{
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    title: string;
    item: DynamicFormEntity;
    container: boolean;
    height: string;
}, {}, {
    HWidgetPanel: import('vue').DefineComponent<{}, {
        widgetGroups: import('@herodotus/form-apis').WidgetDefinition[];
        cloneWidget: (widget: import('../declarations').Widget) => import('../declarations').Element;
        addWidget: (widget: import('../declarations').Widget) => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        Draggable: import('vue').DefineComponent<{
            list: {
                type: ArrayConstructor;
                required: boolean;
                default: any;
            };
            modelValue: {
                type: ArrayConstructor;
                required: boolean;
                default: any;
            };
            itemKey: {
                type: (FunctionConstructor | StringConstructor)[];
                required: boolean;
            };
            clone: {
                type: FunctionConstructor;
                default: (original: any) => any;
            };
            tag: {
                type: StringConstructor;
                default: string;
            };
            move: {
                type: FunctionConstructor;
                default: any;
            };
            componentData: {
                type: ObjectConstructor;
                required: boolean;
                default: any;
            };
        }, unknown, {
            error: boolean;
        }, {
            realList(): any;
            getKey(): any;
        }, {
            getUnderlyingVm(domElement: any): any;
            getUnderlyingPotencialDraggableComponent(htmElement: any): any;
            emitChanges(evt: any): void;
            alterList(onList: any): void;
            spliceList(): void;
            updatePosition(oldIndex: any, newIndex: any): void;
            getRelatedContextFromMoveEvent({ to, related }: {
                to: any;
                related: any;
            }): any;
            getVmIndexFromDomIndex(domIndex: any): any;
            onDragStart(evt: any): void;
            onDragAdd(evt: any): void;
            onDragRemove(evt: any): void;
            onDragUpdate(evt: any): void;
            computeFutureIndex(relatedContext: any, evt: any): any;
            onDragMove(evt: any, originalEvent: any): any;
            onDragEnd(): void;
        }, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, any[], any, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<{
            move: Function;
            tag: string;
            clone: Function;
            list: unknown[];
            modelValue: unknown[];
            componentData: Record<string, any>;
        } & {
            itemKey?: string | Function;
        }>, {
            move: Function;
            tag: string;
            clone: Function;
            list: unknown[];
            modelValue: unknown[];
            componentData: Record<string, any>;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HPropertyPanel: import('vue').DefineComponent<{}, {
        formTab: import('vue').Ref<string, string>;
        elementTab: import('vue').Ref<string, string>;
        isInformationPanel: import('vue').ComputedRef<boolean>;
        currentSchema: import('vue').ComputedRef<import('../declarations').Schema>;
        currentPanel: import('vue').ComputedRef<string>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HSheetPanel: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
            HConditionVariable: import('vue').DefineComponent<{}, {
                tableColumns: {
                    name: string;
                    label: string;
                    field: string | ((row: any) => any);
                    required?: boolean;
                    align?: "left" | "right" | "center";
                    sortable?: boolean;
                    sort?: (a: any, b: any, rowA: any, rowB: any) => number;
                    rawSort?: (a: any, b: any, rowA: any, rowB: any) => number;
                    sortOrder?: "ad" | "da";
                    format?: (val: any, row: any) => any;
                    style?: string | ((row: any) => string);
                    classes?: string | ((row: any) => string);
                    headerStyle?: string;
                    headerClasses?: string;
                }[];
                tableRows: import('vue').Ref<import('../declarations').QBaseDataItem<boolean>[], import('../declarations').QBaseDataItem<boolean>[]>;
                condition: import('../declarations').ConditionVariable;
                onModify: () => void;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
                HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                    headerClass: {
                        type: StringConstructor;
                        default: string;
                    };
                }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                    headerClass: {
                        type: StringConstructor;
                        default: string;
                    };
                }>> & Readonly<{}>, {
                    headerClass: string;
                }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
                HTextField: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
                    modelValue: {
                        type: (StringConstructor | NumberConstructor)[];
                    };
                }>, {
                    text: globalThis.WritableComputedRef<string | number | undefined, string | number | undefined>;
                }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, any, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HFormInformation: import('vue').DefineComponent<{}, {
            id: string;
            name: string;
            activityName: string;
            nameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
            activityNameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
            validate: () => boolean;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        DATE_PICKER: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            schema: {
                type: PropType<import('../declarations').Schema>;
                required: true;
            };
        }>, {
            ATTRIBUTES: {
                HideBottomSpace: string;
                ItemAligned: string;
            };
            properties: import('vue').ComputedRef<Record<string, any>>;
            models: import('vue').ComputedRef<Record<string, import('@herodotus/form-apis').VModel>>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            schema: {
                type: PropType<import('../declarations').Schema>;
                required: true;
            };
        }>> & Readonly<{}>, {}, {}, {
            HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                headerClass: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                headerClass: {
                    type: StringConstructor;
                    default: string;
                };
            }>> & Readonly<{}>, {
                headerClass: string;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HSwitch: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
                modelValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                trueValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                falseValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                color: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {
                switchValue: globalThis.WritableComputedRef<string | number | boolean, string | number | boolean>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, any, {
                color: string;
                modelValue: string | number | boolean;
                trueValue: string | number | boolean;
                falseValue: string | number | boolean;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HTextField: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
                modelValue: {
                    type: (StringConstructor | NumberConstructor)[];
                };
            }>, {
                text: globalThis.WritableComputedRef<string | number | undefined, string | number | undefined>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, any, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        PASSWORD: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            schema: {
                type: PropType<import('../declarations').Schema>;
                required: true;
            };
        }>, {
            ATTRIBUTES: {
                HideBottomSpace: string;
                ItemAligned: string;
            };
            properties: import('vue').ComputedRef<Record<string, any>>;
            models: import('vue').ComputedRef<Record<string, import('@herodotus/form-apis').VModel>>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            schema: {
                type: PropType<import('../declarations').Schema>;
                required: true;
            };
        }>> & Readonly<{}>, {}, {}, {
            HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                headerClass: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                headerClass: {
                    type: StringConstructor;
                    default: string;
                };
            }>> & Readonly<{}>, {
                headerClass: string;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HSwitch: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
                modelValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                trueValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                falseValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                color: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {
                switchValue: globalThis.WritableComputedRef<string | number | boolean, string | number | boolean>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, any, {
                color: string;
                modelValue: string | number | boolean;
                trueValue: string | number | boolean;
                falseValue: string | number | boolean;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HTextField: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
                modelValue: {
                    type: (StringConstructor | NumberConstructor)[];
                };
            }>, {
                text: globalThis.WritableComputedRef<string | number | undefined, string | number | undefined>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, any, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        TEXT_AREA: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            schema: {
                type: PropType<import('../declarations').Schema>;
                required: true;
            };
        }>, {
            ATTRIBUTES: {
                HideBottomSpace: string;
                ItemAligned: string;
            };
            properties: import('vue').ComputedRef<Record<string, any>>;
            models: import('vue').ComputedRef<Record<string, import('@herodotus/form-apis').VModel>>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            schema: {
                type: PropType<import('../declarations').Schema>;
                required: true;
            };
        }>> & Readonly<{}>, {}, {}, {
            HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                headerClass: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                headerClass: {
                    type: StringConstructor;
                    default: string;
                };
            }>> & Readonly<{}>, {
                headerClass: string;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HSwitch: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
                modelValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                trueValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                falseValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                color: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {
                switchValue: globalThis.WritableComputedRef<string | number | boolean, string | number | boolean>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, any, {
                color: string;
                modelValue: string | number | boolean;
                trueValue: string | number | boolean;
                falseValue: string | number | boolean;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HTextField: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
                modelValue: {
                    type: (StringConstructor | NumberConstructor)[];
                };
            }>, {
                text: globalThis.WritableComputedRef<string | number | undefined, string | number | undefined>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, any, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        TEXT_FIELD: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            schema: {
                type: PropType<import('../declarations').Schema>;
                required: true;
            };
        }>, {
            ATTRIBUTES: {
                HideBottomSpace: string;
                ItemAligned: string;
            };
            properties: import('vue').ComputedRef<Record<string, any>>;
            models: import('vue').ComputedRef<Record<string, import('@herodotus/form-apis').VModel>>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            schema: {
                type: PropType<import('../declarations').Schema>;
                required: true;
            };
        }>> & Readonly<{}>, {}, {}, {
            HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                headerClass: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                headerClass: {
                    type: StringConstructor;
                    default: string;
                };
            }>> & Readonly<{}>, {
                headerClass: string;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HSwitch: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
                modelValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                trueValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                falseValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                color: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {
                switchValue: globalThis.WritableComputedRef<string | number | boolean, string | number | boolean>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, any, {
                color: string;
                modelValue: string | number | boolean;
                trueValue: string | number | boolean;
                falseValue: string | number | boolean;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HTextField: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
                modelValue: {
                    type: (StringConstructor | NumberConstructor)[];
                };
            }>, {
                text: globalThis.WritableComputedRef<string | number | undefined, string | number | undefined>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, any, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        TIME_PICKER: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            schema: {
                type: PropType<import('../declarations').Schema>;
                required: true;
            };
        }>, {
            ATTRIBUTES: {
                HideBottomSpace: string;
                ItemAligned: string;
            };
            properties: import('vue').ComputedRef<Record<string, any>>;
            models: import('vue').ComputedRef<Record<string, import('@herodotus/form-apis').VModel>>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            schema: {
                type: PropType<import('../declarations').Schema>;
                required: true;
            };
        }>> & Readonly<{}>, {}, {}, {
            HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                headerClass: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                headerClass: {
                    type: StringConstructor;
                    default: string;
                };
            }>> & Readonly<{}>, {
                headerClass: string;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HSwitch: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
                modelValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                trueValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                falseValue: {
                    type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
                    default: boolean;
                };
                color: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {
                switchValue: globalThis.WritableComputedRef<string | number | boolean, string | number | boolean>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, any, {
                color: string;
                modelValue: string | number | boolean;
                trueValue: string | number | boolean;
                falseValue: string | number | boolean;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HTextField: import('vue').DefineComponent<globalThis.ExtractPropTypes<{
                modelValue: {
                    type: (StringConstructor | NumberConstructor)[];
                };
            }>, {
                text: globalThis.WritableComputedRef<string | number | undefined, string | number | undefined>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, any, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HCanvasContainer: import('vue').DefineComponent<{}, {
        isEmptyCanvas: import('vue').ComputedRef<boolean>;
        canvasElements: {
            id: string;
            config: {
                formId: string;
                renderKey: number;
                name: string;
                panel: string;
            };
            schema: {
                title: string;
                tag: string;
                attrs: Record<string, any>;
                models: Record<string, import('@herodotus/form-apis').VModel>;
                children?: any[] | undefined;
                text?: string | undefined;
            };
        }[];
        onSelectedItem: (element: import('../declarations').Element) => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        Draggable: import('vue').DefineComponent<{
            list: {
                type: ArrayConstructor;
                required: boolean;
                default: any;
            };
            modelValue: {
                type: ArrayConstructor;
                required: boolean;
                default: any;
            };
            itemKey: {
                type: (FunctionConstructor | StringConstructor)[];
                required: boolean;
            };
            clone: {
                type: FunctionConstructor;
                default: (original: any) => any;
            };
            tag: {
                type: StringConstructor;
                default: string;
            };
            move: {
                type: FunctionConstructor;
                default: any;
            };
            componentData: {
                type: ObjectConstructor;
                required: boolean;
                default: any;
            };
        }, unknown, {
            error: boolean;
        }, {
            realList(): any;
            getKey(): any;
        }, {
            getUnderlyingVm(domElement: any): any;
            getUnderlyingPotencialDraggableComponent(htmElement: any): any;
            emitChanges(evt: any): void;
            alterList(onList: any): void;
            spliceList(): void;
            updatePosition(oldIndex: any, newIndex: any): void;
            getRelatedContextFromMoveEvent({ to, related }: {
                to: any;
                related: any;
            }): any;
            getVmIndexFromDomIndex(domIndex: any): any;
            onDragStart(evt: any): void;
            onDragAdd(evt: any): void;
            onDragRemove(evt: any): void;
            onDragUpdate(evt: any): void;
            computeFutureIndex(relatedContext: any, evt: any): any;
            onDragMove(evt: any, originalEvent: any): any;
            onDragEnd(): void;
        }, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, any[], any, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<{
            move: Function;
            tag: string;
            clone: Function;
            list: unknown[];
            modelValue: unknown[];
            componentData: Record<string, any>;
        } & {
            itemKey?: string | Function;
        }>, {
            move: Function;
            tag: string;
            clone: Function;
            list: unknown[];
            modelValue: unknown[];
            componentData: Record<string, any>;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HCanvasElement: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            element: {
                type: PropType<import('../declarations').Element>;
                required: true;
            };
            selectedId: {
                type: NumberConstructor;
                required: true;
            };
        }>, {
            isHover: import('vue').Ref<boolean, boolean>;
            schemas: import('vue').ComputedRef<import('../declarations').Schema[]>;
            isSelected: import('vue').ComputedRef<boolean>;
            onDelete: () => void;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            element: {
                type: PropType<import('../declarations').Element>;
                required: true;
            };
            selectedId: {
                type: NumberConstructor;
                required: true;
            };
        }>> & Readonly<{}>, {}, {}, {
            HRendererEngine: import('vue').DefineComponent<{
                [x: string]: any;
            }, () => any, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{
                [x: string]: any;
            }> & Readonly<{}>, {
                schemas: import('../declarations').Schema[];
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HCanvasLayout: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HFormPreviewDialog: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>, {
        isOpen: import('vue').WritableComputedRef<boolean, boolean>;
        state: import('vue').Ref<Record<string, any>, Record<string, any>>;
        canvasElements: {
            id: string;
            config: {
                formId: string;
                renderKey: number;
                name: string;
                panel: string;
            };
            schema: {
                title: string;
                tag: string;
                attrs: Record<string, any>;
                models: Record<string, import('@herodotus/form-apis').VModel>;
                children?: any[] | undefined;
                text?: string | undefined;
            };
        }[];
        onClose: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }>, {
        modelValue: boolean;
    }, {}, {
        HRendererForm: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: PropType<Record<string, any>>;
                default: () => {};
                required: true;
            };
            elements: {
                type: PropType<Array<import('../declarations').Element>>;
                required: true;
            };
        }>, {
            getDefaultModel: (item: import('../declarations').Element) => import('@herodotus/form-apis').VModel;
            modelObject: import('vue').WritableComputedRef<Record<string, any>, Record<string, any>>;
            state: Record<string, any>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: PropType<Record<string, any>>;
                default: () => {};
                required: true;
            };
            elements: {
                type: PropType<Array<import('../declarations').Element>>;
                required: true;
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {
            modelValue: Record<string, any>;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HFormUploadDialog: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>, {
        isOpen: import('vue').WritableComputedRef<boolean, boolean>;
        onSave: () => void;
        infoRef: import('vue').Ref<import('vue').DefineComponent<{}, {
            id: string;
            name: string;
            activityName: string;
            nameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
            activityNameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
            validate: () => boolean;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any> | null, import('vue').DefineComponent<{}, {
            id: string;
            name: string;
            activityName: string;
            nameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
            activityNameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
            validate: () => boolean;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any> | null>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "update:open" | "save")[], "update:modelValue" | "update:open" | "save", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onSave?: ((...args: any[]) => any) | undefined;
        "onUpdate:open"?: ((...args: any[]) => any) | undefined;
    }>, {
        modelValue: boolean;
    }, {}, {
        HFormInformation: import('vue').DefineComponent<{}, {
            id: string;
            name: string;
            activityName: string;
            nameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
            activityNameRef: import('vue').Ref<import('quasar').QInput | null, import('quasar').QInput | null>;
            validate: () => boolean;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
