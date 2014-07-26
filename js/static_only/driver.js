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
		
		// $('.site_map a').last().click();
	},
	go_to_page: function(page_name) {
		$('body').empty();
		var template = templates[page_name+'_page_tpl'];
		var page_text = text[page_name+'_page'];
		var page_data = data[page_name+'_page'];
		var all_text = [page_text, page_data];
		var page_partials = partials[page_name+'_page'];
		var combined_partials = {};
		for (var i = 0; i < page_partials.length; i++) {
			var partial_template = templates[page_partials[i]+'_tpl'];
			var partial_text = text[page_partials[i]];
			var partial_data = data[page_partials[i]];
			all_text.push(partial_text, partial_data);
			combined_partials[page_partials[i]] = partial_template;
		}
		all_text.push(data.common, text.common);
		all_text.unshift({});
		var combined_text = $.extend.apply(this, all_text);
		var rendered = Mustache.render(template, combined_text, combined_partials);
		$('body').html(rendered);
	}
}

$(driver.init);