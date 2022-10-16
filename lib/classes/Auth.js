import jwt from "jsonwebtoken";
import fs from "fs";
import bcrypt from "bcryptjs";
import UsersModel from "../../db/models/UsersModel";

class Auth {
  constructor(props) {
    this.data = props?.data || undefined;
    this.privateKey = fs.readFileSync("id_rsa");
    this.createJWT = this.createJWT.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateJWT = this.validateJWT.bind(this);
  }

  createJWT(data = this.data) {
    try {
      const { username, email, password } = data;

      return new Promise(async (resolve, reject) => {
        const userData = await UsersModel.find({
          $or: [{ username }, { email }],
        });
        if (userData.length) {
          const userObject = userData[0].toJSON();
          try {
            await this.validatePassword({
              hash: userObject.password,
              password,
            });
            const token = jwt.sign(userObject, this.privateKey, {
              expiresIn: "1h",
            });
            resolve(token);
          } catch (error) {
            reject(error);
          }
        }
        reject("Please check login credentials");
      });
    } catch (error) {
      throw error;
    }
  }

  async validatePassword() {
    try {
      const { password, hash } = arguments[0];
      return new Promise((resolve, reject) => {
        const passwordCheck = bcrypt.compareSync(password, hash); // true
        if (passwordCheck) resolve(true);
        reject("Wrong password");
      });
    } catch (error) {
      throw error;
    }
  }

  async validateJWT() {
    try {
      const token = arguments[0];
      return new Promise((resolve, reject) => {
        try {
          const decoded = jwt.verify(token, this.privateKey);
          resolve(decoded);
        } catch (error) {
          reject(error);
        }
      });
    } catch (error) {}
  }
}
export default Auth;
