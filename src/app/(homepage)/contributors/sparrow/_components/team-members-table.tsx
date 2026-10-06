"use client";

import { useState } from "react";
import { ArrowUpRight, Crown, Github, Mail, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getInitials } from "../_lib/get-initials";
import type { Contributor } from "../team";

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

const PrimaryField = ({ contributor }: { contributor: Contributor }) =>
  contributor.primaryField ? (
    <span className="text-slate-700">{contributor.primaryField}</span>
  ) : (
    <span className="text-slate-400">—</span>
  );

const linkClassName =
  "group inline-flex items-center gap-1.5 rounded-sm text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2";

const linkTextClassName =
  "break-all underline decoration-slate-300 underline-offset-4 transition-colors group-hover:decoration-slate-900";

const GithubEmail = ({ contributor }: { contributor: Contributor }) => (
  <a
    href={`mailto:${contributor.githubEmail}`}
    title={`Email ${contributor.fullName}`}
    className={linkClassName}
  >
    <Mail className="h-4 w-4 shrink-0" />
    <span className={linkTextClassName}>{contributor.githubEmail}</span>
  </a>
);

const GithubProfile = ({ contributor }: { contributor: Contributor }) =>
  contributor.githubUsername ? (
    <a
      href={`https://github.com/${contributor.githubUsername}`}
      target="_blank"
      rel="noopener noreferrer"
      title={`@${contributor.githubUsername} on GitHub`}
      className={linkClassName}
    >
      <Github className="h-4 w-4 shrink-0" />
      <span className={linkTextClassName}>@{contributor.githubUsername}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
      <span className="sr-only">(opens GitHub profile in a new tab)</span>
    </a>
  ) : (
    <span className="text-slate-400">—</span>
  );

export const TeamMembers = ({
  teamName,
  contributors,
}: {
  teamName: string;
  contributors: Contributor[];
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // GitHub usernames are shown with a leading "@", so ignore one in the search.
  const query = searchQuery.toLowerCase().trim().replace(/^@/, "");

  // Keep each member's position in the full list so numbering stays stable.
  const filtered = contributors
    .map((contributor, index) => ({ contributor, number: index + 1 }))
    .filter(
      ({ contributor }) =>
        !query ||
        contributor.fullName.toLowerCase().includes(query) ||
        contributor.githubUsername?.toLowerCase().includes(query)
    );

  const emptyMessage = `No members match "${searchQuery.trim()}".`;

  return (
    <section className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-slate-900">
            Team members
          </h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            {query && `${filtered.length} of `}
            {contributors.length}{" "}
            {contributors.length === 1 ? "member" : "members"}
          </span>
        </div>

        <div className="relative w-full sm:w-72">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          />
          <Input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by name or GitHub username"
            aria-label="Search members by name or GitHub username"
            className="pl-9 focus-visible:ring-2 focus-visible:ring-slate-400"
          />
        </div>
      </div>

      <ul className="divide-y divide-slate-200 sm:hidden">
        {filtered.map(({ contributor, number }) => (
          <li key={contributor.githubEmail} className="px-4 py-4">
            <div className="flex items-start justify-between gap-3">
              <ContributorIdentity contributor={contributor} />
              <span className="text-xs text-slate-400">#{number}</span>
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
                  Primary field
                </dt>
                <dd>
                  <PrimaryField contributor={contributor} />
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
              <div className="flex flex-col gap-1">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  GitHub profile
                </dt>
                <dd>
                  <GithubProfile contributor={contributor} />
                </dd>
              </div>
            </dl>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="px-4 py-10 text-center text-sm text-slate-500">
            {emptyMessage}
          </li>
        )}
      </ul>
      <p className="py-4 text-center text-sm text-muted-foreground sm:hidden">
        Team {teamName} · Zedu contributors
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
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Primary field
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                GitHub email
              </TableHead>
              <TableHead className="px-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
                GitHub profile
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(({ contributor, number }) => (
              <TableRow key={contributor.githubEmail}>
                <TableCell className="px-6 text-slate-400">{number}</TableCell>
                <TableCell>
                  <ContributorIdentity contributor={contributor} />
                </TableCell>
                <TableCell>
                  <ZeduUsername contributor={contributor} />
                </TableCell>
                <TableCell>
                  <PrimaryField contributor={contributor} />
                </TableCell>
                <TableCell>
                  <GithubEmail contributor={contributor} />
                </TableCell>
                <TableCell className="px-6">
                  <GithubProfile contributor={contributor} />
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableCaption className="mb-4">
            Team {teamName} · Zedu contributors
          </TableCaption>
        </Table>
      </div>
    </section>
  );
};
