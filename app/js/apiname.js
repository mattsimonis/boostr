var BfsApiName = BfsApiName || {};

BfsApiName.init = function() {
  console.log('BfsApiName.init');

  if ($('input#MasterLabel').size() === 0) {
    return;
  }
  
  $('input#MasterLabel').blur(function() {
    var label = $(this).val();
    $('input#DeveloperName').val(label.replace(/ /g, ''));
  });
};

chrome.storage.sync.get({
  'apiname': false
}, function(item) {
  if (item.apiname === true) {
    BfsApiName.init();
  }
});