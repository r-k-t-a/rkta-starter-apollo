import query from '../query/localErrors.graphql';

export default (_, { id }, { cache }): {} => {
  const { errors } = cache.readQuery({ query });
  const data = {
    errors: errors.filter(error => error.id !== id),
  };
  cache.writeData({ data });
  return { id };
};
