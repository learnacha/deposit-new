import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

// This is a placeholder for react-native-select
// It mimics some basic functionality but is not the actual library.

interface SelectItem {
  label: string;
  value: any;
  [key: string]: any; // Allow other properties
}

interface ReactNativeSelectProps {
  data: SelectItem[];
  onSelect: (item: SelectItem, index: number) => void;
  value?: SelectItem | null; // The currently selected item object
  placeholder?: string;
  style?: object;
  // Add other props based on the library's API if needed for the implementation
  // e.g., renderItem, keyExtractor, etc.
}

const ReactNativeSelectPlaceholder: React.FC<ReactNativeSelectProps> = ({
  data,
  onSelect,
  value,
  placeholder = "Select an option",
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (item: SelectItem, index: number) => {
    onSelect(item, index);
    setModalVisible(false);
  };

  return (
    <View style={style}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>{value ? value.label : placeholder}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => item.value?.toString() || index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item, index)}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    width: '80%',
    maxHeight: '60%',
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default ReactNativeSelectPlaceholder;
