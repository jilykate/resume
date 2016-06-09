var $ = require('jquery');
require("../stylesheets/ff.scss");

var FoldingFan = function(config){
	if(config){
		this.config = config;
	}
	this.init(config);
};

FoldingFan.prototype = {
	defConfig:{
		hoverEft:'enable',
		wrapper:'.sections',
		errors:{
			0 : 'out_of_range',//number of section out of range(2-5)
			1 : 'missing_element'//can't find required element
		}
	},
	init:function(config){
		var self = this;
		self.errors = 
		self.config = $.extend(config,self.defConfig);
		self.errors = self.config.errors;

		self.$wrapper = $(self.config.wrapper);
		self.$list = self.$wrapper.find('.section-list');
		self.$normalList = self.$wrapper.find('.section-list.normal'); 

		self.$sections = self.$wrapper.find('.section');

		if(self.$wrapper.length === 0){
			self._errHandler(1);
		}
		self.number = self.$wrapper.find('.section').length;
		if(self.number < 2 || self.number > 5){
			self._errHandler(0);
		}
		self._createStyle();
		if(self.config.hoverEft === 'enable'){
			self._enableHover();
		}
		self.$sections.addClass('trans-05')
			.children().on('transitionend',function(){
				return false;
			})

		self._handleResize();

	},
	_handleResize:function(){
		var self = this,
			timer;

		$(window).on('resize',function(){
			if(!self.$sections.hasClass('no-transition')){
				self.$sections.addClass('no-transition');
			}
			clearTimeout(timer);
			timer = setTimeout(function(){
				self.$sections.removeClass('no-transition');
			},200);
		})

	},
	_createStyle:function(){
		var self = this;

		var normal_width = 100/self.number,
			minify_width = 5,
			active_width = 100 - (self.number - 1) * minify_width,
			shrink_width = normal_width - 2,
			extend_width = 100 - (self.number - 1) * shrink_width; 

		var normal_height = 100/self.number,
			minify_height =  5,
			active_height = 100 - (self.number - 1) * minify_height,
			shrink_height = normal_height - 2,
			extend_height = 100 - (self.number - 1) * shrink_height;
		
		var css = self.config.wrapper + ' .section {width:' + normal_width + '%;}\n ';
		css += self.config.wrapper + ' .section.expand{width:' + extend_width + '%;}\n' +
				self.config.wrapper + ' .section.collapse{width:' + shrink_width + '%;}\n' +
				self.config.wrapper + ' .section.active{width: ' + active_width + '%;}\n' +
				self.config.wrapper + ' .section.minify{width: ' + minify_width + '%;}\n';//for fullscreen laptop

		css += '@media only screen and (max-width: 1020px) {';

		css += self.config.wrapper + ' .section {height:' + normal_height + '% !important;}\n' +
				self.config.wrapper + ' .section.active{height: ' + active_height + '% !important;}\n' +
				self.config.wrapper + ' .section.minify{height: ' + minify_height + '% !important;}\n';

		css += '}';//for mobile devices
		var style_html = '<style type="text/css">' + css + '</style>';
		$('head').append(style_html);

	},
	_errHandler:function(err_code){
		var self = this,
			error = self.errors[err_code];
		if(error){
			try {
			  	throw new Error(error);
			} catch (e) {
			  	console.log(e.name + ': ' + e.message);
			}
		}else{
			throw new Error('unexpected error');
		}
	},
	_enableHover:function(){
		var self = this;
		self.$list.on('mouseenter','.section',function(){
			if(self.$list.hasClass('normal')){
				self.$sections.removeClass('collapse');
				$(this).addClass('expand').siblings('.section').addClass('collapse');
			}
		})
		.on('mouseleave','.section',function(){
			if(self.$list.hasClass('normal')){

				self.$sections.removeClass('expand collapse');
				$(this).removeClass('expand');
			}
		})
	},
	active:function(param){
		var self = this;
		if($.isNumeric(param)){
			$target = self.$sections.eq(param);
		}else{
			$target = $(param);
		}
		var $siblings = $target.siblings('.section');

		if($target && !$target.hasClass('active')){
			$target.removeClass('minify').addClass('active');
			$siblings.removeClass('active').addClass('minify');
		}
		self.$list.removeClass('normal').addClass('extend');
		$target.trigger('activeStart');
		$target.one('transitionend',function(e){
			if($(e.target).hasClass('section')){
				$target.trigger('activeEnd',[param]);
			}
		})
	},
	reset:function(){
		var self = this;
		self.$sections.removeClass('active minify');
		self.$list.removeClass('extend').addClass('normal');
		self.$list.trigger('resetStart');
		self.$list.one('transitionend',function(){
			self.$list.trigger('resetEnd');
		})
	}
};

FoldingFan.prototype.init.prototype = FoldingFan.prototype;

module.exports = FoldingFan;