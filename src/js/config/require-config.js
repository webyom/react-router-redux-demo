/* global G, require */

window.G = window.G || {};

var requireConfigScriptEl = document.getElementById('require-config-script');
if (requireConfigScriptEl) {
  G.REQUIRE_BASE_URL = requireConfigScriptEl.src.split('/js/')[0] + '/js';
} else {
  G.REQUIRE_BASE_URL = location.origin + '/js';
}

window.require = window.require || {
  baseUrl: G.REQUIRE_BASE_URL,
  paths: {
    'react': 'vendor/react/react',
    'react-dom': 'vendor/react-dom/react-dom',
    'react-router': 'vendor/react-router/ReactRouter',
    'reflux': 'vendor/reflux/reflux',
    'core-decorators': 'vendor/core-decorators.js/core-decorators',
    'jquery': 'vendor/jquery/jquery',
    'classnames': 'vendor/classnames/index',
    'bluebird': 'vendor/bluebird/bluebird',
    'immutable': 'vendor/immutable/immutable',
    'yom-form-util': 'vendor/yom-form-util/yom-form-util',
    'app-decorators': 'app/decorator/index',
    'app-util': 'app/util/index',
    'datetimepicker': 'vendor/bootstrap-datetime-picker/bootstrap-datetimepicker',
    'datetimepicker-zh-cn': 'vendor/bootstrap-datetime-picker/bootstrap-datetimepicker.zh-CN'
  },
  shim: {
    'react': {
      exports: 'React'
    },
    'react-dom': {
      exports: 'ReactDOM'
    },
    'react-router': {
      exports: 'ReactRouter'
    },
    'reflux': {
      exports: 'Reflux'
    },
    'core-decorators': {
      exports: 'CoreDecorators'
    },
    'jquery': {
      exports: 'jQuery'
    },
    'classnames': {
      exports: 'classNames'
    },
    'bluebird': {
      exports: 'Promise'
    },
    'immutable': {
      exports: 'Immutable'
    },
    'datetimepicker': {
      exports: 'jQuery.fn.datetimepicker',
      deps: [
        'vendor/bootstrap-datetime-picker/bootstrap-datetimepicker.css'
      ]
    },
    'datetimepicker-zh-cn': {
      exports: 'jQuery.fn.datetimepicker.dates.zh-CN',
      deps: [
        'datetimepicker'
      ]
    }
  },
  resolveUrl(url) {
    let baseUrl = G.REQUIRE_BASE_URL;
    let path;
    if (url.indexOf(baseUrl) === 0) {
      path = url.replace(baseUrl, '').replace(/^\//, '');
    }
    if (path) {
      let md5 = G.MD5_MAP && G.MD5_MAP[path];
      if (md5) {
        if (url.indexOf('?') > 0) {
          return url + '&v=' + md5;
        } else {
          return url + '?v=' + md5;
        }
      } else {
        return url;
      }
    } else {
      return url;
    }
  },
  onLoadStart() {
    require(['app-util'], util => util.ui.showLoading());
  },
  onLoadEnd() {
    require(['app-util'], util => util.ui.hideLoading());
  }
};