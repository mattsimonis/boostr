var BfsFieldset = BfsFieldset || {};

BfsFieldset.init = function() {
  var s = document.createElement('script');
  s.src = chrome.extension.getURL('js/fieldsetinject.js');
  document.head.appendChild(s);

  window.addEventListener('BfsFieldSetDataEvent', function (e) {
    var data = e.detail;
    BfsFieldset.fieldSetData = data;

    BfsFieldset.appendApiName();

    $('.fieldset-singlesection-ct').bind('DOMSubtreeModified', function() {
      BfsFieldset.appendApiName();
    });
  });
};

BfsFieldset.fieldSetData = {};

BfsFieldset.getField = function(id) {
  var fields = BfsFieldset.fieldSetData;
  var field = null;
  for (var i = 0; i < fields.length; i++) {
    if (fields[i].id == id) {
      field = fields[i];
      break;
    }
  }
  return field;
}

BfsFieldset.appendApiName = function() {
  $('.fieldset-singlesection-ct').find('div[id^="fieldsetItem_"]').each(function(i, el) {
    if ($(el).find('span.bfs-api-name').size() > 0) {
      return true;
    }

    var fieldApiName = $(el).attr('id').replace('fieldsetItem_', '');

    var field = BfsFieldset.getField(fieldApiName);
    if (field != null) {
      var fieldId = field.id.substring(field.id.lastIndexOf('.') + 1);
      var fieldName = fieldId;
      var customField = /^\d.*/.test(fieldId);

      if (customField === true) {
        var prefix = field.namespace.length > 0 ? field.namespace + '__' : '';
        fieldName = prefix + field.name + '__c';
      }

      var fieldNameEl = $(el).find('div.field-name');
      $(fieldNameEl).append('<span class="bfs-api-name"> (' + fieldName + ')</span>');
    }
  });
};

chrome.storage.sync.get({
  'fieldset': true
}, function(item) {
  if (item.fieldset === true) {
    BfsFieldset.init();
  }
});