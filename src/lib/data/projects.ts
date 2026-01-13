export interface Project {
	id: string;
	name: string;
	tags: string[];
	description: string;
}

export const projects: Project[] = [
	{
		id: 'monolithic',
		name: 'Monolithic',
		tags: ['Microservices', 'Containerization'],
		description: 'Enterprise-grade platform for B2B...'
	}
];
