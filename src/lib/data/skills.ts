export interface Skills {
	platforms: string[];
	languagesFrameworks: string[];
	cloudInfrastructure: string[];
	databaseTools: string[];
}

export const skills: Skills = {
	platforms: ['Linux', 'Windows Server', 'Node.js'],
	languagesFrameworks: [
		'JavaScript',
		'TypeScript',
		'Go',
		'Python',
		'Bash',
		'Vue',
		'Nuxt',
		'React',
		'Next.js',
		'Svelte'
	],
	cloudInfrastructure: [
		'Microsoft Azure',
		'Kubernetes',
		'Docker',
		'HA Proxy',
		'Ansible',
		'RabbitMQ',
		'Redis'
	],
	databaseTools: ['MongoDB', 'PostgreSQL', 'Cosmos DB', 'CI/CD', 'Git', 'GitHub Actions']
};
