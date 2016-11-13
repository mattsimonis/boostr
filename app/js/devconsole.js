var BfsDevConsole = BfsDevConsole || {};

var SEARCH_PLACEHOLDER = 'Search classes';
var masked = false;

BfsDevConsole.init = function() {
  BfsDevConsole.checkLoaded();
}

BfsDevConsole.checkLoaded = function() {
  if (!masked && $('body').hasClass('x-body-masked')) {
    masked = true;
  }

  if (masked && !$('body').hasClass('x-body-masked')) {
    var activeTab = $('#bottomPanel > .x-tab-bar .x-tab-active span.x-tab-inner').text();

    if (activeTab === 'Tests') {
      BfsDevConsole.checkTestTabLoaded();
    } else {
      var $testsTab = $('#bottomPanel > .x-tab-bar .x-tab span.x-tab-inner:contains("Tests")');
      
      $testsTab.bind('click', function(e) {
        $(this).unbind(e);
        BfsDevConsole.checkTestTabLoaded();
      });
    }
  } else {
    setTimeout(BfsDevConsole.checkLoaded, 400);
  }
}

BfsDevConsole.checkTestTabLoaded = function() {
  if ($('#aggregateCoverageGrid_header').size() > 0) {
    BfsDevConsole.addTestSearchBar();
  } else {
    setTimeout(BfsDevConsole.checkLoaded, 400);
  }
}

BfsDevConsole.addTestSearchBar = function() {
  var $testSearchBar = $('<input/>')
      .attr('id', 'bfs-testsearch')
      .attr('class', 'x-form-field x-form-text')
      .attr('placeholder', SEARCH_PLACEHOLDER)
      .attr('style', 'position: relative;top: 25px;left: 0;width: 350px;');

  var $nextSibling = $('#aggregateCoverageGrid_header').next();
  $nextSibling.css('margin-top', 22);
  $nextSibling.after($testSearchBar);

  $testSearchBar.keydown(function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  });

  $testSearchBar.keyup(function(e) {
    BfsDevConsole.filterClasses();
  });
}

BfsDevConsole.filterClasses = function() {
  var textFilter = $('#bfs-testsearch').val();

  $('#aggregateCoverageGrid-body table.x-grid-table tr.x-grid-row').hide();

  $('#aggregateCoverageGrid-body table.x-grid-table tr.x-grid-row').filter(function(idx) {
    if ($(this).find('td.x-grid-cell-first').text() === 'Overall') {
      return true;
    } else if (textFilter.length > 0 && $(this).find('td.x-grid-cell-first:containsi("' + textFilter + '")').size() === 0) {
      return false;
    }
    return true;
  }).show();
}

chrome.storage.sync.get({
  'devconsole': true
}, function(item) {
  if (item.devconsole === true) {
    BfsDevConsole.init();
  }
});