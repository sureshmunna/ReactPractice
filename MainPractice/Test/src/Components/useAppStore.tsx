import { create } from "zustand"

interface Task {
    id: number
    text: string
    completed: boolean
}

interface TaskSlice {
    tasks: Task[]
    addTask: (text: string) => void
    deleteTask: (id: number) => void
    toggleTask: (id: number) => void
}

interface ThemeSlice {
    theme: "light" | "dark"
    toggleTheme: () => void
}

type AppStore = TaskSlice & ThemeSlice

const useAppStore = create<AppStore>((set) => ({
    tasks: [
        { id: 1, text: "Learn Zustand", completed: false },
        { id: 2, text: "Build AI project", completed: false }
    ],

    addTask: (text: string) => set(state => ({
        tasks: [
            ...state.tasks,
            { id: Date.now(), text, completed: false }
        ]
    })),

    deleteTask: (id: number) => set(state => ({
        tasks: state.tasks.filter(task => task.id !== id)
    })),

    toggleTask: (id: number) => set(state => ({
        tasks: state.tasks.map(task =>
            task.id === id
                ? { ...task, completed: !task.completed }
                : task
        )
    })),

    theme: "light",

    toggleTheme: () => set(state => ({
        theme: state.theme === "light" ? "dark" : "light"
    }))
}))

export default useAppStore