var currentVersion = chrome.app.getDetails().version;
var oldVersion = localStorage['oldVersion'];
localStorage.setItem('oldVersion', currentVersion);

if (oldVersion != currentVersion) {
  if (oldVersion == undefined) { // first run
    chrome.tabs.create({ 'url': chrome.extension.getURL('options.html') });
  }
}