import { z } from 'zod';

export const loginUserSchema = z.object({
	email: z
		.string({ required_error: 'Email ist erforderlich' })
		.email({ message: 'Email ist ungültig' }),
	password: z.string({ required_error: 'Passwort ist erforderlich' })
});

export const changePasswordSchema = z
	.object({
		oldPassword: z.string({ required_error: 'Passwort ist erforderlich' }),
		password: z
			.string({ required_error: 'Passwort ist erforderlich' })
			.regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$\+!%*#?&.])[A-Za-z\d@$\+!%*#?&.]{8,}$/, {
				message:
					'Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben, eine Zahl und ein Sonderzeichen enthalten'
			}),
		passwordConfirm: z
			.string({ required_error: 'Passwort ist erforderlich' })
			.regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$\+!%*#?&.])[A-Za-z\d@$\+!%*#?&.]{8,}$/, {
				message:
					'Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben, eine Zahl und ein Sonderzeichen enthalten'
			})
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwörter stimmen nicht überein',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwörter stimmen nicht überein',
				path: ['passwordConfirm']
			});
		}
	});

export const registerUserSchema = z
	.object({
		name: z
			.string({ required_error: 'Name ist erforderlich' })
			.regex(/^[a-zA-Z\s]*$/, { message: 'Der Name darf nur Buchstaben und Leerzeichen enthalten' })
			.min(2, { message: 'Name muss mehr als 2 Zeichen haben' })
			.max(64, { message: 'Name muss weniger als 64 Zeichen haben' })
			.trim(),
		email: z
			.string({ required_error: 'Email ist erforderlich' })
			.email({ message: 'Email ist ungültig' }),
		password: z
			.string({ required_error: 'Passwort ist erforderlich' })
			.regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$\+!%*#?&])[A-Za-z\d@$\+!%*#?&]{8,}$/, {
				message:
					'Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben, eine Zahl und ein Sonderzeichen enthalten'
			}),
		passwordConfirm: z
			.string({ required_error: 'Passwort ist erforderlich' })
			.regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$\+!%*#?&])[A-Za-z\d@$\+!%*#?&]{8,}$/, {
				message:
					'Das Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben, eine Zahl und ein Sonderzeichen enthalten'
			})
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwörter stimmen nicht überein',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwörter stimmen nicht überein',
				path: ['passwordConfirm']
			});
		}
	});

export const editPollSchema = z.object({
	title: z.string()
		.min(4, { message: 'Titel muss mindestens 4 Zeichen lang sein' })
		.max(64, { message: 'Titel darf nicht länger als 64 Zeichen sein' })
		.trim(),
	description: z.string()
		.min(4, { message: 'Beschreibung muss mindestens 4 Zeichen lang sein' })
		.max(256, { message: 'Beschreibung darf nicht länger als 256 Zeichen sein' })
		.trim(),
});
