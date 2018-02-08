/**
 * Implements hook_menu(),
 */
var cnt=0;

function upload_install() {
	drupalgap_add_css(drupalgap_get_path('module','upload')+'/css/upload.css');
}

function upload_menu() {
  var items = {};
  items['upload'] = {
    title: 'Upload',
    page_callback: 'drupalgap_get_form',
    page_arguments: ['upload_custom_form']
  };
  
  items['upload_form'] = {
		    title: 'Upload',
		    page_callback: 'drupalgap_get_form',
		    page_arguments: ['upload_form',2,3]
		  };		  
  return items;
}

function upload_container_id(name,nr){
	 return 'upload-' + name+'-'+nr;
}

function upload_custom_form(form, form_state) {
	  try {
/*
		    form.elements['target1'] = {
			  	      type: 'textfield',
			  	      default_value:'0',
			  	      attributes:{
			  	    	  id:'target1',
			  	      }
			  	    };
		    form.elements['target2'] = {
			  	      type: 'textfield',
			  	      default_value:'0',
			  	      attributes:{
			  	    	  id:'target2',
			  	      }
			  	    };
		    form.elements['target3'] = {
			  	      type: 'textfield',
			  	      default_value:'0',
			  	      attributes:{
			  	    	  id:'target3',
			  	      }
			  	    };
			*/
		  form.elements[9] ={
				  markup:drupalgap_render(upload_form(form,form_state,'field_1','target1'))
		  };
			/*
		  form.elements[10] ={
				  markup:drupalgap_render(upload_form(form,form_state,'field_2','target2'))
		  };
			
		  form.elements[11] ={
				  markup:drupalgap_render(upload_form(form,form_state,'field_3','target3'))
		  };
*/
		  return form;
	  }
	  catch (error) { console.log('my_module_custom_form - ' + error); }
	}
function upload_form_submit(form, form_state) {}


function upload_custom_form_submit(form, form_state) {
	  try {
	  }
	  catch (error) { console.log('my_module_custom_form - ' + error); }
	}

function upload_form(form,form_state,id,nr){
alert(id+' '+nr);
	

form.elements[id+'_image']={
			markup:'<img id="'+upload_container_id(id,nr)+'_image"></img>',
	};
	
	
	form.elements[id+'_camera']={
			type:'button',
			text:'Camera',
			attributes:{
				id:upload_container_id(id,nr)+'_camera',
				onclick:'getPicture(\''+upload_container_id(id,nr)+'\',\''+nr+'\');return false;',		
				'data-icon':'camera',
			}
	};
	

	
	form.elements[id+'_browse']={
			type:'button',
			text:'Browse',
			attributes:{
				id:upload_container_id(id,nr)+'_browse',
				onclick:'$(\'#'+upload_container_id(id,nr)+'_file\').click();return false;',		
				'data-icon':'grid',
			}
	};
	

	form.elements[id+'_upload']={
			type:'button',
			text:'Upload',
			attributes:{
				id:upload_container_id(id,nr)+'_upload',
				onclick:'uploadFile(\''+upload_container_id(id,nr)+'\');return false;',
				style:'display:none;',
				'data-icon':'action',
			}
	};
	
	form.elements[id+'_delete']={
			type:'button',
			text:'Delete',
			attributes:{
				id:upload_container_id(id,nr)+'_delete',
				onclick:'deleteFile(\''+upload_container_id(id,nr)+'\');return false;',
				style:'display:none;',
				'data-icon':'delete',
			}
	};
	
	form.elements[id+'_select']={
			type:'file',
			attributes:{
				id:upload_container_id(id,nr)+'_file',
				onchange:'selectedFile(\''+upload_container_id(id,nr)+'\',this);return false;',
			    'data-icon':'grid',
			    'style':'display:none;',
			},
		//	prefix:'<label for="file-upload" class="custom-file-upload"><i class="fa fa-cloud-upload"></i> Custom Upload</label>'
	};
	
	
	form.elements[upload_container_id(id,nr)]={
			type:'textfield',
			attributes:{
				id:upload_container_id(id,nr)+'',
			},
		//	prefix:'<label for="file-upload" class="custom-file-upload"><i class="fa fa-cloud-upload"></i> Custom Upload</label>'
	};

	
	
	return form;
}

