(function() {

    var indexOf = function(needle) {
        if(typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function(needle) {
                var i = -1, index = -1;

                for(i = 0; i < this.length; i++) {
                    if(this[i].id === needle) {
                        index = i;
                        break;
                    }
                }
                return index;
            };
        }

        return indexOf.call(this, needle);
    };


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
                socket.on('show', function(data) {
                    var url = data.show;
                    setTimeout(
                        $.ajax({
                            url: url,
                            type: 'POST',
                            crossDomain: true,
                            dataType: 'jsonp'
                        }).done(function (result) {
                            if (self.Imagens.length >= 29) {
                                self.Imagens.splice(29, 1);
                            }
                            if (indexOf.call(self.Imagens, result.data[0].id) !== -1) {
                                self.Imagens.unshift(self.renderizaImagens(result.data[0]));
                                self.$apply()
                            }
                        }), 3000);

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