/**
 * Implements hook_menu(),
 */
function nodeedit_menu() {
  var items = {};
  items['rechtsfrage/add'] = {
		  page_callback: 'drupalgap_get_entity_form',
	      page_arguments: ['my_module_team_form', 'node', 'add']
		  };
  
  items['rechtsfrage/%'] = {
		  page_callback: 'drupalgap_get_entity_form',
	      page_arguments: ['my_module_team_form', 'node', 17418]
		  };
  return items;
}

function my_module_team_form(form, form_state, node) {
	console.log(node);
	
	 if (node.nid) {
	    form.id += '_' + node.nid;
	alert(form.id);
	
		console.log(node);
	    form.elements['nid'] = {
	        type: 'textfield',
	        required: true,
	        default_value: node.nid
	      };
	  }
	  form.elements['type'] = {
	    type: 'hidden',
	    required: true,
	    default_value: node.type
	  };
	  form.elements['title'] = {
	    type: 'textfield',
	    title: t('Title'),
	    required: true,
	    default_value: node.body[node.language][0].value
	  };
	  form.elements['field_image1'] = {
		   markup: theme_image(drupalgap_image_path(node.field_image['und'][0].uri)),
		  }
			  
  
	  /*
	  form.elements['image_field2'] = {
			    markup: 'image'+ theme('image',{path:drupalgap_image_path(node.field_image['und'][0].uri)}),
			 //   path: node.field_image['und'][0].fid
			  };
	  
	  
	  form.elements['image_fields'] = {
			    prefix:drupalgap_get_form('upload_form','field_image',1)
			  };
			  */
	  form.elements['test'] ={
			  markup:drupalgap_render(upload_form(form,form_state,'field_image',5))
	  };
	  form.elements['submit'] = {
	    type: 'submit',
	    value: t('Save')
	  };
	  return form;
	}

function my_module_team_form_submit(form, form_state) {
	console.log(form_state.values);
	alert("submit");
	  node_save(form_state.values, {
	    success: function(result) {
	    	console.log(result);
	      drupalgap_goto('rechtsfrage/' + result.nid, { reloadPage: true });
	    }
	  });
	}

/*
function my_module_team_page(node) {
	console.log(node)
	  var content = {};
	  content['title'] = { markup: node.title };
	  content['body'] = { markup: node.body[node.language][0].value};
	  content['image0'] = { markup: node.field_image[node.language][0].fid};
	  content['image1'] = { markup: node.field_image[node.language][1].fid};	
	  //  content['image2'] = { markup: node.field_image[node.language][2].fid};
	//  content['image3'] = { markup: node.field_image[node.language][3].fid};
	//  content['image4'] = { markup: node.field_image[node.language][4].fid};

	  return content;
	}
*/
/**
 * 
 * 
 * 
 *
 */
function node_new_page() {
  try {
    var content = {};
    
    content['title'] = { markup:'ah1>PAGE</h1>' };
	
    content['nid'] = {
    	      theme: 'textfield',
    	      attributes: {
    	    	  'id':'nid',
    	    	    value: 17443,
//    	        onclick: "drupalgap_alert(t('Hi!'))"
    	      }
    	    };
    
    content['title'] = {
  	      theme: 'textfield',
  	      attributes: {
  	    	  'id':'title',
  	    	    value: '',
//  	        onclick: "drupalgap_alert(t('Hi!'))"
  	      }
  	    };
    
    content['body'] = {
  	      theme: 'textarea',
  	     value: '',
  	      attributes: {
  	    	  'id':'body',  	    	  
  	      }
  	    };
    
    content['uid'] = {
  	      theme: 'textfield',
  	      title:'nid',
  	      attributes: {
  	    	  'id':'uid',
  	    	    value: Drupal.user.uid,
  	      }
  	    };
    
    
    content['my_button'] = {
    	      theme: 'button',
    	      text: 'Node',
    	      attributes: {
    	        onclick: "getNode()"
    	      }
    	    };
    
    content['save_button'] = {
  	      theme: 'button',
  	      text: 'Save',
  	      attributes: {
  	        onclick: "getSaveNode()"
  	      }
  	    };
  
    
    return content;
  }
  catch (error) { console.log('nodetest_page - ' + error); }
}

function getNode(){
	node_load($('#nid').val(),{
		  success:function(node){
			  console.log(node);
			  $('#nid').val(node.nid);
			  $('#uid').val(node.uid);
			  $('#body').val(node.body['und'][0].value);
			  $('#title').val(node.title);
			  
			    alert("Loaded " + node.title);
			  }});

	/*
	var query = {
			  parameters: {
			    'type': 'rechtsfrage'
			  }
			};
			node_index(query, {
			    success:function(nodes){
			      alert('Indexed ' + nodes.length + ' node(s)!');
			    }
			});
*/
}

function getSaveNode(){
	
	var field_body=[];
	field_body['und']=[];
	field_body['und'][0]={'value':'test'};
	console.log(JSON.stringify(field_body['und']));

	// body:de:{0:{value: 'asdasdasdasdasdasd',  }};
//	field_tip_obiavlenia1":{"und":[{"value":"1"},{"value":"2"}]}" +
		
	var node = {
			  title:"HUHUqweqwe",
			  type:"rechtsfrage",
			  language:'und',			  
			  status:0,
			  promoted:0,
			  uid:Drupal.user.uid,
			  name:Drupal.user.username,

			  field_fbid: {und:{0:{ value: '123343445',      		                   
              }}},
			  body: {und:{0:{ value: 'HMMMMM2323',      		                   
		                 }}},
			       		  field_image: {und:[{ fid: '169'},{fid: '170'}]},
             
		                  
			};
	console.log(node);
			node_save(node, {
			  success:function(result) {
			    alert("Saved new node #" + result);
			  }
			});
}