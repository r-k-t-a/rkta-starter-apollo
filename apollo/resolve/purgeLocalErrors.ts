export default (_, __, { cache }): void => {
  const errors = [];
  cache.writeData({ data: { errors } });
};
