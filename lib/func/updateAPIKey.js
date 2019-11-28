import { client } from 'Client/index';

const updateAPIKey = async (savedQueries, title) => {
  const savedQueriesSet = new Set(savedQueries);
  const uniqueSavedQueries = Array.from(savedQueriesSet);
  const keyName = `public-dashboard: ${title}`;

  client.get({
    url: client.url('projectId', `keys?name=${keyName}`),
    api_key: client.masterKey()
  })
  .then(res => {
    client.post({
      url: client.url('projectId', 'keys', res[0].key),
      api_key: client.masterKey(),
      params: {
        name: keyName,
        is_active: true,
        permitted: ['saved_queries', 'cached_queries'],
        options: {
          saved_queries: {
            allowed: uniqueSavedQueries
          },
          cached_queries: {
            allowed: uniqueSavedQueries
          }
        }
      }
    })
  })
};

export default updateAPIKey;
