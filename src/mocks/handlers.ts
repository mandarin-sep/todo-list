import { HttpResponse, delay, http } from 'msw'
import type { TodoItem } from '../types/todo'

let todos: Array<TodoItem> = [
	{ key: '1', text: 'Learn MSW', status: 'doing', tags: ['MSW'] },
	{ key: '2', text: 'Connect Axios', status: 'done', tags: ['Axios'] },
	{ key: '3', text: 'Create Todo List', status: 'done', tags: ['Todo List'] },
]

export const handlers = [
	http.get('/api/todos', async () => {
		await delay(400)
		return HttpResponse.json({ data: todos }, { status: 200 })
	}),

	http.post('/api/todos', async ({ request }) => {
		await delay(400)
		const body = (await request.json()) as TodoItem

		const newTodo: TodoItem = {
			key: crypto.randomUUID().toString(),
			text: body.text || '',
			status: 'doing',
			tags: body.tags
		}

		todos = [...todos, newTodo]

		return HttpResponse.json({ data: newTodo }, { status: 201 })
	}),

	http.patch('/api/todos/:key', async ({ params, request }) => {
		await delay(400)
		const body = (await request.json()) as Partial<TodoItem>
		const { key } = params
		const todo = todos.find((t) => t.key === key)
		if (!todo) {
			return HttpResponse.json({ error: 'Todo not found' }, { status: 404 })
		}
		if (typeof body.text === 'string') {
			todo.text = body.text
		}
		if (Array.isArray(body.tags)) {
			todo.tags = body.tags
		}
		if (body.status === 'doing' || body.status === 'done') {
			todo.status = body.status
		}
		return HttpResponse.json({ data: todo }, { status: 200 })
	}),

	http.delete('/api/todos/:key', async ({ params }) => {
		await delay(400)
		const { key } = params
		todos = todos.filter((t) => t.key !== key)
		return HttpResponse.json({ data: { message: 'Todo deleted' } }, { status: 200 })
	}),
]
