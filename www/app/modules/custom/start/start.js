function start_install(){
	drupalgap_add_js(drupalgap_get_path('module','start')+'/system.js');
}

function start_menu() {
	try {
		var items = {};
		items['start'] = {
			title : 'Alles was Recht ist!',
			page_callback : 'start_page',
			pageshow : 'start_pageshow',
		};
		return items;
	} catch (error) {
		console.log('start_menu - ' + error);
	}
}

function swipeLeftHandlerStart( event ){
	$('#start_grid_view  .pager_next').click();
 	$( event.target ).addClass( "swipe" );
}

 function swipeRightHandlerStart( event ){
 	$('#start_grid_view .pager_previous').click(); 
 	$( event.target ).addClass( "swipe" );
	  }              


function start_pageshow() {
	try {
		 	  $( "#start" ).on( "swipeleft", swipeLeftHandlerStart );
		 	  $( "#start" ).on( "swiperight", swipeRightHandlerStart );

	} catch (error) {
		console.log('start-pageshow - ' + error);
	}
}


/**
 * The map page callback.
 */
function start_page() {
	try {

		var content = {};
		content['my_grid'] = {
			theme : 'jqm_grid',
			columns : 2,
			items : [ bl('Rechtsfragen', '#',{attributes:{'data-icon':'section',onclick:'pubsub.trigger(\'main-menu-clicked\', { \'page\':\'start\',\'action\':\'Fragen ansehen\' } )'}}), 
			          bl('Suchen', '#',{attributes:{'data-icon':'search',
			        	  onclick:'pubsub.trigger(\'main-menu-clicked\', { \'page\':\'start\',\'action\':\'Frage suchen\' } )'}}),
			       	bl('Lesezeichen', '#', {
						attributes:{'data-icon':'tag',
							onclick:'pubsub.trigger(\'main-menu-clicked\', { \'page\':\'start\',\'action\':\'Lesezeichen ansehen\' } )',
},
										'reloadPage' : 'true',						 
					}), 
					bl('Rechtsfrage stellen', '#',{attributes:{'data-icon':'action',
						onclick:'pubsub.trigger(\'main-menu-clicked\', { \'page\':\'start\',\'action\':\'Frage stellen\' } )',
						}}),
			// bl('Rechtsfrage stellen', 'node/add/rechtsfrage'),
			]
		};
/*
		content['gride'] = {
			theme : 'header',
			text : 'Neueste'
		};
*/
		content['grid'] = {
			theme : 'view',
			title:'Neueste',
			//format : 'u',
			//columns : 1,
			path : 'drupalgap/views_datasource/drupalgap_content',
			row_callback : 'start_list_row',
			empty_callback : 'start_list_empty',
			attributes : {
				id : 'start_grid_view'
			}
		};

		/*
		 * content['example5_grid'] = { theme: 'view', format: 'grid',
		 * columns:2, path: 'drupalgap/views_datasource/drupalgap_content',
		 * row_callback: 'start_list_row', empty_callback: 'start_list_empty',
		 * attributes: { id: 'example5_grid_view' } };
		 * 
		 */
	//	content['c1'] = {
	//		markup : '<img src="' + drupalgap.settings.logo
	//				+ '" style="display: block; margin: 0 auto" />',
	//	};

		
		return content;
	} catch (error) {
		console.log('start_page - ' + error);
	}
}

function start_list_row(view, row, variables) {
	try {
var content={};
	btn=bl('Ansehen','node/' + row.nid,{attributes:{
    		'class':'ui-btn ui-btn-inline ui-mini ui-icon-eye ui-btn-icon-right',
		}});
	content['html']={
				markup:'<div data-role="collapsible">'
			    +'<h4><small>'+row.created+'</small><p>'+row.title+'</p></h4>'
			    +'<p>'+row.title+'<span style="float:right">'+drupalgap_render(btn)+'</span></p></div>'			    		
			    		
		};
return drupalgap_render(content);
	} catch (error) { console.log('start_list_row - ' + error); }
}

function start_list_empty(view, variables) {
	return t('Sorry, nichts gefunden.');
}



function start_block_info() {
	try {
		var blocks = {};
		blocks['start_footer'] = {
			delta : 'start_footer',
			module : 'start'
		};

		blocks['inhalt_block'] = {
			delta : 'inhalt_block',
			module : 'start'
		};

		blocks['control_block'] = {
			delta : 'control_block',
			module : 'start'
		};
		return blocks;
	} catch (error) {
		console.log('start_block_info - ' + error);
	}
}

