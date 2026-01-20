import { createFileRoute } from '@tanstack/react-router'
import TodoPage from '../pages/TodoPage'

export const Route = createFileRoute('/')({
	component: App
})

function App() {

	return (
		<TodoPage />
	)
}
