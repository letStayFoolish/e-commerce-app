export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const isValidEmail = (email: string): boolean => emailRegex.test(email);
