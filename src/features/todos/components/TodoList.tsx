
import { useEditTag } from '../../tags/hooks/useEditTag'
import { useTodoFilters } from '../hooks/useTodoFilters'
import TagList from '../../tags/components/TagList'
import EditTagList from '../../tags/components/EditTagList'
import FilterBtns from './UI/FilterBtns'
import TodoItems from './TodoItems'
import type { TodoItem } from '../../../shared/types/todo'

export const TodoList = () => {
	const { displayedTags, selectedTag, editTagMode, handleCancelEditTags, handleEditTags, handleDeleteTag, setSelectedTag } = useEditTag()
	const { filteredByStatus, handleFilter, filter } = useTodoFilters({ selectedTag })

	return (
		<>
			<div>
				{editTagMode ?
					<EditTagList tags={displayedTags} editTagMode={editTagMode} handleEditTags={handleEditTags} selectedTag={selectedTag} setSelectedTag={setSelectedTag} cancelEdit={handleCancelEditTags} deleteTag={handleDeleteTag} /> :
					<TagList tags={displayedTags} editTagMode={editTagMode} handleEditTags={handleEditTags} selectedTag={selectedTag} setSelectedTag={setSelectedTag} />}
			</div>
			<FilterBtns filter={filter} handleFilter={handleFilter} />
			<ul className="space-y-3">
				{filteredByStatus.map((todo: TodoItem) => (
					<TodoItems key={todo.key} todo={todo} />
				))}
			</ul>
		</>
	)
}
