import React from 'react'
import { X } from 'lucide-react'

const Tag = ({ deleteTag, children }: { deleteTag: (tag: string) => void; children: React.ReactNode }) => {
	return (
		<span className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-2 py-0.5 text-xs text-white shadow-sm">
			<span className="font-medium">{children}</span>
			<button
				type="button"
				onClick={() => deleteTag(children as string)}
				className="ml-0.5 inline-flex h-4 w-4 items-center justify-center text-gray-300"
				aria-label="태그 삭제"
			>
				<X className="h-3.5 w-3.5" aria-hidden />
			</button>
		</span>
	)
}

export default Tag
