module.exports.helloWorld = {
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return 'HelloWorld';
  },
};
