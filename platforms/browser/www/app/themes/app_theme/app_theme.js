function app_theme_info() {
drupalgap_add_css(drupalgap_get_path('theme','app_theme')+'/css/icons.css');
  // Init an empty theme object.
  var theme = {};

  // Set the theme's machine name.
  theme.name = 'app_theme';

  // Init the theme's regions.
  theme.regions = {};

  // Header region.
  theme.regions['header'] = {
    attributes: {
      'data-role': 'header',
      'data-position': 'fixed',
      'data-theme': drupalgap.theme.theme_header
    }
  };

  // Content Region
  theme.regions['content'] = {
    attributes: {
      'data-role': 'content',
      'data-theme': drupalgap.theme.theme_content
    }
  };

  // Footer region.
  theme.regions['footer'] = {
    attributes: {
      'data-role': 'footer',
      'data-position': 'fixed',
      'data-theme': drupalgap.theme.theme_footer
    }
  };
  
  // Return the assembled theme.
  return theme;

}


/**
 * Implements hook_TYPE_tpl_html().
 */
function app_theme_page_tpl_html() {
  return '<div {:drupalgap_page_attributes:}>' +
            '{:header:}' +
            '{:content:}' +
            '{:footer:}' +
          '</div>';
}

/**
 * Implements hook_TYPE_tpl_html().
 */
function app_theme_node_tpl_html() {
  return '<h2>{:title:}</h2>' +
          '<div>{:content:}</div>' +
          '<div>{:comments:}</div>' +
          '<div>{:comments_form:}</div>';
}

/**
 * Implements hook_TYPE_tpl_html().
 */
function app_theme_user_profile_tpl_html() {
  return '<h2>{:name:}</h2>' +
          '<div>{:created:}</div>' +
          '<div class="user-picture">{:picture:}</div>' +
          '<div>{:content:}</div>';
}