function _createFormElements(form,name,nr){
	form.elements[id+'_image']={
			markup:'<img id="'+upload_container_id(id,nr)+'_image"></img>',
			prefix:'<video width="320" height="240" id="'+upload_container_id(id,nr)+'_video" style="background-color:green;" autoplay playsinline><img id="data" src"test.jgp"/></a>video</video>'
	};
	
	
	form.elements[id+'_camera']={
			type:'button',
			text:'Camera',
			attributes:{
				id:upload_container_id(id,nr)+'_camera',
				onclick:'getPicture(\''+upload_container_id(id,nr)+'\',\''+nr+'\');return false;',		
				'data-icon':'camera',
			}
	};
	

	
	form.elements[id+'_browse']={
			type:'button',
			text:'Browse',
			attributes:{
				id:upload_container_id(id,nr)+'_browse',
				onclick:'$(\'#'+upload_container_id(id,nr)+'_file\').click();return false;',		
				'data-icon':'grid',
			}
	};
	

	form.elements[id+'_upload']={
			type:'button',
			text:'Upload',
			attributes:{
				id:upload_container_id(id,nr)+'_upload',
				onclick:'uploadFile(\''+upload_container_id(id,nr)+'\');return false;',
				style:'display:none;',
				'data-icon':'action',
			}
	};
	
	form.elements[id+'_delete']={
			type:'button',
			text:'Delete',
			attributes:{
				id:upload_container_id(id,nr)+'_delete',
				onclick:'deleteFile(\''+upload_container_id(id,nr)+'\');return false;',
				style:'display:none;',
				'data-icon':'delete',
			}
	};
	
	form.elements[id+'_select']={
			type:'file',
			attributes:{
				id:upload_container_id(id,nr)+'_file',
				onchange:'selectedFile(\''+upload_container_id(id,nr)+'\',this);return false;',
			    'data-icon':'grid',
			    'style':'display:none;',
			},
		//	prefix:'<label for="file-upload" class="custom-file-upload"><i class="fa fa-cloud-upload"></i> Custom Upload</label>'
	};
	
	
	form.elements[upload_container_id(id,nr)]={
			type:'textfield',
			attributes:{
				id:upload_container_id(id,nr)+'',
			},
		//	prefix:'<label for="file-upload" class="custom-file-upload"><i class="fa fa-cloud-upload"></i> Custom Upload</label>'
	};
}

function selectedFile(id,input){
	if(input.files && input.files[0]) {
		var reader = new FileReader();        
        reader.onload = function (e) {
            $('#'+id+'_image').attr('src', e.target.result);
            $('#'+id+'_camera').hide();
            $('#'+id+'_browse').hide();
            $('#'+id+'_upload').show();
            $('#'+id+'_delete').show();
            
            //$('#'+$(input).attr('id')).hide();
        };        
        reader.readAsDataURL(input.files[0]);
    }
}

function uploadFile(id){
	var dataURI = $('#'+id+'_image').prop('src');
	dataURI=dataURI.substring(22,dataURI.length);
	var filename = $('#'+id+'_file').val().replace(/.*(\/|\\)/, '');

	  out={
				//  "filesize":dataURI.length,
				 "filename": filename,
				 //"filemime":"image/jpeg",
				  "filepath":'public://field/image/'+filename,
				  "status": 0,
			//	  "uid":Drupal.user.uid,
				  "file":dataURI };

Drupal.services.call({
    method: 'POST',
    path: 'file.json',
   // contentType:'application/x-www-form-urlencoded',
    data:JSON.stringify(out),
    success: function(result) {
      var fid = result['fid'];
      $('#'+id).val(fid).trigger('create');
///alert(target);      
      var msg = 'File uploaded ' + fid + ' !';
      drupalgap_alert(msg);
      $('#'+id+'_upload').hide();
    },error: function(result) {
        drupalgap_alert("Error uploading");
      }
});


}

function deleteFile(id){
	  alert($('#'+id).val());
	  $('#'+id+'_image').removeAttr('src');	
	  $('#'+id+'_browse').show();
	  $('#'+id+'_camera').show();
	  $('#'+id+'_upload').hide();
	  $('#'+id+'_delete').hide();
}
