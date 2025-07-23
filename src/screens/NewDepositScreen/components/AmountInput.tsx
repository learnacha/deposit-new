import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './AmountInput.styles';

interface AmountInputProps {
  value: string;
  onChangeText: (text: string) => void;
  currencyLabel?: string;
  placeholder?: string;
  error?: string;
  fieldLabel?: string;
  editable?: boolean;
}

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChangeText,
  currencyLabel = 'AED', // Default, but will be overridden by t() from parent
  placeholder = 'Enter Amount', // Default, but will be overridden
  error,
  fieldLabel,
  editable = true,
}) => {
  const handleTextChange = (text: string) => {
    // Allow only integers
    const numericValue = text.replace(/[^0-9]/g, '');
    onChangeText(numericValue);
  };

  return (
    <View style={styles.container}>
      {fieldLabel && <Text style={styles.label}>{fieldLabel}</Text>}
      <View style={[styles.inputContainer, error ? styles.inputErrorState : {}]}>
        {currencyLabel && (
          <View style={styles.currencyLabelContainer}>
            <Text style={styles.currencyLabelText}>{currencyLabel}</Text>
          </View>
        )}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          keyboardType="numeric"
          editable={editable}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export { AmountInput };
