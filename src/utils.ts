export const isNoUOrEmptyString = (
	value: string | undefined | null,
): boolean => {
	return value === undefined || value === null || value === "";
};
