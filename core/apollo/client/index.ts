import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
    HttpLink,
  } from '@apollo/client';
  import { RetryLink } from '@apollo/client/link/retry';
  import { setContext } from '@apollo/client/link/context';
  import ConfigUtil from '../../utils/config/ConfigUtil';
  import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
  import { getConfig } from '../../AppConfig';
  
  const AuthLink = setContext((_, { headers }) => {
    const token = global.token;
    console.log('token login === ' + token);
    return {
      headers: {
        ...headers,
        'Apollo-Require-Preflight': 'true',
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const link = ApolloLink.from([
    new RetryLink({
      delay: {
        initial: 300,
        max: Infinity,
        jitter: true,
      },
      attempts: {
        max: 5,
        retryIf: (error, _operation) => !!error,
      },
    }),
    // new DedupLink(),
    AuthLink,
    createUploadLink({
      uri: ConfigUtil.URL_MAIN,
      fetch,
      fetchOptions: {credentials: 'include'},
      credentials: 'include',
      // Treat React Native file-like objects as uploadable
      isExtractableFile: (value: any): value is File => {
        return (
          value &&
          typeof value === 'object' &&
          typeof value.uri === 'string' &&
          typeof value.name === 'string' &&
          typeof value.type === 'string'
        );
      },
    }),
    // new HttpLink({
    //   uri: ConfigUtil.URL_MAIN
    // })
  ]);
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
  
  export default client;
  