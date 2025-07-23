import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end', // Align sheet to the bottom
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: height * 0.7, // Max 70% of screen height
    minHeight: height * 0.4, // Min 40% of screen height
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#007AFF', // Blue for close button
  },
  searchBarContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
  },
  listContentContainer: {
    paddingBottom: 20, // Space at the bottom of the list
  },
  accountItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  accountItemDisabled: {
    backgroundColor: '#F8F8F8', // Slightly different background for disabled
    opacity: 0.6,
  },
  accountNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  accountNickname: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  accountStatus: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888888', // Or specific colors for status: green for active, red for inactive
    marginBottom: 4,
  },
  statusActive: {
    color: 'green',
  },
  statusInactive: {
    color: 'red',
  },
  balanceInfo: {
    fontSize: 14,
    color: '#333333',
    marginTop: 4,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666666',
  },
});
