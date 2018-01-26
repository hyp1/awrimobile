Mobile Update Module
====================
It checks for the app version on the Drupal site and showes
a message to the user to download the update. 

When the mobile app starts it checks on the Drupal site für updates
and sets the following variables:
*app_update_url {url to download the app}
*app_version    {current version of the app}
*app_name       {name of the app}
 

Requirements:
------------

This Module requires the cordova-plugin-app-version plugin
installed on the device.
https://github.com/whiteoctober/cordova-plugin-app-version

The sandbox module module Mobile Updater must be installed and enabled on the Drupal site.
git://git.drupal.org/sandbox/Hyp1/mobile_update.git


Installation:
-------------

1.)
Install the cordova-plugin-app-version plugin on the device:
cordova plugin add cordova-plugin-app-version --save

2.)
In settings.js set the update_url from the Drupal7 Mobile Update Module site.
Drupal.settings.update_url = '';

3.)
Load the Module in settings.js

Drupal.modules.custom['mobile_update'] = {};

By default this module show the update message automaticly to the user,
if an update is available on the Drupal site.
If you dont want this to happen automaticly, put the following lines to the settings.js file:

drupalgap.settings.mobile_update = {
	auto:false
};

Usage:
-------------
You can check manually for updates by checking these variables:
app_update_url
app_version
app_name

