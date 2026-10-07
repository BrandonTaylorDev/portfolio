import { jobs, type Job } from './jobs';

export const profile = {
	name: 'Brandon Taylor',
	positioning: 'IT Leadership',
	introduction:
		'I help teams deliver better IT services by connecting people, technology, and business priorities. My experience spans team management, service improvement, and technology project delivery.'
};

export const achievements = [
	{
		value: '52%',
		label: 'Reduction in ticket resolution time',
		context: 'Led team efforts to improve support resolution strategies.',
		jobId: 'ius2'
	},
	{
		value: '43%',
		label: 'Increase in employee retention',
		context: 'Hired and mentored part-time support staff.',
		jobId: 'ius2'
	},
	{
		value: '$150k+',
		label: 'More than $150,000 in added revenue',
		context: 'Led the expansion of DevOps services to multiple customers.',
		jobId: 'lightchange'
	}
];

export const leadershipExperience = [
	{
		jobId: 'ius2',
		focus: 'People & service delivery',
		title: 'Building a stronger support operation.',
		copy: 'At Indiana University Southeast, I managed Support Services, hired and mentored part-time staff, and led improvements to ticket resolution. I also developed software to extend the inventory system and coordinated equipment sales that funded refreshes.',
		contribution: 'Team development · Service improvement · Resource stewardship'
	},
	{
		jobId: 'lightchange',
		focus: 'Service expansion & reliability',
		title: 'Connecting technical capability to business value.',
		copy: 'At LightChange Technologies, I led efforts to expand DevOps services to multiple customers, generating more than $150,000 in additional revenue. Alongside that work, I strengthened Kubernetes security and reliability and introduced Terraform resource definitions to simplify maintenance.',
		contribution: 'Service development · Platform reliability · Operational efficiency'
	},
	{
		jobId: 'ciscom2',
		focus: 'IT operations & project delivery',
		title: 'Delivering change with operational care.',
		copy: 'At CisCom Solutions, I delivered cloud, security, and disaster recovery projects, developed scopes of work and bills of materials, and led migrations with zero unplanned downtime. Business reviews with customers and account representatives connected delivery decisions to customer needs.',
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
		copy: 'Cloud services, workplace technology, and on-premises systems that support productive day-to-day work.',
		technologies: 'Microsoft Azure · Microsoft 365 · VMware'
	},
	{
		title: 'Business continuity',
		copy: 'Reliable platforms, thoughtful migrations, and recovery planning that support business continuity.',
		technologies: 'Kubernetes · HAProxy · Disaster recovery'
	},
	{
		title: 'Security & risk',
		copy: 'Access controls, least privilege, and practical security measures that help manage operational risk.',
		technologies: 'RBAC · Least privilege · Network security'
	},
	{
		title: 'Continuous improvement',
		copy: 'Standardized systems and repeatable workflows that reduce manual effort and simplify support.',
		technologies: 'Terraform · Ansible · PowerShell'
	}
];
