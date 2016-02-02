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

        .when('/about',{
            templateUrl: 'pages/about.html',
            controller: 'aboutController'
        })

        .when('/contact',{
            templateUrl: 'pages/contact.html',
            controller: 'contactController'
        })

        .when('/opportunities', {
            templateUrl: 'pages/opportunities.html',
            controller: 'opportunitiesController'
        })

        .otherwise({
            redirectTo: "/"
        });
});

myApp.controller('mainController', ['httpService', '$scope', '$http', '$window', '$cookies', function (httpService, $scope, $http, $window, $cookies) {

}]);

myApp.controller('homeController', ['$scope', function ($scope) {

}]);

myApp.controller('organizationsController', ['httpService', '$scope', function (httpService, $scope){

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
        httpService.getOrganizations().then(function (response) {
            $scope.organizations = response.data.data;

        });


        httpService.getTags().then(function (response) {
            $scope.organizationTags = response.data.data;
            for (var i = 0; i < $scope.organizationTags.length; i++) {
                $scope.check[$scope.organizationTags[i]] = false;
            }

        });

    };

    $scope.init();
}]);

myApp.controller('aboutController', ['httpService', '$scope', function (httpService, $scope){
    $scope.people = [];

    $scope.init = function () {

        httpService.getMembers().then(function (response) {
         $scope.people = response.data.data;

         });

    };

    $scope.init();
}]);

myApp.controller('opportunitiesController', ['httpService', '$scope', function (httpService, $scope){

    $scope.opportunities = [];

    $scope.init = function () {
        httpService.getOpportunities().then(function (response) {
            $scope.opportunities = response.data.data;

        });
    };

    $scope.init();
}]);

myApp.controller('contactController', ['httpService', '$scope', function (httpService, $scope){

    $scope.contacts = [];

    $scope.init = function () {
        httpService.getContacts().then(function (response) {
            $scope.contacts = response.data.data;

        });
    };

    $scope.init();
}]);


myApp.service('httpService', function ($http, $window, $cookies) {
    return {
        getOrganizations: function () {
            return $http({
                url: "data/organizations.json",
                method: "GET"
            }).success(function (data, status) {
                return data;
            });
        },
        getTags: function () {
            return $http({
                url: "data/organizationtags.json",
                method: "GET"
            }).success(function (data, status) {
                return data;
            });
        },
        getMembers: function () {
            return $http({
                url: "data/team.json",
                method: "GET"
            }).success(function (data, status) {
                return data;
            });
        },
        getContacts: function () {
            return $http({
                url: "data/contacts.json",
                method: "GET"
            }).success(function (data, status) {
                return data;
            });
        },
        getOpportunities: function () {
            return $http({
                url: "data/opportunities.json",
                method: "GET"
            }).success(function (data, status) {
                return data;
            });
        }
    };
});