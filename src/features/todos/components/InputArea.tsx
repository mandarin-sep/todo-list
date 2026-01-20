import { useCreateTodo } from '../hooks/useCreateTodo'
import TagInput from '../../tags/components/UI/TagInput'
import Tag from '../../tags/components/UI/Tag'
import { TodoInput } from './UI/TodoInput'

const InputArea = () => {
    const { showTagInput, tmpTagList, setShowTagInput, handleAddTodo, handleAddTag, deleteTmpTags } = useCreateTodo()

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
