// const config = require('./a');
// config.config.getMultiCapabilities().then(function(d) {console.log(d)});

var FirefoxProfile = require('firefox-profile');

var firefoxProfile = new FirefoxProfile();
firefoxProfile.setPreference("browser.download.folderList", 2);
// firefoxProfile.setPreference("browser.download.dir", process.cwd() +'/e2e/downloads/');
firefoxProfile.setPreference("browser.helperApps.neverAsk.saveToDisk", "application/x-executable");

console.log(firefoxProfile);