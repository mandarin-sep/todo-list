import React, { useState } from 'react'
import { isInputValid } from '@/shared/utils/isInputValid'

const TagInput = ({ submitTag }: { submitTag: (tag: string) => void }) => {
	const [tag, setTag] = useState('')
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!isInputValid(tag)) return

		submitTag(tag)
		setTag('')
	}
	return (
		<form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
			<input
				className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400"
				type="text"
				placeholder="태그를 입력하세요..."
				value={tag}
				onChange={(e) => setTag(e.target.value)}
			/>
			<button type="submit" className="shrink-0 rounded-lg bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-black">
				추가
			</button>
		</form>
	)
}

export default TagInput
