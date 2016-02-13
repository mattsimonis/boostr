var BfsFieldset = BfsFieldset || {};

BfsFieldset.init = function() {
  BfsFieldset.appendApiName();

  $('.fieldset-singlesection-ct').bind('DOMSubtreeModified', function() {
    BfsFieldset.appendApiName();
  });
};

BfsFieldset.appendApiName = function() {
  $('.fieldset-singlesection-ct').find('div[id^="fieldsetItem_"]').each(function(i, el) {
    if ($(el).find('span.nu-sf-api-name').size() > 0) {
      return true;
    }

    var fieldApiName = $(el).attr('id').replace('fieldsetItem_', '');
    var fieldNameEl = $(el).find('div.field-name');

    $(fieldNameEl).append('<span class="nu-sf-api-name"> (' + fieldApiName + ')</span>');
  });
};

chrome.storage.sync.get({
  'fieldset': true
}, function(item) {
  if (item.fieldset === true) {
    BfsFieldset.init();
  }
});