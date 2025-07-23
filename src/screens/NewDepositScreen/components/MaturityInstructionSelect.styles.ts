import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // Container for the component
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
  // Styles for the ReactNativeSelectPlaceholder will be internal to it,
  // but we can add wrapper styles or pass style props if needed.
  selectStyle: { // Example style to pass to the placeholder
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 0, // Placeholder might have its own padding
    paddingVertical: 0,
    backgroundColor: '#FFFFFF',
  }
});
