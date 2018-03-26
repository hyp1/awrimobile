function print_install() {
	try {
		var css = drupalgap_get_path('module', 'print') + '/print.css';
		drupalgap_add_css(css);
	} catch (error) {
		console.log('print_install - ' + error);
	}
}

function print_menu() {
  try {
    var items = {};
    items['print/%'] = {
      title: 'Drucken',
      page_callback: 'print_page',
      page_arguments: [1],
      pageshow: 'print_pageshow', 
    };
    return items;
  }
  catch (error) { console.log('print_menu - ' + error); }
}

function print_page(nid){
	 var content = {};

	  // Build an empty container where the user dashboard will go.
	  var attributes = {
	    id: print_container_id(nid),
	    class: 'print-page'
	  };
	  content['print_container'] = {
	    markup: '<div ' + drupalgap_attributes(attributes) + '>' +
	      'Loading dashboard...' +
	    '</div>'
	  };
	  

	    content['c4'] = {
	    		  markup: '<ul id="comments-' + nid + '"></ul>',	    		
	    		};  

		    content['my_button'] = {
	    		  theme: 'button',
	    		  text: 'Drucken',
	    		  attributes: {
	    			  id:'print-btn',
	    		    onclick: 'print();',
	    		    	  'data-theme': drupalgap.theme.regions.header.attributes['data-theme'],
	    		    	  'data-icon': 'printer'
	    		   	   
	    		  }
	    		};
	    
	  return content;
}


function print_pageshow(nid){
	 node_load(nid, {
		    success: function(node) {

		      // Render their dashboard.
		      var msg = theme('header', {
		        text: node.body['und'][0].value
		      });
if(Drupal.user.uid<0)name='<h2>'+node.name+' - '+'<small>'+date('d.m.Y H:i',node.created*1000)+'</small></h2>';
else name='<h2><small>'+date('d.m.Y H:i',node.created*1000)+'</small></h2>';	
// Inject it into the container.
		      var container_id = print_container_id(nid);
		      $('#' + container_id).html(name+'<h2>'+node.body['und'][0].value+'</h2>').trigger('create');
_getPrintComments(node);
		    }
		  });
}

function print_container_id(nid) {
	  return 'print-page-' + nid;
	}


function _getPrintComments(node){
	 var query = {
			  pagesize:150,
			  parameters:{
			    nid: node.nid,					    
			  },
		options:{
				  orderby:{'created':'asc'}
			  }
			};
	 var items=[];
			comment_index(query, {
			    success: function(comments){
			    	for(var i=0;i<comments.length;i++){
			   // 	console.log(comments[i],'COMMENT PID????');
			    	sub='';
			    	comments[i].language="und";
			    	if(comments[i].pid!=0)sub='<div id="subcomment"><a href="#" class="ui-btn ui-icon-comment ui-btn-icon-notext ui-btn-inline ui-mini ui-corner-all">No text</a></div>';
			    	//	node['comments'].push(comments[i]);
			    	//else subs.push(comments[i]);
		  			 //variable_set('subcomments',subs);
			    	var newDate = new Date();
			    	newDate.setTime(comments[i].created *1000);
			    	dateString = newDate.toUTCString();
		if(Drupal.user.uid>0)name=theme_fbpic(comments[i].field_fbid)+' '+comments[i].subject;
		else name='';
		
			    	 items.push(
			    			 sub+' '+ 
			    			 name+' '+ date('d.m.Y H:i',newDate) +'</p> '+ comments[i].content
			               );
			   	}
			    				    	
					$('#comments-'+node.nid).html(items).trigger('create');		

			    }			
			});
		
			
};