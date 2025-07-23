import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // Styles for the container of this component if needed, but might be handled by parent's fieldContainer
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333333',
  },
  validateButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#007AFF', // Blue for the button
    borderTopRightRadius: 7, // Match input's border radius
    borderBottomRightRadius: 7,
  },
  validateButtonText: {
    color: '#FFFFFF',
    fontSize: 18, // Larger for the arrow icon
    fontWeight: 'bold',
  },
  loadingSpinner: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
});
