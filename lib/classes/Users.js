import UsersModel from "../../db/models/UsersModel";
import bcryptPassword from "../helpers/bcryptPassword";
import passwordChecker from "../helpers/passwordChecker";

class Users {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.checkUserExist = this.checkUserExist.bind(this);
  }
  async getUsers() {
    try {
    } catch (error) {}
  }

  async createUser(data) {
    try {
      const { password, username, email } = data;
      await this.checkUserExist(username);
      if (!password) throw new Error("Enter a valid password");
      await passwordChecker(password);
      const hashedPassword = await bcryptPassword(password);
      delete data.password;
      data.password = hashedPassword;
      const newUser = new UsersModel(data);
      const createdUser = await newUser.save();
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async checkUserExist(username, email) {
    try {
      return new Promise(async (resolve, reject) => {
        const isUserExist = await UsersModel.find({
          $or: [{ username }, { email }],
        });
        if (isUserExist.length)
          reject("A user with given username is already exist.");
        resolve(true);
      });
    } catch (error) {
      throw error;
    }
  }
}

export default Users;
