import { DominantModel, TopicModel } from '../../models/ItemModel';

export interface IYouState {
  dominant: DominantModel;

  actions: {
    setDominant: (_dominant: DominantModel) => void;
  };
}
