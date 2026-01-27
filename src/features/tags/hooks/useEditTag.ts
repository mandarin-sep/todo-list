import { useState } from 'react'
import { useGetTags, usePostTags } from '../api/fetchTag'

const useEditTagFetch = () => {
    const { data: tags = [] } = useGetTags()
	const { mutate: postTags } = usePostTags()

    const addTags = (editedTags: Array<string>) => {
        postTags(editedTags)
    }
    return {
        tags,
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

const isDuplicate = (target: string, list: Array<string>) => {
    return list.includes(target)
}

export const useEditTag = () => {
    const server = useEditTagFetch()
    const local = useEditTagLocal({ tags: server.tags })

    const handleEditTags = (editedTags: Array<string>) => {
		if (local.editTagMode) {
            const uniqueTags = editedTags.filter((tag: string) => !isDuplicate(tag, server.tags))
            server.addTags(uniqueTags)
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
