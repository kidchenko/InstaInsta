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
                Id: data.id,
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
                var load = true;
                socket.on('show', function(data) {
                if (load) {
                    load = false;
                    var url = data.show;
                        $.ajax({
                            url: url,
                            type: 'POST',
                            crossDomain: true,
                            dataType: 'jsonp'
                        }).done(function (result) {
                                var d = new Date();
                                var seconds = d.getSeconds();

                                if (self.Imagens.length >= 29) {
                                    self.Imagens.splice(29, 1);
                                }
                                var isEqual = false;
                                for (var i = 0; i < self.Imagens.length; i++ ) {
                                    if (self.Imagens[i].Id === result.data[0].id){
                                        isEqual = true;
                                    }
                                }

                                if (!isEqual) {
                                    self.Imagens.unshift(self.renderizaImagens(result.data[0]));
                                    self.$apply();
                                    setTimeout(function(){load = true; }, 4000);
                                }
                        });
                };
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