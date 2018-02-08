/**
 * Implements hook_menu(),
 */
function uploadtest_menu() {
  var items = {};
  items['hello'] = {
    title: 'Hello',
    page_callback: 'uploadtest_page'
  };
  return items;
}

/**
 *
 */
function uploadtest_page() {
  try {
    var content = {};
    content['my_button'] = {
      theme: 'button',
      text: 'Hello World',
      attributes: {
        onclick: "drupalgap_alert(t('Hi!'))"
      }
    };
    
    

/*
    form=drupalgap_get_form('upload_form','field_1','targetz');
    console.log(form);
    content['upload'] ={
			  markup:drupalgap_render(form)
	  };
  */  
    content['upload1'] ={
			  markup:drupalgap_render(drupalgap_get_form('upload_form','field_image',4))
	  };

/*
    content['upload2'] ={
			  markup:drupalgap_render(drupalgap_get_form('upload_form','field_3','targetz'))
	  };

*/    
    /*
 * 
    content['uploadform'] = {
     markup: drupalgap_get_form('upload','field1','target1'),
    };
  */  
    return content;
  }
  catch (error) { console.log('uploadtest_page - ' + error); }
}

