import type { z, ZodError } from 'zod';

const { randomBytes } = await import('node:crypto');

export const serializeNonPOJOs = <T>(obj: T): T => {
	return structuredClone(obj);
};

export const generateUsername = (name: string) => {
	const id = randomBytes(2).toString('hex');
	return `${name.slice(0, 5)}${id}`;
};

export const validateData = async <T extends z.ZodTypeAny>(
	formData: FormData,
	schema: T
): Promise<{ formData: z.infer<T>; errors: z.inferFlattenedErrors<typeof schema> | null }> => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return { formData: data, errors: null };
	} catch (err) {
		console.error(err);
		const errors = (err as ZodError).flatten();
		return { formData: body as z.infer<T>, errors };
	}
};

export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `https://ollis-pocketbase.fly.dev/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const getCurrentTheme = () => {
	let theme = 'light';
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		theme = 'dark';
	}
	return document.documentElement.getAttribute('data-theme') || theme;
};
