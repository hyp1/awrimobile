/**
 * Implements hook_menu(),
 */
function nodetest_menu() {
  var items = {};
  items['nodetest'] = {
    title: 'Hello',
    page_callback: 'nodetest_page'
  };
  return items;
}

/**
 *
 */
function nodetest_page() {
  try {
    var content = {};
    
    
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