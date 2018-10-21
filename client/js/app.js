var myApp = angular.module('myApp', []);


myApp.controller('myCtrl', function ($scope, $http) {
    $scope.message = "";
    $scope.error_message = "";

    //get All Student
    $scope.getAllStudent = function () {
        $http({
            mehtod: "GET",
            url: 'https://nhom-9.appspot.com/user'
        }).then(
                function (response) {

                    $scope.students = response.data.user;
                    console.log(response.data);
                },
                function (reason) {
                    $scope.error_message = reason.data;
                }
        );

    };

    $scope.getAllStudent();


    //save Student
    $scope.newStudent = {};
    $scope.saveStudent = function () {
        $http({
            method: 'POST',
            url: 'https://nhom-9.appspot.com/user',
            data: angular.toJson($scope.newStudent),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
                function (response) {
                    $scope.message = "Student Saved Successfully";
                    $scope.getAllStudent();
                },
                function (reason) {
                    $scope.error_message = reason.data;
                }
        );
    };



    //select Student by click
    $scope.clickStudent = {};
    $scope.selectStudent = function (student) {
        $scope.clickStudent = student;
    };


    //updte Student
    $scope.updateStudent = function () {
        $http({
            method: 'PUT',
            url: 'https://nhom-9.appspot.com/user/'+$scope.clickStudent.userID,
            data: angular.toJson($scope.clickStudent),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
                function (response) {
                    $scope.message = "Student Update Successfully";
                    $scope.getAllStudent();
                },
                function (reason) {
                    $scope.error_message = reason.data;
                }
        );
    };

    //delete Student
    $scope.deleteStudent = function () {
        $http({
            method: 'DELETE',
            url: 'https://nhom-9.appspot.com/user/' + $scope.clickStudent.userID
        }).then(
                function (response) {
                    $scope.message = "student deleted Successfully";
                    $scope.getAllStudent();
                },
                function (reason) {
                    $scope.error_message = reason.data;
                }
        );
    };


    //clear message
    $scope.messageClose = function () {
        $scope.message = "";
        $scope.error_message = "";
    };



});

