function dmt_menu_install() {
	try {
		var css = drupalgap_get_path('module', 'dmt_menu') + '/dmt_menu.css';
		drupalgap_add_css(css);
	} catch (error) {
		console.log('dmt_menu_install - ' + error);
	}
}

function dmt_menu_menu() {
	var items = {};
	items['menu/%'] = {
		title : 'My page',
		page_callback : 'dmt_menu_page',
		pageshow : 'dmt_menu_pageshow',
		page_arguments : [ 1 ],
	// options:{
	// reloadPage:true
	// },
	};
	return items;
}

function dmt_menu_page(args) {
	  try {
		  var content = {};
	    content['my_button'] = {
	      markup: '<div id="'+dmt_menu_container_id() + '_'
			+ drupalgap_get_page_id()+'">no results yet!</div>',
	    };
	    return content;
	  }
	  catch (error) { console.log('d7m_page - ' + error); }
	}

function dmt_menu_pageshow(args) {
	  try {
	//alert(args);
	_getMenuPage(args);
	    return content;
	  }
	  catch (error) { console.log('d7m_page - ' + error); }
	}


function _getMenuPage(name) {
	dmt_menu_get_menu(
			{
				success : function(result) {
					if (result.nodes.length > 0) {
					

						var html ='<div style="max-width:400px;" data-role="ui-content"><small>'+JSON.stringify(result.nodes)+'</small></div>';
						$(
								'#' + dmt_menu_container_id() + '_'
										+ drupalgap_get_page_id()).html(html)
								.trigger('create');
					}

				}
			}, name);
}


function dmt_menu_container_id() {
	return 'dmt-menu-container';
}
/*
 * popup menu block info
 */
function dmt_menu_block_info() {
	try {
		var blocks = {};
		blocks['dmt_menu'] = {
			delta : 'dmt_menu',
			module : 'dmt_menu'
		};
		return blocks;
	} catch (error) {
		console.log('dmt_menu_block_info - ' + error);
	}
}
/*
 * popup menu block view
 */
function dmt_menu_block_view(delta, region) {
		try {
		var content = {};

		switch (delta) {

		case 'dmt_menu':
			var script = drupalgap_jqm_page_event_script_code({
				page_id : drupalgap_get_page_id(),
				jqm_page_event : 'pageshow',
				jqm_page_event_callback : "_getMenu('dmt-menu')",
				jqm_page_event_args : JSON.stringify({
					menu_name : 'dmt_menu',
					container_id : dmt_menu_container_id() + '_'
							+ drupalgap_get_page_id(),
					'regionname' : region.name,
					'pageid' : drupalgap_get_page_id()
				})
			}, dmt_menu_container_id());

			content['dmt_menu_block'] = {
				markup : '<div style="float:left;max-width:50px;" id="' + dmt_menu_container_id() + '_'
						+ drupalgap_get_page_id() + '" class="dmt-menu"></div>'
			};

			content['script'] = {
				markup : script
			};
			break;
		default:
		}
		return drupalgap_render(content);
	} catch (error) {
		console.log('dmt_menu_block_view - ' + error);
	}
}

/*
 * get the menu by the menuname (default:dmt-menu) from the DMT Menu Service
 */
function dmt_menu_get_menu(options, name) {
	var arg = {
		'name' : name
	};
	try {
		options.method = 'POST';
		options.path = 'dmt_menu/get_menu.json';
		options.service = 'dmt_menu';
		options.resource = 'get_menu';
		options.data = JSON.stringify(arg);
		Drupal.services.call(options);
	} catch (error) {
		console.log('d7m_get_menu - ' + error);
	}
}

/*
 * render the Menu Links results to the popup
 */
function _getMenu(name) {
	dmt_menu_get_menu(
			{
				success : function(result) {
					if (result.nodes.length > 0) {
						var items = [];
						$.each(result.nodes, function(index, object) {
							var node = object.node;
							items.push(
							// l(node.title,
							// node.path,'{options:{reloadPage:true}}')
							l(node.title, node.path));
						});

						var html = theme(
								'popup',
								{
									content : theme('jqm_item_list', {
										items : items
									}),
									options : menu_popup_get_default_options(),
									attributes : {
										id : dmt_menu_container_id(),
									
									},
									button_attributes : drupalgap.settings.dmt_menu.attributes,

								});
						$(
								'#' + dmt_menu_container_id() + '_'
										+ drupalgap_get_page_id()).html(html)
								.trigger('create');
					}

				}
			}, name);
}
