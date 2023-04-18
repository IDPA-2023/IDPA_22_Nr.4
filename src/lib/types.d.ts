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
	load: any;
	loadExpand: any;
	isNew: any;
	clone: any;
	export: any;
}

interface Question extends Record {
	id: string;
	question: string;
	type: 'free' | 'select' | 'multiple' | 'yesNo';
}

interface Vote extends Record {
	vote: string;
}

interface Group extends Record {
	id: string;
	hostIDFS: string;
	name: string;
}

interface UserGroup extends Record {
	id: string;
	userIDFS: string;
	groupIDFS: string;
	weight: number;
}

interface Option extends Record {
	id: string;
	questionIDFS: string;
	option: string;
}
