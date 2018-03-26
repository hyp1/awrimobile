
function Alert(str,page){
drupalgap_alert(str, {
    alertCallback: function() { 
if(page!==undefined)drupalgap_goto(page);
    }});
}


function setTitle(str){
	$('.my-css-class').html(str);
}

function setFlag(page,flagged) {
	flag = parseInt(flagged);
	if ((flag == 1)) {
	
		$('#'+page+'bookmark_btn').attr('data-theme', 'a').removeClass('ui-btn-inactive')
				.addClass('ui-btn-active').trigger('create');
		$('#'+page+'bookmark_toggle').removeClass('ui-btn-inactive')
		.addClass('ui-btn-active').trigger('create');
	} else {
		$('#'+page+'bookmark_btn').attr('data-theme', 'b').removeClass('ui-btn-active')
				.addClass('ui-btn-inactive').trigger('create');
		$('#'+page+'bookmark_toggle').attr('data-theme', 'b').removeClass('ui-btn-active')
		.addClass('ui-btn-inactive').trigger('create');
	}
return false;
}


function _isBookmark(nid,page) {
	if(Drupal.user.uid<1)return;
	flag_is_flagged('bookmarks',nid, Drupal.user.uid, {
		success : function(result) {	
			try {
				 if(!JSON.parse(result)){
						setFlag(page,0);
				 }
				 else{
						setFlag(page,1);
				 }
							
			} catch (error) {
				console.log('_isBookmark - success - ' + error);
			}
		},
		error : function(xhr, status, message) {
			try {
			
			} catch (error) {
				console.log('_isBookmark - error - ' + error);
			}
		}
	});
}

function _toggleBookmark(nid){
flag_is_flagged('bookmarks', nid, Drupal.user.uid,  {
      success: function(result) {
          try {
        	  if(JSON.parse(result)==true)
        		  _removeBookmark(nid);
        	  if(JSON.parse(result)==false)        		  
        		  _addBookmark(nid);	 
	          } catch (error) { console.log('_my_module_flag_count_pageshow - success - ' + error); }
	        },
	  	error: function(result) {
	  	    try {
	    		  _removeBookmark(nid);
	    		  
	  	    	console.log(result,'add err' + nid);
	  	        } catch (error) { console.log('_my_module_flag_count_pageshow - success - ' + error); }}
	    });		
}



function _addBookmark(nid){
	   flag_flag('bookmarks', nid, 'flag', Drupal.user.uid, true,
		 {
      success: function(result) {
        try {
       
        	  setFlag(drupalgap_get_page_id(),1);
  	       	
 	      $('#bookmark').attr('data-theme', 'b').removeClass('ui-btn-inactive')
	      .addClass('ui-btn-active').trigger('create');
        }
        catch (error) { console.log('_my_module_flag_count_pageshow - success - ' + error); }
      },
	 error: function(result) {
	        try {
	        	console.log(result,'add err');
	     //	   $(lesezeichen_container_id(nid)).hide();
	   //     	 setFlag(0);
	        	//drupalgap_goto(path, { reloadPage: true });
	  	   
	        }
	        catch (error) { console.log('_my_module_flag_count_pageshow - success - ' + error); }
	      }
  }
);	 

}

function _removeBookmark(nid){

	      flag_flag('bookmarks', nid, 'unflag', Drupal.user.uid, false,
			 {
	        success: function(result) {
	          try {
	       	   setFlag(drupalgap_get_page_id(),0);
	       	   $('#bookmark').attr('data-theme', 'b').removeClass('ui-btn-active')
			      .addClass('ui-btn-inactive').trigger('create');	       	       	
	          }
	          catch (error) { 
	        	
	        	  console.log('_removeBookmark - success - ' + error); }
	        }
	    }
	 );	 
}


function _deleteBookmark(nid){

    flag_flag('bookmarks', nid, 'unflag', Drupal.user.uid, false,
		 {
      success: function(result) {
        try {
     	   setFlag(0);
     	   $('#bookmark').attr('data-theme', 'b').removeClass('ui-btn-active')
		      .addClass('ui-btn-inactive').trigger('create');
     
     	
     	   drupalgap_goto(drupalgap_path_get(), {reloadPage:true});
        }
        catch (error) { 
      	
      	  console.log('_removeBookmark - success - ' + error); }
      }
  }
);	 
}


function system_services_postprocess(options, result) {
	try {

		if (options.service == 'views_datasource') {
			if (!empty(result.nodes[0]['node'])) {
				variable_set('node',result.nodes[0]['node']);									
			}
		}
		if (options.service == 'node' && options.resource == 'retrieve') {
		}

		if (options.service == 'fboauth' && options.resource == 'connect') {
			if (!empty(result)) {
				variable_set('system', result);
				system = JSON.parse(variable_get('system')); // Hier paresn
				variable_set('user', system.user);
				drupalgap_goto('user/'+system.user.uid);
	
			} else {
				console.log(variable_get('fboauth'),
						"NO BFBOATH USER ALREADY LOGGEDIN");
			}
		}

		if (options.service == 'user' && options.resource == 'login') {
	
			if (result.status == 401) {
				alert("Es gab ein Problem, bitte wenden Sie sich an einen Administrator");
			} else {
				variable_set('system', result);
				variable_set('user', result.user);
			}
			if (result.status == 406) {
				// alert("Allrady LOGin");
			} else {
				variable_set('system', result);
				variable_set('user', result.user);
				drupalgap_goto('user/'+result.user.uid);
			}
		}

		if (options.service == 'user' && options.resource == 'register') {
			if (result.status == 401) {
			//	console.log(result);
				alert("Es gab ein Problem, bitte wenden Sie sich an einen Administrator");
			} else {
				variable_set('system', result);
				variable_set('user', result.user);
				 drupalgap.settings.front = 'user/'+result.user.uid;
					
			}
		}

		if (options.service == 'user' && options.resource == 'logout') {
			// variable_set('system',result);
			// variable_set('user',result.user);
		}

		if (options.service == 'flag' && options.resource == 'flag') {
		//	console.log(options.service + ':', options.resource);
//			var node = JSON.parse(variable_get('node'));
		//	console.log(result);
		
		}

	} catch (error) {
		console.log('system_services_postprocess - ' + error);
	}
}


var onShake = function () {
	//alert("SHAKE");
	  drupalgap_goto('zufall_page',{reloadPage:true});
	};
	
	shake.startWatch(onShake, 40 /*, onError */);