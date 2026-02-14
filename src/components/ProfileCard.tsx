import React from "react"
import type { GithubUser } from "../services/githubApi"

interface ProfileCardProps {
    user: GithubUser
}

export function ProfileCard({ user }: ProfileCardProps) {
    return (
        <div className="flex items-center space-x-6 p-6 
                bg-white dark:bg-gray-800
                rounded-xl shadow 
                hover:shadow-lg transition">
            <img
                src={user.avatar_url}
                alt={user.login}
                className="w-24 h-24 rounded-full border-2 border-gray-200 dark:border-gray-700"
            />
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.login}</h2>
                {user.bio && <p className="text-gray-600 dark:text-gray-300 mt-1">{user.bio}</p>}
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Followers: {user.followers} | Following: {user.following}
                </p>
                <p className="mt-1 text-gray-500 dark:text-gray-400">Repos publics: {user.public_repos}</p>
            </div>
        </div>

    )
}
