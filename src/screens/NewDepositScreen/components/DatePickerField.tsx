import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'; // Real import
// import DateTimePickerPlaceholder as DateTimePicker, { DateTimePickerEvent } from '../../../components/placeholders/DateTimePickerPlaceholder'; // Placeholder import
import { styles } from './DatePickerField.styles';

interface DatePickerFieldProps {
  label: string;
  date: Date | null | undefined;
  onDateChange: (selectedDate: Date | null) => void;
  placeholder?: string; // Will be passed from parent using t()
  error?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
  // Custom validation like disabling weekends/holidays would be managed by controlling minimum/maximumDate
  // or by validating the selected date in onDateChange.
  // For simplicity, we'll rely on minimumDate/maximumDate for now.
  // Disabling specific dates (weekends/holidays) in the picker UI itself is complex with the default picker.
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  date,
  onDateChange,
  placeholder = 'Select Date',
  error,
  minimumDate,
  maximumDate,
  disabled = false,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios'); // Keep visible on iOS until done
    if (event.type === 'set' && selectedDate) {
      onDateChange(selectedDate);
    } else if (event.type === 'dismissed') {
      onDateChange(date); // Revert to original date or null if cancelled
    }
  };

  const formatDate = (d: Date | null | undefined): string => {
    if (!d) return ''; // Return empty or placeholder, but Text component handles it.
    // DD/MM/YYYY format
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dateDisplayButton}
        onPress={() => !disabled && setShowPicker(true)}
        disabled={disabled}
      >
        <Text style={date ? styles.dateDisplayText : styles.placeholderText}>
          {date ? formatDate(date) : placeholder}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date || minimumDate || new Date()} // Ensure a valid date is passed to value
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export { DatePickerField };
