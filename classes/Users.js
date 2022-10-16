import UsersModel from "../db/models/UsersModel";

class Users {
  async getUsers() {
    try {
      return new Promise((resolve, reject) =>
        resolve([
          { username: "test1", password: "123" },
          { usrname: "test2", password: "abc" },
        ])
      );
    } catch (error) {}
  }

  async createUser(data) {
    try {
      const newUser = new UsersModel(data);
      const createdUser = await newUser.save();
      return createdUser;
    } catch (error) {
      throw error;
    }
  }
}

export default Users;
