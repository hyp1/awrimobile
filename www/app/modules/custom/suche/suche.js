function suche_menu() {
  try {
    var items = {};
    items['suche'] = {
      title: 'Suche',
      page_callback: 'suche',
 //     pageshow: 'start_pageshow'
    };
    return items;
  }
  catch (error) { console.log('start_menu - ' + error); }
}

/**
 * The map page callback.
 */
function suche() {
  try {
    var content = {};
    var map_attributes = {
      id: 'map_map',
      style: 'width: 100%; height: 320px;'
    };
    content['c1'] = {
      markup: '<label for="search-2">Search Input:</label>      <input type="search" name="search-2" id="search-2"  value="" />'
    };
    
    content['c2'] = {
    		 theme: 'button',
    		  text: 'Go',
    		  attributes: {
    		    onclick: dosearch(),
    		  },
    		
    };
    
    return content;
  }
  
  catch (error) { console.log('map_map - ' + error); }
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
