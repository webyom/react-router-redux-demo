import $ from 'jquery';

let ui = {};

/**
 * show the loading icon
 */
ui.showLoading = function () {
  $('#circleG').show();
};

/**
 * hide the loading icon
 */
ui.hideLoading = function () {
  $('#circleG').hide();
};

export default ui;
