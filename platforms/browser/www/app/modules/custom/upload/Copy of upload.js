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
		    page_arguments: ['upload_form',1,2]
		  };		  
  return items;
}



function upload_custom_form(form, form_state) {
	  try {

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
			
		  form.elements[9] ={
				  markup:drupalgap_render(upload_form(form,form_state,'field_1','target1'))
		  };
			
		  form.elements[10] ={
				  markup:drupalgap_render(upload_form(form,form_state,'field_2','target2'))
		  };
			
		  form.elements[11] ={
				  markup:drupalgap_render(upload_form(form,form_state,'field_3','target3'))
		  };

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

function upload_form(form,form_state,id,target){

	form.elements[id+'_image']={
			markup:'<img id="'+id+'_image"></img>',
	};
	
	form.elements[id+'_camera']={
			type:'button',
			text:'Camera',
			attributes:{
				id:id+'_camera',
				onclick:'getPicture(\''+id+'\',\''+target+'\');return false;',		
				'data-icon':'camera',
			}
	};
	
	form.elements[id+'_browse']={
			type:'button',
			text:'Browse',
			attributes:{
				id:id+'_browse',
				onclick:'$(\'#'+id+'\').click();return false;',		
				'data-icon':'grid',
			}
	};
	
	form.elements[id+'_select']={
			type:'file',
			attributes:{
				id:id,
				onchange:'selectedFile(this);return false;',
			    'data-icon':'grid',
			},
		//	prefix:'<label for="file-upload" class="custom-file-upload"><i class="fa fa-cloud-upload"></i> Custom Upload</label>'
	};
	
	form.elements[id+'_upload']={
			type:'button',
			text:'Upload',
			attributes:{
				id:id+'_upload',
				onclick:'uploadFile(\''+id+'\',\''+target+'\');return false;',
				style:'display:none;',
				'data-icon':'action',
			}
	};
	
	form.elements[id+'_delete']={
			type:'button',
			text:'Delete',
			attributes:{
				id:id+'_delete',
				style:'display:none;',
				'data-icon':'delete',
			}
	};
	return form;
}

function selectedFile(input){

	if(input.files && input.files[0]) {
        var reader = new FileReader();        
        reader.onload = function (e) {
            $('#'+$(input).attr('id')+'_image').attr('src', e.target.result);
            $('#'+$(input).attr('id')).hide();
            $('#'+$(input).attr('id')+'_upload').show();
            $('#'+$(input).attr('id')+'_delete').show();
            
            //$('#'+$(input).attr('id')).hide();
        };        
        reader.readAsDataURL(input.files[0]);
    }
}

function uploadFile(id,target){
	var dataURI = $('#'+id+'_image').prop('src');
	dataURI=dataURI.substring(22,dataURI.length);
	var filename = $('#'+id).val().replace(/.*(\/|\\)/, '');
	alert(filename);
	  out={
				//  "filesize":dataURI.length,
				 "filename": filename,
				 //"filemime":"image/jpeg",
				  "filepath":'public://field/image/'+filename,
				  "status": 0,
			//	  "uid":Drupal.user.uid,
				  "file":dataURI };
		console.log(JSON.stringify(dataURI));
	  
Drupal.services.call({
    method: 'POST',
    path: 'file.json',
   // contentType:'application/x-www-form-urlencoded',
    data:JSON.stringify(out),
    success: function(result) {
      var fid = result['fid'];
      $('#'+target).val(fid).trigger('create');
alert(target);      
      var msg = 'File uploaded ' + fid + ' !';
      drupalgap_alert(msg);
      $('#'+id+'_upload').hide();
    },error: function(result) {
        drupalgap_alert("Error uploading");
      }
});


}

