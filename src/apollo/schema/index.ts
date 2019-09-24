import typeDefs from './typeDefs.graphql';
import purgeLocalErrors from '../resolve/purgeLocalErrors';
import pushLocalError from '../resolve/pushLocalError';
import popLocalError from '../resolve/popLocalError';

export default {
  defaults: {
    errors: [],
  },
  resolvers: {
    Mutation: {
      purgeLocalErrors,
      pushLocalError,
      popLocalError,
    },
  },
  typeDefs,
};
