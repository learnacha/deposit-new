import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // If specific styling for the container itself is needed
  },
  fieldLabel: { // Label for the entire field (e.g., "Funding Account")
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  selectControl: { // Style for the ReactNativeSelectPlaceholder's touchable part
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    // padding: 12, // Placeholder will manage its internal padding
    backgroundColor: '#FFFFFF',
    minHeight: 48, // Ensure a decent touchable height, similar to other inputs
    justifyContent: 'center',
  },
  // placeholderText style would be part of ReactNativeSelectPlaceholder if customizable there
  // accountInfoContainer, accountNumberText, balanceContainer, etc. are no longer needed here
  // as the select items are just text labels.
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
});
