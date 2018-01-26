
function my_module_menu() {
  var items = {};
  items['my-page'] = {
      title: 'My page',
      page_callback: 'my_module_page',
      pageshow: 'my_module_pageshow'
    };
  
  items['my_autocomplete'] = {
		    title: 'Autocomplete',
		    page_callback: 'my_module_autocomplete_page'
		  };

		  
  return items;
}

function my_module_autocomplete_page() {
	  try {
	    var content = {};
	    content.my_autocomplete = {
	      theme: 'autocomplete',
	      remote: true,
	      custom: true,
	      path: 'test-autocomplete/'+my_filter_value(),
	      value: 'nid',
	      label: 'title',
	      filter: 'title',
	      params: 'limit=5'
	    };
	    return content;
	  }
	  catch (error) { console.log('my_module_autocomplete_page - ' + error); }
	}


function my_module_container_id() {
  return 'my-module-container';
}

function my_module_page() {
  var content = {};
  content.filter = {
    theme: 'my_filter'
  };
  var id = my_module_container_id();
  content.container = {
    markup: '<div id="' + id + '"></div>'
  };
  return content;
}

function my_module_pageshow() {
  var content = {};
  
  // Build a path to the View with a contextual filter.
  var viewsPath = 'term-autocomplete&tid='+my_filter_value()+'';
//    ngt_invitation_status_value();
  
  // Build a Views Render Array with contextual filter.
  
  content.results = {
    theme: 'view',
    path: viewsPath,
    remote: true,
    custom: false,
    format: 'ul',
    label: 'term',
    filter: 'tid',		
    row_callback: 'my_module_row',
    empty_callback: 'my_module_empty'
  }

  content['auto'] = {
		    theme:'autocomplete',
		    path:'test-autocomplete',
		    remote: true,
		    custom: false,
		    handler: 'index',
		    entity_type: 'node',
		    value: 'nid',
		    label: 'body',
		    filter: 'body_value[]'		  
};
  // Inject the rendered content into our div.
  $('#' + my_module_container_id()).html(
    drupalgap_render(content)
  ).trigger('create');
}

function my_module_row(view, row, variables) {
		console.log(view);
  return l(row.title, 'node/' + row.nid);
}

function my_module_empty(view) {
  return t('No content found.');
}

function theme_my_filter(variables) {
  return theme('select', {
    options: {
      '16': t('Mietrecht'),
      '16': t('Accepted'),
      '18': t('Declined'),
      '19': t('Expired'),
     '15': t('Miete')
    },
    attributes: {
      onchange: 'my_filter_onchange(this)',
      class: 'my-filter',
      'data-theme': 'b'
    }
  });
}

function my_filter_value() {
  return $('#' + drupalgap_get_page_id() + ' select.my-filter').val();
}

function my_filter_onchange(select) {
  console.log($(select).val());
  my_module_pageshow();
}