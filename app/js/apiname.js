var BfsApiName = BfsApiName || {};

var DeveloperNameInputElement = DeveloperNameInputElement || {};
DeveloperNameInputElement.setName = function(d, c, g) {
  d = d.value;
  var a = "",
    e = !1,
    f = !1;
  if (null !== c && 0 == c.value.length && 0 < d.length) {
    for (i = 0; i < d.length; i++) {
      var b = d.charAt(i);
      "a" <= b && "z" >= b || "A" <= b && "Z" >= b || "0" <= b && "9" >= b ? (!e && ("0" <= b && "9" >= b) && (a += "X"), a += b, e = !0, f = !1) : e && !f && (a += "_", f = !0)
    }
    e ? (c.maxLength && 0 < c.maxLength && (a = a.substr(0, c.maxLength)), c.value = f ? a.substring(0, a.length - 1) : a) : c.value = g
  }
  return !0
};

BfsApiName.init = function() {
  if ($('input#MasterLabel').size() === 0 ||
      ($('input#DeveloperName').size() === 0 &&
        $('input#Name').size() === 0) ||
      ($('input#DeveloperName').size() > 0 &&
        $('input#DeveloperName').is(':disabled')) ||
      ($('input#Name').size() > 0 &&
        $('input#Name').is(':disabled'))) {
    return;
  }

  $('input#MasterLabel').blur(function() {
    if ($('input#DeveloperName').size() === 1) {
      DeveloperNameInputElement.setName(this, document.getElementById('DeveloperName'), 'Field1');
      var val = $('input#DeveloperName').val();
      $('input#DeveloperName').val(val.replace(/_/g, ''));
    } else if ($('input#Name').size() === 1) {
      DeveloperNameInputElement.setName(this, document.getElementById('Name'), 'Field1');
      var val = $('input#Name').val();
      $('input#Name').val(val.replace(/ /g, ''));
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
