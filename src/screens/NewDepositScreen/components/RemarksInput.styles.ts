import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // Main container for the component
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    minHeight: 80, // For multiline input
    textAlignVertical: 'top', // Align text to the top for multiline
  },
  inputError: {
    borderColor: 'red',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  counterText: {
    fontSize: 12,
    color: '#666666',
  },
  errorText: { // Although remarks are optional, an error prop might be used for other reasons
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
});
