import React from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { styles } from './DealReferenceInput.styles';
// Assuming Input component is a common one, but this one has specific layout (button inside)
// For now, creating a self-contained one. If common Input can be adapted, that's fine too.

interface DealReferenceInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onValidate: () => void;
  isLoading: boolean;
  error?: string;
  maxLength?: number;
  editable?: boolean;
  placeholder?: string;
  validateButtonText?: string;
  validatingButtonText?: string;
}

const DealReferenceInput: React.FC<DealReferenceInputProps> = ({
  value,
  onChangeText,
  onValidate,
  isLoading,
  error,
  maxLength = 20,
  editable = true,
  placeholder = "Enter Deal Reference",
  validateButtonText = "➡️",
  validatingButtonText = "Validating...",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => onChangeText(text.toUpperCase())} // Per spec: Alphanumeric, uppercase
          maxLength={maxLength}
          editable={editable && !isLoading}
          autoCapitalize="characters" // Enforces uppercase input on most keyboards
          onSubmitEditing={onValidate} // Allow validation on keyboard submit
        />
        <TouchableOpacity
          style={styles.validateButton}
          onPress={onValidate}
          disabled={isLoading || !editable}
        >
          {isLoading ? (
            // <ActivityIndicator color="#FFFFFF" style={styles.loadingSpinner} size="small" />
            // Validating text is usually better than just a spinner in a small button
            <Text style={styles.validateButtonText}>{validatingButtonText}</Text>
          ) : (
            <Text style={styles.validateButtonText}>{validateButtonText}</Text>
          )}
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export { DealReferenceInput };
