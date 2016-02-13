function loadJson(url, callback, errorCallback) {
  var x = new XMLHttpRequest();
  x.open('GET', url);
  x.responseType = 'json';
  x.onload = function() {
    var response = x.response;
    if (!response) {
      errorCallback('No response from server.');
      return;
    }
    callback(response);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function renderData(data) {
  var now = new Date(),
    nowFormatted = now.toString('d MMM yyyy HH:mm');

  document.getElementById('header').textContent = nowFormatted;
  document.getElementById('best_value').textContent = data.best_value;
  document.getElementById('best_bank').textContent = data.best_bank;
}

document.addEventListener('DOMContentLoaded', function() {
  renderStatus('Updating...');

  var url = 'http://1.artsafin.cz8.ru/currency.json';

  loadJson(url, function(json) {
    renderStatus('');
    renderData(json);

  }, function(errorMessage) {
    renderStatus('Unable to get the data. ' + errorMessage);
  });
});
