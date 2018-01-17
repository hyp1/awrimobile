

function start_install(){
}

function start_menu() {
  try {
    var items = {};
    items['start'] = {
      title: 'AWRI Rechtsfragen',
      page_callback: 'start_page',
  //    pageshow: 'start_pageshow'
    };
    return items;
  }
  catch (error) { console.log('start_menu - ' + error); }
}

/**
 * The map page callback.
 */
function start_page() {
  try {
    var content = {};
   
  //  var map_attributes = {
  //    id: 'map_map',
  //    style: 'width: 100%; height: 320px;'
  //  };
  //drupalgap_attributes(map_attributes);
    
    content['c1'] = {
  		  markup: '<img src="'+drupalgap.settings.logo+'" style="display: block; margin: 0 auto" />',
    };
    /*  
    content['my_button'] = {
    		  theme: 'button',
    		  text: 'FB',
    		  attributes: {
    		    onclick: "_getFBID();"
    		  }
    		};
  
    content['suche'] = {
      		 theme: 'button_link',
      		  text: 'Rechtsfragen suchen',
      		  path: 'suche'
      	    }; 
    */
    
 content['my_button'] = {
  		  theme: 'button',
  		  text: 'Share',
  		  attributes: {
  		    onclick: "socialShare('https://awri.ch');"
  		  }
  		};
    
    content['c2'] = {
    		 theme: 'button_link',
    		  text: 'Rechtsfragen',
    		  path: 'inhalt'
    	    };
    
    content['c3'] = {
    		 theme: 'button_link',
    		  text: 'Suchen',
    		 path: 'search/node/'
    		  //attributes:{
    		  //onclick: "drupalgap_goto('search/node')"
    		  //}
    		  }; 
    
 
    
    content['c4'] = {
      		 theme: 'button_link',
      		  text: 'Rechtsfrage stellen',
      		  path: 'stellen'
      	    }; 
    
    
    content['c5'] = {
      		 theme: 'button_link',
      		  text: 'Lesezeichen',
      		  path: 'lesezeichen'
      	    }; 
    
   /*
    content['stellen2'] = {
   		 theme: 'button_link',
   		  text: 'Rechtsfrage stellen',
   		  path: 'node/add/rechtsfrage'
   	    }; 
    */
    return content;
  }
  catch (error) { console.log('map_map - ' + error); }
}

function start_services_postprocess(options, result) {

	try {
		
		 if (options.service == 'flag' && options.resource == 'flag') {
		      // An entity just got flagged, grab its new count and render it.
		      var data = JSON.parse(options.data);
	
		 if(data.action=='flag'){
			 $('.awri-bookmark').html("Lesezeichen entfernen");
			 $('.awri-bookmark').attr('class', 'awri-bookmark ui-link ui-btn ui-btn-b ui-shadow ui-corner-all');
			 $('.awri-bookmark').attr('data-theme', 'b');
 
		 };
		 if(data.action=='unflag'){
			 $('.awri-bookmark').html("Lesezeichen");
			 $('.awri-bookmark').attr('class', 'awri-bookmark ui-link ui-btn ui-btn-a ui-shadow ui-corner-all');
			 $('.awri-bookmark').attr('data-theme', 'a');
 
		 };
		 
		 }
		

    if (options.service == 'system') {   	
    	if(options.resource == 'logout')
        	variable_set('uid',0);
    	variable_set('fbID',0);
    	if(options.resource == 'login'){
        	variable_set('uid',result.user.uid);            	
    	_getFBID();
    	}
        	if(options.resource == 'connect'){
        	variable_set('uid',result.user.uid);
        	_getFBID();
        	}
    	 console.log(Drupal.user);
    	//alert(variable_get('fbAccessToken'));
    }
  }
  catch (error) {
    console.log('starte_services_postprocess - ' + error);
  }
}

/*
function my_module_camera_click() {
	  try {
	    navigator.camera.getPicture(

	      // Success
	      function(imageURI) {
	        drupalgap_toast(t('Picture saved!'));
	        $('#video').attr('src','data:image/jpeg;base64,'+imageURI).trigger('create');

	        Drupal.services.call({
	            method: 'POST',
	            path: 'file.json',
	            data: JSON.stringify({'file':{'file':imageURI,"filename":"14376_1472933862147.jpg","filepath":"public://14376_1472933862147.jpg"}}),
	            success: function(result) {
	              var user_count = result[0];
	              var msg = 'There are ' + user_count + ' registered user(s)!'
	              drupalgap_alert(msg);
	            }
	        });
	    
	        console.log(imageURI);
	      },

	      // Error
	      function(message) { console.log(message); },

	      // Settings
	      {
	        quality: drupalgap.settings.camera.quality,
	        destinationType: Camera.DestinationType.FILE_URI
	      }

	    );
	  }
	  catch (error) {
	    console.log('my_module_camera_click - ' + error);
	    }
	}
*/


