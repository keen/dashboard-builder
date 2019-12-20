/* eslint-disable */

const getKeyFromAPI = async (savedQueries, title, keenAnalysis) => {
  const savedQueriesSet = new Set(savedQueries);
  const uniqueSavedQueries = Array.from(savedQueriesSet);
  const keyName = `public-dashboard: ${title}`;
  let key = await keenAnalysis.get({
    url: keenAnalysis.url('projectId', `keys?name=${keyName}`),
    api_key: keenAnalysis.masterKey()
  });

  if (!key.length) {
    key = await keenAnalysis.post({
      url: keenAnalysis.url('projectId', 'keys'),
      api_key: keenAnalysis.masterKey(),
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
