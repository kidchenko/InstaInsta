var Estilos = Estilos || {};

	Estilos.Estilo1 = function(){
					
		var $container 	= $('#am-container'),
			$imgs		= $container.find('img').hide(),
			totalImgs	= $imgs.length,
			cnt			= 0;
					
		$imgs.each(function(i) {
			var $img	= $(this);
			$('<img/>').load(function() {
				++cnt;
				if( cnt === totalImgs ) {
					$imgs.show();
					$container.montage({
						fillLastRow				: true,
						alternateHeight			: true,
						alternateHeightRange	: {
							min	: 90,
							max	: 240
						}
					});
				}
			}).attr('src',$img.attr('src'));
		});	
	};

	Estilos.Estilo2 = function(){
		var $container 	= $('#am-container'),
			$imgs		= $container.find('img').hide(),
			totalImgs	= $imgs.length,
			cnt			= 0;
				
		$imgs.each(function(i) {
			var $img	= $(this);
			$('<img/>').load(function() {
				++cnt;
				if( cnt === totalImgs ) {
					$imgs.show();
					$container.montage({
						fillLastRow	: true,
							alternateHeight	: true,
							alternateHeightRange : {
								min	: 90,
								max	: 240
							},
							margin : 0
					});
				}
			}).attr('src',$img.attr('src'));
		});	
	};

	Estilos.Estilo3 = function(){
		var $container 	= $('#am-container'),
			$imgs		= $container.find('img').hide(),
			totalImgs	= $imgs.length,
			cnt			= 0;
		
		$imgs.each(function(i) {
			var $img	= $(this);
			$('<img/>').load(function() {
				++cnt;
				if( cnt === totalImgs ) {
					$imgs.show();
					$container.montage({
						liquid 	: false,
						fixedHeight : 120
					});

					var imgarr	= new Array();
					for( var i = 1; i <= 73; ++i ) {
						imgarr.push( i );
					}
				}
			}).attr('src',$img.attr('src'));
		});	
	};

	Estilos.Estilo4 = function(){
		var $container 	= $('#am-container'),
			$imgs		= $container.find('img').hide(),
			totalImgs	= $imgs.length,
			cnt			= 0;
				
		$imgs.each(function(i) {
			var $img	= $(this);
			$('<img/>').load(function() {
				++cnt;
				if( cnt === totalImgs ) {
					$imgs.show();
					$container.montage({
						minw : 100,
						alternateHeight : true,
						alternateHeightRange : {
							min	: 50,
							max	: 350
						},
						margin : 8,
						fillLastRow : true
					});

					var imgarr	= new Array();
					for( var i = 1; i <= 73; ++i ) {
						imgarr.push( i );
					}
				}
			}).attr('src',$img.attr('src'));
		});	
	};

	Estilos.Estilo5 = function(){
		var $container 	= $('#am-container'),
			$imgs		= $container.find('img').hide(),
			totalImgs	= $imgs.length,
			cnt			= 0;
				
		$imgs.each(function(i) {
			var $img	= $(this);
			$('<img/>').load(function() {
				++cnt;
				if( cnt === totalImgs ) {
					$imgs.show();
					$container.montage({
						minsize	: true,
						margin 	: 2
					});

					var imgarr	= new Array();
					for( var i = 1; i <= 73; ++i ) {
						imgarr.push( i );
					}
				}
			}).attr('src',$img.attr('src'));
		});	
	};