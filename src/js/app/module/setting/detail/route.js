module.exports = {
  path: 'detail/:id',
  getComponent(location, cb) {
    require(['app/module/setting/detail/main'], (ModuleComponent) => {
      cb(null, ModuleComponent.default);
    });
  }
};