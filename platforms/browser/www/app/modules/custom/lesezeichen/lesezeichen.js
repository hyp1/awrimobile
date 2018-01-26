
function lesezeichen_menu() {
	if (Drupal.settings.debug)
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		var items = {};
		items['lesezeichen'] = {
		title : 'Ihre Lesezeichen <span class="ui-li-count" id="bookmark-cnt">0</span>',
		page_callback : "lesezeichen_page",
	//    pageshow : "lesezeichen_pageshow",
		 roles: {
		        value: ['authenticated user'],
		        mode: 'include',
		      }
		};
		return items;
	} catch (error) {
		console.log('lesezeichen_menu- ' + error);
	}
}

function lesezeichen_page() {
	 var content = {};
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
		};
return content;

	}



		 
		  
		  content['header3']={
			    	theme:'header',
			    	text:'Ihre Lesezeichens',
			    	type_attributes: {
			    	    class: 'lz-css-class'
			    	  }
		 };	
		  content['lesezeichen_grid'] = {
		  	      theme: 'view',
		  	      format: 'ul',
		  	      columns:2,
		  	      path: '/user/awri-bookmarks/'+Drupal.user.uid,
		  	      row_callback: 'lesezeichen_list_row',
		  	      empty_callback: 'lesezeichen_list_empty',
		  	      attributes: {
		  	        id: 'lesezeichen_grid_view'
		  	      }
		  	    };
		  /*
		  content['my_article_list'] = {
		    theme: 'jqm_item_list',
		    pager_pos: 'bottom',
		    title: 'Ihre Lesezeichen',
		    items: [],
		    attributes: { id: 'bookmarks' }
		  };
		  return content;
		
		  content['my_articles_list'] = {
			      theme: 'view',
			      format: 'ul',
			      path: '/user/awri-bookmarks/'+Drupal.user.uid, 
			      row_callback: 'my_module_articles_list_row',
			      empty_callback: 'my_module_articles_list_empty',
			      attributes: {
			        id: 'my_articles_list_view',
			      }
			    };
		  */
	return content;
	} catch (error) {
		console.log('lesezeichen_page - ' + error);
	}
}


function _toggleBookmark(nid){
	flag_is_flagged('bookmarks', nid, Drupal.user.uid,  {
	      success: function(result) {
	          try {
	        	  if(JSON.parse(result)==true){
	             	console.log(result,'ISFLAGGED'+nid);
	      _removeBookmark(nid);

	}
	  if(JSON.parse(result)==false){
       	console.log(result,'IS NOT FLAGGED'+nid);
_addBookmark(nid);



}
	 
	          }
	          catch (error) { console.log('_my_module_flag_count_pageshow - success - ' + error); }
	        },
	  	 error: function(result) {
	  	        try {
	  	        	console.log(result,'add err' + nid);
	  	        }
	  	        catch (error) { console.log('_my_module_flag_count_pageshow - success - ' + error); }
	  	      }
	    });	
	
}



function _addBookmark(nid){

	   flag_flag('bookmarks', nid, 'flag', Drupal.user.uid, true,
		 {
      success: function(result) {
        try {
       
     	   setFlag(1);
 	      $('#bookmark').attr('data-theme', 'b').removeClass('ui-btn-inactive')
	      .addClass('ui-btn-active').trigger('create');
        }
        catch (error) { console.log('_my_module_flag_count_pageshow - success - ' + error); }
      },
	 error: function(result) {
	        try {
	        	console.log(result,'add err');
	     //	   $(lesezeichen_container_id(nid)).hide();
	   //     	 setFlag(0);
	        	//drupalgap_goto(path, { reloadPage: true });
	  	   
	        }
	        catch (error) { console.log('_my_module_flag_count_pageshow - success - ' + error); }
	      }
  }
);	 

}

function _removeBookmark(nid){

	      flag_flag('bookmarks', nid, 'unflag', Drupal.user.uid, false,
			 {
	        success: function(result) {
	          try {
	       	   setFlag(0);
	       	   $('#bookmark').attr('data-theme', 'b').removeClass('ui-btn-active')
			      .addClass('ui-btn-inactive').trigger('create');	       	       	
	          }
	          catch (error) { 
	        	
	        	  console.log('_removeBookmark - success - ' + error); }
	        }
	    }
	 );	 
}


function _deleteBookmark(nid){

    flag_flag('bookmarks', nid, 'unflag', Drupal.user.uid, false,
		 {
      success: function(result) {
        try {
     	   setFlag(0);
     	   $('#bookmark').attr('data-theme', 'b').removeClass('ui-btn-active')
		      .addClass('ui-btn-inactive').trigger('create');
     
     	
     	   drupalgap_goto(drupalgap_path_get(), {reloadPage:true});
        }
        catch (error) { 
      	
      	  console.log('_removeBookmark - success - ' + error); }
      }
  }
);	 
}

/**
 *
 */
function lesezeichen_list_row(view, node, variables) {
	  try {
		  var html="";
    		
			 html=html+l(node.title,'node/'+node.nid);
			 html=html+l('link2','#',{attributes:{'id':'bookmark-btn'+node.nid,onclick:'_deleteBookmark('+node.nid+')','data-icon':'trash','data-iconpos':'notext','data-inline':'true'}})	 
//         $('#bookmark-cnt').html(view.count).trigger('create');
			 $('.lz-css-class').html(' '+ (1+view.page)+'/'+view.pages).trigger('create');	
			 $('.my-css-class').html('Ihre Lesezeichen: '+ view.count).trigger('create');	
	 
	    return html;
	  }
	  catch (error) { console.log('example5_list_row - ' + error); }
	}



