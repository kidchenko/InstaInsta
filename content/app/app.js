(function() {    
    var socket = io.connect(window.location.origin);

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
        self.renderizaImagens = function(data){
            return {
                type: data.type,
                Url: data.link,
                ImageSrc: data.images.low_resolution.url,
                ImagemWidth: data.images.low_resolution.width,
                ImageHeigth: data.images.low_resolution.heigth
            };
        };

        self.maisRecente = function(){
            socket.on('firstShow', function (data) {
                $.each(data.firstShow, function(index, data){
                    self.Imagens.push(self.renderizaImagens(data));
                })
                self.$apply()
                Estilos.Estilo4();
            });
        };

        self.atualizar = function(){
            alert('oi');
                socket.on('show', function(data) {
                    var url = data.show;
                    $.ajax({
                        url: url,
                        type: 'POST',
                        crossDomain: true,
                        dataType: 'jsonp'
                    }).done(function (result) {
                        $.each(result, function(index, data){
                            self.Imagens.push(self.renderizaImagens(data));
                        })
                        self.$apply()
                    });
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