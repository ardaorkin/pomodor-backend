import UsersModel from "../../db/models/UsersModel";
import bcryptPassword from "../helpers/bcryptPassword";
import passwordChecker from "../helpers/passwordChecker";

class Users {
  constructor() {
    this.createUser = this.createUser.bind(this);
    this.checkUserExist = this.checkUserExist.bind(this);
  }
  async getUsers(searchStr) {
    try {
      if (searchStr.length > 2) {
        const users = await UsersModel.find(
          {
            username: { $regex: searchStr },
          },
          { password: 0, __v: 0 }
        );
        return users;
      }
      return [];
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(data) {
    try {
      const { password, username, email } = data;
      await this.checkUserExist(username, email);
      if (!password) throw new Error("Enter a valid password");
      await passwordChecker(password);
      const hashedPassword = await bcryptPassword(password);
      delete data.password;
      data.password = hashedPassword;
      const newUser = new UsersModel(data);
      const createdUser = await newUser.save();
      const userJSON = createdUser.toJSON();
      delete userJSON.password;
      delete userJSON._id;
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
          reject("A user with given username and/or email is already exist.");
        resolve(true);
      });
    } catch (error) {
      throw error;
    }
  }

  async getUser(searchObject) {
    try {
      return new Promise((resolve, reject) => {
        try {
          const user = UsersModel.findOne(searchObject);
          resolve(user);
        } catch (error) {
          reject(error);
        }
      });
    } catch (error) {
      throw error;
    }
  }
}

export default Users;
