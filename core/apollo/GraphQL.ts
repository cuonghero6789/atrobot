import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { setContext } from '@apollo/client/link/context';
import ConfigUtil from '../utils/ConfigUtil';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const AuthLink = setContext((_, { headers }) => {
  const token = global.token;
  console.log('token login === ' + token);
  return {
    headers: {
      ...headers,
      'Apollo-Require-Preflight': 'true',
      authorization: token ? `Bearer ${token}` : null,
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
