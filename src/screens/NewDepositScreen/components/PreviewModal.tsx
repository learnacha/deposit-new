import React from 'react';
import { Modal, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './PreviewModal.styles';
import type { FormData, Account } from '../NewDepositScreen';
import { Button } from '../../../components/common/Button';
import { useTranslations } from '../../../hooks/useTranslations'; // Import the hook

interface PreviewModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData: FormData;
  isSubmitting: boolean;
  hasDealReference: boolean;
}

const PreviewModal: React.FC<PreviewModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  formData,
  isSubmitting,
  hasDealReference,
}) => {
  const { t } = useTranslations();

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return t('previewModal.notAvailable');
    return date.toLocaleDateString('en-GB');
  };

  const formatAccount = (account: Account | null | undefined) => {
    if (!account) return t('previewModal.notAvailable');
    return `${account.nickname || account.accountNumber} (${account.currency} ${account.availableBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})})`;
  };

  const getMaturityInstructionLabel = (value?: string | null) => {
    if (!value) return t('previewModal.notAvailable');
    // Assuming value is one of 'RENEW_ALL', 'RENEW_PRINCIPAL', 'CLOSE'
    const key = `maturityInstructions.${value}` as const; // Use 'as const' for literal type
    return t(key, value); // Fallback to value if key not found
  };


  const summaryData = [
    ...(hasDealReference
      ? [{ label: t('previewModal.dealReferenceLabel'), value: formData.dealReferenceNumber || t('previewModal.notAvailable') }]
      : []),
    { label: t('previewModal.fundingAccountLabel'), value: formatAccount(formData.fundingAccount) },
    { label: t('previewModal.repaymentAccountLabel'), value: formatAccount(formData.repaymentAccount) },
    { label: t('previewModal.amountLabel'), value: formData.amount || t('previewModal.notAvailable') },
    { label: t('previewModal.startDateLabel'), value: formatDate(formData.startDate) },
    { label: t('previewModal.maturityDateLabel'), value: formatDate(formData.maturityDate) },
    { label: t('previewModal.maturityInstructionLabel'), value: getMaturityInstructionLabel(formData.maturityInstruction) },
    { label: t('previewModal.remarksLabel'), value: formData.remarks || t('previewModal.remarksEmpty') },
  ];

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{t('previewModal.title')}</Text>
          <ScrollView>
            {summaryData.map((item, index) => (
              <View key={index} style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>{item.label}:</Text>
                <Text style={styles.summaryValue}>{item.value}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button title={t('previewModal.cancelButton')} onPress={onClose} type="secondary" disabled={isSubmitting} style={{marginRight: 10}} />
            <Button title={t('previewModal.submitButton')} onPress={onSubmit} type="primary" disabled={isSubmitting} />
          </View>
          {isSubmitting && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={{marginTop: 10, fontSize: 16}}>{t('previewModal.submitting')}</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export { PreviewModal };
