import query from '../query/localErrors.graphql';

export default (_, { message, name, statusCode = null }, { cache }) => {
  const { errors } = cache.readQuery({ query });
  const data = {
    errors: errors.concat({
      id: Date.now(),
      message,
      name,
      statusCode,
      __typename: 'ErrorItem',
    }),
  };
  cache.writeData({ data });
  return { message, name, statusCode };
};
