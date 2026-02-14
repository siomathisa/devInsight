import React from "react"
import type { GithubRepo } from "../services/githubApi"

interface RepoListProps {
    repos: GithubRepo[]
    topCount?: number
}

export function RepoList({ repos, topCount = 5 }: RepoListProps) {
    const topRepos = repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, topCount)

    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topRepos.map((repo) => (
                <li
                    key={repo.id}
                    className="p-4 bg-white dark:bg-gray-800 
           rounded-lg shadow hover:shadow-lg 
           transition"

                >
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                        {repo.name}
                    </a>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">⭐ {repo.stargazers_count} | {repo.language}</p>
                </li>
            ))}
        </ul>

    )
}
