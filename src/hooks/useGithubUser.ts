import { useState } from "react"
import { getUser, getUserRepos } from "../services/githubApi"
import type { GithubUser, GithubRepo } from "../services/githubApi"


interface UseGithubUserReturn {
  user: GithubUser | null
  repos: GithubRepo[]
  loading: boolean
  error: string | null
  fetchUserData: (username: string) => Promise<void>
}

export function useGithubUser(): UseGithubUserReturn {
  const [user, setUser] = useState<GithubUser | null>(null)
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUserData = async (username: string) => {
    try {
      setLoading(true)
      setError(null)

      const userData = await getUser(username)
      const reposData = await getUserRepos(username)

      setUser(userData)
      setRepos(reposData)
    } catch (err) {
      setError("Erreur lors de la récupération des données")
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    repos,
    loading,
    error,
    fetchUserData,
  }
}
