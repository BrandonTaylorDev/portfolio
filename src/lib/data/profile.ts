import { jobs, type Job } from './jobs';

export const profile = {
	name: 'Brandon Taylor',
	positioning: 'IT Leadership',
	introduction:
		'I lead people, improve IT services, and connect technology decisions to organizational priorities. My experience in people management, support operations, and project leadership shapes how I develop staff, strengthen services, and guide change.'
};

export const achievements = [
	{
		value: '43%',
		label: 'Increase in employee retention',
		context: 'Hired and mentored part-time support staff, strengthening team retention.',
		jobId: 'ius2'
	},
	{
		value: '52%',
		label: 'Reduction in ticket resolution time',
		context: 'Led the team in improving ticket resolution strategies and support performance.',
		jobId: 'ius2'
	},
	{
		value: '$150k+',
		label: 'More than $150,000 in added revenue',
		context: 'Led organizational efforts to expand services to multiple customers.',
		jobId: 'lightchange'
	}
];

export const leadershipExperience = [
	{
		jobId: 'ius2',
		focus: 'People & service delivery',
		title: 'Building a stronger support operation.',
		copy: 'I managed Support Services, hired and mentored part-time staff, and led improvements to ticket resolution. I extended inventory capabilities and coordinated annual equipment sales to help fund equipment refreshes.',
		outcome:
			'Team efforts reduced ticket resolution time by 52%. Hiring and mentoring increased employee retention by 43%.',
		contribution: 'Team development · Service improvement · Resource stewardship'
	},
	{
		jobId: 'lightchange',
		focus: 'Service expansion & reliability',
		title: 'Connecting technical capability to business value.',
		copy: 'I led efforts to expand DevOps services to multiple customers. I strengthened platform reliability and access controls, directed a migration to a more resilient environment, and simplified maintenance with Terraform.',
		outcome: 'Expanded service offerings generated more than $150,000 in additional revenue.',
		contribution: 'Service development · Platform reliability · Operational efficiency'
	},
	{
		jobId: 'ciscom2',
		focus: 'Project leadership & customer priorities',
		title: 'Delivering change with operational care.',
		copy: 'I planned technology projects with scopes of work, work breakdown structures, and bills of materials. Business reviews with customers and account representatives addressed operational needs and revenue opportunities. I also mentored junior staff.',
		outcome:
			'Led complex migrations with no unplanned downtime, protecting customer operations during change.',
		contribution: 'Project planning · Customer collaboration · Business continuity'
	}
];

export function jobFor(id: string): Job {
	const job = jobs.find((entry) => entry.id === id);
	if (!job) throw new Error(`Profile references an unknown job: ${id}`);
	return job;
}

export const foundations = [
	{
		title: 'IT service delivery',
		copy: 'Understand the services people depend on, connect IT capabilities to organizational needs, and keep service quality central to operational decisions.',
		technologies: 'Microsoft Azure · Microsoft 365 · VMware'
	},
	{
		title: 'Business continuity',
		copy: 'Plan migrations and recovery with business operations in mind. Use experience with resilient platforms to assess continuity needs and reduce disruption during change.',
		technologies: 'Kubernetes · HAProxy · Disaster recovery'
	},
	{
		title: 'Security & risk',
		copy: 'Make informed decisions about access controls, least privilege, and network security, balancing practical protection with the needs of people using the services.',
		technologies: 'RBAC · Least privilege · Network security'
	},
	{
		title: 'Continuous improvement',
		copy: 'Help teams work more effectively through standardization, repeatable processes, and automation that reduces manual effort and makes services easier to support.',
		technologies: 'Terraform · Ansible · PowerShell'
	}
];
