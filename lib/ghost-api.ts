import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: 'https://gobankless.ghost.io',
  key: 'd28367346c91a253a73b08c847',
  version: 'v3',
});

export default api;
