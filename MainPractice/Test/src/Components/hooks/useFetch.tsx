import { useState, useEffect } from "react"
interface FetchState<T> {
    data: T | null
    loading: boolean
    error: string | null
} 

const useFetch = <T,>(url: string): FetchState<T> => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const controller = new AbortController()
        setLoading(true)
        setError(null)

        const fetchData = async () => {
            try {
                const res = await fetch(url, { signal: controller.signal })

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }

                const result: T = await res.json()
                setData(result)
            } catch (err) {
                if (err instanceof Error) {
                    if (err.name === "AbortError") return
                    setError(err.message)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        return () => controller.abort()
    }, [url]) // re-fetches when url changes

    return { data, loading, error }
}
export default useFetch;