import $ from 'jquery';

let ui = {};

let loadingCount = 0;
let loadingTimeout = null;

let initLoading = function () {
  $('<div id="app-loading-bar">loading...</div>').appendTo(document.body);
  initLoading = () => 0;
};

ui.showLoading = function () {
  loadingCount++;
  initLoading();
  $('#app-loading-bar').addClass('loading');
  clearTimeout(loadingTimeout);
  loadingTimeout = setTimeout(() => {
    if (loadingCount) {
      loadingCount = 0;
      ui.hideLoading();
    }
  }, 30 * 1000);
};

ui.hideLoading = function () {
  loadingCount > 0 && loadingCount--;
  if (!loadingCount) {
    $('#app-loading-bar').removeClass('loading');
  }
};

export default ui;
