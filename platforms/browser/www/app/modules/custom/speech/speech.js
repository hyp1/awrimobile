function speech_menu() {
  try {
    var items = {};
    items['speech'] = {
      title: 'Sprechen',
      page_callback: 'speech_page',
      pageshow: 'speech_pageshow', 
    };
    return items;
  }
  catch (error) { console.log('speech_menu - ' + error); }
}
function speech_pageshow(){
	$('#result-count').html('<h2>Suchresultate</h2>');

	window.plugins.speechRecognition.requestPermission(
			function(data){
				console.log(data);
			}
	, function(err){
		console.log(err);
		}
	);
}

function speech_page() {
  try {
    var content = {};

    content['c0'] = {
      markup: '<label for="search-2">Suchwörter eingeben.</label>      <input type="search" name="search-2" id="search-2"  value="" />'
    };
    
 
    	     
    content['c2'] = {
    		 theme: 'button',
    		  text: 'Weiter',
    		  attributes: {
    		    onclick: 'speech()',
    		    'data-theme': 'b',
    		  },
    		
    };
    
    content['c4'] = {
   		 theme: 'button',
   		  text: 'Stop',
   		  attributes: {
   		    onclick: 'stop()',
   		    'data-theme': 'b',
   		  },
   		
   };
    
    content['c3'] = {
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


function speech(){
	options = {
			 language:'de',
			  matches:10,
			  prompt:'Sprechen Sie',      // Android only
			  showPopup:true,  // Android only
			  showPartial:false, 
			}
	window.plugins.speechRecognition.startListening(
			  function(data){
				  $('#result-count').html(data[0]+' '+data[1]+' '+data[2]);
				  console.log(data[0]);
				  alert()
			  },function(err){}, options);
	
	

};

function stop(){
	window.plugins.speechRecognition.stopListening(
			  function(){}, function(){})
}