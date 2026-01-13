export interface Job {
	id: string;
	title: string;
	company: string;
	start: string;
	end: string | null;
	bullets: string[];
}

export const jobs: Job[] = [
	{
		id: 'ciscom2',
		title: 'Professional Services / Cloud & Security Project Engineer',
		company: 'CisCom Solutions',
		start: '2025-07-01',
		end: null,
		bullets: [
			'Led cloud migration projects, transitioning clients to Microsoft Azure & Entra ID.',
			'Implemented Zero Trust security models to enhance organizational security postures.',
			'Conducted security audits and compliance assessments for various industries.',
			'Operated closely with clients to identify pain points, design solutions, and ensure a successful deployment.',
			'Delivered training sessions and documentation to empower local IT teams.'
		]
	},
	{
		id: 'ciscom1',
		title: 'Technical Services / System Engineer',
		company: 'CisCom Solutions',
		start: '2025-02-01',
		end: '2025-07-01',
		bullets: [
			'Ensured penetration testing and vulnerability assessment continuity for client infrastructure.',
			'BCDR planning and implementation for small to medium-sized businesses.',
			'Managed and maintained virtualized environments using VMware and Hyper-V/Failover Clustering.',
			'Configured and supported network infrastructure, including firewalls, switches, and routers.',
			'Provided advanced troubleshooting and support for Windows Server environments.'
		]
	},
	{
		id: 'lightchange',
		title: 'Platform Engineer',
		company: 'LightChange Technologies',
		start: '2022-07-01',
		end: '2025-02-01',
		bullets: [
			'Elevated Kubernetes environments by implementing best practices, resulting in 99.999% uptime.',
			'Enhanced security posture by implementing Kubernetes RBAC roles and least privilege.',
			'Led organizational efforts to expand DevOps service offerings to multiple customers, leading to an increased revenue of more than $150,000.',
			'Migrated to Terraform resource definitions to enhance system portability and simplified maintenance.',
			'Invented novel network scanning software that dedicated and reported unknown TLS certificates across networks.',
			'Directed seamless migration to high resilience environment leveraging HA Proxy.',
			'Augmented Bind9 to handle high-throughput DNS resolution for multiple Kentucky-based ISPs.',
			'Performed on-premises Exchange migrations to Microsoft Exchange Online.'
		]
	},
	{
		id: 'ius2',
		title: 'Manager, Support Services',
		company: 'Indiana University Southeast',
		start: '2021-04-01',
		end: '2022-07-01',
		bullets: [
			'Developed widely used application that integrated and extended inventory system to subsidize several missing features.',
			'Led team efforts to revolutionize ticket resolution strategies, resulting in a 52% reduction in ticket resolution time.',
			'Achieved a historical low support request time-to-close of 2 minutes and 34 seconds.',
			'Hired and mentored part-time staff, leading to a 43% increase in employee retention.',
			'Orchestrated annual computer sales that reclaimed thousands of dollars in revenue, which allowed for equipment refreshment.'
		]
	},
	{
		id: 'ius1',
		title: 'Project Manager',
		company: 'Indiana University Southeast',
		start: '2016-11-01',
		end: '2021-04-01',
		bullets: [
			'Invented novel software that interacts with SCCM to automate device lifecycle management and department-based software compliance.',
			'Leveraged automation technologies to improve the efficiency of student devices.',
			'Managed campus-wide projects for refactoring room design, improved student engagement, and more.',
			"Introduced the upgrade of software that reduced the ecological footprint of the university's electric by 10-20%.",
			'Introduced and reviewed device policies that cut printer-related support requests by 50%.'
		]
	},
	{
		id: 'data_strategy',
		title: 'Network Analyst',
		company: 'Data Strategy',
		start: '2014-08-01',
		end: '2016-11-01',
		bullets: [
			'Wrote an in-house software similar to Intune, leveraging Go and Batch scripting, to automate system cloning, directly integrating with Active Directory.',
			'Spearheaded the upkeep of internal systems which eliminated internal support requests entirely.',
			'Monitored and analyzed customer systems and prevented 4 disaster-level events.',
			'Performed onsite services, such as the replacement of UPS batteries, and rerouting cabling for networking closets.'
		]
	}
].sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
