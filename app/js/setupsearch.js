var BfsSetupSearch = BfsSetupSearch || {};

BfsSetupSearch.init = function() {
  $(function() {
    $('div.quickfindContainer input#setupSearch').val(' ');
  });
}

chrome.storage.sync.get({
  'setupsearch': true
}, function(item) {
  if (item.setupsearch === true) {
    if ($('div.quickfindContainer input#setupSearch').size() > 0) {
      BfsSetupSearch.init();
    }
  }
});