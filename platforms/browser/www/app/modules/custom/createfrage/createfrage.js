var CREATED=0;
var SENT=1;

var fields=5;
var field_name='field_image';

function createfrage_install(){
	if(variable_get('createfrage')==null)
		variable_set('createfrage',CREATED);

}



function _checkImage(id){


	fid=variable_get('field_image['+id+']')?variable_get('field_image['+id+']'):null;
    var uri= null;

if(fid)Drupal.services.call({
	    method: 'GET',
	    path: 'file/'+fid+'.json',
	    custom: true,
	    success: function(result) {
	    	 uri= result.uri;	
		    	    showImage({'nr':id,'uri':uri,'fid':fid,'name':'field_image'});
	    },  error: function(result) {
	    	console.log(result,'ERROR');
	    }});
}



function createfrage_menu() {
	var items = {};
	items['createfrage'] = {
		title : 'Rechtsfrage stellen',
		page_callback : 'createfrage_page',
		pageshow: 'createfrage_pageshow',
	};
	return items;
}

function createfrage_page() {
	try {
		var content = {};
		
		content['field_kanton'] = {
				  theme: 'select',
				  attributes:{
					  id:'field_kanton',
				  },
				  options: {
				  },
				};
		
		content['service_label'] = {
				  theme: 'form_element_label',
				  element: {
				    title: 'Ihre Frage',
				    attributes: {
				      'for': 'rechtsfrage'
				    }
				  }
		};
		
		content['title'] = {
				 'theme': 'hidden',
				 'value':'Anonym'
		},
		
		
		content['my_checkbox'] = {
				  theme: 'checkbox',
				  attributes: {
				    id: 'anonym',
				    checked: 'checked',
				    	 onclick:'toggleAnonym();', 
				  }
				};
				content['my_checkbox_label'] = {
				  theme: 'form_element_label',
				  element: {
				    title: 'Anonym?',
				    attributes: {
				      'for': 'anonym',			
				    }
				  }
				};
		
			
		
		content['fbid'] = {
				 'theme': 'textfield',				 
				 attributes:{
					 'value':Drupal.user.uid,
					 id:'fbid',
					 disabled:'true',
				 }
		},
		
		content['fbname'] = {
				 'theme': 'textfield',				 
				 attributes:{
					 'value':Drupal.user.name,
					 id:'fbname',
					 disabled:'true',
				 }
		},
				
				
		content['rechtsfrage'] = {
				 'theme': 'textarea',				 
				 'value':'',
				 attributes:{
					 id:'body',
						 'placeholder': 'Bitte geben sie ihren Sachverhalt möglichst genau an.',					
				 }
		},
		
		
		
	    content['uploads'] ={
				  markup:drupalgap_render(drupalgap_get_form('upload_form','field_image',5))
		  };

		
		content['senden'] = {
				  theme: 'button',
				  text: 'Senden',
				  attributes: {
				    onclick: "saveNode();",
				    	'data-theme': "b"
			  }
		};
		

		
		return content;
	} catch (error) {
		console.log('_debug_page - ' + error);
	}
}	


function toggleAnonym(){
	if(!$('#anonym').is(':checked')){
		$('#fbid').show();
	}else{
		$('#fbid').hide();
		$('#fbname').hide();
	}
}

