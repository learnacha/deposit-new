import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  type?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, type = 'primary', style, disabled, ...rest }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        type === 'primary' ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled}
      {...rest}
    >
      <Text style={[styles.text, type === 'primary' ? styles.textPrimary : styles.textSecondary]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primary: {
    backgroundColor: '#007AFF', // Blue
  },
  secondary: {
    backgroundColor: '#E0E0E0', // Light Gray
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: '#007AFF',
  },
});

export { Button };
