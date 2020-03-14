module.exports.helloWorld = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'Hello '+request.params.name +'!';
  },
};
