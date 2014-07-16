(function() {    
    var socket = io.connect('http://localhost:8000');

    angular.module('instainsta', [])

    .controller('HomeController', ['$scope', function($scope) {
        var self = $scope;
        self.Imagens = [];

        self.pegaDados = function(){
            var self = this;
            console.log('oi');
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
        };

        self.maisRecente = function(){
            socket.on('firstShow', function (data) {
                $.each(data.firstShow, function(index, data){
                    console.log(data);
                    self.Imagens.push({
                        type: data.type,
                        Url: data.link,
                        ImageSrc: data.images.low_resolution.url,
                        ImagemWidth: data.images.low_resolution.width,
                        ImageHeigth: data.images.low_resolution.heigth
                    });
                })
                self.$apply()
                Estilos.Estilo1();
            });
        };
    }]);
})(this);