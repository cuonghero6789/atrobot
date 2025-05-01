import { TopicsEnum } from "@/data";

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