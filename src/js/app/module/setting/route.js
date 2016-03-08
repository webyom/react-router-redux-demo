module.exports = {
  path: 'setting',
  getComponent(location, cb) {
    require(['app/module/setting/main'], (ModuleComponent) => {
      cb(null, ModuleComponent.default);
    });
  },
  indexRoute: require('./list/route'),
  childRoutes: [
    require('./list/route'),
    require('./detail/route')
  ]
};