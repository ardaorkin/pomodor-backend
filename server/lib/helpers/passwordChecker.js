export default function passwordChecker() {
  try {
    const password = arguments[0];
    return new Promise((resolve, reject) => {
      const pattern = new RegExp(
        "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})"
      );
      if (pattern.test(password)) resolve(true);
      reject(
        "Password must be in 8 length and contain at least one number, one lowercase letter, one uppercase letter and one special character."
      );
    });
  } catch (error) {
    throw error;
  }
}
