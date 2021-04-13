export type AppType = { build?: string[]; repo: string };

const config: Record<string, AppType> = {
  firebase: {
    build: ['yarn'],
    repo: 'https://github.com/colex-th/enscribe-firebase',
  },
  ui: {
    build: ['yarn'],
    repo: 'https://github.com/colex-th/enscribe-ui',
  },
};

export default config;
