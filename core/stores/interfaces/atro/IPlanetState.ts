import { PlanetModel, PlanetSignModel } from '@/core/types/atro';

export default interface IPlanetState {
  loading: boolean;
  planets?: PlanetModel[];
  planet?: PlanetModel;
  planetSign?: PlanetSignModel;
  actions: {
    setPlanets: (data: PlanetModel[]) => void;
    setPlanet: (planet: PlanetModel) => void;
    setPlanetSign: (planetSign: PlanetSignModel) => void;
  };
}
