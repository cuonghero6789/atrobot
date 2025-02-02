import {PlanetModel, PlanetSignModel} from '../../models/ItemModel';

export const setPlanet =
  (set: any, get: any) => async (planet: PlanetModel) => {
    try {
      set(
        (state: any) => {
          state.planet = planet;
          state.loading = true;
        },
        false,
        'setPlanetSuccess',
      );
    } catch (error: any) {
      console.log('Login error:', error.message);
    }
  };

export const setPlanetSign =
  (set: any, get: any) => async (planetSign: PlanetSignModel) => {
    try {
      set(
        (state: any) => {
          state.planetSign = planetSign;
          state.loading = false;
        },
        false,
        'setPlanetSignSuccess',
      );
    } catch (error: any) {
      console.log('Login error:', error.message);
    }
  };
