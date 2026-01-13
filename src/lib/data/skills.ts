export interface Skills {
  platforms: string[];
  languages: string[];
  frameworks: string[];
  other: string[];
}

export const skills: Skills = {
  platforms: [
    'Microsoft Azure',
    'Kubernetes',
    'Docker',
    'Linux',
    'Windows Server',
    'HA Proxy',
    'Ansible',
    'RabbitMQ',
    'Redis'
  ],
  languages: [
    'JavaScript',
    'Go',
    'Python',
    'Bash'
  ],
  frameworks: [
    'Node',
    'Vue',
    'Nuxt',
    'React',
    'Next'
  ],
  other: [
    'CI/CD',
    'MongoDB',
    'PostgreSQL',
    'Cosmos DB'
  ]
};
