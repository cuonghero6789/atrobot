import { createStore } from '@/core';
import { setSubject } from '../actions/atro/SubjectAction';
import { ISubjectState } from '../interfaces/atro/ISubjectState';

const initState: Omit<ISubjectState, 'actions'> = {
  loading: true,
  subject: {
    planets: [],
    houses: [],
    elements: [],
    qualities: [],
    element_distributions: [],
    quality_distributions: [],
  },
};

const subjectStore = (set: any, get: any) =>
({
  ...initState,
  actions: {
    setSubject: setSubject(set, get),
  },
} as ISubjectState);

const useSubjectStore = createStore<ISubjectState>(subjectStore);

export default useSubjectStore; 