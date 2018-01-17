
function lesezeichen_menu() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		var items = {};
		items['lesezeichen'] = {
		title : "Lesezeichen",
		page_callback : "lesezeichen_page",
		};
		return items;
	} catch (error) {
		console.log('lesezeichen_menu- ' + error);
	}
}

function lesezeichen_page() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	var content={};
	try {

		  content['my_articles_list'] = {
			      theme: 'view',
			      format: 'ul',
			      path: '/user/awri-bookmarks/'+Drupal.user.uid, /* the path to the view in Drupal */
			      row_callback: 'my_module_articles_list_row',
			      empty_callback: 'my_module_articles_list_empty',
			      attributes: {
			        id: 'my_articles_list_view'
			      }
			    };
		  
	return content;
	} catch (error) {
		console.log('lesezeichen_page - ' + error);
	}
}


/**
 * The row callback to render a single row.
 */
function my_module_articles_list_row(view, row, variables) {
  try {
    return l(t(row.title), 'node/' + row.nid);
  }
  catch (error) { console.log('my_module_articles_list_row - ' + error); }
}

/**
 *
 */
function my_module_articles_list_empty(view, variables) {

  // This...

  return t('Sorry, no articles were found.');

  // Or...

  var content = {};
  content['msg'] = { markup: t('Sorry, no articles were found.') }
  // content['some-other-widget'] = { /* ... */ }
  return content;

}

function lesezeichen_pageshow() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {


	} catch (error) {
		console.log('lesezeichen_pageshow - ' + error);
	}
}


