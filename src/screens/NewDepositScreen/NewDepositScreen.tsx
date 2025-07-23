import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from './NewDepositScreen.styles';
import { NewDepositForm } from './components/NewDepositForm'; // Import the new form component
import { PreviewModal } from './components/PreviewModal';
import { Button } from '../../components/common/Button';
import { Loading } from '../../components/common/Loading';
import { useNewDepositFormLogic } from './hooks/useNewDepositFormLogic';

export type { Account, FormData } from './hooks/useNewDepositFormLogic';


const NewDepositScreen: React.FC = () => {
  const formLogic = useNewDepositFormLogic();

  const {
    t,
    hasDealReference,
    // formData, // Not directly used here, but passed to NewDepositForm & PreviewModal
    // errors, // Not directly used here, passed to NewDepositForm
    // accountSearchTerm, // Not directly used here, passed to NewDepositForm
    // setAccountSearchTerm, // Not directly used here, passed to NewDepositForm
    isPreviewModalVisible,
    setIsPreviewModalVisible, // Used for PreviewModal
    isDealValidating,
    isLoadingAccounts,
    isSubmitting,
    // filteredAccounts, // Not directly used here, passed to NewDepositForm
    // maturityInstructionOptions, // Not directly used here, passed to NewDepositForm
    // handleToggleDealReference, // Not directly used here, passed to NewDepositForm
    // handleInputChange, // Not directly used here, passed to NewDepositForm
    // handleDealReferenceValidate, // Not directly used here, passed to NewDepositForm
    handlePreview,  // Used by Preview Button
    handleSubmit,   // Used by PreviewModal
    handleClearForm, // Used by Clear Button
    // getNextBusinessDay // Not directly used here, passed to NewDepositForm
  } = formLogic;


  if (isLoadingAccounts && !hasDealReference) {
     return <Loading fullScreen text={t('newDepositScreen.loadingAccountData')} />;
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Pass all necessary props from formLogic to NewDepositForm */}
        <NewDepositForm {...formLogic} />
      </ScrollView>

      <PreviewModal
        isVisible={isPreviewModalVisible}
        onClose={() => setIsPreviewModalVisible(false)}
        onSubmit={handleSubmit}
        formData={formLogic.formData} // Pass directly from formLogic
        isSubmitting={isSubmitting}
        hasDealReference={hasDealReference}
      />

      <View style={styles.footer}>
        <Button
          title={t('newDepositScreen.clearButton')}
          onPress={handleClearForm}
          type="secondary"
          disabled={isSubmitting || isDealValidating || isLoadingAccounts}
        />
        <Button
          title={t('newDepositScreen.previewButton')}
          onPress={handlePreview}
          type="primary"
          disabled={isSubmitting || isDealValidating || isLoadingAccounts}
        />
      </View>

      {(isDealValidating || (isLoadingAccounts && hasDealReference) ) && (
        <Loading fullScreen text={isDealValidating ? t('newDepositScreen.loadingDealValidation') : t('newDepositScreen.loadingAccountData')} />
      )}
    </View>
  );
};

export default NewDepositScreen;