function saveNode() {
	body=$('textarea#body').val();
//	alert($('select#field_kanton').val());
//	return;
	if(body=='' || body-length < 10){
		$('textarea#body').focus();
		drupalgap_alert('Bitte geben sie eine Frage ein.');
		return;
	}
	var lang=Drupal.settings.language_default;
	//alert(body);
	field_image={
			und:{}
	};
	
str="";
	for(i=0;i<fields;i++){
	field_image['und'][i]={'fid':variable_get(field_name+'['+i+']')?variable_get(field_name+'['+i+']'):''}	
	};	

	node={
			'language':'und',
			'title':body.substring(0,255),
			'type':'rechtsfrage',
			  body: {und:{0:{ value: body,      		                   
              }}},
			'field_image':field_image,
//			  'field_fbname': {und:{0:{ value: $('#fbname').val(),      		                   
//             }}},
 //             'field_fbid': {und:{0:{ value: $('#fbid').val(),      		                               	          
 //             }}},
              'field_kanton': {und:{ tid: $('select#field_kanton').val(),      		                   
              }}
	};


	node_save(node,{success:function(data){
		console.log(data,'node gespeichert!');
		for(i=0;i<fields;i++){
			variable_del(field_name+'['+i+']');
			variable_del(field_name+'['+i+']-uri');	
		
		}
	drupalgap_set_message("Ihre Rechtsfrage wurde gestellt. Wir werden Sie sobald wie möglich ins Rechtsforum stellen.");	
	var page_id = drupalgap_get_page_id('createpage');
	drupalgap_remove_page_from_dom(page_id);
	drupalgap_goto(drupalgap.settings.front,{reloadPage:true});	
	}});
	

}


function showImage(options) {

    var elem=$('img#upload-createfrage-'+options.name+'-'+options.nr+'_image');
    elem.attr('src',drupalgap_image_path(options.uri)).trigger('create');
    $('#'+options.name+'['+options.nr+']').val(options.fid);
    
    $('#upload-createfrage-'+options.name+'-'+options.nr+'_delete').show();
    $('#upload-createfrage-'+options.name+'-'+options.nr+'_browse').hide();
    $('#upload-createfrage-'+options.name+'-'+options.nr+'_camera').hide();

}

function createfrage_pageshow() {
	try {
		getFBID('fbid','fbname');
		
		var i;
		for(i=0;i<fields;i++){
	_checkImage(i);
	}
		$('#fbid').hide();
		$('#fbname').hide();
		
		var query = {
				  parameters: {
				    vid: 3,								    
				  },
				  options:{name:'ASC'},
		    pagesize: 27,
				};
				taxonomy_term_index(query, {
				    success: function(terms) {
				      if (terms.length == 0) { return; }
				    var items=[];
				      for(i=0;i<terms.length;i++){
				    console.log(terms[i]);
				    $('#field_kanton').append($('<option>', { 
				        value: terms[i].tid,
				        text : '('+terms[i].name+ ')  ' +terms[i].description 
				    }));
				    
				     }
				      
				 //     alert('Loaded ' + terms.length + ' term(s)!');
				    }
				});
				
		
		//say, in some place, you subscibe a event
		pubsub.on('upload-clicked', {somedata: "good day"}, function(e){
			
			console.log(arguments[1].id);
			console.log(arguments[1].fid);
			var nr= arguments[1].id.substr(arguments[1].id.lastIndexOf("-")+1,arguments[1].id.length);	
			nr=parseInt(nr)+1;		
		if(nr<fields)$('.field-name-upload-createfrage-field-image-'+nr+'-start').show();
			console.log('subscriber one ', e, this, arguments);
		

			});
	
	} catch (error) {
		console.log('_debug_page - ' + error);
	}
}



function getFBID(id){

	 openFB.api(
			    {
			        method: 'GET',
			        path: '/me',
			        success: function(data){
			        	console.log(data);
			        	$('#fbid').val(data.id);			        	
			        	$('#fbname').val(data.name);			        	
			        },
			        error: function(err){
			        	console.log(err);
			        }
			    });
	 
	 openFB.api(
			    {
			        method: 'GET',
			        path: '/me',
			        params: {
			            message: 'Testing the Facebook Graph API'
			        },
			        success: function(data){
			        	console.log(data);
			        	$('#fbid').val(data.id);			        	
			        	$('#fbname').val(data.name);
			        	variable_set('fbname',data.name);
			        	variable_set('fbid',data.id);
			        },
			        error: function(err){
			        	console.log(err);
			        }
			    });
	 
}