function start_block_view(delta, region) {
	try {

		var content = {};
		switch (delta) {
		case 'start_footer':
			content['start_footer'] = {
				markup : '<a href="#" class="ui-btn" onclick="javascript:window.open(\'https://m.facebook.com/groups/RechtsberatungSchweiz/\', \'_blank\', \'location=yes\');">Rechtsforum Schweiz <img src="'
						+ drupalgap_get_path('module', 'start')
						+ '/fb_group_s.png" width="24" height="24"/></a>',
			};
			break;
		case 'inhalt_block':
			content['inhalt_block'] = {
				theme : 'header',
				text : 'AWRI',
				attributes : {
					id : 'header_top'
				},
				type : 'h3',
				type_attributes : {
					class : 'my-css-class'
				}
			};
			break;
		case 'control_block':

			console.log(region);
			content['control_block'] = theme_controls({});

			break;
		default:

		}
		return drupalgap_render(content);
	} catch (error) {
		console.log('start_block_view - ' + error);
	}
}




/*
 * function my_module_camera_click() { try { navigator.camera.getPicture(
 *  // Success function(imageURI) { drupalgap_toast(t('Picture saved!'));
 * $('#video').attr('src','data:image/jpeg;base64,'+imageURI).trigger('create');
 * 
 * Drupal.services.call({ method: 'POST', path: 'file.json', data:
 * JSON.stringify({'file':{'file':imageURI,"filename":"14376_1472933862147.jpg","filepath":"public://14376_1472933862147.jpg"}}),
 * success: function(result) { var user_count = result[0]; var msg = 'There are ' +
 * user_count + ' registered user(s)!' drupalgap_alert(msg); } });
 * 
 * console.log(imageURI); },
 *  // Error function(message) { console.log(message); },
 *  // Settings { quality: drupalgap.settings.camera.quality, destinationType:
 * Camera.DestinationType.FILE_URI }
 *  ); } catch (error) { console.log('my_module_camera_click - ' + error); } }
 */

function theme_pic(fbid, h, w) {
	var pic='';
	if (Drupal.user.uid == 0)
		return '<p>' + l('Bitte anmelden', 'user/login') + '</p>';
	if (fbid === undefined)
		pic = '<img src="' + drupalgap_get_path('module', 'start')
				+ '/anonymous.png" style="border-radius: 50%;" width="' + w
				+ '" height="' + h + '"/>';
	else if (fbid > 0)
		pic = '<img src="https://graph.facebook.com/' + fbid
				+ '/picture?type=small" style="border-radius: 50%; width="' + w
				+ '" height="' + h + '"/>';
	return pic;
}

function theme_fbpic(fbfield) {
	var pic='';
	if (Drupal.user.uid == 0)
		return '<p>' + l('Bitte anmelden', 'user/login') + '</p>';
	if (fbfield['und'] === undefined)
		pic = '<img src="' + drupalgap_get_path('module', 'start')
				+ '/anonymous.png" style="border-radius: 50%;"/>';
	else if (fbfield['und'][0].value > 0)
		pic = '<img src="https://graph.facebook.com/' + fbfield['und'][0].value
				+ '/picture?type=small" style="border-radius: 50%;"/>';

	return pic;
}

/*
 * 
 * FLAGSTUFF
 */

function bookmark_quick_link(flag_name, entity_type, entity_id, flagged) {
	return bl('Lesezeichen', null, {
		attributes : {
			onclick : _bookmark_quick_link_onclick_attribute(flag_name,
					entity_type, entity_id, flagged),
			'id' : 'bookmark-' + entity_id,
			'data-theme' : _flag_quick_link_data_theme(flagged)
		},
	});
}

function _bookmark_quick_link_onclick_attribute(flag_name, entity_type,
		entity_id, flagged) {
	return "_bookmark_quick_link_onclick(this, '" + flag_name + "', '"
			+ entity_type + "', " + entity_id + ", " + flagged + ")";
}

