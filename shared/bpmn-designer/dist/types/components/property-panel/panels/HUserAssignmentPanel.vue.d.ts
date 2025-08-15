declare const _default: import('vue').DefineComponent<{}, {
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
            HTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: (StringConstructor | NumberConstructor)[];
                };
            }>, {
                text: import('vue').WritableComputedRef<string | number | undefined, string | number | undefined>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: (StringConstructor | NumberConstructor)[];
                };
            }>> & Readonly<{
                "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            }>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
            };
        }>, {
            text: import('vue').WritableComputedRef<string | number | undefined, string | number | undefined>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
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
        HTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
            };
        }>, {
            text: import('vue').WritableComputedRef<string | number | undefined, string | number | undefined>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
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
            HTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: (StringConstructor | NumberConstructor)[];
                };
            }>, {
                text: import('vue').WritableComputedRef<string | number | undefined, string | number | undefined>;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
                modelValue: {
                    type: (StringConstructor | NumberConstructor)[];
                };
            }>> & Readonly<{
                "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            }>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
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
    HTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
        };
    }>, {
        text: import('vue').WritableComputedRef<string | number | undefined, string | number | undefined>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
