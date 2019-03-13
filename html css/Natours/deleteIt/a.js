var q = require("q");
var FirefoxProfile = require("firefox-profile");

var makeFirefoxProfile = function(preferenceMap, specs) {
    var deferred = q.defer();
    var firefoxProfile = new FirefoxProfile();

    for (var key in preferenceMap) {
        firefoxProfile.setPreference(key, preferenceMap[key]);
    }

    firefoxProfile.encoded(function (encodedProfile) {
        var capabilities = {
            browserName: "firefox",
            firefox_profile: encodedProfile,
            specs: specs
        };

        deferred.resolve(capabilities);
    });
    return deferred.promise;
};

exports.config = {
    getMultiCapabilities: function() {
        return q.all([
            makeFirefoxProfile(
                {
                    "browser.download.folderList": 2,
                    "browser.download.dir": "/path/to/save/downloads",
                    "browser.helperApps.neverAsk.saveToDisk": "application/zip"
                },
                ["specs/*.spec.js"]
            )
        ]);
    }
}