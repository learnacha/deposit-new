import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './RemarksInput.styles';

interface RemarksInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string; // Will be passed from parent using t()
  maxLength?: number;
  error?: string;
  disabled?: boolean;
}

const RemarksInput: React.FC<RemarksInputProps> = ({
  value,
  onChangeText,
  label = "Remarks (optional)", // Default, but will be overridden by t() from parent
  placeholder = "Enter remarks", // Default, but will be overridden
  maxLength = 100,
  error,
  disabled = false,
}) => {
  const currentLength = value?.length || 0;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error ? styles.inputError : {}]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        maxLength={maxLength}
        multiline
        numberOfLines={3} // Suggests initial height
        editable={!disabled}
      />
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          {currentLength}/{maxLength}
        </Text>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export { RemarksInput };
