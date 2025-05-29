import { TopicsEnum } from "@/core/data";

export interface ItemPickerModel {
  label: string;
  value: string;
}

export interface PlanetModel {
  name: string;
  sign: string;
  house: string;
  sign_name: string;
  name_label?: string;
  sign_label?: string;
}

export interface TopicModel {
  name?: string;
  source?: any;
  sourceSelect?: any;
  type: TopicsEnum;
}

export interface AtroDailyMonthlyModel {
  from_date?: string;
  monthly?: DailyModel[];
}

export interface AtroDailyModel {
  from_date?: string;
  events?: string[];
  horoscope_do?: string[];
  horoscope_dont?: string[];
  weekly?: DailyModel[];
}

export interface DailyModel {
  label?: string;
  key: string;
  text: string;
}

export interface ScoreModel {
  key: string;
  score: string;
}

export interface PlanetSignModel {
  pros?: string;
  cons?: string;
  favorite?: string;
  paraphrase?: string;
}

export interface DominantModel {
  quality?: string;
  element?: string;
}

// Astrology types
export interface Planet {
  name: string;
  sign: string;
  sign_name: string;
  house: string;
  name_label: string;
  sign_label: string;
}

export interface House {
  name: string;
  sign: string;
  name_label: string;
}

export interface Element {
  name: string;
  name_label: string;
}

export interface Quality {
  name: string;
  name_label: string;
}

export interface Distribution {
  percent: number;
  name: string;
  name_label: string;
}

export interface Subject {
  planets: Planet[];
  houses: House[];
  elements: Element[];
  qualities: Quality[];
  element_distributions: Distribution[];
  quality_distributions: Distribution[];
}

// Astro Topic enum
export enum AstroTopic {
  LOVE = 'LOVE',
  CAREER = 'CAREER',
  HEALTH = 'HEALTH',
  MONEY = 'MONEY',
  RELATIONSHIP = 'RELATIONSHIP',
  FAMILY = 'FAMILY',
  FRIENDSHIP = 'FRIENDSHIP',
  SPIRITUALITY = 'SPIRITUALITY',
  PERSONALITY = 'PERSONALITY',
  LIFE_PATH = 'LIFE_PATH',
}