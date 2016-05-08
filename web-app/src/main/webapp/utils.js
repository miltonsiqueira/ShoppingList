var utils = {};

/*global window  */
(function (window) {
  "use strict";
  
  /*
    Get the params from the GET request.
    return:
      Ex:
      {
        nameFirstParameter: valueFirstParameter,
        nameSecondParameter: valueSecondParameter
      }
      
      If none parameter is found, it will return {}
      
  */
  utils.params = function () {

    var search,
      params = {};

    if (window.location.search) {
      search = window.location.search.substring(1);
      params = JSON.parse('{"' + decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/[+]/g, ' ')
        .replace(new RegExp('=','g'), '":"') + '"}');

    }

    return params;

  };
  
  

})(window);