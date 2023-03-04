import { loginUserSchema, registerUserSchema } from '$lib/schemas';
import { generateUsername, serializeNonPOJOs, validateData } from '$lib/utils';
import { describe, it, expect, beforeEach } from 'vitest';

describe('lib utils tests', () => {
	it('should create structured clone', () => {
		const obj = { a: 1, b: { c: 2, d: '2' } };
		const clone = serializeNonPOJOs<typeof obj>(obj);
		expect(clone).toEqual(obj);
	});

	it('should generate username', () => {
		const name = 'Maximilian Müller';
		const username = generateUsername(name);
		expect(username).toMatch(/^Maxim\S{4}$/);
	});

	it('should validate', async () => {
		const form = new FormData();
		form.append('email', 'Maximilian Müller');
		form.append('password', '123456');
		const { formData, errors } = await validateData(form, loginUserSchema);
	});
});

describe('login schema tests', () => {
	let form: FormData;
	beforeEach(() => {
		form = new FormData();
	});

	it('test invalid email', async () => {
		form.append('email', 'Maximilian Müller');
		form.append('password', '123456');
		const { formData, errors } = await validateData(form, loginUserSchema);
		expect(errors?.fieldErrors?.email).toStrictEqual(['Email ist ungültig']);
	});

	it('test required email', async () => {
		const { formData, errors } = await validateData(form, loginUserSchema);
		expect(errors?.fieldErrors?.email).toStrictEqual(['Email ist erforderlich']);
	});

	it('test required password', async () => {
		const { formData, errors } = await validateData(form, loginUserSchema);
		expect(errors?.fieldErrors?.password).toStrictEqual(['Passwort ist erforderlich']);
	});
});

describe('register schema tests', () => { 
	let form: FormData;
	beforeEach(() => {
        form = new FormData();
	});
	
	it('test required name', async () => { 
		const { formData, errors } = await validateData(form, registerUserSchema);
		expect(errors?.fieldErrors?.name).toStrictEqual(['Name ist erforderlich']);
	});

	it('test alphanumeric name', async () => {
		form.append('name', 'Max1');
		const { formData, errors } = await validateData(form, registerUserSchema);
		expect(errors?.fieldErrors?.name).toStrictEqual([
			'Der Name darf nur Buchstaben und Leerzeichen enthalten'
		]);
	})

	it('test short name', async () => {
		form.append('name', 'M');
		const { formData, errors } = await validateData(form, registerUserSchema);
		expect(errors?.fieldErrors?.name).toStrictEqual(['Name muss mehr als 2 Zeichen haben']);
	})
	
	it('test long name', async () => {
		form.append('name', 'this is a very long name that is not allowed to be used as a name');
		const { formData, errors } = await validateData(form, registerUserSchema);
		expect(errors?.fieldErrors?.name).toStrictEqual(['Name muss weniger als 64 Zeichen haben']);
	})

	it('test required email', async () => { 
        const { formData, errors } = await validateData(form, registerUserSchema);
        expect(errors?.fieldErrors?.email).toStrictEqual(['Email ist erforderlich']);
    });
	
	it('test invalid email', async () => { 
		form.append('email', 'Maximilian Müller');
        const { formData, errors } = await validateData(form, registerUserSchema);
        expect(errors?.fieldErrors?.email).toStrictEqual(['Email ist ungültig']);
    });
	
	it('test required password', async () => { 
        const { formData, errors } = await validateData(form, registerUserSchema);
        expect(errors?.fieldErrors?.password).toStrictEqual(['Passwort ist erforderlich']);
    });
	
	it('test invalid password', async () => { 
		form.append('password', '123456');
        const { formData, errors } = await validateData(form, registerUserSchema);
        expect(errors?.fieldErrors?.password).toStrictEqual([
					'Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben, eine Zahl und ein Sonderzeichen enthalten'
				]);
	});
})
