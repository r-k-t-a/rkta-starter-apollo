import typeDefs from './typeDefs.graphql';
import purgeLocalErrors from '../resolve/purgeLocalErrors';
import pushLocalError from '../resolve/pushLocalError';
import resetLocalError from '../resolve/resetLocalError';

export default {
  defaults: {
    errors: [],
  },
  resolvers: {
    Mutation: {
      purgeLocalErrors,
      pushLocalError,
      resetLocalError,
    },
  },
  typeDefs,
};
