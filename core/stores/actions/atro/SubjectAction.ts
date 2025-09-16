import { Subject } from "@/core/types";
import { ISubjectState } from "../../interfaces/atro/ISubjectState";

export const setSubject = (set: any, get: any) => async (subject: Subject) => {
    try {
        set(
            (state: ISubjectState) => {
                state.subject = subject;
            },
            false,
            'setSubjectSuccess',
        );
    } catch (error: any) {
        console.log('setSubjectSuccess error:', error.message);
    }
};