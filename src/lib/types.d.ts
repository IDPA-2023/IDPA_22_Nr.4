import type { Record } from 'pocketbase';

interface User extends Record {
	id: string;
	username: string;
	email: string;
	name: string;
	avatar?: string;
}
