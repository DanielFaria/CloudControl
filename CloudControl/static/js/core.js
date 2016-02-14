var profileEditApp = angular.module('comentariosApp', []);
 
profileEditApp.config(['$httpProvider', '$interpolateProvider',
    function($httpProvider, $interpolateProvider) {
    /* for compatibility with django teplate engine */
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    /* csrf */
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
}]);
 
profileEditApp.controller('comentariosCtrl', function ($scope, $http) {
    $scope.data = {success: false, teste:"pinzi"};
 
    function getComentarios(){
        $http({method: 'GET', url: globals.comentariosUrl}).
            success(function(data, status, headers, config) {
                $scope.data.comentarios = data;
        })
    }
 
    getComentarios()
 
    $scope.removerComentario = function(comentario){
        $http({method: 'DELETE', url: globals.comentariosUrl + comentario.id + "/", data: { id: comentario.id }}).
        success(function(data, status, headers, config) {
            var index = $scope.data.comentarios.indexOf(comentario);
            if (index != -1) {
                $scope.data.comentarios.splice(index, 1);
            }
        }).
        error(function(data, status, headers, config) {
 
        });
    }
 
    $scope.updateComentarios = function() {
        $http({method: 'POST', url: globals.comentariosUrl, data: { titulo: $scope.data['titulo'], comentario: $scope.data['comentario'] }}).
        success(function(data, status, headers, config) {
            $scope.data['success'] = true;
            getComentarios();
        }).
        error(function(data, status, headers, config) {
            $scope.data['success'] = false;
        });
    }
});