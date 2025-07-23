import React from 'react';
import { Text, TextProps } from 'react-native';

// This is a placeholder for a potentially more complex text component
// For now, it just re-exports Text from react-native for semantic purposes.
// It might include internationalization logic, specific styling, etc. in a real app.

interface CopyProps extends TextProps {
  text: string;
}

const Copy: React.FC<CopyProps> = ({ text, style, ...rest }) => {
  return (
    <Text style={style} {...rest}>
      {text}
    </Text>
  );
};

export { Copy };
