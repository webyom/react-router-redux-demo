module.exports = {
  path: 'setting',
  getComponent(location, cb) {
    require(['app/module/setting/main'], (ModuleComponent) => {
      cb(null, ModuleComponent.default);
    });
  },
  childRoutes: [
    require('./detail/route')
  ]
};