import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // Styles for the container of this component
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  dateDisplayButton: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    minHeight: 40, // Ensure consistent height
    justifyContent: 'center',
  },
  dateDisplayText: {
    fontSize: 16,
    color: '#333333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
});
