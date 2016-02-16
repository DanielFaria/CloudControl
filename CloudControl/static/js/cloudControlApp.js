var profileEditApp = angular.module('cloudControlApp', []);
 
profileEditApp.config(['$httpProvider', '$interpolateProvider',
    function($httpProvider, $interpolateProvider) {
    /* for compatibility with django teplate engine */
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    /* csrf */
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
}]);
 
profileEditApp.controller('cloudControlCtrl', function ($scope, $http) {
    
   


    $scope.selecionaForm  =  function(idForm) {
      $scope.form = idForm;
      $scope.data = {};
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
        $http({method: 'POST', url: 'pacotes/',
           data: { nome: $scope.data['nomePacote'],
                   quantidadeCpu : $scope.data['quantidadeCpu'],
                   memoria : $scope.data['quantidadeMemoria'],
                   tamanhoDisco :$scope.data['quantidadeDisco'],
                   valorHora: $scope.data['valorHora'],
                   sistemaOperacional_id : $scope.data['so'],
                   provedor_id           : $scope.data['provedor']
          }}).success(function(data, status, headers, config) {
            $scope.data['success'] = true;
        }).
        error(function(data, status, headers, config) {
            $scope.data['fail'] = true;
    }); 
  }
  $scope.atualizaOuSalvaProvedores = function() {
        $http({method: 'POST', url: 'provedores/',
           data: { nome: $scope.data['nomeProvedor'],
                   site : $scope.data['emailProvedor'],
                   email : $scope.data['siteProvedor']
          }}).success(function(data, status, headers, config) {
            $scope.data['success'] = true;
        }).
        error(function(data, status, headers, config) {
            $scope.data['fail'] = true;
    }); 
  }  
   
   $scope.atualizaOuSalvaSistemas = function() {
        $http({method: 'POST', url: 'sistemas/',
           data: { nome: $scope.data['nomeSO'],
          }}).success(function(data, status, headers, config) {
            $scope.data['success'] = true;
        }).
        error(function(data, status, headers, config) {
            $scope.data['fail'] = true;
    }); 
  }

  $scope.pesquisaPacotes  =  function() {
      var  urlPesquisa = '';
      var  parametroAdicionado = false;
      if ($scope.data.numCpu != null && $scope.data.numCpu != "") {
         urlPesquisa = "cpu="+$scope.data.numCpu;
         parametroAdicionado = true;
      }
      
      if ($scope.data.memoria != null && $scope.data.memoria != "") {
         if(parametroAdicionado){
            urlPesquisa += "&memoria="+$scope.data.memoria;
         }else{
            urlPesquisa += "memoria="+$scope.data.memoria;
         }
         parametroAdicionado = true;
      }
      
      if ($scope.data.disco != null && $scope.data.disco!= "") {
         if(parametroAdicionado){
             urlPesquisa += "&tamanhoDisco="+$scope.data.disco;
         }else{
           urlPesquisa += "tamanhoDisco="+$scope.data.disco;
         } 
         parametroAdicionado = true;   
      }
      if ($scope.data.sistema != null && $scope.data.sistema!= "") {
         if(parametroAdicionado){
           urlPesquisa += "&sistema="+$scope.data.sistema;
         }else{
            urlPesquisa += "sistema="+$scope.data.sistema;
         }

         
      }
      alert("URL:" +urlPesquisa);


      $scope.sistemas =  [];
        $http({method: 'GET', url: 'pacotes/?'+urlPesquisa}).
            success(function(data, status, headers, config) {
                $scope.pacotes = data;
        }) 
    } 





  $scope.form=1;


});