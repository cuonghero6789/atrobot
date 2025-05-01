import { AtroDailyModel, AtroDailyMonthlyModel, DailyModel, ScoreModel, TopicModel } from '../../models/ItemModel';

export interface IDailyState {
  loading: boolean;
  weekly: AtroDailyModel;
  monthly: AtroDailyMonthlyModel;
  quote: string;
  scores: {
    [key: string]: ScoreModel[];
  };

  actions: {
    setDaily: (_daily: AtroDailyModel[]) => void;
    setMonthly: (data: AtroDailyMonthlyModel[]) => void;
    setScores: (_scores: ScoreModel[], from_date: string) => void;
    setQuote: (_quote: string) => void;
    getCacheScores: () => void;
    getCacheQuote: () => void;
    getCacheMonthly: () => void;
    getCacheDaily: () => void;
  };
}
