//Dieser user postet ins Forum
var admin_user=3;

var kantone=['K.A.',
             'Aargau',
             'Appenzell Ausserrhoden',
             'Appenzell Innerrhoden',
             'Basel-Land',
             'Basel-Stadt',
             'Bern',
             'Fribourg/Freiburg',
             'Genève/Genf',
             'Glarus',
             'Graubünden/Grischuns/Grigioni',
             'Jura',
             'Luzern',
             'Neuchâtel/Neuenburg',
             'Nidwalden',
             'Obwalden',
             'St.Gallen',
             'Schaffhausen',
             'Schwyz',
             'Solothurn',
             'Thurgau',
             'Ticino/Tessin',
             'Uri',
             'Vaud/Waadt',
             'Valais/Wallis',
             'Zug',
             'Zürich'];

function stellen_menu() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		var items = {};
		items['stellen'] = {
		title : "Rechtsfrage stellen",
		page_callback : "awri_post_page",
		};
		
		items['gestellt'] = {
		title : "Ihre Frage wurde gesendet",
		page_callback : "gestellt_page",
		};
		
		return items;
	} catch (error) {
		console.log('awri_post_menu- ' + error);
	}
}

function gestellt_page() {

	try {
		var content={};
		content['c1'] = {
				theme:'header',
				text: 'Ihre Rechtsfrage wurde nach AWRI gepostet.',
			};

		content['c2'] = {
				markup:'<h3>Einer unserer Admins wird die Rechtsfrage für Sie anonym ins Rechtsforum Schweiz stellen</h3><h3>Viel Glück!</h3>',				
			};

		content['c4'] = {
				  theme: 'button',
				  text: 'Weiter',
				  attributes: {
				    onclick: "drupalgap_goto(drupalgap.settings.front)",
				    'data-theme':'b',
				    'data-icon':'arrow-r'
				  }
				};
		
		return content;
	} catch (error) {
		console.log('awri_post_page - ' + error);
	}
}

/*
function stellen_form_alter(form, form_state, form_id) {
	  try {
		  
console.log(form);

	    if (form_id == 'node_edit' && form.bundle == 'rechtsfrage') {
	    	console.log(form.elements);

	    	form.elements.field_fbname['de'][0].value=Drupal.user.name;		      		      		
	    	form.elements.field_fbname.prefix='<div style="display: none;">';
	    	form.elements.field_fbname.suffix='</div>';
	    	
	    	form.elements.title.value="Anonyme Frage";
	    	form.elements.title.prefix='<div style="display: none;">';
	    	form.elements.title.suffix='</div>';
	    	
	    	form.elements.field_anonym.access=false;
	    	form.elements.field_bewertung.access=false;
	    	form.elements.field_fbcomments.access=false;
	    	form.elements.field_fbcreated.access=false;
	    	form.elements.field_fbid.access=false;
	    	form.elements.field_fblikes.access=false;
	    	form.elements.field_fbmid.access=false;
	    	form.elements.field_fburl.access=false;
	    	form.elements.field_fbshares.access=false;
	    if(drupalgap.settings.mode=='web-app')form.elements.field_image.access=false;

	    form.action = 'gestellt';		  
	    }
	      	
	    
	  }  catch (error) { console.log('my_module_form_alter - ' + error); }
}
*/

