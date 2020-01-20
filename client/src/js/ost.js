angular.module('app', []);
angular.module('app').controller('ostJoinCtrl', function ($scope, $http) {

    $scope.newContact = {};
    $scope.emailed = false;
    $scope.emailing = false;
    $scope.joinOST = function () {
        console.log($scope.newContact);
        $scope.emailing = true;
        $http.post('/join-ost', $scope.newContact).then(function(response){
            console.log(response);
            $scope.emailed = true;
            $scope.emailError = false;
            $scope.emailing = false;
            // $scope.newContact = {};
        }, function(error){
            $scope.emailError = true;
            $scope.emailing = false;
            console.log(error);
        });
    };
});


