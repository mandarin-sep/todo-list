const FilterBtns = ({ filter, handleFilter }: { filter: '' | 'doing' | 'done'; handleFilter: (value: '' | 'doing' | 'done') => void }) => {
	const filterOptions: Array<{ value: '' | 'doing' | 'done'; label: string }> = [
		{ value: '', label: '전체' },
		{ value: 'doing', label: '진행중' },
		{ value: 'done', label: '완료' }
	]
	return (
		<div className="mb-4 grid grid-cols-3 gap-2">
			{filterOptions.map(({ value, label }) => (
				<button
					key={value || 'all'}
					onClick={() => handleFilter(value)}
					className={`w-full rounded-lg px-4 py-3 text-base font-medium ${
						filter === value ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
					}`}
				>
					{label}
				</button>
			))}
		</div>
	)
}

export default FilterBtns
