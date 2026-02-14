import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import type { GithubRepo } from "../services/githubApi"
import { getLanguageStats } from "../utils/languageStats"

interface LanguageChartProps {
    repos: GithubRepo[]
}

const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CF0",
]

export function LanguageChart({ repos }: LanguageChartProps) {
    const data = getLanguageStats(repos)

    return (
        <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Langages utilisés</h3>
            <div className="w-full h-64 opacity-0 animate-fadeIn">
                <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="language"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value?: number, name?: string) => {
                            return [`${value ?? 0} repo(s)`, name ?? "Unknown"]
                        }}
                    />

                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}
