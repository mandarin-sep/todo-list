import { useState } from 'react'
import { useGetTags, usePostTags } from '../api/fetchTag'
import { useGetTodoList } from '../../todos/api/fetchList'


const useEditTagFetch = () => {
    const { data: tags = [] } = useGetTags()
    const { refetch: refetchTodos } = useGetTodoList()
	const { mutate: postTags } = usePostTags()

    const addTags = (editedTags: Array<string>) => {
        postTags(editedTags, {
            onSettled: () => {
                refetchTodos()
            }
        })
    }
    return {
        tags,
        refetchTodos,
        postTags,
        addTags
    }
}
const useEditTagLocal = ({ tags }: { tags: Array<string> }) => {
    const [selectedTag, setSelectedTag] = useState<string>('')
    const [editTagMode, setEditTagMode] = useState<boolean>(false)
    const [localTags, setLocalTags] = useState<Array<string>>(tags)

    const editModeOn = (serverTags: Array<string>) => {
        setLocalTags(serverTags)
        setEditTagMode(true)
    }
    const editModeOff = () => {
        setEditTagMode(false)
    }
    const deleteTag = (tag: string) => {
        setLocalTags(localTags.filter((current: string) => current !== tag))
    }
    const cancelEditMode = (serverTags: Array<string>) => {
        setLocalTags(serverTags)
        setEditTagMode(false)
    }
    return {
        selectedTag,
        setSelectedTag,
        editTagMode,
        setEditTagMode,
        localTags,
        setLocalTags,
        editModeOn,
        editModeOff,
        deleteTag,
        cancelEditMode
    }
}

export const useEditTag = () => {
    const server = useEditTagFetch()
    const local = useEditTagLocal({ tags: server.tags })

    const handleEditTags = (editedTags: Array<string>) => {
		if (local.editTagMode) {
			server.addTags(editedTags)
			local.editModeOff()
		} else {
            local.editModeOn(editedTags)
		}
	}

	const handleDeleteTag = (tag: string) => {
		local.deleteTag(tag)
	}

	const handleCancelEditTags = () => {
        local.cancelEditMode(server.tags)
	}
	const displayedTags = local.editTagMode ? local.localTags : server.tags
    
    
    return {
        ...local,
        displayedTags,
        handleEditTags,
        handleDeleteTag,
        handleCancelEditTags,
    }
}