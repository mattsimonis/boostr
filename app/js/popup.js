var init = function() {
  // Set the conversion listener on the button
  let convertButton = document.getElementById('convertButton');
  convertButton.addEventListener('click', doConversion);

  // Grab the Id from the url if we can
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    if (!tabs || tabs.length == 0 || !tabs[0].url) return;

    var url = tabs[0].url;
    if (url) {
      url = url.replace('https://', '');
      var urlParts = url.split('/');
      if (urlParts.length > 1) {
        for (var i = 0, l = urlParts.length; i < l; i++) {
          if (urlParts[i].length == 15 || urlParts[i].length == 18) {
            document.getElementById('idContainer').value = urlParts[i];
            break;
          }
        }
      }
    }
  });
};

var doConversion = function() {
  let idContainer = document.getElementById('idContainer');
  var id = idContainer.value;
  if (id == null) return;

  id = id.replace(/\"/g, '');
  if (id.length != 15) return;

  var suffix = '';
  for (var i = 0; i < 3; i++) {
    var flags = 0;
    for (var j = 0; j < 5; j++) {
      var c = id.charAt(i * 5 + j);
      if (c >= 'A' && c <= 'Z') {
        flags += 1 << j;
      }
    }
    if (flags <= 25) {
      suffix += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(flags);
    } else {
      suffix += "012345".charAt(flags-26);
    }
  }

  idContainer.value = id + suffix;
};

document.addEventListener('DOMContentLoaded', init);