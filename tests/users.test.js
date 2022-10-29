import connectToDB from "../server/db/connect";
import Users from "../server/lib/classes/Users";

const users = new Users();
connectToDB();
async function userTest() {
  try {
    const newUser = await users.createUser({
      username: "test",
      password: "12345Test*",
      email: "test@test.mail",
      first_name: "First Name",
      last_name: "Last Na(me",
    });
    console.log(newUser);
    return newUser;
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
}

Promise.resolve(userTest());
