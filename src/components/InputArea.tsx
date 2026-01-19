import { useState } from 'react'
import { usePostTodo } from '../api/fetchList'
import { useTagStore } from '../store/useTagStore'
import { TodoInput } from './TodoInput'
import TagInput from './TagInput'
import Tag from './Tag'
import type { TodoItem } from '../types/todo'

const InputArea = () => {
	const [showTagInput, setShowTagInput] = useState(false)
	const [todoItem, setTodoItem] = useState<TodoItem | null>(null)
	const [tmpTagList, setTmpTagList] = useState<Array<string>>([])
	const { mutate: postTodo } = usePostTodo()
	const { addTag } = useTagStore()
	const handleAddTodo = (todoText: string) => {
		setTodoItem({ key: todoItem?.key || '', text: todoText, status: 'doing', tags: todoItem?.tags || [] })
		setShowTagInput(false)
		postTodo({ text: todoText, tags: tmpTagList })
		tmpTagList.forEach((tag: string) => {
			addTag(tag)
		})
	}

	const handleAddTag = (tag: string) => {
		setTmpTagList([...tmpTagList, tag])
		setTodoItem({ key: todoItem?.key || '', text: todoItem?.text || '', status: 'doing', tags: tmpTagList })
	}

	const deleteTmpTags = (targetTag: string) => {
		setTmpTagList(tmpTagList.filter((tag: string) => tag !== targetTag))
	}
	return (
		<div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
			<TodoInput submitTodo={handleAddTodo} setShowTagInput={setShowTagInput} showTagInput={showTagInput} />
			{showTagInput && <TagInput submitTag={handleAddTag} />}
			<div className="mt-3 flex flex-wrap gap-2">
				{tmpTagList.map((tag: string) => (
					<Tag key={tag} deleteTag={deleteTmpTags}>
						{tag}
					</Tag>
				))}
			</div>
		</div>
	)
}

export default InputArea
