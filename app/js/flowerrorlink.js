var BfsFlowErrorLink = BfsFlowErrorLink || {};
var genericFlowErrorMsgFragment = "A flow trigger failed to execute the flow with version ID";

BfsFlowErrorLink.appendOffenderLink = function (errorContainerElement) {
  var versionIdRegEx = /(301\w{12})/g;
  var elementJQ = $(errorContainerElement);
  var elementText = elementJQ.text();
  var matches = versionIdRegEx.exec(elementText);
  var versionId = matches[0];

  var offenderLink = '<a href="/designer/designer.apexp#Id=' + versionId + '">View Offending Process Builder or Flow</a>';
  elementJQ.append(offenderLink);
}

BfsFlowErrorLink.findAndAppendOffenderLinkInClassic = function () {
  var genericFlowErrorTD = $('td:contains(' + genericFlowErrorMsgFragment + ')').filter(':last');
  genericFlowErrorTD.each(function (index, element) {
    BfsFlowErrorLink.appendOffenderLink(element);
  });
}

BfsFlowErrorLink.hasFlowError = function (mutations) {
  // Since this code executes on each DOM addition or removal to the document,
  // this low-level code was added to be as performant as possible.
  for (var mutationIndex = 0; mutationIndex < mutations.length; ++mutationIndex) {
    var mutation = mutations[mutationIndex];
    if (mutation.addedNodes) {
      for (var addedNodeIndex = 0; addedNodeIndex < mutation.addedNodes.length; ++addedNodeIndex) {
        var addedNode = mutation.addedNodes[addedNodeIndex];

        if (addedNode.innerText &&
            addedNode.innerText.indexOf(genericFlowErrorMsgFragment) != -1) {
          BfsFlowErrorLink.appendOffenderLink(addedNode);
          return;
        }
      }
    }
  }
}

BfsFlowErrorLink.init = function () {
  BfsFlowErrorLink.findAndAppendOffenderLinkInClassic();

  // Only add the mutation observer if we're in Lightning Experience to avoid
  // unnecessary overhead since the generic flow error in Classic is detectable
  // on page load whereas we have to detect DOM changes in Lightning to detect the
  // error.
  var someLightningElement = document.getElementById('auraAppcacheProgress');

  if (someLightningElement) {
      var container = document;
      var observer = new MutationObserver(BfsFlowErrorLink.hasFlowError);

      observer.observe(container, {
          childList: true,
          attributes: false,
          characterData: false,
          subtree: true,
          attributeOldValue: false,
          characterDataOldValue: false
      });
  }
}

BfsFlowErrorLink.init();