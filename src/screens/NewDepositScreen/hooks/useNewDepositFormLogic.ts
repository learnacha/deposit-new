import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { z, ZodError } from 'zod';
import { useFetchAccountsQuery, useValidateDealReferenceMutation, useSubmitDepositMutation } from '../../../services/depositApi';
import type { Account, FormData } from '../NewDepositScreen'; // Types from main screen
import { MaturityInstructionOption } from '../components/MaturityInstructionSelect';
import { useTranslations } from '../../../hooks/useTranslations';

// Zod Schemas (defined similarly as before, but now inside or initialized by the hook)
let noDealSchema: z.ZodObject<any>;
let withDealSchema: z.ZodObject<any>;
let accountZodSchema: z.ZodObject<any>;

// Date Utility Functions
const getNextBusinessDay = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    while (newDate.getDay() === 0 || newDate.getDay() === 6) { // 0 is Sunday, 6 is Saturday
      newDate.setDate(newDate.getDate() + 1);
    }
    return newDate;
};


export const useNewDepositFormLogic = (initialHasDealRef = false) => {
    const { t } = useTranslations();

    // Initialize Zod schemas with translations
    if (!accountZodSchema) { // Ensure schemas are initialized only once
        accountZodSchema = z.object({
            id: z.string().min(1),
            accountNumber: z.string().min(1, t('newDepositScreen.dealReferenceRequired')),
            availableBalance: z.number(),
            currency: z.string().min(1, "Currency is required."), // Replace
            status: z.enum(['active', 'inactive']),
            nickname: z.string().optional(),
        }).nullable().optional();

        noDealSchema = z.object({
            fundingAccount: accountZodSchema.refine(val => val && val.status === 'active', { message: t('newDepositScreen.activeFundingAccountRequired') }),
            repaymentAccount: accountZodSchema.refine(val => val && val.status === 'active', { message: t('newDepositScreen.activeRepaymentAccountRequired') }),
            amount: z.string()
                .min(1, t('newDepositScreen.amountRequired'))
                .refine(val => /^\d+$/.test(val) && parseFloat(val) > 0, { message: t('newDepositScreen.amountPositiveInteger') }),
            startDate: z.date({ required_error: t('newDepositScreen.startDateRequired'), invalid_type_error: t('newDepositScreen.invalidStartDate') })
                .refine(date => date !== null, t('newDepositScreen.startDateRequired')),
            maturityDate: z.date({ required_error: t('newDepositScreen.maturityDateRequired'), invalid_type_error: t('newDepositScreen.invalidMaturityDate') })
                .refine(date => date !== null, t('newDepositScreen.maturityDateRequired')),
            maturityInstruction: z.string({required_error: t('newDepositScreen.maturityInstructionRequired')}).min(1, t('newDepositScreen.maturityInstructionRequired')),
            remarks: z.string().max(100, t('newDepositScreen.remarksMaxLength')).optional().nullable(),
        }).refine(data => {
            if (data.startDate && data.maturityDate) return data.maturityDate > data.startDate;
            return true;
        }, { message: t('newDepositScreen.maturityDateAfterStartDate'), path: ["maturityDate"] })
        .refine(data => {
            if (data.fundingAccount && data.amount && data.fundingAccount.availableBalance !== undefined) {
                return data.fundingAccount.availableBalance >= parseFloat(data.amount);
            }
            return true;
        }, { message: t('newDepositScreen.insufficientBalance'), path: ["fundingAccount"] });

        withDealSchema = z.object({
            dealReferenceNumber: z.string({required_error: t('newDepositScreen.dealReferenceRequired')}).min(1, t('newDepositScreen.dealReferenceRequired')).max(20, t('newDepositScreen.dealReferenceMaxLength')),
            fundingAccount: accountZodSchema.refine(val => val && val.status === 'active', { message: t('newDepositScreen.activeFundingAccountRequired') }),
            repaymentAccount: accountZodSchema.refine(val => val && val.status === 'active', { message: t('newDepositScreen.activeRepaymentAccountRequired') }),
            maturityInstruction: z.string({required_error: t('newDepositScreen.maturityInstructionRequired')}).min(1, t('newDepositScreen.maturityInstructionRequired')),
            remarks: z.string().max(100, t('newDepositScreen.remarksMaxLength')).optional().nullable(),
            amount: z.string({required_error: t('newDepositScreen.amountFromDealMissing')}).min(1),
            startDate: z.date({required_error: t('newDepositScreen.startDateFromDealMissing')}),
            maturityDate: z.date({required_error: t('newDepositScreen.maturityDateFromDealMissing')}),
        });
    }

    const maturityInstructionOptions: MaturityInstructionOption[] = [
        { label: t('maturityInstructions.RENEW_ALL'), value: 'RENEW_ALL' },
        { label: t('maturityInstructions.RENEW_PRINCIPAL'), value: 'RENEW_PRINCIPAL' },
        { label: t('maturityInstructions.CLOSE'), value: 'CLOSE' },
    ];

    const [hasDealReference, setHasDealReference] = useState(initialHasDealRef);
    const [formData, setFormData] = useState<FormData>({});
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [accountSearchTerm, setAccountSearchTerm] = useState('');
    const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);

    const [
        validateDealReferenceMutation,
        { isLoading: isDealValidating, error: dealValidationError, reset: resetDealValidation }
    ] = useValidateDealReferenceMutation();

    const {
        data: fetchedAccountsData,
        isLoading: isLoadingAccounts,
        error: fetchAccountsError
    } = useFetchAccountsQuery(undefined, { skip: hasDealReference });
    const accounts = fetchedAccountsData || [];

    const [
        submitDepositMutation,
        { isLoading: isSubmitting, error: submitDepositError, reset: resetSubmitDeposit }
    ] = useSubmitDepositMutation();

    useEffect(() => {
        if (dealValidationError) {
            const message = (dealValidationError as any)?.data?.message || (dealValidationError as any)?.data || t('newDepositScreen.dealValidationFailed');
            Alert.alert(t('newDepositScreen.errorTitleDealValidation'), message);
            setErrors(prev => ({ ...prev, dealReferenceNumber: message }));
            resetDealValidation();
        }
    }, [dealValidationError, resetDealValidation, t]);

    useEffect(() => {
        if (fetchAccountsError) {
            Alert.alert(t('newDepositScreen.errorTitleFetchAccounts'), (fetchAccountsError as any)?.data?.message || (fetchAccountsError as any)?.data || t('newDepositScreen.fetchAccountsError'));
        }
    }, [fetchAccountsError, t]);

    useEffect(() => {
        if (submitDepositError) {
            Alert.alert(t('newDepositScreen.errorTitleSubmission'), (submitDepositError as any)?.data?.message || (submitDepositError as any)?.data || t('newDepositScreen.submissionError'));
            resetSubmitDeposit();
        }
    }, [submitDepositError, resetSubmitDeposit, t]);

    const handleToggleDealReference = useCallback((value: boolean) => {
        setHasDealReference(value);
        setFormData({});
        setErrors({});
        resetDealValidation();
    }, [resetDealValidation]);

    const handleInputChange = useCallback((name: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    }, [errors]);

    const handleDealReferenceValidate = useCallback(async () => {
        if (!formData.dealReferenceNumber) {
            setErrors(prev => ({ ...prev, dealReferenceNumber: t('newDepositScreen.dealReferenceRequired') }));
            return;
        }
        resetDealValidation();

        validateDealReferenceMutation(formData.dealReferenceNumber)
            .unwrap()
            .then(dealData => {
                const fundingAcc = accounts.find(acc => acc.accountNumber === dealData.fundingAccount?.accountNumber || acc.id === dealData.fundingAccount?.id);
                const repaymentAcc = accounts.find(acc => acc.accountNumber === dealData.repaymentAccount?.accountNumber || acc.id === dealData.repaymentAccount?.id);
                setFormData(prev => ({
                    ...prev,
                    dealReferenceNumber: formData.dealReferenceNumber,
                    amount: dealData.amount,
                    startDate: new Date(dealData.startDate),
                    maturityDate: new Date(dealData.maturityDate),
                    fundingAccount: fundingAcc || null,
                    repaymentAccount: repaymentAcc || null,
                    remarks: dealData.remarks || '',
                }));
                setErrors(prev => ({...prev, dealReferenceNumber: undefined}));
            })
            .catch(err => {
                console.error('Deal validation failed (catch block):', err);
                setFormData(prev => ({
                    ...prev,
                    dealReferenceNumber: formData.dealReferenceNumber,
                    amount: undefined,
                    startDate: undefined,
                    maturityDate: undefined,
                }));
            });
    }, [formData.dealReferenceNumber, validateDealReferenceMutation, accounts, resetDealValidation, t]);

    const validateForm = useCallback((): boolean => {
        const currentSchema = hasDealReference ? withDealSchema : noDealSchema;
        try {
            currentSchema.parse(formData);
            setErrors({});
            return true;
        } catch (e) {
            if (e instanceof ZodError) {
                const formattedErrors: Partial<Record<keyof FormData, string>> = {};
                e.errors.forEach(err => {
                    if (err.path.length > 0) {
                        const fieldName = err.path[0] as keyof FormData;
                        if (!formattedErrors[fieldName]) {
                            formattedErrors[fieldName] = err.message;
                        }
                    }
                });
                setErrors(formattedErrors);
            } else {
                console.error("Validation error:", e);
                Alert.alert(t('newDepositScreen.errorTitleValidation'), t('newDepositScreen.unexpectedValidationError'));
            }
            return false;
        }
    }, [formData, hasDealReference, t]);

    const handlePreview = useCallback(() => {
        if (validateForm()) {
            setIsPreviewModalVisible(true);
        }
    }, [validateForm]);

    const handleSubmit = useCallback(async () => {
        if (!validateForm()) return;
        resetSubmitDeposit();

        const submissionData = { ...formData };

        submitDepositMutation(submissionData as FormData)
            .unwrap()
            .then(response => {
                setIsPreviewModalVisible(false);
                Alert.alert(t('newDepositScreen.successTitle'), response.message || t('newDepositScreen.submissionSuccessMessage'), [{ text: t('newDepositScreen.okButton'), onPress: () => {
                    setFormData({});
                    setErrors({});
                    setHasDealReference(false);
                }}]);
            })
            .catch(err => {
                console.error('Submission failed (catch block):', err);
            });
    }, [validateForm, formData, submitDepositMutation, resetSubmitDeposit, t]);

    const handleClearForm = useCallback(() => {
        Alert.alert(
            t('newDepositScreen.clearFormConfirmTitle'),
            t('newDepositScreen.clearFormConfirmMessage'),
            [
                { text: t('newDepositScreen.cancelButton'), style: 'cancel' },
                { text: t('newDepositScreen.yesButton'), onPress: () => {
                    setFormData({});
                    setErrors({});
                    resetDealValidation();
                    resetSubmitDeposit();
                }}
            ],
            { cancelable: false }
        );
    }, [t, resetDealValidation, resetSubmitDeposit]);

    const filteredAccounts = accounts.filter(acc => {
        const searchTermLower = accountSearchTerm.toLowerCase();
        const accNumMatch = acc.accountNumber.toLowerCase().includes(searchTermLower);
        const nicknameMatch = acc.nickname?.toLowerCase().includes(searchTermLower);
        return accNumMatch || nicknameMatch;
    });

    return {
        t,
        hasDealReference,
        formData,
        errors,
        accountSearchTerm,
        setAccountSearchTerm,
        isPreviewModalVisible,
        setIsPreviewModalVisible,
        isDealValidating,
        isLoadingAccounts,
        isSubmitting,
        accounts, // Full list for selection
        filteredAccounts, // Filtered list
        maturityInstructionOptions,
        handleToggleDealReference,
        handleInputChange,
        handleDealReferenceValidate,
        handlePreview,
        handleSubmit,
        handleClearForm,
        getNextBusinessDay // Export utility if needed by UI
    };
};
