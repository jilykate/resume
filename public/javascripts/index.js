var detector = require('javascripts/detect.js');
var FoldingFan = require('javascripts/foldingfan.js');
require("../stylesheets/index.scss");

(function(){
	if(detector.result.isIE){
		$('.noti').addClass('active');
	}else{
		welcome = 'Welcome to my home!\n' +
			'To checkout the source code you can visit my github page:\n'+
			'http://https://github.com/jilykate.\n';

		console.log(welcome);
	}

	if(detector.result.isIphone || detector.result.isAndroid){
		$('.J_call').attr('href','tel:+491757389965');
	}
})();

(function notiPanel(){
	var $panel = $('.noti .panel'),
		$close = $panel.find('.J_close'),
		$copy = $panel.find('.J_copy'),
		$download = $panel.find('.J_download');

	$copy.on('click',function(){
		$panel.find('p').html('<b>copy address:</b>\n' + window.location.href);
		$(this).addClass('disabled');
	})
	$download.on('click',function(){
		//pending
	})
})();

var layerUps = [];
if(FoldingFan){
	var foldingFan = new FoldingFan({$wrapper:'.sections'});
	(function(){
		$.each($('.section .preview'),function(index,item){
			layerUps.push(new LayerUp($(item)));
		})
	})();
	$('.section-list').on('click tap','.section',function(){
		var $target = $(this),
			index = $target.index('.section'),
			$siblings = $target.siblings('.section');
		if($target.hasClass('active')){
			$('.section .content').addClass('hidden-trans');
			foldingFan.reset();
			layerUps[index].revert();
		}else{
			foldingFan.active(this);
			$siblings.find('.content').addClass('hidden-trans');
			layerUps[index].start();
			$.each(layerUps,function(idx,item){
				if(idx !== index){
					layerUps[idx].revert();
				}
			})
		}
	})
	.on('activeEnd','.section',function(){
		var $target = $(this),
			$siblings = $target.siblings('.section').find('.preview').addClass('hidden');
		$target.find('.preview').removeClass('hidden')
		.end().find('.content').removeClass('hidden-trans');

		if($target.hasClass('skill-section')){
			$target.find('.skills .bar').addClass('show');
		}
	})
	.on('resetEnd',function(){
		var $target = $(this);
		$target.find('.preview').removeClass('hidden');
	})

	/*layers heap effect*/
	function LayerUp($container){
		var TYPES = {
			'CIRCLE':0,
			'SQUARE':1,
			'FLOWER':2,
			'DIAMOND':3
		},
		type,
		$container = $container,
		layerType = $container.data('type');
		addLayer(layerType);

		function addLayer(layerType){
			switch(TYPES[layerType]){
				case 0:
					type = 'circle';
					break;
				case 1:
					type = 'square';
					break;
				case 2:
					type = 'flower';
					break;
				case 3:
					type = 'diamond';
					break;
				default:
					break;
			};
			var html = '<div class="' + type + 's layer_wrapper">'+
							'<div class="' + type + '_1 layer transparent trans-08">'+
								'<div class="' + type + '_2 layer transparent trans-05">'+
									'<div class="' + type + '_3 layer transparent trans-03"></div>'+
								'</div>' +
							'</div>'+
						'</div>';

			$container.append(html);
		}

		function start(){

			$container.find('.' + type + '_1').removeClass('transparent')
				.find('.' + type + '_2').removeClass('transparent')
				.find('.' + type +'_3').removeClass('transparent');
		}

		function revert(){
			$container.find('.layer').addClass('transparent');
		}

		return {
			addLayer : addLayer,
			start : start,
			revert : revert
		}

	}


}

(function meunInit(){
	var $menu = $('.tools'),
		$toggle = $menu.find('.J_toggle'),
		$list = $menu.find('.tool-list'),
		$qrcode = $('.qrcode-layer'),
		$imprint = $('.imprint-layer');

	if(detector.result.isIphone || detector.result.isAndroid){
		$toggle.on('click',function(){
			$list.toggle();
		})
	}else{
		$menu.addClass('enable-hover');
		$menu.find('.qrcode-tool').removeClass('hidden')
		.on('click',function(){
			$qrcode.fadeIn(500);
		})

		$qrcode.on('click','.bg',function(){
			$qrcode.addClass('hidden-trans');
		})
	}

	$menu.on('click','.imprint-tool',function(){
		$imprint.fadeIn(500);
	})

	$imprint.on('click','.bg,.J_close',function(){
		$imprint.fadeOut(500);
	})

})();



