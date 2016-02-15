var BfsApiName = BfsApiName || {};

BfsApiName.init = function() {
  console.log('BfsApiName.init');

  if ($('input#MasterLabel').size() === 0 ||
      ($('input#DeveloperName').size() === 0 &&
        $('input#Name').size() === 0)) {
    return;
  }
  
  $('input#MasterLabel').blur(function() {
    var label = $(this).val();
    if ($('input#DeveloperName').size() === 1) {
      $('input#DeveloperName').val(label.replace(/ /g, ''));
    } else if ($('input#Name').size() === 1) {
      $('input#Name').val(label.replace(/ /g, ''));
    }
  });
};

chrome.storage.sync.get({
  'apiname': false
}, function(item) {
  if (item.apiname === true) {
    BfsApiName.init();
  }
});