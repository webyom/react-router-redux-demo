module.exports = {
  path: '/',
  component: require('./app').default,
  indexRoute: require('./module/home/route'),
  childRoutes: [
    require('./module/home/route'),
    require('./module/setting/route')
  ]
};