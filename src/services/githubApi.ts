// Type pour le profil GitHub
export interface GithubUser {
  login: string
  avatar_url: string
  bio: string | null
  followers: number
  following: number
  public_repos: number
}

// Type pour un repository
export interface GithubRepo {
  id: number
  name: string
  stargazers_count: number
  language: string | null
  html_url: string
}

// Récupérer un utilisateur
export async function getUser(username: string): Promise<GithubUser> {
  const response = await fetch(
    `https://api.github.com/users/${username}`
  )

  if (!response.ok) {
    throw new Error("Utilisateur introuvable")
  }

  return response.json()
}

// Récupérer les repos
export async function getUserRepos(username: string): Promise<GithubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  )

  if (!response.ok) {
    throw new Error("Impossible de récupérer les repos")
  }

  return response.json()
}
