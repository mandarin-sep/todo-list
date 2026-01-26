import { useState } from 'react'
import { usePostTodo } from '../api/fetchList'
import { useAddTag } from '../../tags/api/fetchTag'
import type { TodoItem } from '../../../shared/types/todo'


const useCreateTodoFetch = () => {
	const { mutateAsync: postTodo } = usePostTodo()
	const { mutateAsync: addTag } = useAddTag()

    const addTodo = async (todoText: string, tmpTagList: Array<string>) => {
        try{
            await postTodo({ text: todoText, tags: tmpTagList })
            await addTag(tmpTagList)
        } catch (error) {
            console.error(error)
        }
    }

    return {
        addTodo
    }
}

const useCreateTodoLocal = () => {
    const [showTagInput, setShowTagInput] = useState(false)
    const [todoItem, setTodoItem] = useState<TodoItem | null>(null)
	const [tmpTagList, setTmpTagList] = useState<Array<string>>([])

    const addTodo = (todoText: string) => {
        setTodoItem({ key: todoItem?.key || '', text: todoText, status: 'doing', tags: todoItem?.tags || [] })
		setShowTagInput(false)
        setTmpTagList([])
    }

    const addTag = (tag: string) => {
        setTmpTagList([...tmpTagList, tag])
        setTodoItem({ key: todoItem?.key || '', text: todoItem?.text || '', status: 'doing', tags: [...todoItem?.tags || [], tag] })
    }

    const deleteTmpTags = (targetTag: string) => {
        setTmpTagList(tmpTagList.filter((tag: string) => tag !== targetTag))
        setTodoItem({ key: todoItem?.key || '', text: todoItem?.text || '', status: 'doing', tags: todoItem?.tags || [] })
    }
    return {
        showTagInput,
        todoItem,
        tmpTagList,
        setShowTagInput,
        setTodoItem,
        setTmpTagList,
        addTodo,
        addTag,
        deleteTmpTags
    }
}

export const useCreateTodo = () => {
    const server = useCreateTodoFetch()
    const local = useCreateTodoLocal()
    const handleAddTodo = (todoText: string) => {
		local.addTodo(todoText)
		server.addTodo(todoText, local.tmpTagList)
	}

	const handleAddTag = (tag: string) => {
        local.addTag(tag)
    }

	const deleteTmpTags = (targetTag: string) => {
		local.deleteTmpTags(targetTag)
	}

    return {
        ...local,
        handleAddTodo,
        handleAddTag,
        deleteTmpTags,
    }
}