function lesezeichen_list_empty(view, variables) {

  // This...

  return t('Sie haben keine Lesezeichen gesetzt');

  // Or...

  var content = {};
  content['msg'] = { markup: t('Sorry, no articles were found.') };
  // content['some-other-widget'] = { /* ... */ }
  return content;

}

function lesezeichen_pageshow() {
		try {
			var path_to_view = '/user/awri-bookmarks/'+Drupal.user.uid;
			  views_datasource_get_view_result(path_to_view, {
			      success: function (data) {
			    	  console.log(data);
			        if (data.nodes.length > 0) {
			          var items = [];
			          $.each(data.nodes, function(index, object){
			              var node = object.node;
			              var html="";
			          		
	            			 html=html+l(node.title,'node/'+node.nid);
	            			 html=html+l('link2','#',{attributes:{'id':'bookmark-btn'+node.nid,onclick:'_removeBookmark('+node.nid+')','data-icon':'minus','data-iconpos':'notext','data-inline':'true'}})	 

			              items.push(
			  html
			              );
			          });
			          drupalgap_item_list_populate('#bookmarks', items);
			          $('#bookmark-cnt').html(data.nodes.length);
			        }else{$('#bookmarks').html('<h3>Sie haben keine Lesezeichen gesetzt.<h3>');}
			      }
			  });
			  $('#zu.title').text("Ihre Lesezeichen");
	} catch (error) {
		console.log('lesezeichen_pageshow - ' + error);
	}
}


function theme_lesezeichen_button(nid){
	var content = {};
	//alert(drupalgap_get_page_id()+'-'+lesezeichen_container_id(nid));
	
	var html =
	bl('Lesezeichen','#',
			{
			'attributes':{
				'id':lesezeichen_container_id(nid),
				'onclick':'_addBookmark(\''+nid+'\')'
						}
			}
	);
	html += drupalgap_jqm_page_event_script_code({
	    page_id:lesezeichen_container_id(nid),
	    jqm_page_event: 'pageshow',
	    jqm_page_event_callback:"isBookmark(\'"+nid+"\')",
	    jqm_page_event_args: JSON.stringify({
	        nid: nid
	    })
	});		

	content['script-'+lesezeichen_container_id(nid)]={
			markup:html
	};
	
	return content;
};

function lesezeichen_container_id(entity_id) {
	   return 'bookmark-' + entity_id;
	}


function isBookmark(nid){

	options={};
	  options.success=function(result){
		
		  if(JSON.parse(result)==true){
			  $('#'+lesezeichen_container_id(nid)).hide();
			  $('#lh-'+lesezeichen_container_id(nid)).val(1);
		  }
			  else{
				  $('#'+lesezeichen_container_id(nid)).show();
				  $('#lh-'+lesezeichen_container_id(nid)).val(0);
//				  alert( _flag_quick_link_data_theme(0?true:false));
			  }
	
//		 $('.awri-bookmark'+nid).attr('class', 'awri-bookmark ui-link ui-btn ui-btn-a ui-shadow ui-corner-all');
//		 $('#'+lesezeichen_container_id(nid)).attr('data-theme', 'a');
	  };

	  flag_is_flagged('bookmarks', nid, Drupal.user.uid, options);
};


function lesezeichen_flag_count_container_id(flag_name, entity_id) {
	 try {
	   return drupalgap_get_page_id()+'-count-' + flag_name + '-' + entity_id;
	 }
	 catch (error) { console.log('lesezeichen_flag_count_container_id - ' + error); }
	}

function _lesezeichen_flag_count_pageshow(options) {
	try {
	   var flag = flag_load(options.fid);
	   if (!flag) { return; }
	   flag_countall(flag.name, options.entity_id, {
	       success: function(result) {
	         try {
	           // Check options.entity_type and/or options.bundle here to customize
	           // the message per content type.
	           var container_id = lesezeichen_flag_count_container_id(flag.name, options.entity_id);	      
	           var html = '<p> ' + result.count + ' ' + drupalgap_format_plural(result.count, t('time'), t('times')) +' '+ t('Flagged')+ '!</p>';
	           html = '<input type="hidden" value="'+ result.count+'"> ' + result.count + ' Persenen haben das Lesezeichen gesetzt</p>';

	           $('#' + container_id).html(html).trigger('create');
	         }
	         catch (error) { console.log('_map_flag_count_pageshow - success - ' + error); }
	       }
	   });
	 }
	 catch (error) { console.log('_lesezeichen_flag_count_pageshow - ' + error); }
	}

//counter only
function lesezeichen_entity_post_render_content(entity, entity_type, bundle) {
	try {
	    if (entity_type == 'node') {	    	
	      var flags = flag_get_entity_flags(entity_type, bundle);	    
	      if (flags) {
	        var entity_id = entity[entity_primary_key(entity_type)];
	        var html = '';	        
	        var page_id = drupalgap_get_page_id();	        
	        $.each(flags, function(fid, flag) {
	            var container_id = lesezeichen_flag_count_container_id(flag.name, entity_id);
	            html += '<div id="' + container_id + '"></div>' +
	              drupalgap_jqm_page_event_script_code(
	                {
	                  page_id: page_id,
	                  jqm_page_event: 'pageshow',
	                  jqm_page_event_callback: '_lesezeichen_flag_count_pageshow',
	                  jqm_page_event_args: JSON.stringify({
	                      fid: fid,
	                      entity_id: entity_id,
	                      entity_type: entity_type,
	                      bundle: bundle
	                  })
	                },
	                flag.fid
	              );
	        });
	        entity.content = html + entity.content;
	      }
	    }
	  }
	  catch (error) {
	    console.log('start_entity_post_render_content - ' + error);
	  }
	}