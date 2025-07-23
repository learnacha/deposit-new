# deposit-new
## requirements
New Deposit Screen: Functional & Component Specification (Updated)
This document outlines the functional requirements and component-level specifications for the "New Deposit" screen in the Corporate Banking Mobile Application. The screen dynamically adjusts based on the presence or absence of a Deal Reference.

I. Core Logic: Deal Reference Toggle Control
🔘 Component: Switch Control
Label: Do you have a deal reference number?

Values: Yes / No

Default State: No (i.e., Without Deal Reference flow)

Behavior:

This is the master control for form reconfiguration.

On toggle:

If No: Displays manual entry fields:

Funding Account
Repayment Account
Amount
Start Date
Maturity Date
Remarks
If Yes: Displays:

Deal Reference Number input with ➡️ trigger button

After validation, pre-fills:

Amount (read-only)
Start Date (read-only)
Maturity Date (read-only)
Funding Account
Repayment Account
Remarks (optional)
II. Field-Level Specifications
1. 🔍 Deal Reference Number
Property	Description
Component	Text Input (Alphanumeric, uppercase, max 20 characters)
Appearance	Visible only when toggle is Yes
Interaction	Includes a small rounded ➡️ button next to input
Validation Trigger	➡️ button triggers Deal Validation API
API Behavior	- Loading: Inline spinner (no full-screen blur)
- Success: Prefills Amount, Start Date, Maturity Date, Funding/Repayment Accounts, and Remarks (if available)
- Failure: Inline error (e.g., "Invalid deal reference number")
UI Consideration	Fullscreen loader is used during API calls; form fields remain non-interactive until completion
2. 💳 Deposit Funding Account
Property	Description
Component	Custom Select Control
Display	
Line 1: Account Number (e.g., 100004801000030)
Line 2: Available Balance: left-aligned label on first column, right-aligned amount (e.g., AED 1,595.39)
Appearance	Always visible
Interaction	Tapping opens Account Selection Bottom Sheet
Behavior	- Required in all scenarios
- Auto-filled if Deal is valid
- If toggle is No: Must be validated against entered Amount (Available Balance ≥ Amount)
On Load	Accounts fetched via API on page load when toggle = No
3. 💸 Deposit Repayment Account
Property	Description
Component	Custom Select Control
Appearance	Always visible
Interaction	Same as Funding Account
Behavior	- Required in all scenarios
- Auto-filled if Deal is valid
4. 💰 Amount
Property	Description
Component	Numeric Text Input
Format	Positive number, integer only
Label	Static, left-aligned currency label (e.g., "AED")
Appearance	Visible only when toggle is No
Validation	Required if visible, must be > 0
5. 📅 Start Date
Property	Description
Component	Date Picker
Format	DD/MM/YYYY
Appearance	Visible only when toggle is No
Calendar Rules	- Disable past dates, weekends, and public holidays
- Earliest date = T+1 (next business day)
Validation	Required if visible
6. 📆 Maturity Date
Property	Description
Component	Date Picker
Format	DD/MM/YYYY
Appearance	Visible only when toggle is No
Calendar Rules	Disable all dates on or before selected Start Date
Validation	Required if visible
7. 🔁 Maturity Instruction
Property	Description
Component	Select Dropdown
Source	Predefined values from config JSON
Appearance	Always visible
Interaction	Opens bottom sheet with radio buttons
Validation	Required in all scenarios
8. 📝 Remarks
Property	Description
Component	Multiline Text Input
Max Length	100 characters
Appearance	Always visible
Indicator	Label includes "(optional)" instead of an asterisk
UI Behavior	Real-time character counter (e.g., 35/100)
Prefilled?	Can be auto-filled via valid Deal Reference response
III. Footer Actions & Supporting Components
1. 🔄 Clear Button
Property	Description
Style	Secondary
Behavior	Always enabled. On tap: shows confirmation dialog. If confirmed, resets all fields.
2. 👁️ Preview Button
Property	Description
Style	Primary
Behavior	Always enabled. On tap:
Validates all visible/required fields.
Displays inline errors if validation fails.
If all valid, opens Preview Modal with summary. |
3. 📂 Account Selection Bottom Sheet
| Trigger | Tapping Funding/Repayment Account | | Contents | - Search bar (filter by nickname or number)
- Scrollable list with: Nickname, Status, Number, and Balance | | Selection | Single selection. Tapping an item closes sheet and updates form field. |