function awri_post_page() {
	
	var content={};
	try {
	
		if(Drupal.user.uid==0){
			
			
			content['c1'] = {
					theme:'header',
					text: 'Sie müssen dazu angemeldet sein!',
				};
			
			content['c2'] = {
					theme:'button',
					text: 'Anmelden',
					attributes:{
						onclick:"drupalgap_goto(\'user/login\')",
						'data-theme':'b',
					}
			};
			
			content['c3'] = {
					theme:'button',
					text: 'Zurück',
					attributes:{
						onclick:"drupalgap_goto(\'start\')",
						'data-theme':'b',
					}
			}
			return content;
			}
		
		
		content['posthead'] = {
				markup : '<h2>Rechtsfrage stellen(anonym)<dh2>',
			};

			content['post_form'] = {
				markup : drupalgap_get_form('awri_post_form'),
			};

			
/*
			content['upload_form'] = {
				markup : drupalgap_get_form('upload_form'),
			};
*/
			/*
			content['file'] = {
					  theme: 'file',
					  text: 'My Button',
					  id:'file1',
					  attributes: {
					//    onclick: "drupalgap_alert('You clicked me!');"
					  }
					};
			
			content['up'] = {
					  theme: 'button',
					  text: 'Upload',
					  attributes: {
						  id:'upload1',
					    onclick: "upload();"
					  }
					};
			*/
			content['postfoot'] = {
					markup : '</br></br>',
				};
	
	return content;
	} catch (error) {
		console.log('awri_post_page - ' + error);
	}
}


function awri_post_form(form, form_state) {
	if (Drupal.settings.debug){
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
		console.log(form,"FORM");
		console.log(form_state,"FORM");
	}

	try {
		
		form.elements['kanton'] = {
			title : 'Kanton',
			type : 'select',
			options : kantone,
			default_value : variable_get('kanton')
		};
		// DARF KEINE VALUE HABEN??
		form.elements['message'] = {
			type : 'textarea',
			title : 'Es geht um folgenden Sachverhalt...',
			//required : true,
			title_placeholder : true,

		};



		
		form.elements['messagel'] = {
			markup : '<p>Die Frage wird per Email an die Administratoren gesendet. Wir werden die Frage schnellstmöglich ins Rechtsforum stellen.</p>',
		};

		form.elements['button1'] = {
			type : 'submit',
			value : 'Senden',

		};
		

		return form;
	//return system_settings_form(form);

	} catch (error) { console.log('awri_post_form - ' + error);	}	
}

function awri_post_form_submit(form, form_state) {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');

	try {
	
		console.log(form_state);
		variable_set('kanton',  form_state.values.kanton);
		variable_set('message', form_state.values.message);
		var msg="Kanton:"+kantone[$('#edit-awri-post-form-kanton').val()]+"\r\n"+form_state.values.message;	
		_postMessage(admin_user,msg);
		 drupalgap_goto("dashboard");
	} catch (error) {
		console.log('awri_post_form_submit - ' + error);
	}
}

function awri_post_form_validate(form, form_state) {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');

	try {		
		if (variable_get('DRUPAL_UID')<1) {
		      drupalgap_alert('<h2>Sorry, geht nicht!</h2> Nur Personen die auf https://awri.ch registriert sind, können hier anonym Rechtsfragen stallen!');
		      drupalgap_goto('awri_dashboard');    
		}
		
		 if (form_state.values.message.length < 30)
		 drupalgap_form_set_error('message', 'Sorry, aber der Text ist zu kurz um ihn zu senden (min.30 Zeichen)!');
		 
		// else if (test.length < 13)
		// drupalgap_form_set_error('name', 'Hoppla, der Text ist immmer noch zu
		// kurz zum senden!');
		// else if (test.length < 23)
		// drupalgap_form_set_error('name', 'Fast da, nur noch ein paar Zeichen,
		// dann können wir senden.');

	} catch (error) {
		console.log('awri_post_form_validate - ' + error);
	}
}

function _postMessage(uid,message) {
	if (Drupal.settings.debug){
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
		console.log(uid,"UID");
		console.log(message,"MESSAGE");
	}
	//message+="...anonym &uuml;ber AWRIMobile.";
	var args = [ 
	             {'uid' : uid},
	             {'message' : message} 
	             ];
		
	Drupal.services.call({
		method : 'POST',
		path : 'poster_resources/post_anonymous.json',
		service : 'poster',
		resource : 'post_anonymous',
		data : JSON.stringify(args),
		success : function(result) {

			var data = result;
			var msg = 'Ihre Rechtsfrage mit der ID [' + data+ ']  wurde erfolgreich weitergeleitet !';
			drupalgap_alert(msg);
		//	dupalgap_goto("awri_dashboard");
		}
	});
	
}

