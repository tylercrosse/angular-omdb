"use strict";

(function() {
  angular
    .module("omdb", [])
    .factory("apiFactory", apiFactory)
    .controller("MainController", MainController)

  apiFactory.$inject = [ "$http" ];
  function apiFactory($http) {
    return {
      queryOmdb: queryOmdb
    }

    ////////////

    function queryOmdb(query) {
      var term = query.replace(/\s/, "+"); // replace any white space characters with a "+"
      var url = "http://omdbapi.com/?s=" + term;

      // fetch all movies matching the passed in title as JSON
      return $http.get(url)
    };

  };

  MainController.$inject = [ "apiFactory" ];
  function MainController(apiFactory) {
    var vm = this;

    vm.movies = [];
    vm.query = "";

    vm.queryOmdb = queryOmdb

    ////////////

    function queryOmdb(query) {
      apiFactory.queryOmdb(query)
        .then(function(res) {
          res.data.Search.forEach( function(item) {
              vm.movies.push(item);
          });
        });
    }

  };
})();
