"use strict";

(function() {
  angular
    .module("omdb")
    .controller("MainController", MainController)

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
