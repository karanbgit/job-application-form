
// Validation for email, phone, and file size

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^\d{10}$/;
  return regex.test(phone);
};

export const validateFile = (file) => {
  if (!file) return false;
  const maxSize = 2 * 1024 * 1024;
  return file.size <= maxSize;
};