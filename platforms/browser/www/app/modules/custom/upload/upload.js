function upload_menu() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		var items = {};
		items['upload'] = {
		title : "Rechtsfrage stellen",
		page_callback : "upload_page",
		};
		return items;
	} catch (error) {
		console.log('upload_menu- ' + error);
	}
};


function upload_page() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		var content = {};
	
		
		
		return items;
	} catch (error) {
		console.log('upload_menu- ' + error);
	}
};