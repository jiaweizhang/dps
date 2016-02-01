/**
 * Created by jiaweizhang on 1/31/2016.
 */

var myApp = angular
    .module('myApp', ['ngRoute', 'ngCookies']);

myApp.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })

        .when('/organizations', {
            templateUrl: 'pages/organizations.html',
            controller: 'organizationsController'
        })

        .otherwise({
            redirectTo: "/"
        });
});

myApp.controller('mainController', ['httpService', '$scope', '$http', '$window', '$cookies', function (httpService, $scope, $http, $window, $cookies) {

}]);

myApp.controller('homeController', function ($scope, $http) {

});

myApp.controller('organizationsController', ['$scope', '$http', function ($scope, $http){

    $scope.check = {};
    $scope.organizations = [];
    $scope.organizationTags = [];

    $scope.filterByProperties = function (organization) {
        if ($scope.noFilters()) {
            return true;
        }

        var myTags = organization.tags;
        for (var i=0; i<myTags.length; i++) {
            if ($scope.check[myTags[i]]) {
                return true;
            }
        }
        return false;
    };

    $scope.noFilters = function() {
        for (var i = 0; i < $scope.organizationTags.length; i++) {
            if ($scope.check[$scope.organizationTags[i]]) {
                return false;
            }
        }
        return true;
    };

    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'data/organizations.json'
        }).then(function successCallback(response) {
            $scope.organizations = response.data.data;
        }, function errorCallback(response) {
        });

        $http({
            method: 'GET',
            url: 'data/organizationtags.json'
        }).then(function successCallback(response) {
            $scope.organizationTags = response.data.data;
            for (var i = 0; i < $scope.organizationTags.length; i++) {
                $scope.check[$scope.organizationTags[i]] = false;
            }
        }, function errorCallback(response) {
        });

    };

    $scope.init();
}]);


myApp.service('httpService', function ($http, $window, $cookies) {
    return {
        getOrganizations: function () {
            return $http({
                url: "/data/organizations.json",
                method: "GET"
            }).success(function (data, status) {
                console.log(data);
                return data;
            });
        },
        getTags: function () {
            return $http({
                url: "/data/organizationtags.json",
                method: "GET"
            }).success(function (data, status) {
                console.log(data);
                return data;
            });
        }
    };
});