var BfsSidebarToggle = BfsSidebarToggle || {};

BfsSidebarToggle.init = function() {
  $(function() {
    $(document).on('keyup', function(e) {
      if (e.keyCode === 219 && e.target.nodeName === 'BODY') {
        BfsSidebarToggle.toggle();
      }
    });
  });
}

BfsSidebarToggle.toggle = function() {
  if ($('#setupNavTree').size() > 0) {
    $('#setupNavTree').parent('td.oLeft').toggle();
    window.dispatchEvent(new Event('resize'));
  } else if ($('#sidebarCell').size() > 0) {
    $('#sidebarCell').toggle();
    window.dispatchEvent(new Event('resize'));
  }
}

chrome.storage.sync.get({
  'sidebartoggle': true
}, function(item) {
  if (item.sidebartoggle === true) {
    BfsSidebarToggle.init();
  }
});