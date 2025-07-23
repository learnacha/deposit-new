import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Account, FormData } from '../screens/NewDepositScreen/NewDepositScreen'; // Adjust path as needed

// Define the shape of the deal validation response
interface DealValidationResponse {
  dealReferenceNumber: string;
  amount: string;
  startDate: string; // ISO string date
  maturityDate: string; // ISO string date
  fundingAccount?: Partial<Account>; // Might come as partial data or just IDs
  repaymentAccount?: Partial<Account>;
  remarks?: string;
}

// Define the shape for submitting the deposit
interface SubmitDepositRequest extends FormData {
  // any additional fields required by the actual API
}

interface SubmitDepositResponse {
  success: boolean;
  message: string;
  transactionId?: string;
}

// Mock API utility
const mockFetch = <T>(data: T, delay = 1000, error = false, errorMessage = 'Mock API Error'): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (error) {
        reject({ message: errorMessage });
      } else {
        resolve(data);
      }
    }, delay);
  });
};

// Define a service using a base URL and expected endpoints
export const depositApi = createApi({
  reducerPath: 'depositApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }), // Dummy base URL, not used for mocks
  endpoints: (builder) => ({
    fetchAccounts: builder.query<Account[], void>({
      queryFn: async () => {
        console.log('RTK Query: Fetching accounts (mock)');
        // Simulate API call for accounts
        const mockAccountsData: Account[] = [
          { id: '1', accountNumber: '100004801000030', nickname: 'Main Checking', availableBalance: 50000.75, currency: 'AED', status: 'active' },
          { id: '2', accountNumber: '200005802000040', nickname: 'Savings Alpha', availableBalance: 120300.00, currency: 'AED', status: 'active' },
          { id: '3', accountNumber: '300006803000050', nickname: 'Holiday Fund', availableBalance: 5000, currency: 'AED', status: 'active' },
          { id: '4', accountNumber: '400007804000060', nickname: 'Old Account', availableBalance: 150.20, currency: 'AED', status: 'inactive' },
          { id: '5', accountNumber: '500008805000070', nickname: 'Business Platinum', availableBalance: 750000.00, currency: 'AED', status: 'active' },
        ];
        try {
          const data = await mockFetch(mockAccountsData, 1200);
          return { data };
        } catch (e: any) {
          return { error: { status: 'Mock Error', data: e.message } };
        }
      },
      // providesTags: ['Accounts'], // For caching if needed
    }),
    validateDealReference: builder.mutation<DealValidationResponse, string>({
      queryFn: async (dealReferenceNumber) => {
        console.log(`RTK Query: Validating deal reference ${dealReferenceNumber} (mock)`);
        if (dealReferenceNumber.toUpperCase() === 'INVALIDDEAL') {
          try {
            await mockFetch({}, 1500, true, 'Invalid deal reference number');
            return { error: { status: 'Mock Error', data: 'Invalid deal reference number' } }; // Should not reach here
          } catch (e: any) {
             return { error: { status: 'Mock Error', data: e.message } };
          }
        }
        if (dealReferenceNumber.toUpperCase() === 'NODETAILSDEAL') {
           const response: DealValidationResponse = {
            dealReferenceNumber,
            amount: '50000',
            startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            maturityDate: new Date(Date.now() + 65 * 24 * 60 * 60 * 1000).toISOString(),
            // fundingAccount and repaymentAccount intentionally omitted
            remarks: 'Deal with no specific account details.',
          };
          try {
            const data = await mockFetch(response, 1500);
            return { data };
          } catch (e: any) {
            return { error: { status: 'Mock Error', data: e.message } };
          }
        }

        const mockResponse: DealValidationResponse = {
          dealReferenceNumber,
          amount: '12345.00',
          startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // T+3
          maturityDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // T+90
          fundingAccount: { id: '1', accountNumber: '100004801000030' }, // Partial data
          repaymentAccount: { id: '2', accountNumber: '200005802000040' }, // Partial data
          remarks: 'Auto-filled remarks from deal validation.',
        };
        try {
          const data = await mockFetch(mockResponse, 1500);
          return { data };
        } catch (e: any) {
          return { error: { status: 'Mock Error', data: e.message } };
        }
      },
    }),
    submitDeposit: builder.mutation<SubmitDepositResponse, SubmitDepositRequest>({
      queryFn: async (formData) => {
        console.log('RTK Query: Submitting deposit (mock)', formData);
        // Simulate some validation based on amount for mock failure
        if (formData.amount && parseFloat(formData.amount) < 100) {
           try {
            await mockFetch({}, 2000, true, 'Deposit amount too low for mock submission.');
            return { error: { status: 'Mock Error', data: 'Deposit amount too low for mock submission.' } }; // Should not reach
          } catch (e: any) {
             return { error: { status: 'Mock Error', data: e.message } };
          }
        }
        const mockResponse: SubmitDepositResponse = {
          success: true,
          message: 'Deposit submitted successfully via mock API!',
          transactionId: `TXN${Date.now()}`,
        };
         try {
          const data = await mockFetch(mockResponse, 2000);
          return { data };
        } catch (e: any) {
          return { error: { status: 'Mock Error', data: e.message } };
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useFetchAccountsQuery,
  useValidateDealReferenceMutation,
  useSubmitDepositMutation,
} = depositApi;