function doit(options) {

	  try {
	    options.method = 'POST';
	    options.path = 'file.json';
	    options.service = 'file';
	    options.contentType = 'multipart/form-data';
	    resource : 'drupalgap'
	    options.data=
	    Drupal.services.call(options);
	  }
	  catch (error) {
	    console.log('my_module_get_user_count - ' + error);
	  }
	}

function upload_form_submit(form, form_state) {
try{
	console.log(form_state);
	var formData = JSON.stringify(form);
	console.log(form.serialize(form));
	
	doit({});
	  }
	  catch (error) {
	    console.log('my_module_get_user_count - ' + error);
	  }
	}

function upload_form(form, form_state) {
	  try {
		  
	    form.elements['name'] = {
	      type: 'file',
	      //required: true
	      attributes:{
	    	  id:'upload'
	      }
	    };
	    form.elements['submit'] = {
	      type: 'submit',
	      value: 'Say Hello',
	    	     attributes:{
	   	    	  id:'sub'
	   	      }
	    };
		

	    return form;
	  }
	  catch (error) { console.log('my_module_custom_form - ' + error); }
	}

function upload(){
	
	myFile = $('#file1').prop('files');

	console.log(JSON.stringify(myFile));
	
	/*
	my_module_get_user_count({success:function(data){
		
		console.log(data);
	}});
	*/
};

function my_module_get_user_count(options) {
	  try {
	    options.method = 'POST';
	    options.path = 'file.json';
	    options.service = 'file';
	    options.contentType= 'application/json';
	    options.args=JSON.stringify($('#file1'));
	    Drupal.services.call(options);
	  }
	  catch (error) {
	    console.log('my_module_get_user_count - ' + error);
	  }
	}
/*

my_module_get_user_count({
	    success: function(result) {
	      var user_count = result[0];
	      var msg = 'There are ' + user_count + ' registered user(s)!'
	      drupalgap_alert(msg);
	    }
	});
*/

/*
function stellen_form_alter(form, form_state, form_id) {
	  try {


	    console.log(form_id); // Use to see the form id.
	    console.log(form);    // Use to inspect the form.

	    if (form_id == 'node_edit' &&form.bundle=="rechtsfrage") {
	    
	      // Change the label for the name,
	      form.elements.title.title = 'Your name';
	      form.elements.fbshares.access= 'false';
	      
	      // the theme of the button on the login form.
	      form.elements.submit.options.attributes['data-theme'] = 'a';
	    }

	  }
	  catch (error) { console.log('my_module_form_alter - ' + error); }
	}


function stellen_form_alterALT(form, form_state, form_id) {
	  try {

		    console.log(form_id); // Use to see the form id.
		    console.log(form);    // Use to inspect the form.

		    if (form_id == 'node_edit' && form.bundle == 'rechtsfrage') {
		    
		      // Change the label for the name,
		   
		      form.elements.field_bewertung.access = false;
		      form.elements.field_fbcreated.access = false;
		      form.elements.field_fbshares.access = false;
		      form.elements.field_fburl.access = false;
		      form.elements.field_fbcomments.access = false;
		      form.elements.field_fblikes.access = false;
		      form.elements.field_fbshares.access = false;
		      form.elements.field_fbmid.access = false;
		      
		      form.elements.title.default_value=Drupal.user.name;
		      form.elements.field_fbname['und'][0].default_value=Drupal.user.name;
		      form.elements.field_fbid['und'][0].default_value=variable_get('fbID',0);	      //   form.elements.field_bewertung.access = false;
		      
		      // the theme of the button on the login form.
		      form.submit.push("_gotoStart");
		      form.elements.submit.options.attributes['data-theme'] = 'a';
		    }

		  }
		  catch (error) { console.log('my_module_form_alter - ' + error); }
		}

function _gotoStart(){
	drupalgap_goto('start',{reloadPage: true,form_submission: true});
}
*/