4. 🧾 Preview Modal
| Trigger | Form is valid and Preview is tapped | | Contents | - Read-only key-value summary of all fields
- Cancel button to go back
- Submit button to trigger deposit creation API | | Behavior | - Submit button shows loading spinner
- Prevents duplicate submission while loading |

IV. API Integration Logic
Event	API Triggered	UI Feedback
Page Load	Fetch accounts (if toggle = No)	Fullscreen loader shown
Deal Reference Validation	Triggered by ➡️ button	Fullscreen loader; form non-interactive
Preview Tap	Validates form	Inline validation errors if any
Submit in Preview	Submit Deposit API	Submit button shows loading spinner; disabled during call
✅ Summary Matrix by Toggle State
Field	Toggle = No (Default)	Toggle = Yes (With Deal Reference)
Deal Reference Number	Hidden	Visible + ➡️ Button
Amount	Editable, required	Read-only, prefilled
Start Date	Editable, required	Read-only, prefilled
Maturity Date	Editable, required	Read-only, prefilled
Funding Account	Selectable	Auto-filled (editable if needed)
Repayment Account	Selectable	Auto-filled (editable if needed)
Remarks	Optional	Optional (prefilled if available)
Maturity Instruction	Required	Required
Preview & Clear Buttons	Enabled, always available	Enabled, always available
Absolutely, Sri Hari. Here's a comprehensive list of test cases, including functional, validation, UX/UI, and edge cases for the New Deposit Screen, structured for QA teams and easy traceability.

✅ Test Cases for New Deposit Screen
Each test case includes:

