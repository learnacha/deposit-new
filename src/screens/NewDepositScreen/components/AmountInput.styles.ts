import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // Container for label + input group
  },
  label: { // This is the label for the whole field e.g. "Amount"
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  currencyLabelContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRightWidth: 1,
    borderRightColor: '#CCCCCC',
    backgroundColor: '#F0F0F0', // Slightly different background for currency label part
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyLabelText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333333',
  },
  inputErrorState: {
    borderColor: 'red', // Error indication on the whole input container
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
});
