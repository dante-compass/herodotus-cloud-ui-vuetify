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
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{}>>, {}, {}>;
export default _default;
