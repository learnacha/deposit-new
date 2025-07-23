import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: width * 0.9, // 90% of screen width
    maxHeight: '80%', // Max 80% of screen height
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  summaryLabel: {
    fontSize: 15,
    color: '#555555',
    flex: 1, // Ensure label takes available space
  },
  summaryValue: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '600',
    flex: 1.5, // Give more space to value
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Or 'flex-end' with spacing
    marginTop: 20,
  },
  // Assuming Button component from common/Button.tsx can be styled or takes type prop
  // If specific styling needed for modal buttons, define here or pass via props
  submitButton: {
    // backgroundColor: 'green', // Example if custom
  },
  cancelButton: {
    // backgroundColor: 'red', // Example if custom
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)', // Light overlay on modal content
    borderRadius: 12, // Match modal container
  }
});
