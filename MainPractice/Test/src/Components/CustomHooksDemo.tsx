import { useState } from "react"
import useFetch from "./hooks/useFetch"
import useLocalStorage from "./hooks/useLocalStorage"
import useDebounce from "./hooks/useDebounce"

interface User {
    id: number
    name: string
    email: string
}

const CustomHooksDemo = () => {
    
    const { data: users, loading, error } = useFetch<User[]>(
        "https://jsonplaceholder.typicode.com/users"
    )
    
    const [theme, setTheme] = useLocalStorage<string>("theme", "light")
    const [name, setName] = useLocalStorage<string>("savedName", "")

    const [search, setSearch] = useState<string>("")
    const debouncedSearch = useDebounce<string>(search, 500)

    const filteredUsers = users?.filter(u =>
        u.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    ) ?? []

    return (
        <div style={{
            padding: "1rem",
            background: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#333",
            minHeight: "100vh"
        }}>
            <h2>Custom Hooks Demo</h2>

            {/* useLocalStorage — theme */}
            <section>
                <h3>useLocalStorage — theme persists on refresh</h3>
                <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    Theme: {theme}
                </button>
            </section>

            <hr />

            {/* useLocalStorage — name */}
            <section>
                <h3>useLocalStorage — name persists on refresh</h3>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Type your name — refresh page!"
                />
                <p>Saved name: {name}</p>
            </section>

            <hr />

            {/* useDebounce + useFetch */}
            <section>
                <h3>useDebounce — search filters after 500ms pause</h3>
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search users..."
                />
                <p style={{ fontSize: "12px", color: "gray" }}>
                    Typing: "{search}" | Debounced: "{debouncedSearch}"
                </p>
            </section>

            <hr />

            {/* useFetch — show users */}
            <section>
                <h3>useFetch — fetches users automatically</h3>
                {loading && <p>Loading users...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                <ul>
                    {filteredUsers.map(user => (
                        <li key={user.id}>
                            <strong>{user.name}</strong> — {user.email}
                        </li>
                    ))}
                </ul>
                {filteredUsers.length === 0 && !loading && (
                    <p>No users found for "{debouncedSearch}"</p>
                )}
            </section>
        </div>
    )
}

export default CustomHooksDemo