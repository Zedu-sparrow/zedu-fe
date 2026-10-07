export type ContributorRole = "Team Lead" | "Member";

export type Contributor = {
  fullName: string;
  zeduUsername: string;
  githubUsername: string;
  primary?: string;
  role: ContributorRole;
};

export type Team = {
  name: string;
  image: string;
  contributors: Contributor[];
};

export const TEAM: Team = {
  name: "Zedu-Sparrow",
  image: "https://avatars.githubusercontent.com/u/335395597?s=200&v=4",
  contributors: [
    {
      fullName: "Abraham Bishop",
      zeduUsername: "dev_b",
      githubUsername: "abrahambishopcodes",
      primary: "Full-Stack Software Engineer",
      role: "Team Lead",
    },
    {
      fullName: "Denise Moemeke",
      githubUsername: "databydenise",
      zeduUsername: "denise_davida",
      //   add your primary role here denise if you have one, e.g. "Frontend Developer"
      role: "Member",
    },
    {
      fullName: "Medadi God'sglory Mitana",
      zeduUsername: "God'sglory",
      githubUsername: "medadimitana19-glitch",
      //   add your primary role here God'sglory if you have one, e.g. "Frontend Developer"
      role: "Member",
    },
  ],
};

// <-----------  NOTE TO CONTRIBUTORS  ----------->
// If you cannot find your entry as a contributor, just duplicate the entry of any
// existing contributor and change the values to your own.
