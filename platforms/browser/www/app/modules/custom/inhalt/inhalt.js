    
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
  catch (error) { console.log('inhalt_menu - ' + error); }
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
	  		markup:'<div id="pager-bottom"></div>'
	  };
    

    
    return content;
  }
  
  catch (error) { console.log('inhalt - ' + error); }
}

function inhalt_pageshow() {
	  // Bind the swipeHandler callback function to the swipe event on div.box
	  $( "#inhalt" ).on( "swipeleft", swipeLeftHandlerInhalt );
	  $( "#inhalt" ).on( "swiperight", swipeRightHandlerInhalt );
//  alert("show");
	
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

function theme_pager_bottom(last){
	page=variable_get('page');
	
	if(page==1)grid='ui-grid-solo';
	else if(page==last+1)grid='ui-grid-solo';
	else grid='ui-grid-a';
	html='<div id="theme_pager_bottom" class="pager ui-navbar" data-role="navbar" role="navigation"><ul class="'+grid+'">';
if(page==last+1)html+='<li class="ui-block-a"><a onclick="_theme_pager_link_click({&quot;theme&quot;:&quot;view&quot;,&quot;format&quot;:&quot;list&quot;,&quot;columns&quot;:2,&quot;path&quot;:&quot;awrimobile/fragen&quot;,&quot;row_callback&quot;:&quot;inhalt_list_row&quot;,&quot;empty_callback&quot;:&quot;inhalt_list_empty&quot;,&quot;attributes&quot;:{&quot;id&quot;:&quot;inhalt_grid_view&quot;,&quot;class&quot;:&quot;view &quot;},&quot;page_id&quot;:&quot;inhalt&quot;,&quot;page&quot;:0})" class="pager_previous ui-btn" href="#">««</a></li>';
else
if(page==1)html+='<li class="ui-block-a"><a onclick="_theme_pager_link_click({&quot;theme&quot;:&quot;view&quot;,&quot;format&quot;:&quot;list&quot;,&quot;columns&quot;:2,&quot;path&quot;:&quot;awrimobile/fragen&quot;,&quot;row_callback&quot;:&quot;inhalt_list_row&quot;,&quot;empty_callback&quot;:&quot;inhalt_list_empty&quot;,&quot;attributes&quot;:{&quot;id&quot;:&quot;inhalt_grid_view&quot;,&quot;class&quot;:&quot;view &quot;},&quot;page_id&quot;:&quot;inhalt&quot;,&quot;page&quot;:'+last+'})" class="pager_next ui-btn" href="#">»»</a></li>';	
else{
	html+='<li class="ui-block-a"><a onclick="_theme_pager_link_click({&quot;theme&quot;:&quot;view&quot;,&quot;format&quot;:&quot;list&quot;,&quot;columns&quot;:2,&quot;path&quot;:&quot;awrimobile/fragen&quot;,&quot;row_callback&quot;:&quot;inhalt_list_row&quot;,&quot;empty_callback&quot;:&quot;inhalt_list_empty&quot;,&quot;attributes&quot;:{&quot;id&quot;:&quot;inhalt_grid_view&quot;,&quot;class&quot;:&quot;view &quot;},&quot;page_id&quot;:&quot;inhalt&quot;,&quot;page&quot;:0})" class="pager_previous ui-btn" href="#">««</a></li>';
	html+='<li class="ui-block-b"><a onclick="_theme_pager_link_click({&quot;theme&quot;:&quot;view&quot;,&quot;format&quot;:&quot;list&quot;,&quot;columns&quot;:2,&quot;path&quot;:&quot;awrimobile/fragen&quot;,&quot;row_callback&quot;:&quot;inhalt_list_row&quot;,&quot;empty_callback&quot;:&quot;inhalt_list_empty&quot;,&quot;attributes&quot;:{&quot;id&quot;:&quot;inhalt_grid_view&quot;,&quot;class&quot;:&quot;view &quot;},&quot;page_id&quot;:&quot;inhalt&quot;,&quot;page&quot;:'+last+'})" class="pager_next ui-btn" href="#">»»</a></li>';		
}
html+='</ul></div>';
return html;	
}

function theme_controls() {
	var pid = drupalgap_get_page_id();	
	node = JSON.parse(variable_get('node'));
back='';
if(drupalgap.settings.mode=='web-app')back='<li class="ui-block-a">'+l(t('Zurück'),'#',
		 {
    attributes: {
        'data-icon': 'back',
        'data-iconpos': 'notext',
//          'class': '',
        onclick: 'pubsub.trigger(\'main-menu-clicked\', { \'page\':\'controls\',\'action\':\'Zurück\' } );'
      },			 
    pages: {
      value: [''],
      mode: 'exclude'
    }
	
  })+'</li>';	 
	
	var htm = '<div data-role="navbar" class="region_sub_navigation  ui-navbar" role="navigation"><ul class="ui-grid-b">'
		+ back 
		+ '<li class="ui-block-b">'			
		 +'<a href="#" id="'+drupalgap_get_page_id()+'bookmark_btn" onclick="pubsub.trigger(\'main-menu-clicked\', { \'page\':\'controls\',\'action\':\'Lesezeichen ansehen\' } );" data-icon="tag">Lesezeichen</a>'
		 +'</li>'
		 + '<li class="ui-block-c">'
		 +'<a href="#" id="btn-stellen" onclick="pubsub.trigger(\'main-menu-clicked\', { \'page\':\'controls\',\'action\':\'Frage stellen\' } );" data-icon="action">Frage stellen</a>'
		 +'</li>'
		 + '<li class="ui-block-d">'
		 +'<a href="#" id="btn-suchen" onclick="pubsub.trigger(\'main-menu-clicked\', { \'page\':\'controls\',\'action\':\'Frage suchen\' } );" data-icon="search">Suchen</a>'
		 +'</li>'
		 + '<li class="ui-block-e">'
		 +'<a href="#" id="btn-ansehen" onclick="pubsub.trigger(\'main-menu-clicked\', { \'page\':\'controls\',\'action\':\'Frage ansehen\' } );" data-icon="eye">Ansehen</a>'
		 +'</li>'


	//	 + '<li class="ui-block-c"><a href="#" onclick="javascript:window.open(\'https://facebook.com/'
	//		+ node.fbmid
	//		+ '\', \'_system\', \'location=yes\');"  data-icon="grid" class="ui-link ui-btn ui-icon-grid ui-btn-icon-top">Facebook</a></li>'
	//		+ '<li class="ui-block-d"><a  id="bookmark" onclick="javascript:_toggleBookmark('+node.nid+');" data-icon="info" class="ui-link ui-btn ui-icon-info ui-btn-icon-top">Lesezeichen</a></li>'
	//		+ '<li class="ui-block-e"><a href="#" onclick="javascript:drupalgap_goto(\'user-listing\', {});" data-icon="eye" class="ui-link ui-btn ui-icon-info ui-btn-icon-top">Ansehen</a></li>'
	//		+

			'</ul></div>';

	var content={};		
		content['ctr-' + pid] = {
		markup : htm
	};
	drupalgap_render(content);
	return content;
}
function theme_small_controls(){
node=JSON.parse(variable_get('node'));
	if(typeof node.field_fbmid['und']!=="undefined")fbmid=node.field_fbmid['und'][0].value;
	else fbmid=node.field_fbmid;
	
	if(Drupal.user.uid==0)mark='';
	else mark=
	'<a href="#" id="'+drupalgap_get_page_id()+'bookmark_toggle" class="inactive bookmark" onclick="_toggleBookmark('+node.nid+')" data-role="button" data-icon="tag" data-iconpos="left" data-mini="true" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="'+drupalgap.theme.theme_header+'"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-icon ui-icon-delete ui-icon-shadow">&nbsp;</span></span></a>';
	
	mark3=''+
	'<a id="awril" href="javascript:window.open(\''+Drupal.settings.site_path+'/node/'	+ node.nid + '\', \'_system\', \'location=yes\');" data-role="button" data-icon="awri32" data-iconpos="left" data-mini="true" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="'+drupalgap.theme.theme_header+'"><span class="ui-btn-inner ui-btn-corner-all"><span>&nbsp;</span></span></a>';
	mark4=''+
	'<a id="facebook" href="javascript:window.open(\'https://facebook.com/'	+ fbmid + '\', \'_system\', \'location=yes\');" data-role="button" data-icon="facebook" data-iconpos="left" data-mini="true" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="'+drupalgap.theme.theme_header+'"><span class="ui-btn-inner ui-btn-corner-all"><span>&nbsp;</span></span></a>';

	
	mark5='<a onclick="share(\''+Drupal.settings.site_path+'/node/'+node.nid+'\',\''+node.nid+'\');" data-role="button" data-icon="link" data-iconpos="left" data-mini="true" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="'+drupalgap.theme.theme_header+'"><span class="ui-btn-inner ui-btn-corner-all"><span>&nbsp;</span></span></a>'+
'<div data-role="popup" id="popupMenu-'+drupalgap_get_page_id()+'-'+node.nid+'" data-theme="b">'+
        '<ul data-role="listview" data-inset="true" style="min-width:210px;">'+
            '<li data-role="list-divider">Diesen Beitrag teilen auf:</li>'+
_getSocialHTML('https://awri.ch/node/'+node.nid);
	'</ul>'+
'</div>";';
	
return mark+mark3+mark4+mark5;
}

function inhalt_list_row(view, row, variables) {
	variable_set('node',row);
	variable_set('page',view.page+1);
	variable_set('pages',view.pages);
	console.log(row);
	var content={};	
	theme_controls(); 
		content.card={
			markup:'<div data-role="collapsible" data-inset="true" data-collapsed="false" data-iconpos="left">'+    
//    '<h2><img src="'+drupalgap_get_path('theme','app_theme')+'/images/anonymous.png" id="node_picture" width="28" height="28">&nbsp;&nbsp;&nbsp;'+row.field_fbname+'</h2><p id="body">'+row.title+'</p>'+
    '<h2>'+theme_pic(row.field_fbid,28,28)+'&nbsp;&nbsp;&nbsp;'+row.field_fbname+' '+row.created+
    '<span class="ui-li-count ui-btn-up-c ui-btn-corner-all">'+row.comment_count+'</span>'+
    '</h2><div><p id="body"><div>'+theme_pic(row.field_fbid,70,70)+'</div>'+row.body+'</p></div>'+theme_small_controls(row)
	+'</div>'
	};

	
				
content['isb']={ 
		markup:drupalgap_jqm_page_event_script_code({
	    page_id: drupalgap_get_page_id(),
	    jqm_page_event: 'pageshow',
	    jqm_page_event_callback:" _isBookmark("+row.nid+",'"+drupalgap_get_page_id()+"')",
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


//content['pager_bottom']={
//		markup:theme_pager_bottom(variable_get('pages')-1),
//}

$('#pager-bottom').html(theme_pager_bottom(view.pages-1));
$('#inhalt_top,h3.my-css-class').html((1+view.page)+'/'+view.pages).trigger('create');	

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


var pic= '';
	if(row.field_fbid===undefined||row.field_fbid==0)
    pic='<img src="'+drupalgap_get_path('module','start')+'/anonymous.png" style="border-radius: 50%;"/>';
   if(row.field_fbid>0)pic='<img src="https://graph.facebook.com/'+row.field_fbid+'/picture?type=small" style="border-radius: 50%;"/>';	
	if(Drupal.user.uid==0)'<p>'+l('Bitte anmelden','user/login')+'</a></p>';

//	$('.ui-title').html(drupalgap.settings.title).trigger('create');
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
		  variable_set('node',node);
		  if(node.field_fbname['und']===undefined)name=node.name;
		  else name=node.field_fbname['und'][0].value;
		  drupalgap_loading_message_show();
		  setTitle('ID:'+node.nid+'');	
		   	var newDate = new Date();
	    	newDate.setTime(node.created *1000);
	    	dateString = newDate.toUTCString();
	
		  var content = {};
	    content['c1'] = {
	      theme: 'collapsible',
	      header: theme_fbpic(node.field_fbid)+' '+name+' <small>'+date('d.m.Y H:i',node.created*1000)+'</small> <span class="ui-li-count ui-btn-up-c ui-btn-corner-all">'+node.comment_count+'</span>',
	      'id':'inhalt',
	      content: node.content+theme_small_controls(node),
	      attributes: { 'data-collapsed': 'false' }
	    };  	    	    
	    
	    
//	    content['c2']={
//	    		markup:'<a id="global_bookmark_cnt" href="#" data-role="button" data-icon="tag" data-iconpos="left" data-mini="true" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c""><span class="ui-btn-inner ui-btn-corner-all"><span id="global_bookmark_cnt" class="ui-btn-text">0</span> <small>Benutzer haben dieses Lesezeichen gesetzt</small></span></a>'
//	    }
	    
	    content['c0'] = {
	    		  theme: 'jqm_item_list',
	    	//	  title: 'Antworten',
	    		  items: [],
	    		  attributes: {
	    			  'id': 'comments-'+node.nid,
	    		    'data-inset': true,
	    		    'class': 'awri-comments'
	    		  }
	    		};  

	    content['c4'] = {
	    		  markup: '<div id="node_comment_container_' + node.nid + '"></div>',	    		
	    		};  

	
	    options.success(content);
		 _getComments(node);

	     //_isBookmark(node.nid,drupalgap_get_page_id());
	     
		 drupalgap_loading_message_hide();
	  } 
	  catch (error) { console.log('inhalt_node_page_view_alter_article - ' + error); }
	}


function _getComments(node){
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
			    	if(comments[i].pid!=0)sub='<div "subcomment"><a href="#" class="ui-btn ui-icon-comment ui-btn-icon-notext ui-btn-inline ui-mini ui-corner-all">No text</a></div>';
			    	//	node['comments'].push(comments[i]);
			    	//else subs.push(comments[i]);
		  			 //variable_set('subcomments',subs);
			    	var newDate = new Date();
			    	newDate.setTime(comments[i].created *1000);
			    	dateString = newDate.toUTCString();
			    	
			    	 items.push(
			    			 sub+theme_fbpic(comments[i].field_fbid) +' '+ 
			    			 comments[i].subject+' '+ date('d.m.Y H:i',newDate) +'</small></p> '+ comments[i].content
			               );
			   	}
			    	
			    	
					drupalgap_item_list_populate('#comments-'+node.nid, items);		
			    
			    }			
			});
		//	node.language='und';
			//ent=drupalgap_get_entity('index','comment',null);
			//console.log(ent,"ENTITY");
