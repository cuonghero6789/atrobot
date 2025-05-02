import React, { useState, useRef } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import InfoButton from './InfoButton';
interface Props {
  onSelectedTime?: (time: string) => void;
  birthday?: string;
}

const SelectTimeOfBirth = ({ onSelectedTime, birthday }: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [hours, setHours] = useState(moment(birthday).format('HH'));
  const [minutes, setMinutes] = useState(moment(birthday).format('mm'));

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    const hours = moment(date.toString()).format('HH').toString();
    const minutes = moment(date.toString()).format('mm').toString();
    setHours(hours);
    setMinutes(minutes);
    onSelectedTime?.(`${hours}:${minutes}`);
    hideDatePicker();
  };

  return (
    <View style={{ flex: 1 }}>
      <InfoButton
        placeholder="Hours:  00, Minutes: 00"
        onPress={showDatePicker}
        name={'Time of birth*'}
        text={hours && minutes && `Hours:  ${hours}, Minutes: ${minutes}`}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default SelectTimeOfBirth;
