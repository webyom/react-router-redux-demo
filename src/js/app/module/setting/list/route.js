module.exports = {
  path: 'list(/(:page)/(:sortColumnId)/(:sortOrder)/(:filterMap))',
  getComponent(location, cb) {
    require(['app/module/setting/list/main'], (ModuleComponent) => {
      cb(null, ModuleComponent.default);
    });
  }
};