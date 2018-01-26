var isCordovaApp = document.URL.indexOf('http://') === -1
		&& document.URL.indexOf('https://') === -1;

function mobile_update_deviceready() {
	if (isCordovaApp && (drupalgap.settings.mobile_update==undefined||drupalgap.settings.mobile_update.auto == true))
		mobile_update_check();
}

function mobile_update_check() {	
	
	//if (drupalgap.settings.mobile_update.auto == true) {
		cordova.getAppVersion.getVersionNumber(function(version) {
			$.getJSON(Drupal.settings.update_url + '/' + version,
					function(data) {
						variable_set('app_update_url', data.update_url);
						variable_set('app_version', version);
						if (data.version == false)
							update_show();
					});
		});
		cordova.getAppVersion.getAppName(function(name) {
			variable_set('app_name', name);
		});
	//}
}

function update_show() {
	var update_url = variable_get('app_update_url');
	var version = variable_get('app_version');
	var name = variable_get('app_name');
	var title = "<h2>" + name + "[" + version + "] Update</h2>";
	var msg = t("Für Ihre Version ist ein Update erhältlich!")
			+ bl(t("Herunterladen"), update_url, {
				InAppBrowser : true
			});
	drupalgap_set_message(title + msg);
}