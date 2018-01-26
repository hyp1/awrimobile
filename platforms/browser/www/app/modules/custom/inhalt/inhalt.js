var hash=user_password();
    
function inhalt_menu() {
  try {
    var items = {};
    items['inhalt'] = {
      title: 'Rechtsfragen',
      page_callback: 'inhalt',
      pageshow: 'inhalt_pageshow',
    	  
    };    
    return items;
  }
  catch (error) { console.log('start_menu - ' + error); }
}


function inhalt() {
  try {
    var content = {};      

    /*
    content['c0'] = {
   		 theme: 'header',
   		  text: 'Inhalt',
   		  attributes: {
   		  id:'inhalt_header'
   		  },   		
   };
*/

    
    content['c1'] = {
    	  theme: 'view',
   	      format: 'list',
   	      columns:2,
   	      path: 'awrimobile/fragen', /* the path to the view in Drupal */
   	      row_callback: 'inhalt_list_row',
   	      empty_callback: 'inhalt_list_empty',
   	      attributes: {
   	        id: 'inhalt_grid_view'
   	      },
   	      
    	  };
    

    content['c2']={
	  		markup:'<div id="pager"></div>'
	  };
    

    
    return content;
  }
  
  catch (error) { console.log('inhalt - ' + error); }
}

function inhalt_pageshow() {
	  // Bind the swipeHandler callback function to the swipe event on div.box
	  $( "#inhalt" ).on( "swipeleft", swipeLeftHandlerInhalt );
	  $( "#inhalt" ).on( "swiperight", swipeRightHandlerInhalt );
}

function swipeLeftHandlerInhalt( event ){
  	console.log("Left:"+ $('#static_block'+drupalgap_get_page_id()+' p > span#pagecurr').text());
	$('#inhalt_grid_view .pager_next').click();
  	$( event.target ).addClass( "swipe" );
  }

   function swipeRightHandlerInhalt( event ){
  	console.log("Right:"+ $('#static_block'+drupalgap_get_page_id()+' p > span#pagecurr').text());
  	$('#inhalt_grid_view .pager_previous').click(); 
  	$( event.target ).addClass( "swipe" );
	  }         


function theme_mypager(page_id,id,pos,page,path){
	return _theme_pager_link_click({'theme':'view','pager_pos':pos,'format':'grid','columns':'2','path':'drupalgap/views_datasource/drupalgap_content','row_callback':'inhalt_list_row','empty_callback':'inhalt_list_empty','attributes':{'id':id,'class':'view '},'page_id':page_id,'page':page});	
}



function inhalt_list_row(view, row, variables) {
	variable_set('node',row);
	var content={};	
	theme_controls();
	
	mark=''+
	'<a href="#" id="bookmark_toggle" class="inactive" onclick="_toggleBookmark('+row.nid+')" data-role="button" data-icon="tag" data-iconpos="left" data-mini="true" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c""><span class="ui-btn-inner ui-btn-corner-all"><span id="isbookmark" class="ui-btn-text">false</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>';

	mark2=''+
	'<a id="bookmark_cnt" href="#" data-role="button" data-icon="comment" data-iconpos="left" data-mini="true" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c""><span class="ui-btn-inner ui-btn-corner-all"><span id="comment_tag" class="ui-btn-text">'+row.comment_count+'</span><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>';

	mark3=''+
	'<a id="facebookl" href="javascript:window.open(\'https://facebook.com/'	+ node.fbmid + '\', \'_system\', \'location=yes\');" data-role="button" data-icon="awri32" data-iconpos="left" data-mini="true" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c""><span class="ui-btn-inner ui-btn-corner-all"><span>&nbsp;</span></span></a>';
	mark4=''+
	'<a id="awril" href="javascript:window.open(\'https://awri.ch/node/'	+ node.fbmid + '\', \'_system\', \'location=yes\');" data-role="button" data-icon="facebook" data-iconpos="left" data-mini="true" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c""><span class="ui-btn-inner ui-btn-corner-all"><span>&nbsp;</span></span></a>';

	
	mark5='<a onclick="share(\'https://awri.ch/node/'+row.nid+'\');" data-role="button" data-icon="link" data-iconpos="left" data-mini="true" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c""><span class="ui-btn-inner ui-btn-corner-all"><span>&nbsp;</span></span></a>'+
'<div data-role="popup" id="popupMenu" data-theme="b">'+
        '<ul data-role="listview" data-inset="true" style="min-width:210px;">'+
            '<li data-role="list-divider">Diesen Beitrag teilen auf:</li>'+
_getSocialHTML('https://awri.ch/node/'+row.nid);
	'</ul>'+
'</div>";';
	
	
	content.card={
			markup:'<div data-role="collapsible" data-inset="true" data-collapsed="false" data-iconpos="left">'+    
//    '<h2><img src="'+drupalgap_get_path('theme','app_theme')+'/images/anonymous.png" id="node_picture" width="28" height="28">&nbsp;&nbsp;&nbsp;'+row.field_fbname+'</h2><p id="body">'+row.title+'</p>'+
    '<h2>'+theme_pic(row.field_fbid,28,28)+'&nbsp;&nbsp;&nbsp;'+row.field_fbname+
    '<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">'+row.comment_count+'</span>'+
    '</h2><p id="body"><div>'+theme_pic(row.field_fbid,70,70)+'</div>'+row.body+'</p></div>'+mark
    +mark2+mark3+mark4+mark5
	+'</div>'
	};
	
	
content['isb']={ 
		markup:drupalgap_jqm_page_event_script_code({
	    page_id: drupalgap_get_page_id(),
	    jqm_page_event: 'pageshow',
	    jqm_page_event_callback:" _isBookmark("+row.nid+",'#isbookmark')",
	    jqm_page_event_args: JSON.stringify({
	        'nid': row,
	        'elem':'#isbookmark'
	    })
	})
};

content['countb']={ 
		markup:drupalgap_jqm_page_event_script_code({
	    page_id: drupalgap_get_page_id(),
	    jqm_page_event: 'pageshow',
	    jqm_page_event_callback:" _countFlags("+row.nid+",'#content_pageshow')",
	    jqm_page_event_args: JSON.stringify({
	        'nid': row,
	        'elem':'#bookmark_tag'
	    })
	})
};	


//$('#book').attr(variables).trigger('create');

$('#inhalt_top,h3.my-css-class').html((1+view.page)+'/'+view.pages+' - '+row.flagged).trigger('create');	

//setFlag(row.flagged);
return drupalgap_render(content);
}


