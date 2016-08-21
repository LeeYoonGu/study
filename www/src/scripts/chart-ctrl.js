'use strict';
angular.module('myModule', ['chart.js'])
       .controller('ChartCtrl', ['$scope', function($scope) {
         $scope.children = {
           labels: ['양간장dddd', '모찌니'],
           series: ['잉여력', '코딱지'],
           data: [
             [99, 22],
             [25, 80]
           ]
         };
       }]);