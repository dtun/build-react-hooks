import { createRoot } from 'react-dom/client'

export function useState<State>(initialState: State) {
	const state = initialState
	const setState = () => {}

	return [state, setState] as const
}

function Counter() {
	const [count, setCount] = useState(0)
	// 🦺 you'll get an error for this we'll fix that next
	const increment = () => setCount(count + 1)

	return (
		<div className="counter">
			<button onClick={increment}>{count}</button>
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
const appRoot = createRoot(rootEl)
appRoot.render(<Counter />)
