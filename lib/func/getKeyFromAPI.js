import { client } from 'Client/index';

const getKeyFromAPI = async (savedQueries, title) => {
  const savedQueriesSet = new Set(savedQueries);
  const uniqueSavedQueries = Array.from(savedQueriesSet);
  const keyName = `public-dashboard: ${title}`;
  let key = await client.get({
    url: client.url('projectId', `keys?name=${keyName}`),
    api_key: client.masterKey()
  });

  if (!key.length) {
    key = await client.post({
      url: client.url('projectId', 'keys'),
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
    });
    return key.key;
  }
  return key[0].key;
};

export default getKeyFromAPI;
