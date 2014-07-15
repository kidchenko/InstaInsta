    var socket = io.connect('http://localhost:8000');
    angular.module('instainsta', [])

    .controller('HomeController', ['$scope', function($scope) {

        $scope.pegaDados = function(){
            var self = this;
            socket.on('show', function(data) {
                var url = data.show;
                $.ajax({
                    url: url,
                    type: 'POST',
                    crossDomain: true,
                    dataType: 'jsonp'
                }).done(function (data) {
                    console.log(data);
                });
            });
        }
    };
