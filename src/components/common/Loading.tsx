import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Modal } from 'react-native';

interface LoadingProps {
  fullScreen?: boolean;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ fullScreen, text }) => {
  const content = (
    <View style={fullScreen ? styles.fullScreenContainer : styles.inlineContainer}>
      <ActivityIndicator size="large" color={fullScreen ? "#FFFFFF" : "#007AFF"} />
      {text && <Text style={fullScreen ? styles.fullScreenText : styles.inlineText}>{text}</Text>}
    </View>
  );

  if (fullScreen) {
    return (
      <Modal transparent visible>
        {content}
      </Modal>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  inlineContainer: {
    padding: 16,
    alignItems: 'center',
  },
  fullScreenText: {
    marginTop: 12,
    fontSize: 16,
    color: '#FFFFFF',
  },
  inlineText: {
    marginTop: 8,
    fontSize: 14,
    color: '#333333',
  },
});

export { Loading };