function start_node_page_view_alter_rechtsfrage(node, options) {
	  try {	
		  
		
		  
		  if(node.field_fbname['und']===undefined)name=node.name;
		  else name=node.field_fbname['und'][0].value;
		  var content = {};
	    content['c1'] = {
	      theme: 'collapsible',
	      header: theme_fbpic(node.field_fbid) +name+' <small>'+node.comment_count+' Antwort(en)</small>',
	      content: node.content,
	      attributes: { 'data-collapsed': 'false' }
	    };
	    console.log(node);
	 //  alert(Drupal.user.uid);
	   	    	    

	    content['c2'] = {
	    		  theme: 'jqm_item_list',
	    		  title: 'Antworten',
	    		  items: [],
	    		  attributes: {
	    			  'id': 'comments-'+node.nid,
	    		    'data-inset': true,
	    		    'class': 'awri-comments'
	    		  }
	    		};  
	    

	    
	     content['c5'] = {
	    		 theme: 'button_link',
	    		  text: 'AWRI',
	    		  path: 'https://awri.ch/node/'+node.nid,
	    		  attributes:{
	    			  'data-icon':'eye',
	    			   'data-iconpos':'left'
	    		  },
	    		  options: {
	    		    InAppBrowser:true
	    		  }
		    };
	     
	     content['c4'] = {
	    		 theme: 'button_link',
	    		  text: 'Facebook',
	    		  path: 'https://facebook.com/'+node.field_fbmid['und'][0].value,
	    		  attributes:{
	    			  'data-icon':'eye',
	    			   'data-iconpos':'left'
	    		  },
	    		  options: {
	    		    InAppBrowser:true
	    		  }
		    };
	     
	     content['c3'] = {
	    		  markup:bookmark_quick_link(
	    				    'bookmarks', // The flag's machine name.
	    				    'node', // The entity type.
	    				    node.nid, // The entity id.
	    				    false // The current flag status.
	    				  ),	    				 
		    };
	    options.success(content);
		 _getComments(node.nid);
		 
//Lesezeichen prüfen und Button setzen
		  options={};
		  options.success=function(result){
			  console.log(result,"FDATA");
			 if(JSON.parse(result)==true);
			 $('.awri-bookmark').html("Lesezeichen");
			 $('.awri-bookmark').attr('class', 'awri-bookmark ui-link ui-btn ui-btn-a ui-shadow ui-corner-all');
			 $('.awri-bookmark').attr('data-theme', 'a');
		  };		    
		  flag_is_flagged('bookmarks', node.nid, Drupal.user.uid, options);

	  
	  } 
	  catch (error) { console.log('my_module_node_page_view_alter_article - ' + error); }
	}

function _getComments(nid){
	 var query = {
			  pagesize:150,
			  parameters:{
			    nid: nid,					    
			  },
		options:{
				  orderby:{'created':'asc'}
			  }
			};
	 var items=[];
	  drupalgap_loading_message_show();
			comment_index(query, {
			    success: function(comments){
			    	for(var i=0;i<comments.length;i++){
			    	console.log(comments[i],'COMMENT PID????');
			    	sub='';
			    	if(comments[i].pid!=0)sub='^';
			    	//	node['comments'].push(comments[i]);
			    	//else subs.push(comments[i]);
		  			 //variable_set('subcomments',subs);
		  			
			    	 items.push(
			    			 sub+theme_fbpic(comments[i].field_fbid) +' '+ 
			    			 comments[i].subject+ ' ' + comments[i].content
			               );
			   	}
		  				//		   	alert('Found ' + comments.length + ' comment(s)!');
		  		//				  alert('Found ' + subs.length + ' subcomment(s)!');
		  				//			 variable_set('qview',node);
		  			//				console.log(subs,'SUBCOMMENTS????');
		  						
		  		//		  			 drupalgap_goto('question_view',{reloadPage:true,transition: awri.transition});

					drupalgap_item_list_populate('#comments-'+nid, items);		
			    }			
			});
		drupalgap_loading_message_hide();
};

function _addComment(comment){
	html=$('#comments').html();
//html=$('#comments').html();	
	 var attributes = {
		      'class': 'awricomment',
		   //   style: 'width: 100%; height: 320px;'
		    };
		    
html='<li '+drupalgap_attributes(attributes)+'>'+comment.content+'<li>';
$('#comments').push(html).trigger('create');
}

function theme_fbpic(fbfield){
	if(Drupal.user.uid==0)return '<p>Bitte anmelden</p>';
	if(fbfield['und']===undefined)
	    pic='<img src="'+drupalgap_get_path('module','start')+'/anonymous.png" style="border-radius: 50%;"/>';
	else if(fbfield['und'][0].value>0)
		pic='<img src="https://graph.facebook.com/'+fbfield['und'][0].value+'/picture?type=small" style="border-radius: 50%;"/>';	
		
	return pic;
}


/*
 * 
 * FLAGSTUFF
 */

