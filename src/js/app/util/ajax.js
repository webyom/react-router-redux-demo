import $ from 'jquery';
import Promise from 'bluebird';
import ui from './ui';

const PROXY_PATH = '/ajax-proxy.html';
const ORIGIN = location.origin || `${location.protocol}//${location.host}`;

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
function proxyCall(opt, resolve, reject) {
  let xhr, pro;
  if (opt.getXhr) {
    try {
      xhr = new proxyFrame.contentWindow.XMLHttpRequest();
    } catch (e) {
      xhr = new proxyFrame.contentWindow.ActiveXObject('MSXML2.XMLHTTP');
    }
    opt.getXhr(xhr);
  } if (opt.type == 'GET') {
    pro = proxyFrame.contentWindow.require('app-util').ajax.get(opt);
  } else {
    pro = proxyFrame.contentWindow.require('app-util').ajax.post(opt);
  }
  pro.then(res => resolve(res))
     .catch(err => reject(err))
     .finally(() => opt.loading === false || ui.hideLoading());
}

/**
 * cross domain proxy
 * @param {Object} opt
 */
function proxy(opt) {
  if (!proxyFrame) {
    proxyFrame = document.createElement('iframe');
    proxyFrame.style.display = 'none';
    proxyFrame.src = opt.urlObj.origin + PROXY_PATH;
    $(proxyFrame).on('load', function onload(evt) {
      if (proxyFrame._loaded) {
        while (proxyQueue.length) {
          let {opt, resolve, reject} = proxyQueue.shift();
          proxyCall(opt, resolve, reject);
        }
      } else {
        $(proxyFrame).off('load', onload).remove();
        proxyFrame = null;
        while (proxyQueue.length) {
          let {reject} = proxyQueue.shift();
          reject();
        }
      }
    });
    proxyFrame = document.body.appendChild(proxyFrame);
  }
  let resolve, reject;
  let pro = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  if (proxyFrame._loaded) {
    proxyCall(opt, resolve, reject);
  } else {
    proxyQueue.push({opt, resolve, reject});
  }
  return pro;
}

/**
 * returns the full url according to backend service name
 * @private
 * @param {String} url
 * @returns {String} the normalized url
 */
function normalizeUrl(url) {
  if (!(/^https?:/).test(url)) {
    if (G.API_CONTEXT) {
      url = `${G.API_ORIGIN}/${G.API_CONTEXT}/${url.replace(/^\/+/, '')}`;
    } else {
      url = `${G.API_ORIGIN}/${url.replace(/^\/+/, '')}`;
    }
  }
  return url;
}

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
  opt = opt || {};
  opt.type = opt._method = 'GET';
  opt.headers = opt.headers || {};
  opt.headers['X-Requested-With'] = 'XMLHttpRequest';
  opt.success = (res) => ajax.dealCommonCode(res.code);
  opt.error = opt.complete = () => 0;
  opt.url = normalizeUrl(opt.url);
  opt.urlObj = opt.urlObj || url2obj(opt.url);
  opt.dataType = 'json'; // only support json
  if (ORIGIN != opt.urlObj.origin && opt.dataType == 'json') {
    return proxy(opt);
  } else {
    opt.dataType = opt.dataType || (ORIGIN == opt.urlObj.origin ? 'json' : 'jsonp');
    if (opt.dataType == 'jsonp') {
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
  let pro = Promise.resolve($.ajax(opt));
  opt.loading === false || ui.showLoading();
  pro.finally(function () {
    opt.loading === false || ui.hideLoading();
  });
  return pro;
};

/**
 * ajax post wrapper for jquery ajax
 * @param {Object} opt
 */
ajax.post = function (opt) {
  opt = opt || {};
  opt.type = opt._method = opt._method || 'POST';
  opt.dataType = 'json';
  opt.url = normalizeUrl(opt.url);
  opt.urlObj = opt.urlObj || url2obj(opt.url);
  if (ORIGIN != opt.urlObj.origin) {
    return proxy(opt);
  }
  let data = opt.data || {};
  opt.charset = opt.charset || 'UTF-8';
  opt.headers = opt.headers || {};
  opt.headers['X-Requested-With'] = 'XMLHttpRequest';
  if (!opt.notJsonParamData) {
    opt.contentType = 'application/json; charset=' + opt.charset;
    opt.data = typeof data == 'string' ? data : JSON.stringify(data);
  }
  opt.success = (res) => ajax.dealCommonCode(res.code);
  opt.error = opt.complete = () => 0;
  let pro = Promise.resolve($.ajax(opt));
  opt.loading === false || ui.showLoading();
  pro.finally(function () {
    opt.loading === false || ui.hideLoading();
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
