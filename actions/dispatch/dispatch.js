module.exports.goodbyeWorld = {
  method: 'GET',
  path: '/goodbye',
  handler: (request, h) => {
    return 'Goodbye World!';
  },
};
