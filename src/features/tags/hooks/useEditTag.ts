import { useCallback, useState } from 'react'
import { useGetTags, usePostTags } from '../api/fetchTag'

const useEditTagFetch = () => {
    const { data: tags = [] } = useGetTags()
	const { mutate: postTags } = usePostTags()

    const addTags = useCallback((editedTags: Array<string>) => {
        postTags(editedTags)
    }, [postTags])
    return {
        tags,
        addTags
    }
}
const useEditTagLocal = ({ tags }: { tags: Array<string> }) => {
    const [selectedTag, setSelectedTag] = useState<string>('')
    const [editTagMode, setEditTagMode] = useState<boolean>(false)
    const [localTags, setLocalTags] = useState<Array<string>>(tags)

    const editModeOn = useCallback( (serverTags: Array<string>) => {
        setLocalTags(serverTags)
        setEditTagMode(true)
    }, [setLocalTags, setEditTagMode])
    const editModeOff = useCallback(() => {
        setEditTagMode(false)
    }, [setEditTagMode])  
    const deleteTag = useCallback((tag: string) => {
        setLocalTags(localTags.filter((current: string) => current !== tag))
    }, [localTags])
    const cancelEditMode = useCallback((serverTags: Array<string>) => {
        setLocalTags(serverTags)
        setEditTagMode(false)
    }, [setLocalTags, setEditTagMode])
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

const isDuplicate = (target: string, list: Array<string>) => {
    return list.includes(target)
}

export const useEditTag = () => {
    const server = useEditTagFetch()
    const local = useEditTagLocal({ tags: server.tags })

    const handleEditTags = useCallback((editedTags: Array<string>) => {
		if (local.editTagMode) {
            const uniqueTags = editedTags.filter((tag: string) => !isDuplicate(tag, server.tags))
            server.addTags(uniqueTags)
            local.editModeOff() 
		} else {
            local.editModeOn(editedTags)
		}
	}, [local.editTagMode, server.tags, local.editModeOff, local.editModeOn])
	const handleDeleteTag = useCallback((tag: string) => {
		local.deleteTag(tag)
	}, [local.deleteTag])

	const handleCancelEditTags = useCallback(() => {
        local.cancelEditMode(server.tags)
	}, [local.cancelEditMode, server.tags])
	const displayedTags = local.editTagMode ? local.localTags : server.tags
    
    
    return {
        ...local,
        displayedTags,
        handleEditTags,
        handleDeleteTag,
        handleCancelEditTags,
    }
}
