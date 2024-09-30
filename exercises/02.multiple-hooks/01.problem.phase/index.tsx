import { createRoot } from 'react-dom/client'

const PHASE_INITIALIZATION = Symbol('PHASE_INITIALIZATION')
const PHASE_UPDATE = Symbol('PHASE_UPDATE')

type Phase = typeof PHASE_INITIALIZATION | typeof PHASE_UPDATE

let phase: Phase = PHASE_INITIALIZATION

let state: any, setState: any

export function useState<State>(initialState: State) {
	if (phase === PHASE_INITIALIZATION) {
		state = initialState
		setState = (newState: State) => {
			state = newState
			render(PHASE_UPDATE)
		}
	}
	return [state, setState] as [State, (newState: State) => void]
}

function Counter() {
	const [count, setCount] = useState(0)
	const increment = () => setCount(count + 1)

	const [enabled, setEnabled] = useState(true)
	const toggle = () => setEnabled(!enabled)

	return (
		<div className="counter">
			<button onClick={toggle}>{enabled ? 'Disable' : 'Enable'}</button>
			<button disabled={!enabled} onClick={increment}>
				{count}
			</button>
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
const appRoot = createRoot(rootEl)

function render(newPhase: Phase) {
	phase = newPhase

	appRoot.render(<Counter />)
}

render(PHASE_INITIALIZATION)