if(Drupal.user.uid>0){
			Drupal.settings.language_default='und';
			var id = 'node_comment_container_' + node.nid;
		
			var form=drupalgap_get_form('comment_edit', null, node);	
	//			console.log(form.validate);
			$('#' + id).html(form).trigger('create');
	//		getFBID('#edit-comment-edit-'+node.nid+'-field-fbid-'+Drupal.settings.language_default+'-0-value');
}			
			
			
};

function mycomment_edit_validate(form, form_state) {
	  try {
//		  var comment = drupalgap_entity_build_from_form_state(form, form_state);
alert('mycomment_edit_validate');
console.log(form_state.values.comment_body);
if (form_state.values.comment_body['und'][0]== '') {
    drupalgap_form_set_error('comment-body-und-0', 'Sorry, no jokers allowed.');
  }
return true;
//			console.log(comment);
//			$('#edit-comment-edit-17440-field-fbid-und-0-value').val('122334454556');
	  }
	  catch (error) { console.log('comment_edit_submit - ' + error); }
	}
function mycomment_edit_submit(form, form_state) {
 var comment = drupalgap_entity_build_from_form_state(form, form_state);
 comment_save(comment,{sucess:function(data){
	 drupalgap_set_message('Ihr Kommentar wurde gesendet.');
	 console.log(data);
	 drupalgap_goto('node/'+comment.nid,{reloadPage:true});

 }});	 

 drupalgap_goto('node/'+comment.nid,{reloadPage:true});
 // console.log(comment);
 //Drupal.settings.language_default='de';
 //form.action='node/'+comment.nid;  
 //drupalgap_entity_form_submit(form, form_state, comment);
 //drupalgap_goto('node/'+comment.nid,'{reloadPage:true}');

 //drupalgap_goto('inhalt',{reloadPage:true});

}

function inhalt_form_alter(form, form_state){
if(form.bundle=='comment_node_rechtsfrage'){
//	console.log(form,'---------------------------------------------------');
//console.log(form.arguments[1]['field_fbid']['und']);

form.validate.push('mycomment_edit_validate')

form.prefix='<h2>Ihre Antwort:</h2>';
form.elements['field_fbid']['und'][0].value=form.arguments[1]['field_fbid']['und']['value'];
form.elements['field_fbid'].access=false;
//form.elements['field_fbmid'].access=false;
form.elements['subject'].value=Drupal.user.name;
}
}


function getFormattedDate(datum) {
    var date = datum;

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    var str = date.getFullYear() + "-" + month + "-" + day + "_" +  hour + ":" + min + ":" + sec;

    /*alert(str);*/

    return str;
}
function _addComment(comment){
//	html=$('#comments').html();
	
	 var attributes = {
		      'class': 'awricomment',
		   //   style: 'width: 100%; height: 320px;'
	id:'comment-'+comment.cid,   
	 };
		    
html='<li '+drupalgap_attributes(attributes)+'>'+comment.content+'<li>';
$('#comments').html(html).trigger('create');
}



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


	