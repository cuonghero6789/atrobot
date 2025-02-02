import {PlanetModel, PlanetSignModel} from '../../models/ItemModel';

export default interface IPlanetState {
  loading: boolean;
  planet?: PlanetModel;
  planetSign?: PlanetSignModel;
  actions: {
    setPlanet: (planet: PlanetModel) => void;
    setPlanetSign: (planetSign: PlanetSignModel) => void;
  };
}
