import {DailyModel, ScoreModel, TopicModel} from '../../models/ItemModel';

export interface IDailyState {
  loading: boolean;
  dailys: {
    [key: string]: DailyModel[];
  };
  quotes: {
    [key: string]: string;
  };
  scores: {
    [key: string]: ScoreModel[];
  };
  events: {
    [key: string]: string[];
  };

  actions: {
    setDaily: (_daily: DailyModel[], from_date: string) => void;
    setScores: (_scores: ScoreModel[], from_date: string) => void;
    setQuote: (_quote: string, from_date: string) => void;
    setEvents: (_events: string[], from_date: string) => void;
  };
}
