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

  $scope.getProvedores = function() {
        $scope.provedores =  [];
        $http({method: 'GET', url: 'provedores'}).
            success(function(data, status, headers, config) {
                $scope.provedores = data;
        }) 
    }
 $scope.atualizaOuSalvaPacotes = function() {
        $http({method: 'POST', url: 'pacotes',
           data: { nome: $scope.data['nomePacote'],
                   quantidadeCpu : $scope.data['quantidadeCpu'],
                   memoria : $scope.data['quantidadeMemoria'],
                   tamanhoDisco :$scope.data['quantidadeDisco'],
                   valorHora: $scope.data['valorHora'],
                   sistemaOperacional : $scope.data['so'],
                   provedor           : $scope.data['provedor']
          }}).success(function(data, status, headers, config) {
            $scope.data['success'] = true;
        }).
        error(function(data, status, headers, config) {
            $scope.data['success'] = false;
        }); 
  }

    

  $scope.form=1;

 

}
AppListCtrl.$inject = ['$scope', '$http', '$templateCache'];