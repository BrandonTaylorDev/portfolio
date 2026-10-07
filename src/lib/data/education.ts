export interface Education {
	id: string;
	degree: string;
	institution: string;
	start: string;
	end: string;
	gpa: number;
	achieved: boolean;
}

export const education: Education[] = [
	{
		id: 'ivytech',
		degree: 'Information Technology / Security',
		institution: 'Ivy Tech Community College',
		start: '2012-05-01',
		end: '2015-05-01',
		gpa: 3.75,
		achieved: true
	}
].sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
