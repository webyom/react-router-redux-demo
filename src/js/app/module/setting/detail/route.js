module.exports = {
  path: 'detail',
  getComponent(location, cb) {
    require(['app/module/setting/detail/main'], (ModuleComponent) => {
      cb(null, ModuleComponent.default);
    });
  }
};