import strings from "@/core/localization";

// AtroBot specific enums
export enum TopicsEnum {
  Self = 'Self',
  Love = 'Love',
  Work = 'Work',
  Mood = 'Mood',
}

// AtroBot color schemes for astrology
export const BarChartElementalColors = ['#EBD5B0', '#E09B4D', '#6DB3A8', '#A12600'];

export const ElementalColors = {
  Earth: '#E09B4D',
  Fire: '#A12600',
  Water: '#6DB3A8',
  Air: '#EBD5B0',
};

export const QuantityColors = {
  Cardinal: '#F9815C',
  Fixed: '#2763B3',
  Mutable: '#F4E2C1',
};

export const BarChartQuantityColors = ['#F9815C', '#2763B3', '#F4E2C1'];

// AtroBot topics with icons
export const Topics = [
  {
    name: strings.t("self"),
    source: require('@/assets/images/topic/ic_self.png'),
    type: TopicsEnum.Self,
  },
  {
    name: strings.t("mood"),
    source: require('@/assets/images/topic/ic_emotion.png'),
    type: TopicsEnum.Mood,
  },
  {
    name: strings.t("love"),
    source: require('@/assets/images/topic/ic_career.png'),
    type: TopicsEnum.Love,
  },
  {
    name: strings.t("career"),
    source: require('@/assets/images/topic/ic_finance.png'),
    type: TopicsEnum.Work,
  },
]; 