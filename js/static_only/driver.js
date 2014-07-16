//Хранит все шаблоны 
var templates = {};

//Объект отвечает за переходы между страницами
var driver = {
	init: function() {
		//Сохранить все html шаблоны, так ка body очищается при переходе между страницами
		$('[type="text/template"]').each(function(i, tpl_el) {
			templates[$(tpl_el).attr('id')] = $(tpl_el).html();
		});
		
		//Активировать ссылки на карте сайта
		$('.site_map a').each(function(i, el) {
			$(el).click(function() {
				driver.go_to_page($(el).attr('data-page'));
			});
		});
	},
	go_to_page: function(page_name) {
		$('body').empty();
		var template = templates[page_name+'_page_tpl'];
		var rendered = Mustache.render(template, $.extend(text[page_name+'_page'], data[page_name+'_page']));
		$('body').html(rendered);
	}
}

$(driver.init);