import React, { useState, useRef, useEffect } from 'react';
import { View, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import InfoButton from './InfoButton';
import strings from '@/core/localization';
interface Props {
  onSelectedDate?: (date: string) => void;
  birthday?: string;
}

const SelectBirthday = ({ onSelectedDate, birthday }: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment(birthday || new Date()).format('YYYY-MM-DD')
  );
  const webInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(()=>{
    birthday && setSelectedDate(birthday);
  },[birthday]);
  
  const showDatePicker = () => {
    if (Platform.OS === 'web') {
      const input = webInputRef.current as any;
      if (input?.showPicker) input.showPicker(); else input?.click?.();
      return;
    }
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    const newDate = moment(date).format('YYYY-MM-DD').toString();
    setSelectedDate(newDate);
    onSelectedDate?.(newDate);
    hideDatePicker();
  };

  return (
    <View style={{ flex: 1 }}>
      <InfoButton
        onPress={showDatePicker}
        placeholder={strings.t("dayMonthYear")}
        name={strings.t("birthday") + "*"}
        text={birthday ? selectedDate?.toString() : ""}
      />
      {Platform.OS !== 'web' && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      )}
      {Platform.OS === 'web' && (
        // Hidden native HTML date input for web fallback
        // eslint-disable-next-line react/no-unknown-property
        <input
          ref={webInputRef}
          type="date"
          value={selectedDate}
          onChange={(e: any) => handleConfirm(e?.target?.value)}
          style={{ display: 'none' }}
        />
      )}
    </View>
  );
};

export default SelectBirthday;
