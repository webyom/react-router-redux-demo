import $ from 'jquery';
import Promise from 'bluebird';

const PROXY_PATH = '/ajax-proxy.html';

let proxyQueue = [];
let proxyFrame = null;

let ajax = {};

function url2obj(str) {
  if (typeof str != 'string') {
    return str;
  }
  let m = str.match(/([^:]*:)?(?:\/\/)?([^\/:]+)?(:)?(\d+)?([^?#]+)(\?[^?#]*)?(#[^#]*)?/);
  m = m || [];
  let uri = {
    href: str,
    protocol: m[1] || 'http:',
    host: (m[2] || '') + (m[3] || '') + (m[4] || ''),
    hostname: m[2] || '',
    port: m[4] || '',
    pathname: m[5] || '',
    search: m[6] || '',
    hash: m[7] || ''
  };
  uri.origin = uri.protocol + '//' + uri.host;
  return uri;
}

/**
 * cross domain proxy
 * @param {Object} opt
 */
function proxyCall(opt) {
  let xhr;
  let complete = opt.complete;
  opt.complete = function () {
    opt.loading === false || ajax.hideLoading();
    complete && complete();
  };
  if (opt.getXhr) {
    try {
      xhr = new proxyFrame.contentWindow.XMLHttpRequest();
    } catch (e) {
      xhr = new proxyFrame.contentWindow.ActiveXObject('MSXML2.XMLHTTP');
    }
    opt.getXhr(xhr);
  } if (opt.type == 'GET') {
    return proxyFrame.contentWindow.require('app-util').ajax.get(opt);
  } else {
    return proxyFrame.contentWindow.require('app-util').ajax.post(opt);
  }
}

/**
 * cross domain proxy
 * @param {Object} opt
 */
function proxy(opt) {
  if (!proxyFrame) {
    opt.urlObj = opt.urlObj || url2obj(opt.url);
    proxyFrame = document.createElement('iframe');
    proxyFrame.style.display = 'none';
    proxyFrame.src = opt.urlObj.origin + PROXY_PATH;
    $(proxyFrame).on('load', function onload(evt) {
      if (proxyFrame._loaded) {
        while (proxyQueue.length) {
          proxyCall(proxyQueue.shift());
        }
      } else {
        $(proxyFrame).off('load', onload).remove();
        proxyFrame = null;
        while (proxyQueue.length) {
          opt = proxyQueue.shift();
          opt.error && opt.error();
          opt.complete && opt.complete();
        }
      }
    });
    proxyFrame = document.body.appendChild(proxyFrame);
  }
  if (proxyFrame._loaded) {
    proxyCall(opt);
  } else {
    proxyQueue.push(opt);
  }
}

/**
 * returns the full url according to backend service name and data type
 * @private
 * @param {String} url
 * @param {String} dataType
 * @returns {String} the full url
 */
ajax.getDataTypeUrl = function (url, dataType) {
  if (!(/^https?:/).test(url)) {
    url = G.CGI_ORIGIN + G.CGI_BASE + url;
  }
  return url.replace(/[^\/]+$/, function (m) {
    return m.replace(/^[\w\-\.]+/, function (m) {
      return m.split('.')[0] + '.' + dataType;
    });
  });
};

/**
 * show the loading icon
 */
ajax.showLoading = function () {
  $('#circleG').show();
};

/**
 * hide the loading icon
 */
ajax.hideLoading = function () {
  $('#circleG').hide();
};

/**
 * take action to some common code
 * @param {Number} code
 * @returns {Boolean} whether common code has been dealt
 */
ajax.dealCommonCode = function (code) {
  let res = true;
  if (code === 10 && !(/\/html\/login\-/).test(location.pathname)) {
    // TODO
  } else {
    res = false;
  }
  return res;
};

/**
 * ajax get wrapper for jquery ajax
 * @param {Object} opt
 */
ajax.get = function (opt) {
  let jqXHR, success;
  opt = opt || {};
  opt.type = opt._method = 'GET';
  opt.headers = opt.headers || {};
  opt.headers['X-Requested-With'] = 'XMLHttpRequest';
  success = opt.success;
  opt.success = function (res, textStatus, jqXHR) {
    if (!ajax.dealCommonCode(res.code) && success) {
      success(res, textStatus, jqXHR);
    }
  };
  opt.url = ajax.getDataTypeUrl(opt.url, 'json');
  opt.urlObj = url2obj(opt.url);
  if (G.ORIGIN != opt.urlObj.origin && opt.dataType == 'json') {
    proxy(opt);
    return;
  } else {
    opt.dataType = opt.dataType || (G.ORIGIN == opt.urlObj.origin ? 'json' : 'jsonp');
    if (opt.dataType == 'jsonp') {
      opt.url = ajax.getDataTypeUrl(opt.url, 'jsonp');
      opt.urlObj = url2obj(opt.url);
      opt.scriptCharset = opt.scriptCharset || opt.charset || 'UTF-8';
      if (!opt.jsonpCallback) {
        opt.url.split('/').pop().replace(/^[a-zA-Z_]\w*/, function (m) {
          opt.jsonpCallback = m;
        });
        opt.jsonpCallback = opt.jsonpCallback || 'jsonpCallback';
      }
      opt.jsonp = opt.jsonp || 'callback';
    }
  }
  jqXHR = $.ajax(opt);
  opt.loading === false || ajax.showLoading();
  jqXHR.always(function () {
    opt.loading === false || ajax.hideLoading();
  });
};

/**
 * ajax post wrapper for jquery ajax
 * @param {Object} opt
 */
ajax.post = function (opt) {
  let pro, success, data;
  opt = opt || {};
  opt.type = opt._method = opt._method || 'POST';
  opt.dataType = 'json';
  opt.url = ajax.getDataTypeUrl(opt.url, opt.dataType);
  opt.urlObj = url2obj(opt.url);
  if (G.ORIGIN != opt.urlObj.origin) {
    proxy(opt);
    return;
  }
  data = opt.data || {};
  opt.charset = opt.charset || 'UTF-8';
  opt.headers = opt.headers || {};
  opt.headers['X-Requested-With'] = 'XMLHttpRequest';
  if (!opt.notJsonParamData) {
    opt.contentType = 'application/json; charset=' + opt.charset;
    opt.data = typeof data == 'string' ? data : JSON.stringify(data);
  }
  success = opt.success;
  opt.success = function (res, textStatus) {
    if (!ajax.dealCommonCode(res.code) && success) {
      success(res, textStatus);
    }
  };
  pro = Promise($.ajax(opt));
  opt.loading === false || ajax.showLoading();
  pro.finally(function () {
    opt.loading === false || ajax.hideLoading();
  });
  return pro;
};

/**
 * ajax put wrapper for jquery ajax
 * @param {Object} opt
 */
ajax.put = function (opt) {
  opt = opt || {};
  opt._method = 'PUT';
  return ajax.post(opt);
};

/**
 * ajax delete wrapper for jquery ajax
 * @param {Object} opt
 */
ajax.del = function (opt) {
  opt = opt || {};
  opt._method = 'DELETE';
  return ajax.post(opt);
};

export default ajax;