ID
Scenario
Preconditions
Steps
Expected Result
Notes (if applicable)
🧩 Section A: Toggle Behavior & Form Switching
ID	Scenario	Preconditions	Steps	Expected Result
TC-001	Toggle = No (Default)	App screen is loaded	Observe default view	Funding/Repayment Account, Amount, Start Date, Maturity Date, Remarks visible
TC-002	Toggle = Yes	-	Switch toggle to "Yes"	Only Deal Reference is visible until it's validated
TC-003	Toggle back from Yes → No	Fill fields in Yes state	Switch toggle back to No	Form resets to initial “No Deal” state
TC-004	Switch to Yes → Validate Deal → Switch to No	Valid deal entered	Toggle back to No	All auto-filled fields are cleared
🧩 Section B: Deal Reference Validation
ID	Scenario	Preconditions	Steps	Expected Result
TC-010	Valid Deal Reference	Toggle = Yes	Enter valid deal, tap ➡️	API returns data, Amount, Dates, Accounts filled, remarks prefilled if any
TC-011	Invalid Deal Reference	-	Enter invalid ref, tap ➡️	Inline error shown, no fields populated
TC-012	Deal validation in progress	Slow API response	Tap ➡️	Spinner shown, ➡️ button disabled during call
TC-013	Deal validation fails (API down)	-	Tap ➡️	Error message shown: "Unable to validate at the moment"
TC-014	Valid deal with missing account info	API returns no accounts	Tap ➡️	Partial prefill or error shown: "Funding/Repayment account not found"
🧩 Section C: Manual Form Input (No Deal)
ID	Scenario	Preconditions	Steps	Expected Result
TC-020	All required fields filled correctly	Toggle = No	Fill all fields, tap Preview	Preview Modal shown
TC-021	Amount is 0 or negative	-	Enter 0 / -100	Inline error: “Amount must be greater than 0”
TC-022	Start Date is in the past	-	Pick yesterday’s date	Past dates disabled on calendar
TC-023	Start Date on weekend	-	Try picking Saturday	Weekend dates disabled
TC-024	Maturity Date same as Start Date	-	Pick same date	Validation fails
TC-025	Funding account with insufficient balance	Enter Amount > Balance	Tap Preview	Inline error shown under Funding Account
TC-026	Remarks field over 100 characters	-	Enter 101 characters	Validation blocks input after 100 or shows error
TC-027	Currency label next to Amount is non-editable	-	Tap label	Cannot be edited/clicked
🧩 Section D: Account Selection Bottom Sheet
ID	Scenario	Preconditions	Steps	Expected Result
TC-030	Open Funding Account selector	-	Tap field	Bottom sheet opens with accounts
TC-031	Search for account by nickname	-	Enter nickname in search	Filtered results displayed
TC-032	Select an account	-	Tap account item	Bottom sheet closes, field updated
TC-033	Disabled/inactive accounts	Account returned with inactive status	View bottom sheet	Account appears greyed out or unselectable
TC-034	No accounts returned	Empty account list from API	Load screen	Appropriate message shown (e.g., "No accounts available")
🧩 Section E: Preview & Submission
ID	Scenario	Preconditions	Steps	Expected Result
TC-040	Preview with missing required field	-	Leave a required field empty, tap Preview	Inline error under field, no modal
TC-041	Preview with valid data	-	Fill correctly, tap Preview	Preview Modal shows read-only summary
TC-042	Submit deposit from Preview	Preview shown	Tap Submit	API triggered, Submit button shows spinner
TC-043	API failure on submission	Server returns error	Tap Submit	Error shown (e.g., toast or modal), stays on preview
TC-044	Submit successful	API returns success	Tap Submit	Confirmation shown: success message or receipt screen
TC-045	Submit tapped twice quickly	Tap twice	Button disabled during API	Only one request made
🧩 Section F: Clear Button & Reset
ID	Scenario	Preconditions	Steps	Expected Result
TC-050	Tap Clear	Fields filled	Tap Clear	Confirmation shown
TC-051	Confirm Clear	-	Tap "Yes" on confirmation	All fields reset to initial state
TC-052	Cancel Clear	-	Tap "No" on confirmation	No changes made to form
🧩 Section G: UI/UX Behaviors
ID	Scenario	Preconditions	Steps	Expected Result
TC-060	Loading indicator for API	Deal or account API triggered	Observe screen	Fullscreen loading shown
TC-061	Character counter for Remarks	-	Type in remarks	Shows “xx/100” in real-time
TC-062	Label does not show * asterisks	-	Observe field labels	Only Remarks shows "(optional)", no other asterisks
TC-063	Read-only fields after deal validation	Deal validated	Try editing Amount/Start Date	Field is disabled or not editable
TC-064	Scroll behavior	Long form content	Scroll down/up	Form scrolls smoothly, keyboard doesn't hide fields
TC-065	Accessibility – keyboard navigation	Use keyboard only	Navigate fields	Logical tab order, visual focus outline
🧩 Section H: Edge Cases
ID	Scenario	Preconditions	Steps	Expected Result
TC-070	Network drops during deal validation	Internet off mid-call	Tap ➡️	Graceful error: “Please check your connection”
TC-071	Toggle changed during API call	Trigger API, then toggle	Mid-call toggle	API call aborted or ignored; form resets appropriately
TC-072	API returns unexpected/malformed data	Simulate bad API	Validate deal	Fallback error message shown; no crash
TC-073	No maturity instructions from config	Empty config JSON	Open dropdown	Show “No options available”
TC-074	User fills form, leaves app, returns	Save progress locally	Resume session	Previous values restored (if persisted)
TC-075	Same account selected for funding & repayment	Select same for both	Validate form	Allowed or warning shown based on policy
Provide me react native equivalent using TypeScript and stylesheet, do not use expo or external library, project setup already in place and hence do not provide me steps for the same. Customize the style to render as per screenshot

--

UI components:
Use @react-native-community/datetimepicker for date selection.
https://www.npmjs.com/package/@react-native-community/datetimepicker

Use react-native-select for dropdown selections for AccountBottomSheet.
https://azeezat.github.io/react-native-select/

simple components : https://github.com/infinitered/ignite/blob/master/docs/boilerplate/app/components/Components.md
Implement a searchable template with single selection for accounts.
Use radio buttons for maturity instruction selection.
Copy, Loading, Input and Button component already exists, you can use them as is.
uze zod for form validation
use rtk toolkit query for api's
use typescript
use react native cli, stylesheet, do not use expo or any other framework/library.
account will display account number, balance, currency and status
place all text in JSON and refer the properties
modularize the code to move out logic and template, use hooks as necessary to abstract logic, use dummy component to render controls
