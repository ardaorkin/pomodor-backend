import jwt from "jsonwebtoken";
import fs from "fs";
import bcrypt from "bcryptjs";
import UsersModel from "../../db/models/UsersModel";

class Auth {
  constructor(props) {
    this.data = props?.data || undefined;
    this.createJWT = this.createJWT.bind(this);
    this.privateKey = fs.readFileSync("id_rsa");
  }
  createJWT(data = this.data) {
    try {
      const { username, email } = data;
      return new Promise(async (resolve, reject) => {
        const userData = await UsersModel.find({
          $or: [{ username }, { email }],
        }).select({
          username: 1,
          email: 1,
          first_name: 1,
          last_name: 1,
          role: 1,
          _id: -1,
        });
        console.log(userData[0]);
        if (userData.length) {
          const token = jwt.sign(userData[0].toJSON(), this.privateKey, {
            expiresIn: "1h",
          });
          resolve(token);
        }
        reject("Please check login credentials");
      });
    } catch (error) {
      throw error;
    }
  }
}
export default Auth;
