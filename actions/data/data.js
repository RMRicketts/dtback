module.exports.helloWorld = {
  method: 'GET',
  path: '/name/{name?}',
  handler: async (request, h) => {
    let {app} = request.server;

    return `Hello ${request.params.name}! \n ${r}`;
  },
};
