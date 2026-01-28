export const isInputValid = (target?: string) => {
    if(!target) return false
	return target?.trim() !== ''
}

 