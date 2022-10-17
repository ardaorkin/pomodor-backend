import PomodorosModel from "../../db/models/PomodorosModel";

class Pomodoros {
  async createPomodoro() {
    try {
      const newPomodoro = new PomodorosModel(arguments[0]);
      const createdPomodoro = await newPomodoro.save();
      return createdPomodoro;
    } catch (error) {
      throw error;
    }
  }
  async listUsersPomodoros({ user_id }) {
    try {
      const pomodorosList = await PomodorosModel.find({ user_id });
      return pomodorosList;
    } catch (error) {
      throw error;
    }
  }
}

export default Pomodoros;
