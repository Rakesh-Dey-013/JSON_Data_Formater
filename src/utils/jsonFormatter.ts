export const formatJSON = (jsonString: string): { formatted: string; isValid: boolean; error?: string } => {
  try {
    const parsed = JSON.parse(jsonString);
    const formatted = JSON.stringify(parsed, null, 2);
    return { formatted, isValid: true };
  } catch (error) {
    return { 
      formatted: jsonString, 
      isValid: false, 
      error: error instanceof Error ? error.message : 'Invalid JSON format'
    };
  }
};

export const validateJSON = (jsonString: string): boolean => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
};

export const minifyJSON = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString);
    return JSON.stringify(parsed);
  } catch {
    return jsonString;
  }
};