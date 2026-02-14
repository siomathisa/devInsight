import type { GithubRepo } from "../services/githubApi"

export function getLanguageStats(repos: GithubRepo[]) {
  const stats: Record<string, number> = {}

  repos.forEach((repo) => {
    const lang = repo.language ?? "Unknown"
    stats[lang] = (stats[lang] ?? 0) + 1
  })

  const sorted = Object.entries(stats)
    .sort(([, a], [, b]) => b - a) // tri décroissant
    .slice(0, 5) // top 5

  return sorted.map(([language, count]) => ({
    language,
    count,
  }))
}
