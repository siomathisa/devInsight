import { useState, useEffect } from "react"
import { useGithubUser } from "../hooks/useGithubUser"
import { LanguageChart } from "../components/LanguageChart"
import { ProfileCard } from "../components/ProfileCard"
import { RepoList } from "../components/RepoList"

export function Dashboard() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark"
    })
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }, [darkMode])


    const { user, repos, loading, error, fetchUserData } = useGithubUser()
    const [username, setUsername] = useState("")

    const handleSearch = () => {
        if (username.trim()) fetchUserData(username.trim())
    }

    return (
        <div className="min-h-screen flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900 relative transition-colors">
            {/* Toggle Dark Mode */}
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="absolute top-4 right-4 px-4 py-2 rounded-lg shadow 
             bg-gray-200 dark:bg-gray-700 
             text-gray-800 dark:text-white 
             transition"
            >
                {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            {/* Input + Button */}
            <div className="flex w-full max-w-md mb-6 shadow-md rounded overflow-hidden">
                <input
                    type="text"
                    placeholder="Entrez un username GitHub"
                    className="flex-1 p-3 border-none outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 font-medium transition-colors"
                >
                    Rechercher
                </button>
            </div>

            {/* Loading */}
            {loading && <p className="mb-4 text-gray-600 dark:text-gray-400">Chargement…</p>}

            {/* Erreur */}
            {error && <p className="mb-4 text-red-600 dark:text-red-400 font-medium">{error}</p>}

            {/* Contenu */}
            {user && (
                <div className="w-full max-w-4xl space-y-6">
                    <ProfileCard user={user} />
                    <RepoList repos={repos} />
                    {repos.length > 0 && <LanguageChart repos={repos} />}
                </div>
            )}
        </div>

    )
}
