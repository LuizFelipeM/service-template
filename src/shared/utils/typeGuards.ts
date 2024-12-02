/**
 * Function responsible for checking if the unknown object is of type T
 * @param value Unknown object that need to be type checked
 * @param propIdentifiers Props that must be in the object so the object is considered of a object of type T
 * @returns True if the unknown object is of type T
 */
export const isObject = <T>(
	value: unknown,
	...propIdentifiers: Array<keyof T>
): value is T =>
	typeof value === 'object' &&
	propIdentifiers.reduce((prev, prop) => prev && prop in value, true)
