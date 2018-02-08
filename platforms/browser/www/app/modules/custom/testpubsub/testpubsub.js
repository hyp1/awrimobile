/**
 * Implements hook_menu(),
 */





//say, in some place, you subscibe a event

//var pubsub;
function testpubsub_install() {
//drupalgap_add_js(drupalgap_get_path('module','testpubsub')+'/pubsub.js')
}

function testpubsub_menu() {
  var items = {};
  items['testpubsub'] = {
    title: 'Hello',
    page_callback: 'testpubsub_page',
    pageshow: 'testpubsub_pageshow'
  };
  return items;
}

/**
 *
 */


function testpubsub_pageshow() {
	//use jquery as a pubsub manager

	pubsub = $('<div>');
	//say, in some place, you subscibe a event
	pubsub.on('start-clicked', {somedata: "good day"}, function(e){
		alert('subscriber one:' + e.data.somedata);
		console.log(e.data.somedata);
		console.log('subscriber one ', e, this, arguments);
		});

	//and, in other place, you subscibe the same event
	pubsub.on('start-clicked', {somedata: "hello world"}, function(e){
		alert('subscriber two:' + e.data.somedata);
		console.log(e.data.somedata);
		console.log('subscriber two ', e, this, arguments);
	});
	
}

function testpubsub_page() {
  try {
    var content = {};
    content['my_button'] = {
      theme: 'button',
      text: 'Hello World',
      attributes: {
        onclick: "buttonPressed()",
    //    	id: "mybutton"
      }
    };
 
    alert(drupalgap_get_page_id());
    
    return content;
  }
  catch (error) { console.log('testpubsub_page - ' + error); }
}

function buttonPressed(data){

	//Then you can publish the event/topic
	pubsub.trigger('start-clicked', [ "Custom", "Arguments" ]);

}

