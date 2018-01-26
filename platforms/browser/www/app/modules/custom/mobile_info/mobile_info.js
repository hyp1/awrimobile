var isCordovaApp = document.URL.indexOf('http://') === -1
		&& document.URL.indexOf('https://') === -1;

function mobile_info_deviceready() {
alert("Ready");
	//	if (isCordovaApp && (drupalgap.settings.mobile_update==undefined||drupalgap.settings.mobile_update.auto == true))
	//if(drupalgap.settings.mode=='web-app'){
		postInfo({
			success:function(data){
				console.log(data);
			},
			error:function(data){
				console.log(data);
			}
			});
//	}
		
//	mobile_info_check();
}


function mobile_info_check() {	
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

function postInfo(options){

mode=drupalgap.settings.mode;
//device=(!isCordovaApp||cordova.device==undefined) ? 'Browser':cordova.device;
device="HALLO";
app_version="NONE";
app_name="NONamE";
//if(variable_get('app_version',null))app_version=null;
//alert(variable_get('app_name'));
//if(variable_get('app_name',null)==null)app_name=drupalgap.settings.title;

str='mode='+mode+'&device='+device+'&app_version='+app_version+'&app_name='+app_name;
alert(str);
$.ajax({
		  type: "GET",
		  url: Drupal.settings.site_path+'/app/info/?'+str,
		  success: options.success,
		});
}

function info_show() {
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