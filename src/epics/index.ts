import { combineEpics } from 'redux-observable';
import { fetchDebtsEpic } from './Epics';

export const rootEpic = combineEpics(fetchDebtsEpic);