import strings from "@/localization";

const languages = [
  { label: 'Vietnamese', value: 'vi' },
  { label: 'English', value: 'en' },
];

const replationships = [
  { label: 'Single and looking for love', value: 'Single and looking for love' },
  {
    label: 'Single and totally happy with it',
    value: 'Single and totally happy with it',
  },
  { label: 'In a relationship', value: 'In a relationship' },
];
const genders = [
  { label: 'Female', value: 'Female' },
  { label: 'Male', value: 'Male' },
  { label: 'Other', value: 'Other' },
];

export enum TopicsEnum {
  Self = 'Self',
  Love = 'Love',
  Work = 'Work',
  Mood = 'Mood',
}

const BarChartElementalColors = ['#EBD5B0', '#E09B4D', '#6DB3A8', '#A12600'];
const ElementalColors = {
  Earth: '#E09B4D',
  Fire: '#A12600',
  Water: '#6DB3A8',
  Air: '#EBD5B0',
};
const QuantityColors = {
  Cardinal: '#F9815C',
  Fixed: '#2763B3',
  Mutable: '#F4E2C1',
};

const BarChartQuantityColors = ['#F9815C', '#2763B3', '#F4E2C1'];
const Topics = [
  {
    name: strings.t("self"),
    source: require('@/assets/images/topic/ic_self.png'),
    sourceSelect: require('@/assets/images/topic/ic_self_select.png'),
    type: TopicsEnum.Self,
  },
  {
    name: strings.t("mood"),
    source: require('@/assets/images/topic/ic_mood.png'),
    sourceSelect: require('@/assets/images/topic/ic_mood_select.png'),
    type: TopicsEnum.Mood,
  },
  {
    name: strings.t("love"),
    source: require('@/assets/images/topic/ic_topic_love.png'),
    sourceSelect: require('@/assets/images/topic/ic_topic_love_select.png'),
    type: TopicsEnum.Love,
  },
  {
    name: strings.t("career"),
    source: require('@/assets/images/topic/ic_career.png'),
    sourceSelect: require('@/assets/images/topic/ic_career_select.png'),
    type: TopicsEnum.Work,
  },
];
export {
  languages,
  replationships,
  Topics,
  genders,
  BarChartElementalColors,
  BarChartQuantityColors,
  ElementalColors,
  QuantityColors,
};
