/**
 * Created by Chandu on 2/22/16.
 */

myApp = angular.module('myApp',['ui.router']);


myApp.config(function($stateProvider){ //, $urlRouterProvider
    //$urlRouterProvider.otherwise("state1");

    $stateProvider
        .state('state1', {
            url : "/search",
            templateUrl : "app/components/productSearch/productSearch.html",
            controller:"myController"
        })
});