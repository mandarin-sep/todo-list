
const TagList = ({
	tags,
	editTagMode,
	selectedTag,
	setSelectedTag,
	handleEditTags
}: {
	tags: Array<string>
	editTagMode: boolean
	selectedTag: string
	setSelectedTag: (tag: string) => void
	handleEditTags: (tags: Array<string>) => void
}) => {
	return (
		<>
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium text-gray-500">태그 필터</span>
				<div>
					<button
						onClick={() => handleEditTags(tags)}
						className={`inline-flex h-7 items-center rounded-full px-4 text-xs font-medium ${editTagMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
							}`}
					>
						편집
					</button>

				</div>
			</div>
			<div className="mt-3 flex flex-wrap items-center gap-2">
				<button
					onClick={() => setSelectedTag('')}
					className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${selectedTag === '' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
						}`}
				>
					모든 태그
				</button>
				{
					tags.map((tag: string) => (
						<button
							key={tag}
							onClick={() => setSelectedTag(tag)}
							className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${selectedTag === tag ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
								}`}
						>
							{tag}
						</button>
					))}
			</div>
		</>
	)
}

export default TagList
