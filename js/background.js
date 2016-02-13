chrome.runtime.onInstalled.addListener(function(object) {
    chrome.tabs.create({ 'url': 'chrome-extension://' + chrome.runtime.id + '/options.html' });
});