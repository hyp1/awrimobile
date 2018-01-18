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
		return items;
	} catch (error) {
		console.log('awri_post_menu- ' + error);
	}
}

function awri_post_page() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	var content={};
	try {
		content['posthead'] = {
				markup : '<h2>Rechtsfrage stellen(anonym)<dh2>',
			};

			content['post_form'] = {
				markup : drupalgap_get_form('awri_post_form'),
			};

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
			options : {
				0 : 'K.A.',
				1 : 'Aargau',
				2 : 'Appenzell Ausserrhoden',
				3 : 'Appenzell Innerrhoden',
				4 : 'Basel-Land',
				5 : 'Basel-Stadt',
				6 : 'Bern',
				7 : 'Fribourg/Freiburg',
				8 : 'Genève/Genf',
				9 : 'Glarus',
				10 : 'Graubünden/Grischuns/Grigioni',
				11 : 'Jura',
				12 : 'Luzern',
				13 : 'Neuchâtel/Neuenburg',
				14 : 'Nidwalden',
				15 : 'Obwalden',
				16 : 'St.Gallen',
				17 : 'Schaffhausen',
				18 : 'Schwyz',
				19 : 'Solothurn',
				20 : 'Thurgau',
				21 : 'Ticino/Tessin',
				22 : 'Uri',
				23 : 'Vaud/Waadt',
				14 : 'Valais/Wallis',
				25 : 'Zug',
				26 : 'Zürich',
			},
			default_value : variable_get('kanton')
		};
		// DARF KEINE VALUE HABEN??
		form.elements['message'] = {
			type : 'textarea',
			title : 'Es geht um folgenden Sachverhalt...',
			required : true,
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
		_postMessage(variable_get('uid'),msg);
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