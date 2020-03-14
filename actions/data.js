module.exports.helloWorld = {
  method: 'GET',
  path: '/name/{name?}',
  handler: (request, h) => {
    return `Hello ${request.params.name}!`;
  },
};
