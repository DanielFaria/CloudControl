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




    $scope.list = function() {
      console.info('Buscando produtos da categoria');
      $http.get('https://young-inlet-2721.herokuapp.com/produtos')
        .success(function (data) {
        $scope.produtos=data;
        console.info("Obteva resultados", data);
        //  
    });
  }

  $scope.add  =  function(id) {
      console.info('Adicionado produto:',id);
      $http.get('https://young-inlet-2721.herokuapp.com/produtos/'+id)
      .success(function (data) {
           var produto = angular.fromJson(data);
           $scope.produtosSelecionados.push(produto);
           precoFormatado = produto.preco.replace(/,/g, '.');
           $scope.total += 1;
           $scope.valorTotal += parseFloat(precoFormatado);
           $scope.valorTotal.toFixed(2);

        });
  } 


  $scope.get   =  function(id) {
      console.info('Buscando produtos da categoria',id)
      $http.get('https://young-inlet-2721.herokuapp.com/produtos/porCategoria/'+id)
        .success(function (data) {
        $scope.produtos=data;
        //  Do something with the data !
        console.info("Obteva resultados");
        //  
    });
  }
   $scope.inicio   =  function() {
      console.info('Efetuando Checkout');
        $scope.produtosSelecionados = []
        $scope.isCheckout = false;
        $scope.total =0;
        $scope.valorTotal = 0;
  }



   $scope.checkout   =  function() {
      console.info('Efetuando Checkout');
        $scope.produtosSelecionados = []
        $scope.isCheckout = true;
        $scope.total =0;
        $scope.valorTotal = 0;
  }



  $scope.produtosSelecionados = [];
  $scope.total = 0;
  $scope.valorTotal = 0;
  $scope.valorTotal.toFixed(2);
  $scope.isCheckout = false;


}
AppListCtrl.$inject = ['$scope', '$http', '$templateCache'];