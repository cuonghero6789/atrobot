import { DominantModel, TopicModel } from '../../models/AtroBotModel';

export interface IYouState {
  dominant: DominantModel;

  actions: {
    setDominant: (_dominant: DominantModel) => void;
  };
}
