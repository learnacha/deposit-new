import React from 'react';
import { View, Text, TextInput, Switch } from 'react-native';
import { styles } from '../NewDepositScreen.styles'; // Assuming styles can be shared or specific ones created
import { DealReferenceInput } from './DealReferenceInput';
import { AccountSelect } from './AccountSelect';
import { AmountInput } from './AmountInput';
import { DatePickerField } from './DatePickerField';
import { MaturityInstructionSelect, MaturityInstructionOption } from './MaturityInstructionSelect';
import { RemarksInput } from './RemarksInput';
import type { FormData, Account } from '../hooks/useNewDepositFormLogic'; // Import types from hook

interface NewDepositFormProps {
  t: (key: any, fallback?: string) => string; // Translation function
  hasDealReference: boolean;
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  accountSearchTerm: string;
  setAccountSearchTerm: (term: string) => void;
  isDealValidating: boolean;
  isLoadingAccounts: boolean;
  isSubmitting: boolean;
  filteredAccounts: Account[];
  maturityInstructionOptions: MaturityInstructionOption[];
  handleToggleDealReference: (value: boolean) => void;
  handleInputChange: (name: keyof FormData, value: any) => void;
  handleDealReferenceValidate: () => void;
  getNextBusinessDay: (date: Date) => Date;
}

const NewDepositForm: React.FC<NewDepositFormProps> = (props) => {
  const {
    t,
    hasDealReference,
    formData,
    errors,
    accountSearchTerm,
    setAccountSearchTerm,
    isDealValidating,
    isLoadingAccounts,
    isSubmitting,
    filteredAccounts,
    maturityInstructionOptions,
    handleToggleDealReference,
    handleInputChange,
    handleDealReferenceValidate,
    getNextBusinessDay,
  } = props;

  return (
    <>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>{t('newDepositScreen.toggleDealReference')}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={hasDealReference ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleToggleDealReference}
          value={hasDealReference}
        />
      </View>

      {hasDealReference && (
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>{t('newDepositScreen.dealReferenceNumberLabel')}</Text>
          <DealReferenceInput
            value={formData.dealReferenceNumber || ''}
            onChangeText={(value) => handleInputChange('dealReferenceNumber', value)}
            onValidate={handleDealReferenceValidate}
            isLoading={isDealValidating}
            error={errors.dealReferenceNumber}
            editable={!isDealValidating}
            placeholder={t('newDepositScreen.dealReferenceNumberPlaceholder')}
            validateButtonText={t('newDepositScreen.validateButton')}
            validatingButtonText={t('newDepositScreen.validatingButton')}
          />
        </View>
      )}

      {!hasDealReference && (
        <>
          <View style={styles.fieldContainer}>
            <AmountInput
              fieldLabel={t('newDepositScreen.amountLabel')}
              currencyLabel={t('newDepositScreen.amountCurrencyLabel')}
              value={formData.amount || ''}
              onChangeText={(value) => handleInputChange('amount', value)}
              error={errors.amount}
              editable={!isDealValidating && !isSubmitting}
              placeholder={t('newDepositScreen.amountPlaceholder')}
            />
          </View>
          <View style={styles.fieldContainer}>
            <DatePickerField
              label={t('newDepositScreen.startDateLabel')}
              date={formData.startDate}
              onDateChange={(date) => {
                handleInputChange('startDate', date);
                if (date && formData.maturityDate && formData.maturityDate <= date) {
                  handleInputChange('maturityDate', null);
                }
              }}
              error={errors.startDate}
              minimumDate={getNextBusinessDay(new Date())}
              disabled={isDealValidating || isSubmitting}
              placeholder={t('newDepositScreen.selectDatePlaceholder')}
            />
          </View>
          <View style={styles.fieldContainer}>
            <DatePickerField
              label={t('newDepositScreen.maturityDateLabel')}
              date={formData.maturityDate}
              onDateChange={(date) => handleInputChange('maturityDate', date)}
              error={errors.maturityDate}
              minimumDate={formData.startDate ? getNextBusinessDay(formData.startDate) : getNextBusinessDay(new Date())}
              disabled={!formData.startDate || isDealValidating || isSubmitting}
              placeholder={t('newDepositScreen.selectDatePlaceholder')}
            />
          </View>
        </>
      )}

      {hasDealReference && formData.amount && formData.startDate && formData.maturityDate && (
        <>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{t('newDepositScreen.amountLabel')} ({t('newDepositScreen.amountCurrencyLabel')})</Text>
            <Text>{formData.amount}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{t('newDepositScreen.startDateLabel')}</Text>
            <Text>{formData.startDate?.toLocaleDateString('en-GB')}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{t('newDepositScreen.maturityDateLabel')}</Text>
            <Text>{formData.maturityDate?.toLocaleDateString('en-GB')}</Text>
          </View>
        </>
      )}

      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{t('newDepositScreen.searchAccountsLabel')}</Text>
        <TextInput
          style={styles.searchInput}
          placeholder={t('newDepositScreen.searchAccountsPlaceholder')}
          value={accountSearchTerm}
          onChangeText={setAccountSearchTerm}
        />
      </View>

      <View style={styles.fieldContainer}>
        <AccountSelect
          label={t('newDepositScreen.fundingAccountLabel')}
          accounts={filteredAccounts.filter(acc => acc.status === 'active')}
          selectedAccount={formData.fundingAccount}
          onAccountSelect={(account) => handleInputChange('fundingAccount', account)}
          error={errors.fundingAccount}
          disabled={isDealValidating || isSubmitting || isLoadingAccounts}
          placeholder={t('newDepositScreen.selectAccountPlaceholder')}
        />
      </View>

      <View style={styles.fieldContainer}>
        <AccountSelect
          label={t('newDepositScreen.repaymentAccountLabel')}
          accounts={filteredAccounts.filter(acc => acc.status === 'active')}
          selectedAccount={formData.repaymentAccount}
          onAccountSelect={(account) => handleInputChange('repaymentAccount', account)}
          error={errors.repaymentAccount}
          disabled={isDealValidating || isSubmitting || isLoadingAccounts}
          placeholder={t('newDepositScreen.selectAccountPlaceholder')}
        />
      </View>

      <View style={styles.fieldContainer}>
        <MaturityInstructionSelect
          label={t('newDepositScreen.maturityInstructionLabel')}
          options={maturityInstructionOptions}
          selectedValue={formData.maturityInstruction}
          onValueChange={(value) => handleInputChange('maturityInstruction', value)}
          error={errors.maturityInstruction}
          disabled={isDealValidating || isSubmitting || isLoadingAccounts}
          placeholder={t('newDepositScreen.selectInstructionPlaceholder')}
        />
      </View>

      <View style={styles.fieldContainer}>
        <RemarksInput
          label={t('newDepositScreen.remarksLabel')}
          value={formData.remarks || ''}
          onChangeText={(value) => handleInputChange('remarks', value)}
          maxLength={100}
          disabled={isDealValidating || isSubmitting || isLoadingAccounts}
          placeholder={t('newDepositScreen.remarksPlaceholder')}
        />
      </View>
    </>
  );
};

export { NewDepositForm };