function _bookmark_quick_link_onclick(button, flag_name, entity_type,
		entity_id, flagged) {
	var action = flagged ? 'unflag' : 'flag';
	flag_flag(
			flag_name,
			entity_id,
			action,
			Drupal.user.uid,
			flagged,
			{
				success : function(results) {
					if (!results[0]) {
						console.log(t('Flagging was unsuccessful!'));
						return;
					}
					var new_theme = _flag_quick_link_data_theme(!flagged);
					var old_theme = _flag_quick_link_data_theme(flagged);
					var new_onclick = _flag_quick_link_onclick_attribute(
							flag_name, entity_type, entity_id, !flagged);
					var new_class = 'ui-btn-' + new_theme;
					var old_class = 'ui-btn-' + old_theme;
					$(button).attr('data-theme', new_theme).attr('onclick',
							new_onclick).removeClass(old_class).addClass(
							new_class).trigger('create');
					// In case the entity page view was already in the DOM, try
					// to remove it.
					setTimeout(
							function() {
								drupalgap_remove_page_from_dom(drupalgap_get_page_id(entity_type
										+ '/' + entity_id));
							}, 50);
				}
			});
}

function _getFBID(elem) {
	openFB.api({
		method : 'GET',
		path : '/me',
		params : {
			access_token : variable_get('fbAccessToken'),
			message : 'Testing the Facebook Graph API'
		},
		success : function(data) {
			console.log(data);

			$(elem).val(data.id);
		},
		error : function(error) {
			console.log(error);
		}
	});

}

function getCookie(name) {
	var re = new RegExp(name + "=([^;]+)");
	var value = re.exec(document.cookie);
	return (value != null) ? unescape(value[1]) : null;
}

function socialShare(url) {
	// this is the complete list of currently supported params you can pass to
	// the plugin (all optional)
	var options = {
		message : 'Datenbank für Rechtsfragen', // not supported on some apps
												// (Facebook, Instagram)
		subject : 'AWRI', // fi. for email
		files : [ '', '' ], // an array of filenames either locally or remotely
		url : url,
		chooserTitle : 'Wohin möchten Sie teilen?' // Android only, you can
													// override the default
													// share sheet title
	};

	var onSuccess = function(result) {
		console.log("Share completed? " + result.completed); // On Android
																// apps mostly
																// return false
																// even while
																// it's true
		console.log("Shared to app: " + result.app); // On Android result.app
														// is currently empty.
														// On iOS it's empty
														// when sharing is
														// cancelled
														// (result.completed=false)
	};

	var onError = function(msg) {
		console.log("Sharing failed with message: " + msg);
	};

	window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
};

/**
 * Implements hook_services_postprocess().
 */



function _countFlags(nid,elem) {
	flag_countall('bookmarks',nid, {
		success : function(result) {
			try {
				// Check options.entity_type and/or options.bundle here to
				
				$('#global_bookmark_cnt').text(result.count);
		
			} catch (error) {
				console.log('_countFlags:flag_countall - success - ' + error);
			}
		}	
	});
}




function start_form_alter(form, form_state, form_id) {
	try {

		// console.log(form_id); // Use to see the form id.
		// console.log(form); // Use to inspect the form.
		if (form_id == 'user_register_form') {
			form.elements.submit.options.attributes['data-theme'] = 'a';
			form.elements.field_fbid['de'][0].value = -1;
			// form.suffix='<script>_getFBID("#edit-user-register-form-field-fbid-de-0-value");</script>';
		}

	} catch (error) {
		console.log('start_form_alter - ' + error);
	}
}


function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for ( var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null;
}
function eraseCookie(name) {
	document.cookie = name + '=; Max-Age=-99999999;';
}


function share(url){
	if(drupalgap.settings.mode=='web-app')$('#popupMenu-'+drupalgap_get_page_id()+'-'+JSON.parse(variable_get('node')).nid).popup('open');
	else socialShare(url);
}

function _getSocialHTML(url){
	var social='';
social+='<li data-icon="googleplus"><a data-iconpos="notext" href="https://plus.google.com/share?url='+url+'" target="_NEW">Google Plus</a></li>';
	social+='<li data-icon="twitter"><a href="https://twitter.com/intent/tweet?url='+url+'" target="_NEW">Twitter</a></li>';
	social+='<li data-icon="mail"><a href="mailto:?subject=Rechtsforum Schweiz Beitrag&body='+url+'" target="_NEW">Email	</a></li>';
	social+='<li data-icon="rss" class="ui-last-child"><a href="https://awri.ch/rss.xml" target="_NEW">RSS abonnieren</a></li>';
	
return social;
}

