function inhalt_menu() {
  try {
    var items = {};
    items['inhalt'] = {
      title: 'Rechtsfragen',
      page_callback: 'inhalt',
      pageshow: 'inhalt_pageshow'
    };
    return items;
  }
  catch (error) { console.log('start_menu - ' + error); }
}

/**
 * The map page callback.
 */
function inhalt() {
  try {
    var content = {};
   /*
    
    content['c1'] = {
      markup: '<label for="search-2">Search Input:</label>      <input type="search" name="search-2" id="search-2"  value="" />'
    };
    
    content['c2'] = {
    		 theme: 'button',
    		  text: 'Go',
    		  attributes: {
    		    onclick: 'dosearch()',
    		  },
    		
    };
    */
    
    content['questions_list'] = {
			theme : 'view',
			format : 'jqm_grid',
			columns : 1,
			path : 'awrimobile/fragen', /* the path to the view in Drupal */
			row_callback : 'questions_list_row',
			empty_callback : 'questions_list_empty',
			attributes : {
				id : 'rechtsfragen_list',
	//			'data-role' : 'none'
			},
		};

    
    return content;
  }
  
  catch (error) { console.log('inhalt - ' + error); }
}

function inhalt_pageshow() {
	  try {
		  /*
		  var path_to_view = 'drupalgap/views_datasource/drupalgap_content';
		  views_datasource_get_view_result(path_to_view, {
		      success: function (data) {
		    	  console.log(data);
		        if (data.nodes.length > 0) {
		          var items = [];
		          $.each(data.nodes, function(index, object){
		              var node = object.node;
		              items.push(
		                l(node.title, 'node/' + node.nid)
		              );
		          });
		          drupalgap_item_list_populate('#rechtsfragen_list', items);
		        }
		      }
		  });
		  */
	  }	  
	  catch (error) { console.log('map_map - ' + error); }
	}

function questions_empty() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		return "<h3>Sorry, leider nichts gefunden!</h3>";
	} catch (error) {
		console.log('awri_questions_empty - ' + error);
	}
}

function questions_list_row(view, row, variables) {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
if(row.status==0)return;
	console.log(row);	
	if(row.field_fbid===undefined||row.field_fbid==0)
    pic='<img src="'+drupalgap_get_path('module','start')+'/anonymous.png" style="border-radius: 50%;"/>';
   if(row.field_fbid>0)pic='<img src="https://graph.facebook.com/'+row.field_fbid+'/picture?type=small" style="border-radius: 50%;"/>';	
	if(Drupal.user.uid==0)pic= '<p>Bitte anmelden</p>';

	//Counter
		$('#drupalgap_page_title_inhalt').html(
				'' + (1 + view.page) + '/' + view.pages).trigger(
				'create');
		//Collapsible Inhalt		
		var content={};  
		content['c1'] = {
			      theme: 'collapsible',
			      header: pic +row.field_fbname+' <small>'+row.comment_count+' Antwort(en)</small>',
			      content: row.body,
			      attributes: { 'data-collapsed': 'false' }
			    };
		  
		
		   content['c5'] = {
		    		 theme: 'button_link',
		    		  text: 'Ansehen',
		    		  path: 'node/'+row.nid,
		    		  attributes: {
		    			  'data-icon':'eye',
		    			   'data-iconpos':'left'
		    		//    InAppBrowser:true
		    		  }
			    };
		   /*
		
	     content['c4'] = {
	    		 theme: 'button_link',
	    		  text: 'Facebook',
	    		  path: 'https://facebook.com/'+row.field_fbmid,
	    		  options: {
	    		    InAppBrowser:true
	    		  }
		    };
	     
	     content['c5'] = {
	    		 theme: 'button_link',
	    		  text: 'AWRI',
	    		  path: 'https://awri.ch/node/'+row.nid,
	    		  options: {
	    		    InAppBrowser:true
	    		  }
		    };
		    */
		return  drupalgap_render(content);
		//bl(pic+ ' '+row.field_fbname+' '+row.comment_count+ '<br>' +row.body,'node/'+row.nid,{attributes:{'class':'awri-comment','data-icon':'home'}});
	} catch (error) {
		console.log('questions_list_row - ' + error);
	}
}



function test(){
	
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
}


function suche_search(options) {
	alert("search");
	  try {
		//  options={};
	    options.method = 'GET';
	    options.path = 'search_node/retrieve&keys=miete';
	    options.service = 'drupalgap';
	    options.resource = 'search_node';
	    options.contentType = 'application/json';
	    Drupal.services.call(options);
	  }
	  catch (error) {
	    console.log('suche_search - ' + error);
	  }
	}

function dosearch(){
suche_search({
    success: function(result) {
      var user_count = result[0];
      var msg = 'There are ' + user_count + ' registered user(s)!'
      drupalgap_alert(msg);
    }
});
};
