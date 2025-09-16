import { Subject } from '@/core/types/atro';

export interface ISubjectState {
  loading: boolean;
  subject: Subject;

  actions: {
    setSubject: (_subject: Subject) => void;
  };
}