function bookmark_quick_link(flag_name, entity_type, entity_id, flagged) {
	  return bl('Lesezeichen', null, {
	    attributes: {
	      onclick: _flag_quick_link_onclick_attribute(flag_name, entity_type, entity_id, flagged),
	      'class': 'awri-bookmark',
	      'data-icon':'tag',
	      'data-theme': _flag_quick_link_data_theme(flagged)
	    }
	  });
	}


function start_entity_post_render_content(entity, entity_type, bundle) {
	  try {
	    if (entity_type == 'node') {
	      var flags = flag_get_entity_flags(entity_type, bundle);
	      if (flags) {
	        var entity_id = entity[entity_primary_key(entity_type)];
	        var html = '';
	        var page_id = drupalgap_get_page_id();
	        $.each(flags, function(fid, flag) {
	            var container_id = start_flag_count_container_id(flag.name, entity_id);
	            html += '<div id="' + container_id + '"></div>' +
	              drupalgap_jqm_page_event_script_code(
	                {
	                  page_id: page_id,
	                  jqm_page_event: 'pageshow',
	                  jqm_page_event_callback: '_start_flag_count_pageshow',
	                  jqm_page_event_args: JSON.stringify({
	                      fid: fid,
	                      entity_id: entity_id,
	                      entity_type: entity_type,
	                      bundle: bundle
	                  })
	                },
	                flag.fid
	              );
	        });
	        entity.content = html + entity.content;
	      }
	    }
	  }
	  catch (error) {
	    console.log('start_entity_post_render_content - ' + error);
	  }
	}


/**
*
*/
function start_flag_count_container_id(flag_name, entity_id) {
 try {
   return 'flag_count_' + flag_name + '_' + entity_id;
 }
 catch (error) { console.log('start_flag_count_container_id - ' + error); }
}

/**
*
*/
function _start_flag_count_pageshow(options) {
 try {
   var flag = flag_load(options.fid);
   if (!flag) { return; }
   flag_countall(flag.name, options.entity_id, {
       success: function(result) {
         try {
           // Check options.entity_type and/or options.bundle here to customize
           // the message per content type.
           var container_id = start_flag_count_container_id(flag.name, options.entity_id);
           var html = '<p> ' + result.count + ' ' + drupalgap_format_plural(result.count, t('time'), t('times')) +' '+ t('Flagged')+ '!</p>';
           $('#' + container_id).html(html).trigger('create');
         }
         catch (error) { console.log('_map_flag_count_pageshow - success - ' + error); }
       }
   });
 }
 catch (error) { console.log('map_flag_count_pageshow - ' + error); }
}

/**
* Implements hook_services_postprocess().
*/
function start_services_postprocess(options, result) {
 try {
   if (options.service == 'flag' && options.resource == 'flag') {
     // An entity just got flagged, grab its new count and render it.
     var data = JSON.parse(options.data);
     flag_countall(data.flag_name, data.entity_id, {
         success: function(result) {
           try {
             // Check options.entity_type and/or options.bundle here to customize
             // the message per content type.
             var container_id = start_flag_count_container_id(data.flag_name, data.entity_id);
             var html = '<p>Flagged ' + result.count + ' ' + drupalgap_format_plural(result.count, 'time', 'times') + '!</p>';
             $('#' + container_id).html(html).trigger('create');
           }
           catch (error) { console.log('map_services_postprocess - success - ' + error); }
         },
         error: function(xhr, status, message) {
           try {
             // If there is no flag data with the node, then clear out the count html.
             if (message.indexOf('There is no flag with node') != -1) {
               var container_id = map_flag_count_container_id(data.flag_name, data.entity_id);
               $('#' + container_id).html('').trigger('create');
             }
           }
           catch (error) { console.log('_map_flag_count_pageshow - error - ' + error); }
         }
     });
   }
 }
 catch (error) { console.log('map_services_postprocess - ' + error); }
}




function _getFBID(){
	openFB.api(
		    {
		        method: 'GET',
		        path: '/me',
		        params: {
		        	access_token:variable_get('fbAccessToken'),
		            message: 'Testing the Facebook Graph API'
		        },
		        success: function(data){
		        	variable_set('fbID',data.id);
		        	console.log(data);
		        },
		        error: function(error){
		        	console.log(error);
		        }
		    });
	
}

function getCookie(name)
{
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

function socialShare(url){
	// this is the complete list of currently supported params you can pass to the plugin (all optional)
	var options = {
	  message: 'Datenbank für Rechtsfragen', // not supported on some apps (Facebook, Instagram)
	  subject: 'AWRI', // fi. for email
	  files: ['', ''], // an array of filenames either locally or remotely
	  url: url,
	  chooserTitle: 'Wohin möchten Sie teilen?' // Android only, you can override the default share sheet title
	};

	var onSuccess = function(result) {
	  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
	  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
	};

	var onError = function(msg) {
	  console.log("Sharing failed with message: " + msg);
	}

	window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);	
};

