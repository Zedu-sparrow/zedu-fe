import type { Metadata } from "next";
import { ArrowUpRight, Crown, Github, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { TEAM, type Contributor } from "./team";

export const metadata: Metadata = {
  title: `${TEAM.name} Contributors`,
  description: `Meet the ${TEAM.name} team contributing to Zedu.`,
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const ContributorIdentity = ({ contributor }: { contributor: Contributor }) => (
  <div className="flex items-center gap-3">
    <Avatar className="h-9 w-9">
      <AvatarFallback className="bg-slate-900 text-xs font-semibold text-white">
        {getInitials(contributor.fullName)}
      </AvatarFallback>
    </Avatar>
    <div className="flex flex-col">
      <span className="font-medium text-slate-900">{contributor.fullName}</span>
      {contributor.role === "Team Lead" && (
        <span className="mt-0.5 inline-flex w-fit items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 ring-1 ring-inset ring-amber-200">
          <Crown className="h-3 w-3" />
          Team Lead
        </span>
      )}
    </div>
  </div>
);

const ZeduUsername = ({ contributor }: { contributor: Contributor }) =>
  contributor.zeduUsername ? (
    <code className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-700">
      @{contributor.zeduUsername}
    </code>
  ) : (
    <span className="text-slate-400">—</span>
  );

const GithubEmail = ({ contributor }: { contributor: Contributor }) =>
  contributor.githubUsername ? (
    <a
      href={`https://github.com/${contributor.githubUsername}`}
      target="_blank"
      rel="noopener noreferrer"
      title={`@${contributor.githubUsername} on GitHub`}
      className="group inline-flex items-center gap-1.5 rounded-sm text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
    >
      <Github className="h-4 w-4 shrink-0" />
      <span className="break-all underline decoration-slate-300 underline-offset-4 transition-colors group-hover:decoration-slate-900">
        {contributor.githubEmail}
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
      <span className="sr-only">(opens GitHub profile in a new tab)</span>
    </a>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-slate-600">
      <Github className="h-4 w-4 shrink-0" />
      <span className="break-all">{contributor.githubEmail}</span>
    </span>
  );

const ZeduSparrowTeamContributorsPage = () => {
  const teamLead = TEAM.contributors.find(
    (contributor) => contributor.role === "Team Lead"
  );

  return (
    <div className="py-20 bg-gradient-to-b from-slate-50 to-white pb-20">
      <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 lg:px-8">
        <section className="flex flex-col items-center text-center">
          <Avatar className="h-28 w-28 shadow-lg ring-4 ring-white">
            <AvatarImage src={TEAM.image} alt={`${TEAM.name} team logo`} />
            <AvatarFallback className="text-xl font-semibold">
              {getInitials(TEAM.name.replace("-", " "))}
            </AvatarFallback>
          </Avatar>
          <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
            <Users className="h-3.5 w-3.5" />
            Contributors
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {TEAM.name}
          </h1>
          <p className="mt-3 max-w-xl text-base text-slate-600">
            The people building Zedu as part of team {TEAM.name}
            {teamLead ? `, led by ${teamLead.fullName}` : ""}.
          </p>
        </section>

        <section className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
            <h2 className="text-base font-semibold text-slate-900">
              Team members
            </h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {TEAM.contributors.length}{" "}
              {TEAM.contributors.length === 1 ? "member" : "members"}
            </span>
          </div>

          <ul className="divide-y divide-slate-200 sm:hidden">
            {TEAM.contributors.map((contributor, index) => (
              <li key={contributor.githubEmail} className="px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <ContributorIdentity contributor={contributor} />
                  <span className="text-xs text-slate-400">#{index + 1}</span>
                </div>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Zedu username
                    </dt>
                    <dd>
                      <ZeduUsername contributor={contributor} />
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      GitHub email
                    </dt>
                    <dd>
                      <GithubEmail contributor={contributor} />
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
          <p className="py-4 text-center text-sm text-muted-foreground sm:hidden">
            Team {TEAM.name} · Zedu contributors
          </p>

          <div className="hidden sm:block">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-14 px-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    #
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Full name
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Zedu username
                  </TableHead>
                  <TableHead className="px-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    GitHub email
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TEAM.contributors.map((contributor, index) => (
                  <TableRow key={contributor.githubEmail}>
                    <TableCell className="px-6 text-slate-400">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <ContributorIdentity contributor={contributor} />
                    </TableCell>
                    <TableCell>
                      <ZeduUsername contributor={contributor} />
                    </TableCell>
                    <TableCell className="px-6">
                      <GithubEmail contributor={contributor} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption className="mb-4">
                Team {TEAM.name} · Zedu contributors
              </TableCaption>
            </Table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ZeduSparrowTeamContributorsPage;
