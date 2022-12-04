import TeamsModel from "../../db/models/TeamsModel";
import UsersModel from "../../db/models/UsersModel";

class Teams {
  async createTeam(teamData) {
    try {
      const { members } = teamData;
      if (members) {
        await this.checkMembersAreUsers(members);
        const newTeam = new TeamsModel(teamData);
        const createdTeam = await newTeam.save();
        return createdTeam.toJSON();
      }
    } catch (error) {
      throw error;
    }
  }

  async checkMembersAreUsers(members) {
    try {
      const membersLength = members.length;
      const membersInUsers = await UsersModel.where({
        _id: { $in: members },
      }).count();

      if (membersInUsers === membersLength) return true;
      throw new Error("At least one member in the list is not a user.");
    } catch (error) {
      throw error;
    }
  }

  async addMembers({ members, teamID }) {
    try {
      const teamData = await TeamsModel.findById(teamID).select(["members"]);
      const memberIds = teamData.members.map((membersId) =>
        membersId.toString()
      );
      const newSet = new Set();
      const allMembers = members.concat(memberIds);
      const membersSet = new Set([...newSet, ...allMembers]);
      const membersArray = Array.from(membersSet);
      const response = await TeamsModel.updateOne(
        { _id: teamID },
        { members: membersArray }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async removeMembers({ members, teamID }) {
    try {
      const teamData = await TeamsModel.findById(teamID);
      const memberIds = teamData.members.map((memberIds) =>
        memberIds.toString()
      );
      members.forEach((member) => {
        const memberIndex = memberIds.findIndex((id) => id === member);
        memberIds.splice(memberIndex, 1);
      });
      const response = await TeamsModel.updateOne(
        { _id: teamID },
        { members: memberIds }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async myTeam({ userID }) {
    try {
      const myTeam = await TeamsModel.findOne({ members: userID }).populate(
        "members",
        "username email first_name last_name onPomodoro"
      );
      return myTeam;
    } catch (error) {
      throw error;
    }
  }

  async isTeamOwner({ userID, teamID }) {
    try {
      const teamData = await TeamsModel.find({ owner: userID, _id: teamID });
      if (teamData?.length > 0) return true;
      throw new Error("Not team owner.");
    } catch (error) {
      throw error;
    }
  }
}

export default Teams;
