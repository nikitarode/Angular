var app = angular.module('minmax', 
[
    'jcs-autoValidate',
    'angular-ladda'
]);

//for diaplaying custom messages we can use the hook app.run() which is instanciated just before the directives and controls
// and we can hook in additional functionality
app.run(function(defaultErrorMessageResolver){
    //defaultErrorMessageResolver is a built-in feature which is gonna get default ErrorMessages using function
    //and then return errorMessages object
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages){
        errorMessages['tooYoung'] = 'You must be atleast {0} years old to use this site';
        errorMessages['tooOld'] = 'You must be max {0} years old to view this site'
        errorMessages['badUserName'] = 'Username can only contains numbers and letters and _';
    });
});

app.controller('MinMaxController', function($scope, $http){
    //anything we add to this scope variable can be bound to the HTML
    $scope.formModel = {};
    $scope.submitting = false;
    $scope.onSubmit = function(){
        $scope.submitting = true;
        console.log("I am submitted");
        console.log($scope.formModel);
        
        $http.post('https://minmax-server.herokuapp.com/register/', $scope.formModel).
        success(function(){
            console.log("Success :)");
            $scope.submitting = false;
        }).error(function(){
            console.log("error :(");
            $scope.submitting = false;
        });
    };
    
});