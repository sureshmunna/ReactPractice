import {useState, useTransition, useDeferredValue, Suspense, lazy, memo} from "react"

const generateItems = (count: number): string[] =>
    Array.from({ length: count }, (_, i) => `Item ${i + 1} — description text here`)

const ITEMS = generateItems(10000)


const HeavyList = memo(({ search }: { search: string }) => {
    // simulate expensive filter
    const filtered = ITEMS.filter(item =>
        item.toLowerCase().includes(search.toLowerCase())
    )

    console.log("HeavyList rendered — filtered:", filtered.length)

    return (
        <ul style={{ maxHeight: "200px", overflow: "auto", fontSize: "12px" }}>
            {filtered.slice(0, 50).map((item, i) => (
                <li key={i}>{item}</li>
            ))}
            {filtered.length > 50 && <li>...and {filtered.length - 50} more</li>}
        </ul>
    )
})
const UseTransitionDemo = () => {
    const [input, setInput] = useState("")
    const [search, setSearch] = useState("")
    const [isPending, startTransition] = useTransition()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setInput(e.target.value)

        
        startTransition(() => {
            setSearch(e.target.value)
        })
    }
    return (
        <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem" }}>
            <h3>useTransition Demo</h3>
            <p style={{ fontSize: "13px", color: "gray" }}>
                Input updates instantly. List filters when React has time.
            </p>
            <input
                value={input}
                onChange={handleChange}
                placeholder="Search 10,000 items..."
                style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            />
            {isPending && (
                <p style={{ color: "orange", fontSize: "12px" }}>
                    🔄 List updating...
                </p>
            )}
            <HeavyList search={search} />
        </div>
    )
}

const UseDeferredValueDemo = () => {
    const [search, setSearch] = useState("")

    // defer the value — input stays fast, list catches up
    const deferredSearch = useDeferredValue(search)

    const isStale = search !== deferredSearch // list hasn't caught up yet

    return (
        <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", marginBottom: "1rem" }}>
            <h3>useDeferredValue Demo</h3>
            <p style={{ fontSize: "13px", color: "gray" }}>
                Same result as useTransition but using deferred value.
            </p>
            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search 10,000 items..."
                style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
            />
            <div style={{ opacity: isStale ? 0.5 : 1, transition: "opacity 0.2s" }}>
                {isStale && (
                    <p style={{ color: "orange", fontSize: "12px" }}>
                        🔄 List catching up...
                    </p>
                )}
                <HeavyList search={deferredSearch} />
            </div>
        </div>
    )
}


const LazyCard = lazy(() =>
    // fake delay to simulate slow import
    new Promise<{ default: React.ComponentType }>(resolve =>
        setTimeout(() => resolve({
            default: () => (
                <div style={{ padding: "1rem", background: "#e8f5e9", borderRadius: "8px" }}>
                    <h4>✅ Lazy Loaded Component</h4>
                    <p>This component was loaded on demand — not on initial page load!</p>
                    <p>In a real app this would be a heavy page or feature.</p>
                </div>
            )
        }), 2000)
    )
)

const SuspenseDemo = () => {
    const [show, setShow] = useState(false)

    return (
        <div style={{ padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>Suspense + lazy() Demo</h3>
            <p style={{ fontSize: "13px", color: "gray" }}>
                Component loads only when needed — not on initial page load.
            </p>
            <button onClick={() => setShow(true)} disabled={show}>
                Load Component
            </button>
            {show && (
                <Suspense fallback={
                    <p style={{ color: "blue" }}>
                        ⏳ Loading component... (2 second delay simulated)
                    </p>
                }>
                    <LazyCard />
                </Suspense>
            )}
        </div>
    )
}


const ConcurrentDemo = () => {
    return (
        <div style={{ padding: "1rem", maxWidth: "800px" }}>
            <h2>Day 9 — Concurrent React</h2>
            <p style={{ color: "gray", marginBottom: "1rem" }}>
                Open console — watch renders. Type fast in both inputs and feel the difference.
            </p>
            <UseTransitionDemo />
            <UseDeferredValueDemo />
            <SuspenseDemo />
        </div>
    )
}

export default ConcurrentDemo