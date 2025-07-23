// A very simple hook for translations based on a single JSON file.
// In a real app, you'd use a more robust i18n library.
import enMessages from '../localization/en.json';

// Type for nested access, e.g., t('newDepositScreen.title')
// This is a simplified version. A more robust solution would handle parameters, plurals etc.
type StringKeys = keyof typeof enMessages.newDepositScreen | keyof typeof enMessages.previewModal | keyof typeof enMessages.maturityInstructions;

// Define a more specific type for messages if needed, or use a generic approach.
// For simplicity, we assume a flat structure for keys passed to t() for now,
// or a dot-separated path that the user of the hook must manage.

// A more structured approach for type safety with nested keys:
type NestedKeyOf<ObjectType extends object> =
  {[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
  }[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<typeof enMessages>;

const translations = enMessages;

const getNestedValue = (obj: any, path: string): string | undefined => {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current[key] === undefined) {
      return undefined;
    }
    current = current[key];
  }
  return typeof current === 'string' ? current : undefined;
};


export const useTranslations = () => {
  // The 't' function will take a key and return the corresponding string.
  // For simplicity, this example doesn't handle dynamic replacements or pluralization.
  const t = (key: TranslationKey, fallback?: string): string => {
    const message = getNestedValue(translations, key);
    if (message === undefined) {
        console.warn(`Translation key "${key}" not found.`);
        return fallback || key; // Return key itself or a fallback if not found
    }
    return message;
  };

  return { t };
};
