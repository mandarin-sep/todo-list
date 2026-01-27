import { useCallback, useState } from 'react'
import { usePostTodo } from '../api/fetchList'
import { useAddTag } from '../../tags/api/fetchTag'
import type { TodoItem } from '../../../shared/types/todo'


const useCreateTodoFetch = () => {
	const { mutateAsync: postTodo } = usePostTodo()
	const { mutateAsync: addTag } = useAddTag()

    const addTodo = useCallback(async (todoText: string, tmpTagList: Array<string>) => {
        try{
            await postTodo({ text: todoText, tags: tmpTagList })
            await addTag(tmpTagList)
        } catch (error) {
            console.error(error)
        }
    }, [postTodo, addTag])

    return {
        addTodo
    }
}

const useCreateTodoLocal = () => {
    const [showTagInput, setShowTagInput] = useState(false)
    const [todoItem, setTodoItem] = useState<TodoItem | null>(null)
	const [tmpTagList, setTmpTagList] = useState<Array<string>>([])

    const addTodo = useCallback((todoText: string) => {
        setTodoItem({ key: todoItem?.key || '', text: todoText, status: 'doing', tags: todoItem?.tags || [] })
		setShowTagInput(false)
        setTmpTagList([])
    }, [todoItem])

    const addTag = useCallback((tag: string) => {
        setTmpTagList([...tmpTagList, tag])
        setTodoItem({ key: todoItem?.key || '', text: todoItem?.text || '', status: 'doing', tags: [...todoItem?.tags || [], tag] })
    }, [tmpTagList, todoItem])

    const deleteTmpTags = useCallback((targetTag: string) => {
        setTmpTagList(tmpTagList.filter((tag: string) => tag !== targetTag))
        setTodoItem({ key: todoItem?.key || '', text: todoItem?.text || '', status: 'doing', tags: todoItem?.tags || [] })
    }, [tmpTagList, todoItem])
    
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
    const handleAddTodo = useCallback((todoText: string) => {
		local.addTodo(todoText)
		server.addTodo(todoText, local.tmpTagList)
	}, [local.addTodo, server.addTodo, local.tmpTagList])

	const handleAddTag = useCallback((tag: string) => {
        local.addTag(tag)
    }, [local.addTag])

	const deleteTmpTags = useCallback((targetTag: string) => {
		local.deleteTmpTags(targetTag)
	}, [local.deleteTmpTags])

    return {
        ...local,
        handleAddTodo,
        handleAddTag,
        deleteTmpTags,
    }
}
