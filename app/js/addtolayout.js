var BfsAddToLayout = BfsAddToLayout || {};

BfsAddToLayout.init = function() {
  $(function() {
    $('div.listRelatedObject table.list tr.headerRow th.actionColumn input:checkbox').click();
  });
}

chrome.storage.sync.get({
  'layoutuncheckall': false
}, function(item) {
  if (item.layoutuncheckall === true) {
    if ($('div.pbWizardTitle h2:contains("Add to page layouts")').size() > 0) {
      BfsAddToLayout.init();
    }
  }
});