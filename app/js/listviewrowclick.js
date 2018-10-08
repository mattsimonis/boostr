var BfsListViewRowClick = BfsListViewRowClick || {};

BfsListViewRowClick.addClassicMutationObserver = function () {
  var container = document;
  var observer = new MutationObserver(BfsListViewRowClick.addRowOnClickCheckboxEventHandlerWhenListViewRowsAdded);

  observer.observe(container, {
    childList: true,
    attributes: false,
    characterData: false,
    subtree: true,
    attributeOldValue: false,
    characterDataOldValue: false
  });
}

BfsListViewRowClick.addRowOnClickCheckboxEventHandlerWhenListViewRowsAdded = function (mutations) {
  // Since this code executes on each DOM addition or removal to the document,
  // this low-level code was added to be as performant as possible.
  var mutationsLength = mutations.length;
  for (var mutationIndex = 0; mutationIndex < mutationsLength; ++mutationIndex) {
    var mutation = mutations[mutationIndex];
    if (mutation.addedNodes &&
        mutation.addedNodes.length > 0) {

      var addedNodesLength = mutation.addedNodes.length;

      for (var addedNodeIndex = 0; addedNodeIndex < addedNodesLength; ++addedNodeIndex) {
        var addedNode = mutation.addedNodes[addedNodeIndex];

        if (addedNode.className &&
            typeof addedNode.className === 'string' &&
            (addedNode.className.indexOf('x-grid3-row') != -1 ||
             addedNode.className.indexOf('dataRow') != -1 ||
             addedNode.className.indexOf('x-grid3-row-table') != -1)) {
          BfsListViewRowClick.addClassicRowOnClickCheckBoxEventHandler();
          return;
        }
      }
    }
  }
}


BfsListViewRowClick.addClassicRowOnClickCheckBoxEventHandler = function () {
  // Setup Listview Rows
  $('tr.dataRow').has('td:first-child input[type="checkbox"]')
    .on('click', BfsListViewRowClick.clickCheckboxFunction);

  // Object Listview Rows
  $('table.x-grid3-row-table tr').has('td:first-child input[type="checkbox"]')
    .on('click', BfsListViewRowClick.clickCheckboxFunction);
}

BfsListViewRowClick.clickCheckboxFunction = function (e) {
  if (!$(e.target).is('input:checkbox')) {
      $(this).find('input:checkbox:first').click();
  }
}

BfsListViewRowClick.initOnCheckboxRowClickHandlers = function () {
  var someLightningElement = document.getElementById('auraAppcacheProgress');

  if (!someLightningElement) {
    // Use mutation observer for listviews dynamically added via AJAX.
    // Supposedly, .on('click'...) should work with dynamically added content
    // but it's not working here so mutation observer used instead.
    BfsListViewRowClick.addClassicMutationObserver();

    // For setup list views that are added directly to the page and not
    // through AJAX.
    BfsListViewRowClick.addClassicRowOnClickCheckBoxEventHandler();
  }
}

BfsListViewRowClick.initOnCheckboxRowClickHandlers();