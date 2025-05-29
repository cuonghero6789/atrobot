import { createStore } from '@/core';
import { setPlanet, setPlanets, setPlanetSign } from '../actions/atro/PlanetAction';
import IPlanetState from '../interfaces/atro/IPlanetState';

const initState: Omit<IPlanetState, 'actions'> = {
  loading: true,
  planets: undefined,
  planet: undefined,
  planetSign: undefined,
};

const planetStore = (set: any, get: any) =>
({
  ...initState,
  actions: {
    setPlanets: setPlanets(set, get),
    setPlanet: setPlanet(set, get),
    setPlanetSign: setPlanetSign(set, get),
  },
} as IPlanetState);

const usePlanetStore = createStore<IPlanetState>(planetStore);

export default usePlanetStore; 