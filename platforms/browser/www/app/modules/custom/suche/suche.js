function suche_menu() {
  try {
    var items = {};
    items['suche'] = {
      title: 'Suchen',
      page_callback: 'suche',   
    };
    return items;
  }
  catch (error) { console.log('start_menu - ' + error); }
}

function suche() {
  try {
    var content = {};

    content['c0'] = {
      markup: '<label for="search-2">Suchwörter eingeben.</label>      <input type="search" name="search-2" id="search-2"  value="" />'
    };
   
    content['c2'] = {
    		 theme: 'button',
    		  text: 'Weiter',
    		  attributes: {
    		    onclick: 'dosearch2()',
    		    'data-theme': 'b',
    		  },
    		
    };
    
    content['c3'] = {
    		  theme: 'jqm_item_list',
    		  title: 'Suchresultate',
    		  items: [],
    		  attributes: {
    		    'data-inset': true,
    		    'id': 'resultat'
    		  }
    		};
    
    return content;
  }
  
  catch (error) { console.log('map_map - ' + error); }
}


function suche_search3(options) {
	  try {
	    options.method = 'GET';
	    options.path = 'search_node/retrieve&keys='+$('#search-2').textinput().val();
	    options.service = 'drupalgap';
	    options.resource = 'search_node';
	    options.contentType = 'application/json';
	    Drupal.services.call(options);
	  }
	  catch (error) {
	    console.log('suche_search - ' + error);
	  }
}


function dosearch2(){
	if($('#search-2').textinput().val().length<3){
		drupalgap_alert("Bitte Stichwörter eingeben");
	return;
	}		
suche_search3({
    success: function(result) {
    	var items=[];
    	for(i=0;i<result.length;i++){
    		items.push(l('<h2>'+result[i].title+'</h2><p>'+result[i].snippet+'</p><p>'+result[i].extra.comment+'</p>','node/'+result[i].node.nid));
    	}
    	 drupalgap_item_list_populate('#resultat', items);
    }
});
};
