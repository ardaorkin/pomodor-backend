import bcrypt from "bcryptjs";
function bcryptPassword() {
  try {
    const password = arguments[0];
    return new Promise(async (resolve) => {
      const salt = await bcrypt.genSalt(10);
      const hash = bcrypt.hashSync(password, salt);
      resolve(hash);
    });
  } catch (error) {
    throw error;
  }
}

export default bcryptPassword;
