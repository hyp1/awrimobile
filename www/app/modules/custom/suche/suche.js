function suche_menu() {
  try {
    var items = {};
    items['suche'] = {
      title: 'Suchen',
      page_callback: 'suche',
      pageshow: 'suche_pageshow', 
    };
    return items;
  }
  catch (error) { console.log('start_menu - ' + error); }
}
function suche_pageshow(){
	$('#result-count').html('<h2>Suchresultate</h2>');

	if(drupalgap.settings.mode=='phonegap'){
		window.plugins.speechRecognition.requestPermission(
				function(data){
					console.log(data);
				}
		, function(err){
			console.log(err);
			}
		);
	}

}

function speech(){
	options = {
			 language:'de-DE',
			  matches:10,
			  prompt:'Sprechen Sie',      // Android only
			  showPopup:true,  // Android only
			  showPartial:true, 
			}
	window.plugins.speechRecognition.startListening(
			  function(data){
				//  alert("i am here");
				  console.log(data[0]);
				  str="";
				  if(typeof data[0] !=="undefined")str+=data[0];
				  if(typeof data[1] !=="undefined")str+=data[1];
				  if(typeof data[2] !=="undefined")str+=data[2];
				  $('#search-2').textinput().val(str);
				  $('#result-count').html(str).trigger('create');
			  },function(err){
				  console.log(err,'ERROR');
				  
			  }, options);
	
	

};

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
    
    if(drupalgap.settings.mode=='phonegap') 
    	content['c3'] = {
   		 theme: 'button',
   		  text: 'Sprachsuche',
   		  attributes: {
   		    onclick: 'speech()',
   		    'data-theme': 'b',
   		  },
   		
   };
   
    
    content['c4'] = {
    		  theme: 'jqm_item_list',
    		  title: '<div id="result-count">Suchresultate</div>',
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
	    options.path = 'search_node/retrieve&keys='+$('#search-2').textinput().val()+'';
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
    	$('#result-count').html(result.length+' Resultate');
    	 drupalgap_item_list_populate('#resultat', items);
    }
});
};
