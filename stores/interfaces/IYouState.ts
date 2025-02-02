import {DominantModel, TopicModel} from '../../models/ItemModel';
import {TopicsEnum} from '../../screens/data';

export interface IYouState {
    dominant: DominantModel;
    
  actions: {
    setDominant: (_dominant: DominantModel) => void;
  };
}
