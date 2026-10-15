export type ContributorRole = "Team Lead" | "Member";

export type Contributor = {
  fullName: string;
  zeduUsername: string;
  githubUsername: string;
  role: ContributorRole;
  field?: string;
};

export type Team = {
  name: string;
  contributors: Contributor[];
};

export const TEAM: Team = {
  name: "Zedu-Sparrow",
  contributors: [
    {
      fullName: "Abraham Bishop",
      zeduUsername: "dev_b",
      githubUsername: "abrahambishopcodes",
      role: "Team Lead",
      field: "Full-Stack Software Engineer",
    },
    {
      fullName: "Denise Moemeke",
      zeduUsername: "denise_davida",
      githubUsername: "databydenise",
      role: "Member",
      field: "Data Science / Engineering",
    },
    {
      fullName: "Medadi God'sglory Mitana",
      zeduUsername: "God'sglory",
      githubUsername: "medadimitana",
      role: "Member",
      field: "[Add your field of expertise]",
    },
    {
      fullName: "Kanyinsola Ogunwale",
      zeduUsername: "kanyinsolaogunwale",
      githubUsername: "kanyinsolaogunwale",
      role: "Member",
      field: "UI/UX Design",
    },
    {
      fullName: "Abdulmuiz Abdulsalam Olalekan",
      zeduUsername: "abdulmuiz abdulsalam olalekan",
      githubUsername: "Iampeace001",
      role: "Member",
      field: "UI/UX Design",
    },
    {
      fullName: "Victor Adeshile",
      zeduUsername: "victor_adeshile",
      githubUsername: "davik4life",
      role: "Member",
      field: "Full-Stack Software Engineer",
    },
    {
      fullName: "Lawal Muhammed Olamide",
      zeduUsername: "muhammed",
      githubUsername: "OL4MID3",
      role: "Member",
      field: "AI Product Developer",
    },
    {
      fullName: "Boluwatife Adesola",
      zeduUsername: "Adesola",
      githubUsername: "adesolabolu",
      role: "Member",
      field: "Data Analysis",
    },
    {
      fullName: "Nwaohiri Emmanuel Uzodinma",
      zeduUsername: "99PlusOne",
      githubUsername: "Emmanuel-Xs",
      role: "Member",
      field: "Frontend Developer",
    },
    {
      fullName: "Obiageli Ezeokoli",
      zeduUsername: "Oby Ezeokoli",
      githubUsername: "AfrikTechie",
      role: "Member",
      field: "Data Analysis",
    },
    {
      fullName: "Pearl Koosi Akpaka",
      zeduUsername: "PearlAkpaka",
      githubUsername: "pearl-bit-tech",
      role: "Member",
      field: "Product Management",
    },
    {
      fullName: "Hafeezah Kadiri",
      zeduUsername: "Hafeey",
      githubUsername: "HAFEEZAH029",
      role: "Member",
      field: "Frontend Developer",
    },
    {
      fullName: "Joshua Emmanuel",
      zeduUsername: "joshua_emmanuel",
      githubUsername: "joshua-emmanuel",
      role: "Member",
      field: "Frontend Developer",
    },
    {
      fullName: "Uyanwanne Emmanuel Chukwudaru",
      zeduUsername: "emmyanzo",
      githubUsername: "emmyanzx",
      role: "Member",
      field: "Frontend Developer",
    },
    {
      fullName: "Obidigwe Francis Praise Chukwunonso",
      zeduUsername: "Francis-7-tech",
      githubUsername: "francis-7-tech",
      role: "Member",
      field: "Fullstack Development",
    },
    {
      fullName: "Eda Cynthia Itsekirimi",
      zeduUsername: "Cynthy",
      githubUsername: "Edacynthia",
      role: "Member",
      field: "Backend Developer",
    },
    {
      fullName: "Elsie Anucha",
      zeduUsername: "Elsie Anucha",
      githubUsername: "elsie456",
      role: "Member",
      field: "UI/UX Design",
    },
    {
      fullName: "Ejike Odoh",
      zeduUsername: "ejike",
      githubUsername: "EjikeOdoh",
      role: "Member",
      field: "Frontend Engineer",
    },
    {
      fullName: "Paul Folorunsho",
      zeduUsername: "Paul Folorunsho",
      githubUsername: "folip01",
      role: "Member",
      field: "Backend Development",
    },
    {
      fullName: "Maryam Gana Mohammed",
      zeduUsername: "maryam mohammed gana",
      githubUsername: "MaryamGana002-cmyk",
      role: "Member",
      field: "Product Design",
    },
    {
      fullName: "Victor Onyenekwe",
      zeduUsername: "Juice",
      githubUsername: "JuiceAiz",
      role: "Member",
      field: "UI/UX Design",
    },
    {
      fullName: "Ajala Oladunsi",
      zeduUsername: "oladunsi ajala",
      githubUsername: "Oladunsi-web-designer",
      role: "Member",
      field: "Frontend Development",
    },
    {
      fullName: "Rabiah Usman",
      zeduUsername: "Rabiah",
      githubUsername: "rabiah4u",
      role: "Member",
      field: "Product Design",
    },
    {
      fullName: "Solomon Ogah",
      zeduUsername: "solo ogah",
      githubUsername: "Solo9-pora",
      role: "Member",
      field: "Product Management",
    },
    {
      fullName: "Raji Habeeb Ayinde",
      zeduUsername: "habeebraji",
      githubUsername: "hbiit",
      role: "Member",
      field: "Backend Development",
    },
    {
      fullName: "Belemote Dambo",
      zeduUsername: "belemote dambo",
      githubUsername: "Beldam7",
      role: "Member",
      field: "AI Automation Engineer",
    },
    {
      fullName: "Uwajie Bonnke",
      zeduUsername: "uwajie bonnke",
      githubUsername: "TwajiesHub",
      role: "Member",
      field: "AI-assisted Development (Web & Mobile)",
    },
    {
      fullName: "Okafor Ifechukwu Uriel ",
      zeduUsername: "uriel okafor",
      githubUsername: "blackoin-studio",
      role: "Member",
      field: "Full-Stack Software Engineer",
    },
    {
      fullName: "Ochu Dunamis Felix",
      zeduUsername: "dunamis_best",
      githubUsername: "dunamisbest5-lgtm",
      role: "Member",
      field: "Frontend Development",
    },
  ],
};
