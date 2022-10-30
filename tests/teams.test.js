import connectToDB from "../server/db/connect";
import Teams from "../server/lib/classes/Teams";

connectToDB();
const teams = new Teams();
async function teamTest() {
  try {
    // /**
    //  * Members should be valid
    //  */
    // await teams.createTeam({
    //   name: "deneme",
    //   members: ["63540c7779782dd8073a6ad8"],
    // });
    // /**
    //  * Members should NOT be valid
    //  */
    // await teams.createTeam({
    //   name: "deneme",
    //   members: ["63540c7779782dd8073a6ad8", "63540c7779782dd8073a6ad8"],
    // });
    // /*
    //  * Members' count should increase by one
    //  */ await teams.addMembers({
    //   teamID: "635d18f922d3cdb62e977dc4",
    //   members: [
    //     "635d202df69381bbbb0a5715",
    //     "63540c7779782dd8073a6ad8",
    //     "63540c7779782dd8073a6ad8",
    //   ],
    // });
    // /**
    //  * Members' count should decrease by one
    //  */
    // await teams.removeMembers({
    //   teamID: "635d18f922d3cdb62e977dc4",
    //   members: ["635d202df69381bbbb0a5715"],
    // });
    // await teams.myTeam("63540c7779782dd8073a6ad8");
    await teams.isTeamOwner({});
  } catch (error) {
    console.log(error.message);
  } finally {
    process.exit(0);
  }
}

Promise.resolve(teamTest());
