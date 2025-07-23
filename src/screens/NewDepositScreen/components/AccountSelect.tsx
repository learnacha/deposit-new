import React from 'react';
import { View, Text } from 'react-native';
import ReactNativeSelectPlaceholder from '../../../components/placeholders/ReactNativeSelectPlaceholder';
import { styles } from './AccountSelect.styles';
import type { Account } from '../NewDepositScreen';

interface AccountSelectProps {
  accounts: Account[]; // List of all available accounts
  selectedAccount: Account | null | undefined; // The currently selected account object
  onAccountSelect: (account: Account | null) => void;
  label: string;
  placeholder?: string; // Will be passed from parent using t()
  error?: string;
  disabled?: boolean;
}

const AccountSelect: React.FC<AccountSelectProps> = ({
  accounts,
  selectedAccount,
  onAccountSelect,
  label,
  placeholder = 'Select Account',
  error,
  disabled = false,
}) => {
  // Transform accounts for ReactNativeSelectPlaceholder
  // Each label should be descriptive enough for selection.
  // The placeholder might not support complex rendering for items, so the label is key.
  const selectData = accounts.map(acc => ({
    label: `${acc.nickname || acc.accountNumber} (${acc.currency} ${acc.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} - ${acc.status})`,
    value: acc.id, // Use account ID as the unique value
    originalAccount: acc, // Keep a reference to the original account object
  }));

  const currentSelectedOption = selectedAccount
    ? selectData.find(item => item.value === selectedAccount.id)
    : null;

  return (
    <View style={styles.container}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <ReactNativeSelectPlaceholder
        data={selectData}
        onSelect={(item) => {
          // Find the original account object using the selected item's value (acc.id)
          const newSelectedAccount = accounts.find(acc => acc.id === item.value);
          onAccountSelect(newSelectedAccount || null);
        }}
        value={currentSelectedOption}
        placeholder={placeholder}
        style={styles.selectControl} // Style for the select button itself
        // The placeholder doesn't inherently support a disabled state that changes its appearance.
        // We'd manage interactivity by not rendering it or overlaying something if truly disabled.
        // For now, relying on the parent component to manage the `disabled` prop passed to the actual component.
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export { AccountSelect };
