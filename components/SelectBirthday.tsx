import React, { useState, useRef } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import InfoButton from './InfoButton';
interface Props {
  onSelectedDate?: (date: string) => void;
  birthday?: string;
}

const SelectBirthday = ({ onSelectedDate, birthday }: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment(birthday).format('YYYY-MM-DD'));

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    const newDate = moment(date.toString()).format('YYYY-MM-DD').toString();
    setSelectedDate(newDate);
    onSelectedDate?.(newDate);
    hideDatePicker();
  };

  return (
    <View style={{ flex: 1 }}>
      <InfoButton
        onPress={showDatePicker}
        placeholder='Day/Month/Year*'
        name={'Birthdate*'}
        text={selectedDate?.toString()}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default SelectBirthday;
