import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

interface User {
    id: number
    name: string
    email: string
}


const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users")
    if (!res.ok) throw new Error("Failed to fetch")
    return res.json()
}

const fetchUser = async (id: number): Promise<User> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    if (!res.ok) throw new Error("Failed to fetch user")
    return res.json()
}


const UsersList = ({ onSelect }: { onSelect: (id: number) => void }) => {
    const { data: users, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        staleTime: 1000 * 30  
    })

    console.log("UsersList rendered")

    if (isLoading) return <p>Loading users...</p>
    if (isError) return <p>Error: {(error as Error).message}</p>

    return (
        <div>
            <h3>Users {isFetching && "🔄"}</h3>
            <button onClick={() => refetch()}>Refresh</button>
            <ul>
                {users?.map(user => (
                    <li
                        key={user.id}
                        onClick={() => onSelect(user.id)}
                        style={{ cursor: "pointer", padding: "4px", marginBottom: "4px", background: "#f0f0f0" }}
                    >
                        {user.name} — {user.email}
                    </li>
                ))}
            </ul>
        </div>
    )
}


const UserDetail = ({ userId }: { userId: number }) => {
    const { data: user, isLoading } = useQuery({
        queryKey: ["user", userId],   
        queryFn: () => fetchUser(userId),
        enabled: userId > 0           
    })

    if (isLoading) return <p>Loading...</p>

    return (
        <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>
        </div>
    )
}


const AddPostForm = () => {
    const queryClient = useQueryClient()
    const [title, setTitle] = useState("")

    const mutation = useMutation({
        mutationFn: async (title: string) => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, userId: 1 })
            })
            return res.json()
        },
        onSuccess: (data) => {
            console.log("Post created:", data)
            queryClient.invalidateQueries({ queryKey: ["posts"] })
            setTitle("")
        },
        onError: (error) => {
            console.error("Failed:", error)
        }
    })

    return (
        <div>
            <h3>Add Post (useMutation)</h3>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Post title"
            />
            <button
                onClick={() => mutation.mutate(title)}
                disabled={mutation.isPending || !title.trim()}
            >
                {mutation.isPending ? "Adding..." : "Add Post"}
            </button>
            {mutation.isSuccess && <p style={{ color: "green" }}>✅ Post created!</p>}
            {mutation.isError && <p style={{ color: "red" }}>❌ Failed!</p>}
        </div>
    )
}


const ReactQueryDemo = () => {
    const [selectedId, setSelectedId] = useState(0)

    return (
        <div style={{ padding: "1rem" }}>
            <h2>Day 8 — React Query</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <UsersList onSelect={setSelectedId} />
                <div>
                    {selectedId > 0
                        ? <UserDetail userId={selectedId} />
                        : <p style={{ color: "gray" }}>Click a user to see details</p>
                    }
                </div>
            </div>
            <hr />
            <AddPostForm />
        </div>
    )
}

export default ReactQueryDemo