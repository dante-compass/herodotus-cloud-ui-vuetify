declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        required: true;
    };
    icon: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        required: true;
    };
    label: {
        type: StringConstructor;
    };
}>, {
    thumbStyle: {
        right: string;
        borderRadius: string;
        backgroundColor: string;
        width: string;
        opacity: string;
    };
    isShow: import('vue').Ref<boolean, boolean>;
    panelGroups: import('vue').Ref<import('bpmn-js-properties-panel/lib/PropertiesActivator').Group[], import('bpmn-js-properties-panel/lib/PropertiesActivator').Group[]>;
    parsePropertyPanelName: (id: string) => string;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        required: true;
    };
    icon: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        required: true;
    };
    label: {
        type: StringConstructor;
    };
}>> & Readonly<{}>, {}, {}, {
    HAsynchronousContinuationsPanel: import('vue').DefineComponent<{}, {
        before: import('vue').Ref<boolean, boolean>;
        after: import('vue').Ref<boolean, boolean>;
        exclusive: import('vue').Ref<boolean, boolean>;
        isExclusive: import('vue').ComputedRef<boolean>;
        updateBefore: (value: boolean) => void;
        updateAfter: (value: boolean) => void;
        updateExclusive: (value: boolean) => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HCalledElementPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HCandidateStarterPanel: import('vue').DefineComponent<{}, {
        candidateStarterGroups: import('vue').Ref<string, string>;
        candidateStarterUsers: import('vue').Ref<string, string>;
        updateCandidateStarterGroups: (value: string | number | null) => void;
        updateCandidateStarterUsers: (value: string | number | null) => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HCandidateGroupTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
            };
            title: {
                type: StringConstructor;
            };
        }>, {
            isOpen: import('vue').Ref<boolean, boolean>;
            isDisabled: import('vue').ComputedRef<boolean>;
            selected: import('vue').Ref<import('@herodotus-cloud/bpmn-apis').GroupEntity[], import('@herodotus-cloud/bpmn-apis').GroupEntity[]>;
            assignee: import('vue').WritableComputedRef<string, string>;
            onClose: () => void;
            onSave: () => void;
            onOpen: () => void;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
            };
            title: {
                type: StringConstructor;
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {
            modelValue: string;
        }, {}, {
            HDialog: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                title: {
                    type: StringConstructor;
                    default: string;
                };
                cancelLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmDisable: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                width: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {
                isOpen: import('vue').WritableComputedRef<boolean, boolean>;
                onClose: () => void;
                onSave: () => void;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "save")[], "update:modelValue" | "save", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                title: {
                    type: StringConstructor;
                    default: string;
                };
                cancelLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmDisable: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                width: {
                    type: StringConstructor;
                    default: string;
                };
            }>> & Readonly<{
                "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
                onSave?: ((...args: any[]) => any) | undefined;
            }>, {
                width: string;
                title: string;
                modelValue: boolean;
                cancelLabel: string;
                confirmLabel: string;
                confirmDisable: boolean;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HGroupSelectTable: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: import('vue').PropType<Array<import('@herodotus-cloud/bpmn-apis').GroupEntity>>;
                    default: () => Array<import('@herodotus-cloud/bpmn-apis').GroupEntity>;
                };
            }>, {
                tableRows: import('vue').Ref<import('@herodotus-cloud/bpmn-apis').GroupEntity[], import('@herodotus-cloud/bpmn-apis').GroupEntity[]>;
                totalPages: import('vue').Ref<number, number>;
                pagination: import('vue').Ref<{
                    sortBy: string | null;
                    descending: boolean;
                    page: number;
                    rowsPerPage: number;
                    rowsNumber: number;
                }, Required<{
                    sortBy?: string | null;
                    descending?: boolean;
                    page?: number;
                    rowsPerPage?: number;
                    rowsNumber?: number;
                }> | {
                    sortBy: string | null;
                    descending: boolean;
                    page: number;
                    rowsPerPage: number;
                    rowsNumber: number;
                }>;
                loading: import('vue').Ref<boolean, boolean>;
                fieldValue: import('vue').Ref<string, string>;
                selectedItems: import('vue').WritableComputedRef<import('@herodotus-cloud/bpmn-apis').GroupEntity[], import('@herodotus-cloud/bpmn-apis').GroupEntity[]>;
                rowKey: keyof import('@herodotus-cloud/bpmn-apis').GroupEntity;
                columns: {
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
                findItems: import('@herodotus-cloud/core').QTableOnRequestProps;
                onClear: () => void;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: import('vue').PropType<Array<import('@herodotus-cloud/bpmn-apis').GroupEntity>>;
                    default: () => Array<import('@herodotus-cloud/bpmn-apis').GroupEntity>;
                };
            }>> & Readonly<{}>, {
                modelValue: import('@herodotus-cloud/bpmn-apis').GroupEntity[];
            }, {}, {
                HTextField: any;
            }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HTextField: any;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HCandidateUserTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: StringConstructor;
                default: string;
            };
            selection: {
                type: import('vue').PropType<"single" | "multiple">;
                default: string;
            };
            label: {
                type: StringConstructor;
            };
            title: {
                type: StringConstructor;
            };
        }>, {
            isOpen: import('vue').Ref<boolean, boolean>;
            isDisabled: import('vue').ComputedRef<boolean>;
            selected: import('vue').Ref<import('@herodotus-cloud/bpmn-apis').UserEntity[], import('@herodotus-cloud/bpmn-apis').UserEntity[]>;
            assignee: import('vue').WritableComputedRef<string, string>;
            onClose: () => void;
            onSave: () => void;
            onOpen: () => void;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: StringConstructor;
                default: string;
            };
            selection: {
                type: import('vue').PropType<"single" | "multiple">;
                default: string;
            };
            label: {
                type: StringConstructor;
            };
            title: {
                type: StringConstructor;
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {
            modelValue: string;
            selection: "single" | "multiple";
        }, {}, {
            HDialog: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                title: {
                    type: StringConstructor;
                    default: string;
                };
                cancelLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmDisable: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                width: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {
                isOpen: import('vue').WritableComputedRef<boolean, boolean>;
                onClose: () => void;
                onSave: () => void;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "save")[], "update:modelValue" | "save", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                title: {
                    type: StringConstructor;
                    default: string;
                };
                cancelLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmDisable: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                width: {
                    type: StringConstructor;
                    default: string;
                };
            }>> & Readonly<{
                "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
                onSave?: ((...args: any[]) => any) | undefined;
            }>, {
                width: string;
                title: string;
                modelValue: boolean;
                cancelLabel: string;
                confirmLabel: string;
                confirmDisable: boolean;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HTextField: any;
            HUserSelectTable: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: import('vue').PropType<Array<import('@herodotus-cloud/bpmn-apis').UserEntity>>;
                    default: () => Array<import('@herodotus-cloud/bpmn-apis').UserEntity>;
                };
                selection: {
                    type: import('vue').PropType<"single" | "multiple">;
                    default: string;
                };
            }>, {
                tableRows: import('vue').Ref<import('@herodotus-cloud/bpmn-apis').UserEntity[], import('@herodotus-cloud/bpmn-apis').UserEntity[]>;
                totalPages: import('vue').Ref<number, number>;
                pagination: import('vue').Ref<{
                    sortBy: string | null;
                    descending: boolean;
                    page: number;
                    rowsPerPage: number;
                    rowsNumber: number;
                }, Required<{
                    sortBy?: string | null;
                    descending?: boolean;
                    page?: number;
                    rowsPerPage?: number;
                    rowsNumber?: number;
                }> | {
                    sortBy: string | null;
                    descending: boolean;
                    page: number;
                    rowsPerPage: number;
                    rowsNumber: number;
                }>;
                loading: import('vue').Ref<boolean, boolean>;
                fieldValue: import('vue').Ref<string, string>;
                selectedItems: import('vue').WritableComputedRef<import('@herodotus-cloud/bpmn-apis').UserEntity[], import('@herodotus-cloud/bpmn-apis').UserEntity[]>;
                rowKey: keyof import('@herodotus-cloud/bpmn-apis').UserEntity;
                columns: {
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
                findItems: import('@herodotus-cloud/core').QTableOnRequestProps;
                onClear: () => void;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: import('vue').PropType<Array<import('@herodotus-cloud/bpmn-apis').UserEntity>>;
                    default: () => Array<import('@herodotus-cloud/bpmn-apis').UserEntity>;
                };
                selection: {
                    type: import('vue').PropType<"single" | "multiple">;
                    default: string;
                };
            }>> & Readonly<{}>, {
                modelValue: import('@herodotus-cloud/bpmn-apis').UserEntity[];
                selection: "single" | "multiple";
            }, {}, {
                HTextField: any;
            }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HCompensationPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HConditionPanel: import('vue').DefineComponent<{}, {
        conditionExpression: import('vue').Ref<string, string>;
        format: import('vue').Ref<string, string>;
        resource: import('vue').Ref<string, string>;
        script: import('vue').Ref<string, string>;
        conditionType: import('vue').Ref<string, string>;
        conditionOptions: import('vue').Ref<{
            text: string;
            value: string;
        }[], {
            text: string;
            value: string;
        }[] | {
            text: string;
            value: string;
        }[]>;
        scriptType: import('vue').Ref<string, string>;
        scriptOptions: import('vue').Ref<{
            text: string;
            value: string;
        }[], {
            text: string;
            value: string;
        }[] | {
            text: string;
            value: string;
        }[]>;
        isScript: import('vue').ComputedRef<boolean>;
        isExpression: import('vue').ComputedRef<boolean>;
        isExternalResource: import('vue').ComputedRef<boolean>;
        updateConditionExpression: (value: string) => void;
        updateFormat: (value: string) => void;
        updateResource: (value: string) => void;
        updateScript: (value: string) => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HTextField: any;
        HSelect: any;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HDocumentationPanel: import('vue').DefineComponent<{}, {
        document: import('vue').Ref<string, string>;
        updateDocument: (value: string | number | null) => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HErrorPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HEscalationPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HExecutionListenerPanel: import('vue').DefineComponent<{}, {
        count: import('vue').ComputedRef<number>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HExtensionPropertiesPanel: import('vue').DefineComponent<{}, {
        tableRows: import('vue').Ref<import('../..').ExtensionProperty[], import('../..').ExtensionProperty[]>;
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
        openDialog: import('vue').Ref<boolean, boolean>;
        count: import('vue').ComputedRef<number>;
        onCreate: (item: import('../..').ExtensionProperty) => void;
        onDelete: (item: import('../..').ExtensionProperty) => void;
        onModify: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HTableItemDeleteButton: import('vue').DefineComponent<{}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
            HTableActionButton: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                tooltip: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                tooltip: {
                    type: StringConstructor;
                    default: string;
                };
            }>> & Readonly<{}>, {
                tooltip: string;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HExtensionPropertyDialog: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {
            isOpen: import('vue').WritableComputedRef<boolean, boolean>;
            property: import('vue').Ref<import('../..').ExtensionProperty, import('../..').ExtensionProperty>;
            isDisabled: import('vue').ComputedRef<boolean>;
            onSave: () => void;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "save" | "update:open")[], "update:modelValue" | "save" | "update:open", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
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
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HFormPanel: import('vue').DefineComponent<{}, {
        formsType: import('vue').Ref<string, string>;
        formsOptions: import('vue').Ref<{
            text: string;
            value: import('../../enums').FormTypeEnum;
        }[], {
            text: string;
            value: import('../../enums').FormTypeEnum;
        }[] | {
            text: string;
            value: import('../../enums').FormTypeEnum;
        }[]>;
        bindingType: import('vue').Ref<string, string>;
        bindingOptions: import('vue').Ref<{
            text: string;
            value: import('../../enums').BindingTypeEnum;
        }[], {
            text: string;
            value: import('../../enums').BindingTypeEnum;
        }[] | {
            text: string;
            value: import('../../enums').BindingTypeEnum;
        }[]>;
        formKey: import('vue').Ref<string, string>;
        formRef: import('vue').Ref<string, string>;
        formRefVersion: import('vue').Ref<string, string>;
        isCamundaForms: import('vue').ComputedRef<boolean>;
        isEmbeddedOrExternalTaskForms: import('vue').ComputedRef<boolean>;
        isFormRefVersion: import('vue').ComputedRef<boolean>;
        updateFormKey: (value: string) => void;
        updateFormRef: (value: string) => void;
        updateVersion: (value: string) => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HSelect: any;
        HTextField: any;
        HFormSelect: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: StringConstructor;
            };
        }>, {
            selectedValue: import('vue').WritableComputedRef<string | undefined, string | undefined>;
            options: import('vue').Ref<import('../..').FormSelectItem[], import('../..').FormSelectItem[]>;
            filter: (value: string, update: (callbackFn: () => void, after?: (ref: import('quasar').QSelect) => void) => void, abort: () => void) => void;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: StringConstructor;
            };
        }>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HFieldInjectionPanel: import('vue').DefineComponent<{}, {
        count: import('vue').ComputedRef<number>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HExternalTaskPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HGeneralPanel: import('vue').DefineComponent<{}, {
        isProcessElement: import('vue').ComputedRef<boolean>;
        elementId: import('vue').Ref<string, string>;
        elementName: import('vue').Ref<string, string>;
        versionTag: import('vue').Ref<string, string>;
        isExecutable: import('vue').Ref<boolean, boolean>;
        updateName: (value: string | number | null) => void;
        updateId: (value: string | number | null) => void;
        updateVersionTag: (value: string | number | null) => void;
        updateIsExecutable: (value: boolean) => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HHeadPanel: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        title: {
            type: StringConstructor;
            required: true;
        };
        icon: {
            type: StringConstructor;
            required: true;
        };
        name: {
            type: StringConstructor;
        };
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        title: {
            type: StringConstructor;
            required: true;
        };
        icon: {
            type: StringConstructor;
            required: true;
        };
        name: {
            type: StringConstructor;
        };
    }>> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HHistoryCleanupPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HImplementationPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HInMappingPanel: import('vue').DefineComponent<{}, {
        count: import('vue').ComputedRef<number>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HInMappingPropagationPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HInputPanel: import('vue').DefineComponent<{}, {
        count: import('vue').ComputedRef<number>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HJobExecutionPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HLinkPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HMessagePanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HMultiInstancePanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HOutMappingPanel: import('vue').DefineComponent<{}, {
        count: import('vue').ComputedRef<number>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HOutMappingPropagationPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HOutputPanel: import('vue').DefineComponent<{}, {
        count: import('vue').ComputedRef<number>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HScriptPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HSignalPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HStartInitiatorPanel: import('vue').DefineComponent<{}, {
        initiator: import('vue').Ref<string | undefined, string | undefined>;
        updateInitiator: (value: string | number | null) => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HTextField: any;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HTaskListenerPanel: import('vue').DefineComponent<{}, {
        count: import('vue').ComputedRef<number>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HTasklistPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HTimerPanel: import('vue').DefineComponent<{}, void, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HUserAssignmentPanel: import('vue').DefineComponent<{}, {
        assignee: import('vue').Ref<string, string>;
        candidateUsers: import('vue').Ref<string, string>;
        candidateGroups: import('vue').Ref<string, string>;
        dueDate: import('vue').Ref<string, string>;
        followUpDate: import('vue').Ref<string, string>;
        priority: import('vue').Ref<string | undefined, string | undefined>;
        updateAssignee: (value: string | number | null) => void;
        updateCandidateGroups: (value: string | number | null) => void;
        updateCandidateUsers: (value: string | number | null) => void;
        updateDueDate: (value: string | number | null) => void;
        updateFollowUpDate: (value: string | number | null) => void;
        updatePriority: (value: string | number | null) => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
        HCandidateGroupTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
            };
            title: {
                type: StringConstructor;
            };
        }>, {
            isOpen: import('vue').Ref<boolean, boolean>;
            isDisabled: import('vue').ComputedRef<boolean>;
            selected: import('vue').Ref<import('@herodotus-cloud/bpmn-apis').GroupEntity[], import('@herodotus-cloud/bpmn-apis').GroupEntity[]>;
            assignee: import('vue').WritableComputedRef<string, string>;
            onClose: () => void;
            onSave: () => void;
            onOpen: () => void;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
            };
            title: {
                type: StringConstructor;
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {
            modelValue: string;
        }, {}, {
            HDialog: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                title: {
                    type: StringConstructor;
                    default: string;
                };
                cancelLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmDisable: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                width: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {
                isOpen: import('vue').WritableComputedRef<boolean, boolean>;
                onClose: () => void;
                onSave: () => void;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "save")[], "update:modelValue" | "save", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                title: {
                    type: StringConstructor;
                    default: string;
                };
                cancelLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmDisable: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                width: {
                    type: StringConstructor;
                    default: string;
                };
            }>> & Readonly<{
                "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
                onSave?: ((...args: any[]) => any) | undefined;
            }>, {
                width: string;
                title: string;
                modelValue: boolean;
                cancelLabel: string;
                confirmLabel: string;
                confirmDisable: boolean;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HGroupSelectTable: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: import('vue').PropType<Array<import('@herodotus-cloud/bpmn-apis').GroupEntity>>;
                    default: () => Array<import('@herodotus-cloud/bpmn-apis').GroupEntity>;
                };
            }>, {
                tableRows: import('vue').Ref<import('@herodotus-cloud/bpmn-apis').GroupEntity[], import('@herodotus-cloud/bpmn-apis').GroupEntity[]>;
                totalPages: import('vue').Ref<number, number>;
                pagination: import('vue').Ref<{
                    sortBy: string | null;
                    descending: boolean;
                    page: number;
                    rowsPerPage: number;
                    rowsNumber: number;
                }, Required<{
                    sortBy?: string | null;
                    descending?: boolean;
                    page?: number;
                    rowsPerPage?: number;
                    rowsNumber?: number;
                }> | {
                    sortBy: string | null;
                    descending: boolean;
                    page: number;
                    rowsPerPage: number;
                    rowsNumber: number;
                }>;
                loading: import('vue').Ref<boolean, boolean>;
                fieldValue: import('vue').Ref<string, string>;
                selectedItems: import('vue').WritableComputedRef<import('@herodotus-cloud/bpmn-apis').GroupEntity[], import('@herodotus-cloud/bpmn-apis').GroupEntity[]>;
                rowKey: keyof import('@herodotus-cloud/bpmn-apis').GroupEntity;
                columns: {
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
                findItems: import('@herodotus-cloud/core').QTableOnRequestProps;
                onClear: () => void;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: import('vue').PropType<Array<import('@herodotus-cloud/bpmn-apis').GroupEntity>>;
                    default: () => Array<import('@herodotus-cloud/bpmn-apis').GroupEntity>;
                };
            }>> & Readonly<{}>, {
                modelValue: import('@herodotus-cloud/bpmn-apis').GroupEntity[];
            }, {}, {
                HTextField: any;
            }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HTextField: any;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HCandidateUserTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: StringConstructor;
                default: string;
            };
            selection: {
                type: import('vue').PropType<"single" | "multiple">;
                default: string;
            };
            label: {
                type: StringConstructor;
            };
            title: {
                type: StringConstructor;
            };
        }>, {
            isOpen: import('vue').Ref<boolean, boolean>;
            isDisabled: import('vue').ComputedRef<boolean>;
            selected: import('vue').Ref<import('@herodotus-cloud/bpmn-apis').UserEntity[], import('@herodotus-cloud/bpmn-apis').UserEntity[]>;
            assignee: import('vue').WritableComputedRef<string, string>;
            onClose: () => void;
            onSave: () => void;
            onOpen: () => void;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: StringConstructor;
                default: string;
            };
            selection: {
                type: import('vue').PropType<"single" | "multiple">;
                default: string;
            };
            label: {
                type: StringConstructor;
            };
            title: {
                type: StringConstructor;
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {
            modelValue: string;
            selection: "single" | "multiple";
        }, {}, {
            HDialog: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                title: {
                    type: StringConstructor;
                    default: string;
                };
                cancelLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmDisable: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                width: {
                    type: StringConstructor;
                    default: string;
                };
            }>, {
                isOpen: import('vue').WritableComputedRef<boolean, boolean>;
                onClose: () => void;
                onSave: () => void;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "save")[], "update:modelValue" | "save", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                title: {
                    type: StringConstructor;
                    default: string;
                };
                cancelLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmLabel: {
                    type: StringConstructor;
                    default: string;
                };
                confirmDisable: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                width: {
                    type: StringConstructor;
                    default: string;
                };
            }>> & Readonly<{
                "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
                onSave?: ((...args: any[]) => any) | undefined;
            }>, {
                width: string;
                title: string;
                modelValue: boolean;
                cancelLabel: string;
                confirmLabel: string;
                confirmDisable: boolean;
            }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
            HTextField: any;
            HUserSelectTable: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: import('vue').PropType<Array<import('@herodotus-cloud/bpmn-apis').UserEntity>>;
                    default: () => Array<import('@herodotus-cloud/bpmn-apis').UserEntity>;
                };
                selection: {
                    type: import('vue').PropType<"single" | "multiple">;
                    default: string;
                };
            }>, {
                tableRows: import('vue').Ref<import('@herodotus-cloud/bpmn-apis').UserEntity[], import('@herodotus-cloud/bpmn-apis').UserEntity[]>;
                totalPages: import('vue').Ref<number, number>;
                pagination: import('vue').Ref<{
                    sortBy: string | null;
                    descending: boolean;
                    page: number;
                    rowsPerPage: number;
                    rowsNumber: number;
                }, Required<{
                    sortBy?: string | null;
                    descending?: boolean;
                    page?: number;
                    rowsPerPage?: number;
                    rowsNumber?: number;
                }> | {
                    sortBy: string | null;
                    descending: boolean;
                    page: number;
                    rowsPerPage: number;
                    rowsNumber: number;
                }>;
                loading: import('vue').Ref<boolean, boolean>;
                fieldValue: import('vue').Ref<string, string>;
                selectedItems: import('vue').WritableComputedRef<import('@herodotus-cloud/bpmn-apis').UserEntity[], import('@herodotus-cloud/bpmn-apis').UserEntity[]>;
                rowKey: keyof import('@herodotus-cloud/bpmn-apis').UserEntity;
                columns: {
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
                findItems: import('@herodotus-cloud/core').QTableOnRequestProps;
                onClear: () => void;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: import('vue').PropType<Array<import('@herodotus-cloud/bpmn-apis').UserEntity>>;
                    default: () => Array<import('@herodotus-cloud/bpmn-apis').UserEntity>;
                };
                selection: {
                    type: import('vue').PropType<"single" | "multiple">;
                    default: string;
                };
            }>> & Readonly<{}>, {
                modelValue: import('@herodotus-cloud/bpmn-apis').UserEntity[];
                selection: "single" | "multiple";
            }, {}, {
                HTextField: any;
            }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            icon: {
                type: StringConstructor;
                default: string;
            };
            label: {
                type: StringConstructor;
                default: string;
            };
            badge: {
                type: BooleanConstructor;
                default: boolean;
            };
            badgeColor: {
                type: StringConstructor;
                default: string;
            };
            count: {
                type: NumberConstructor;
                default: number;
            };
            defaultOpend: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            label: string;
            icon: string;
            badge: boolean;
            badgeColor: string;
            count: number;
            defaultOpend: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HTextField: any;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
