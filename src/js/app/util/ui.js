import $ from 'jquery';

let ui = {};

ui.showLoading = function () {
  $('#circleG').show();
};

ui.hideLoading = function () {
  $('#circleG').hide();
};

export default ui;
