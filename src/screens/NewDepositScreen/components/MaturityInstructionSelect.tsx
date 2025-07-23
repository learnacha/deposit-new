import React from 'react';
import { View, Text } from 'react-native';
// import Select from 'react-native-select'; // Actual library
import ReactNativeSelectPlaceholder from '../../../components/placeholders/ReactNativeSelectPlaceholder'; // Placeholder
import { styles } from './MaturityInstructionSelect.styles';

export interface MaturityInstructionOption {
  label: string;
  value: string;
}

interface MaturityInstructionSelectProps {
  label: string;
  options: MaturityInstructionOption[];
  selectedValue: string | null | undefined;
  onValueChange: (value: string | null) => void;
  placeholder?: string; // Will be passed from parent using t()
  error?: string;
  disabled?: boolean;
}

const MaturityInstructionSelect: React.FC<MaturityInstructionSelectProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select Instruction',
  error,
  disabled = false,
}) => {
  // Find the selected item object for the placeholder, which expects `value` prop to be an object
  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <ReactNativeSelectPlaceholder
        data={options}
        onSelect={(item: MaturityInstructionOption) => onValueChange(item.value)}
        value={selectedOption || null} // Pass the found option object or null
        placeholder={placeholder}
        style={styles.selectStyle} // Apply custom styling to the placeholder select button
        // disabled={disabled} // Placeholder might not support disabled prop directly, manage externally if needed
      />
      {/* Note: The placeholder might not visually change for 'disabled'.
          Actual 'react-native-select' or custom component would handle this.
          We can wrap with a View and reduce opacity if disabled for visual cue.
      */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export { MaturityInstructionSelect };