function inhalt_list_empty(view, variables) {
	  return t('Sorry, nichts gefunden.');
}



function questions_empty() {
		console.log(arguments.callee.toString().match(/function\s+([^\s\(]+)/),'DEBUG');
	try {
		return "<h3>Sorry, leider nichts gefunden!</h3>";
	} catch (error) {
		console.log('awri_questions_empty - ' + error);
	}
}


function questions_list_row(view, row, variables) {

	try {
		//keine unpublished comments!
if(row.status==0)return;
	
	if(row.field_fbid===undefined||row.field_fbid==0)
    pic='<img src="'+drupalgap_get_path('module','start')+'/anonymous.png" style="border-radius: 50%;"/>';
   if(row.field_fbid>0)pic='<img src="https://graph.facebook.com/'+row.field_fbid+'/picture?type=small" style="border-radius: 50%;"/>';	
	if(Drupal.user.uid==0)pic= '<p>'+l('Bitte anmelden','user/login')+'</a></p>';

	$('.ui-title').html(drupalgap.settings.title).trigger('create');
	//Counter
	$('#title-inhalt').html('<h2 class="ui-title">'+(1 + view.page) + '/' + view.pages+'</h2>').trigger('create');
		//Collapsible Inhalt		
		var content={}; 
		
		
		//alert(_flag_quick_link_data_theme(true));
		//alert(_flag_quick_link_data_theme(false));

		content['c1'] = {
			      theme: 'collapsible',
			      header: pic +row.field_fbname+' <small>'+row.comment_count+' Antwort(en)</small><input type="text" id="lh-'+row.nid+'" data-theme="b" value="'+row.flagged+'"/><div id="'+lesezeichen_flag_count_container_id('bookmarks',row.nid)+'">times</div>',
			      content: row.body,
			      attributes: {			    	 
			    	  'id':lesezeichen_flag_count_container_id('lesezeichen',row.nid),
			    	  'data-collapsed': 'false',
			    	  'data-theme':_flag_quick_link_data_theme(row.flagged),
			    			  }
			    };
		  
		
		   content['c2'] = {
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
if(row.flagged==0){		
		   content['c3'] = {
		    		  markup:bookmark_quick_link(
		    				    'bookmarks',
		    				    'node',		    				    
		    				    row.nid,    				    		    				    
		    				    row.flagged		    				    		    				    
		    				  ),	    				 
			    };
	}
*/
/*
		   content['c4'] = {
					 theme: 'button_link',
					  text: 'AWRI',
					  path: 'https://awri.ch/node/'+row.nid,
					  attributes:{
						  'data-icon':'eye',
						   'data-iconpos':'left'
					  },
					  options: {
					    InAppBrowser:true
					  }
			   };

			content['c5'] = {
					 theme: 'button_link',
					  text: 'Facebook',
					  path: 'https://facebook.com/'+row.fbmid,
					  attributes:{
						  'data-icon':'eye',
						   'data-iconpos':'left'
					  },
					  options: {
					    InAppBrowser:true
					  }
			   };
		  */ 
		   
		   content['c3']=theme_lesezeichen_button(row.nid);
		   
/*

//Check count		   
		   var options={};
		   options.method='POST';
		   options.success=function(data){
				  _lesezeichen_flag_count_pageshow({'count:':data.count,'fid':1,'entity_id':row.nid});
			   };
		   flag_countall('bookmarks',row.nid,options);
	     */
		   
		   variable.set('node',row);
	     return  drupalgap_render(content);
		//bl(pic+ ' '+row.field_fbname+' '+row.comment_count+ '<br>' +row.body,'node/'+row.nid,{attributes:{'class':'awri-comment','data-icon':'home'}});
	} catch (error) {
		console.log('questions_list_row - ' + error);
	}
}


function inhalt_node_page_view_alter_rechtsfrage(node, options) {
	  try {	
	
		  if(node.field_fbname['und']===undefined)name=node.name;
		  else name=node.field_fbname['und'][0].value;
	
		  $('#inhalt_top,h3.my-css-class').html('['+node.nid+']').trigger('create');	


		  var content = {};
	    content['c1'] = {
	      theme: 'collapsible',
	      header: theme_fbpic(node.field_fbid) +name+' <span class="ui-li-count ui-btn-up-c ui-btn-corner-all">'+node.comment_count+'</span>',
	      'id':'inhalt',
	      content: node.content,
	      attributes: { 'data-collapsed': 'false' }
	    };  	    	    

	    content['c0'] = {
	    		  theme: 'jqm_item_list',
	    		  title: 'Antworten',
	    		  items: [],
	    		  attributes: {
	    			  'id': 'comments-'+node.nid,
	    		    'data-inset': true,
	    		    'class': 'awri-comments'
	    		  }
	    		};  
	    

	    

	  
	     content['c3']=theme_lesezeichen_button(node.nid),
	     

	    options.success(content);
		 _getComments(node.nid);
		
		  
	  } 
	  catch (error) { console.log('my_module_node_page_view_alter_article - ' + error); }
	}


function _getComments(nid){
	 var query = {
			  pagesize:150,
			  parameters:{
			    nid: nid,					    
			  },
		options:{
				  orderby:{'created':'asc'}
			  }
			};
	 var items=[];
	  drupalgap_loading_message_show();
			comment_index(query, {
			    success: function(comments){
			    	for(var i=0;i<comments.length;i++){
//			    	console.log(comments[i],'COMMENT PID????');
			    	sub='';
			    	if(comments[i].pid!=0)sub='^';
			    	//	node['comments'].push(comments[i]);
			    	//else subs.push(comments[i]);
		  			 //variable_set('subcomments',subs);
		  			
			    	 items.push(
			    			 sub+theme_fbpic(comments[i].field_fbid) +' '+ 
			    			 comments[i].subject+ ' ' + comments[i].content
			               );
			   	}
		
					drupalgap_item_list_populate('#comments-'+nid, items);		
			    }			
			});
		drupalgap_loading_message_hide();
};

function _addComment(comment){
//	html=$('#comments').html();
	
	 var attributes = {
		      'class': 'awricomment',
		   //   style: 'width: 100%; height: 320px;'
		    };
		    
html='<li '+drupalgap_attributes(attributes)+'>'+comment.content+'<li>';
$('#comments').html(html).trigger('create');
}

$(document).on('pagecontainershow', '#inhalt_grid_view', function(e){  
alert("GR");
});

function theme_footer(){
var social='<div data-role="controlgroup" data-type="horizontal" class="social ui-btn-left ui-controlgroup ui-controlgroup-horizontal ui-group-theme-b ui-corner-all ui-mini" style="position:relative;" data-mini="true">';
	
	social+='';
	social+='<a data-iconpos="notext" href="https://awri.ch/rss.xml" class="ui-link ui-btn ui-icon-rss ui-btn-icon-notext ui-shadow ui-corner-all ui-first-child" target="_NEW">&nbsp;</a>';
	social+='<a data-iconpos="notext" href="https://www.facebook.com/sharer/sharer.php?u=https://awri.ch/mobile" class="ui-link ui-btn ui-icon-facebook ui-btn-icon-notext ui-shadow ui-corner-all" target="_NEW">&nbsp;</a>';
	social+='<a data-icon="googleplus" data-iconpos="notext" href="https://plus.google.com/share?url=https://awri.ch/mobile" class="ui-link ui-btn ui-icon-googleplus ui-btn-icon-notext ui-shadow ui-corner-all" target="_NEW">&nbsp;</a>';
	social+='<a data-iconpos="notext" href="https://twitter.com/intent/tweet?url=https://awri.ch/mobile" class="ui-link ui-btn ui-icon-twitter ui-btn-icon-notext ui-shadow ui-corner-all ui-last-child" target="_NEW">&nbsp;</a></div>';
	content['footer'] = {
		markup :'<div data-role="footer" data-theme="b" data-position="fixed" class="region_footer ui-footer ui-bar-b ui-footer-fixed slideup" data-add-back-btn="true" role="contentinfo">'+social+'<p style="text-align:center; width:30%; height:30px; margin-left:auto;margin-right:auto;" id="fbanner"><span><a href="https://www.facebook.com/groups/RechtsberatungSchweiz/" target="_blank"><img src="img/FB-f-Logo__blue_29.png" width="18" height="18"/>&nbsp;Rechtsforum Schweiz</a></span> <a data-icon="back" data-iconpos="notext" class="ui-btn-right ui-link ui-btn ui-icon-back ui-btn-icon-notext ui-shadow ui-corner-all" onclick="javascript:drupalgap_back();" data-role="button" href="#" role="button">&nbsp;</a></p></div>'
};	
return content;	
}


	