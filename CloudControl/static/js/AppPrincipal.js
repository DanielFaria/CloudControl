function AppListCtrl($scope, $http, $templateCache) {
   
   $http.jsonp("http://angularjs.org/greet.php?callback=JSON_CALLBACK&name=Super%20Hero").
  success(function(data) {
    $scope.data = data;
    $scope.name = data.name;
    $scope.salutation = data.salutation;
    $scope.greeting = data.greeting;
    
    $("[ng-model='nameNew']").val(data.name);
    $("[ng-model='salutation']").val(data.salutation);
    $("[ng-model='greeting']").val(data.greeting);
  }).
  error(function (data) {
    $scope.data = "Request failed";
  });

  $scope.selecionaForm  =  function(idForm) {
      console.info("O Id do form é" +idForm);
      $scope.form = idForm;
  }  
  
  $scope.getSistemas = function() {
        $scope.sistemas =  [];
        $http({method: 'GET', url: 'sistemas'}).
            success(function(data, status, headers, config) {
                $scope.sistemas = data;
        }) 
    }






    

  $scope.form=1;

 

}
AppListCtrl.$inject = ['$scope', '$http', '$templateCache'];