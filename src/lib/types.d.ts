import type { Record } from 'pocketbase';

interface User extends Record {
	id: string;
	username: string;
	email: string;
	name: string;
	avatar?: string;
}

interface Poll extends Record {
	id: string;
	name: string;
	public: boolean;
	requireLogin: boolean;
	description: string;
}

interface Question extends Record { 
	id: string;
	question: string;
	type: "free" | "select" | "multiple" | "yesNo";
}

interface Vote extends Record { 
	vote: string;
}

interface Option extends Record {
	id: string;
	questionIDFS: string;
	option: string;
}