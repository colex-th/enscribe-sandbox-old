export type AppType = { build?: string[]; repo: string };

const config: Record<string, AppType> = {
  'enscribe-firebase': {
    build: ['yarn'],
    repo: 'https://github.com/colex-th/enscribe-firebase',
  },
  'enscribe-ui': {
    build: ['yarn'],
    repo: 'https://github.com/colex-th/enscribe-ui',
  },
};

export default config;
