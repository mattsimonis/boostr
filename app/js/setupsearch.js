var BfsSetupSearch = BfsSetupSearch || {};

BfsSetupSearch.init = function() {
  $(function() {
    if ($('div.quickfindContainer input#setupSearch').size() > 0) {
      $('div.quickfindContainer input#setupSearch').val(' ');
    } else {
      BfsSetupSearch.lightningInit();
    }
  });
}

BfsSetupSearch.lightningInit = function() {
  var targetNode = document.documentElement;
  var config = { childList: true, subtree: true };

  var observer = new MutationObserver(function(mutationsList, observer) {
    for (var mutation of mutationsList) {
      mutation.addedNodes.forEach(function(node) {
        if (node.matches && node.matches('.tree-filter')) {
          let input = document.querySelector('input.filter-box');
          BfsSetupSearch.handleLightningInput(input);

          observer.disconnect();
        }
      });
    }
  });

  observer.observe(targetNode, config);
}

BfsSetupSearch.handleLightningInput = function(input) {
  input.addEventListener('blur', event => {
    if (event.relatedTarget && event.relatedTarget.matches('body.desktop')) {
      setTimeout(() => {
        input.focus();
      });
    }
  });
}

chrome.storage.sync.get({
  'setupsearch': true
}, function(item) {
  if (item.setupsearch === true) {
    BfsSetupSearch.init();
  }
});