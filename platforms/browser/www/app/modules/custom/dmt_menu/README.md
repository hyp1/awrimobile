
D7Mobile Menu
====
Dynamicly set a Menu in Drupalgap
Enable D7Mobile on you Drupal Site
admin/structure/menu
and add links to content to the Menu
The links are mapped to drupalgap system forms
and views

enable dmt:menu in drupalgap service resources

## settings.js


//Menu Icon setzen

Drupal.modules.custom['dmt_menu'] = {};
drupalgap.settings.dmt_menu = {		 
		attributes: {
         "style":"position:relative",          
         "data-icon": 'star',
           "data-iconpos": 'notext',
           "data-mini": 'true',
           "class": 'ui-btn-left',  //ui-btn-right         	                
          }
          };

//Block zur startpage hinzufügen

dmt_menu: {
  pages: {
        value: ['dashboard'],
        mode: 'include'
     }
 },
 
//CSS Layout in 
## d7mobilemenu.css

