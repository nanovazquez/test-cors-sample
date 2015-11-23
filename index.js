  (function (){

  var methods                 = document.getElementById('method');
  var ulrInput                = document.getElementById('url');
  var supportsCredentialsInput = document.getElementById('supportsCredentials');
  var customHeadersInput      = document.getElementById('custom-headers');
  var button                  = document.getElementById('test');
  var result                  = document.getElementById('result');

  (function init(){
    ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'].forEach(function(item) {
      var option       = document.createElement('option');
      option.innerHTML = item;
      option.value     = item;
      methods.appendChild(option);
    });
    ulrInput.value = 'http://172.16.22.242:8080/api/teams';
    customHeadersInput.value = 'X-PINGOTHER';
    methods.selectedIndex = 0;
    button.addEventListener('click', initCorsTest);
  })();

  var xhr;

  function initCorsTest(e){

    if (!ulrInput.value || !methods.value){
      return;
    }

    e.preventDefault();
    xhr = new XMLHttpRequest();

    xhr.open(methods.value, ulrInput.value + '?x=' + +new Date, true);

    if (!!customHeadersInput.value){
      xhr.setRequestHeader(customHeadersInput.value, +new Date);
    }

    xhr.withCredentials = supportsCredentialsInput.checked;

    xhr.addEventListener("load",  transferComplete);
    xhr.addEventListener("error", transferFailed);
    xhr.addEventListener("abort", transferCanceled);

    result.innerHTML = 'Waiting..';
    xhr.send();
  }

  function showResults() {
      result.innerHTML =
        (xhr.readyState == 4 && xhr.status == 200)
          ? xhr.responseText
          : 'ERROR! Status is "' + xhr.status + '" and status text is "' + xhr.statusText+ '"';
    };

    function transferComplete(e){
      console.log("Transfer completed");
      console.log(e);
      showResults();
    }

    function transferFailed(e){
      console.log("Transfer failed");
      console.log(e);
      showResults();
    }

    function transferCanceled(e){
      console.log("Transfer canceled");
      console.log(e);
      showResults();
    }
})();