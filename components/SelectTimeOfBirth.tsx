import React, { useState, useRef, useEffect } from 'react';
import { View, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import InfoButton from './InfoButton';
import strings from '@/core/localization';
interface Props {
  onSelectedTime?: (time: string) => void;
  birthday?: string;
}

const SelectTimeOfBirth = ({ onSelectedTime, birthday }: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const webInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    birthday && setHours(moment(birthday).format('HH'));
    birthday && setMinutes(moment(birthday).format('mm'));
  }, [birthday]);

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

  const handleConfirm = (value: any) => {
    let hh = "";
    let mm = "";
    if (typeof value === 'string') {
      // Web <input type="time"> returns "HH:MM"
      const parts = value.split(':');
      hh = parts[0] || '';
      mm = parts[1] || '';
    } else {
      hh = moment(value).format('HH').toString();
      mm = moment(value).format('mm').toString();
    }
    setHours(hh);
    setMinutes(mm);
    if (hh && mm) onSelectedTime?.(`${hh}:${mm}`);
    hideDatePicker();
  };

  return (
    <View style={{ flex: 1 }}>
      <InfoButton
        placeholder={strings.t("hoursMinutes")}
        onPress={showDatePicker}
        name={strings.t("timeOfBirth") + "*"}
        text={(hours && minutes) ? `${strings.t("hours")}:  ${hours}, ${strings.t("minutes")}: ${minutes}` : ""}
      />
      {Platform.OS !== 'web' && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      )}
      {Platform.OS === 'web' && (
        // Hidden native HTML time input for web fallback
        // eslint-disable-next-line react/no-unknown-property
        <input
          ref={webInputRef}
          type="time"
          value={hours && minutes ? `${hours}:${minutes}` : ''}
          onChange={(e: any) => handleConfirm(e?.target?.value)}
          style={{ display: 'none' }}
        />
      )}
    </View>
  );
};

export default SelectTimeOfBirth;
