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
	hostIDFS: string;
}

interface Question extends Record { 
	id: string;
	question: string;
	type: "modal" | "checkbox" | "free" | "select" | "radio" | "multiple" | "yesNo";
}

interface Vote extends Record { 
	vote: string;
}

interface userGroup extends Record {
	userIDFS: string;
	groupIDFS: string;
	weight: number;
}
