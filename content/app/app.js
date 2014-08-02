(function() {    
    var socket = io.connect(window.location.origin);

    angular.module('instainsta', [])

    .controller('HomeController', ['$scope', function($scope) {
        var self = $scope;
        self.Imagens = [];

        self.init = function(){
            self.maisRecente();
            self.atualizar();
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
            alert('carrega inicial')
            socket.on('firstShow', function (data) {
                $.each(data.firstShow, function(index, data){
                    self.Imagens.push(self.renderizaImagens(data));
                })
                self.$apply()
                Estilos.Estilo4();
            });
        };

        self.atualizar = function(){
            alert('ataliza');
                socket.on('show', function(data) {
                    alert('nova imagem')
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