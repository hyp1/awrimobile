function mobile_info_menu() {
	var items = {};
	items['mobile_info'] = {
		title : 'Mobile Info',
		page_callback : 'mobile_info_page',
	};
	return items;
}
var device='none';

function mobile_info_page() {
	  try {
		  
		  info=getInfo();
		  var content = {};
	    content['my_button'] = {
	      markup: '<div id="'+dmt_menu_container_id() + '_'
			+ drupalgap_get_page_id()+'">no results yet!</div>',
	    };
	    
	    content['my_button'] = {
	  	      markup: '<div id="mobile_info">App Name</div>',
	  	    };
	    
	    content['name'] = {
	    		  theme: 'textfield',
	    		  attributes: {
	    		    value: info.app_name,
	    		    disabled:'disabled'
	    		  }
	    		};
	    
	    content['version'] = {
	    		  theme: 'textfield',
	    		  attributes: {
	    		    value:info.app_version,
	    		    disabled:'disabled'
	    		  }
	    		};
	    
	    content['mode'] = {
	    		  theme: 'textfield',
	    		  attributes: {
	    		    value: drupalgap.settings.mode,
	    		    disabled:'disabled'
	    		  }
	    		};
	    
	    content['device'] = {
	    		  theme: 'textfield',
	    		  attributes: {
	    		    value: info.device_platform,
	    		    disabled:'disabled'
	    		  }
	    		};
	    
	    content['uuid'] = {
	    		  theme: 'textfield',
	    		  attributes: {
	    		    value: info_device.uuid,
	    		    disabled:'disabled'
	    		  }
	    		};
	    
	    
	    content['url'] = {
		  	      markup: '<div id="mobile_infourl">'+l(variable_get('update_url'),variable_get('update_url'))+'</div>',
		  	    };
		
	 
	    
	    return content;
	  }
	  catch (error) { console.log('d7m_page - ' + error); }
	}





function mobile_info_deviceready() {
	

	
		postInfo({
			success:function(data){
				console.log(data);
			},
			error:function(data){
				console.log(data);
			}
			});
}

function postInfo(options){
info=getInfo();
	
str='mode='+info.mode+'&device='+info.device_platform+'&app_version='+info.app_version+'&app_name='+info.app_name;
$.ajax({
		  type: "GET",
		  url: Drupal.settings.site_path+'/app/info/?'+str,
		  success: options.success,
		});
}

function getInfo() {

	mode=drupalgap.settings.mode;
	device="noned";
	app_version="none";
	app_name="none";
	if(variable_get('app_version',null)!==null)app_version=variable_get('app_version');
	if(device=='none'&&app_version!='none')device='Emulator';
	if(variable_get('app_name',null)==null)app_name=drupalgap.settings.title;
	else app_name=variable_get('app_name');
var info={
	'mode':mode,
	'device':device.uuid,
	'app_name':app_name,
	'app_version':app_version,
	'device_uuid':device.uuid,
	'device_platform':device.platform,		
};

return info;
}