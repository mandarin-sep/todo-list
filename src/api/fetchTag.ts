const getTag = async () => {
	const response = await fetch('https://api.github.com/tags')
	return response.json()
}

export default getTag
