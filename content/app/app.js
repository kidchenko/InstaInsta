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
                    self.Imagens.push({
                        type: data.type,
                        Url: data.link,
                        ImageSrc: data.images.low_resolution.url,
                        ImagemWidth: data.images.low_resolution.width,
                        ImageHeigth: data.images.low_resolution.heigth
                    });
                })
                self.$apply()
                Estilos.Estilo4();
            });
        };

            self.escolheEstilo = function(numeroEstilo){
                if (numeroEstilo === 1) Estilos.Estilo1();
                if (numeroEstilo === 2) Estilos.Estilo2();
                if (numeroEstilo === 3) Estilos.Estilo3();
                if (numeroEstilo === 4) Estilos.Estilo4();
                if (numeroEstilo === 5) Estilos.Estilo5();
            }
    }]);
})(this);