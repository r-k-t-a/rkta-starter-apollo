import { ApolloContext } from './pushLocalError';

export default (_: {}, __: {}, { cache }: ApolloContext): void => {
  const errors: [] = [];
  cache.writeData({ data: { errors } });
};
