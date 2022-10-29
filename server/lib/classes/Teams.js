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

  async addMembers(data) {
    try {
      const { members: membersWillAdd, teamID: _id } = data;
      const teamData = await TeamsModel.findById(_id).select(["members"]);
      const memberIds = teamData.members.map((membersId) =>
        membersId.toString()
      );
      const newSet = new Set();
      const allMembers = membersWillAdd.concat(memberIds);
      const membersSet = new Set([...newSet, ...allMembers]);
      const membersArray = Array.from(membersSet);
      const response = await TeamsModel.updateOne(
        { _id },
        { members: membersArray }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async removeMembers(data) {
    try {
      const { members, teamID: _id } = data;
      const teamData = await TeamsModel.findById(_id);
      const memberIds = teamData.members.map((memberIds) =>
        memberIds.toString()
      );
      members.forEach((member) => {
        const memberIndex = memberIds.findIndex((id) => id === member);
        memberIds.splice(memberIndex, 1);
      });
      const response = await TeamsModel.updateOne(
        { _id },
        { members: memberIds }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default Teams;
