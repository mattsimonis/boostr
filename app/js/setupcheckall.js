var BfsSetupCheckAll = BfsSetupCheckAll || {};

BfsSetupCheckAll.init = function() {
  $(function() {
    var checkboxTables = [];

    $('div.pbBody table.list, div.pbBody table.detailList').each(function(i, table) {
      var $table = $(table);
      var hasCheckboxColumn = BfsSetupCheckAll.tableHasCheckboxColumn($table);

      if (hasCheckboxColumn === true) {
        checkboxTables.push($table);
      }
    });

    if (checkboxTables.length > 0) {
      BfsSetupCheckAll.addCheckboxToHeaderRow(checkboxTables);
    }

    $('input.bfs-checkall').on('change', function() {
      var $table = $(this).closest('table');
      var index = $(this).closest('th').index() + 1;
      var checkAll = this.checked;

      $('tr td:nth-child(' + index + ') input:checkbox:not(:disabled)', $table)
        .each(function(i, checkbox) {
          if (checkAll === true && $(checkbox).is(':not(:checked)')) {
            $(checkbox).click();
          } else if (checkAll === false && $(checkbox).is(':checked')) {
            $(checkbox).click();
          }
        });
    });

    $('table.bfs-checkall-table td input:checkbox').on('change', function() {
      var $table = $(this).closest('table.bfs-checkall-table');
      $('tr:eq(0) th input.bfs-checkall', $table).each(function(i, checkbox) {
        var $checkbox = $(checkbox);
        var index = $checkbox.parent().index() + 1;

        BfsSetupCheckAll.setCheckboxState($table, $checkbox, index);
      });
    });
  });
};

BfsSetupCheckAll.tableHasCheckboxColumn = function($table) {
  var hasCheckbox = false;

  if ($('> thead > tr.headerRow', $table).size() === 0 && 
      $('> tbody > tr.headerRow', $table).size() === 0) {
    return hasCheckbox;
  }

  if ($('th input:checkbox', $table).size() > 0) {
    return hasCheckbox;
  }

  if ($('td input:checkbox:not(:disabled)', $table).size() > 0) {
    hasCheckbox = true;
  }

  return hasCheckbox;
};

BfsSetupCheckAll.addCheckboxToHeaderRow = function(tables) {
  $(tables).each(function(i, $table) {
    $table.addClass('bfs-checkall-table');

    var $headerRow = $('> thead tr.headerRow', $table);

    if ($headerRow.size() === 0) {
      $headerRow = $('> tbody tr.headerRow', $table);
    }

    var $firstRow = $('> tbody tr:not(.headerRow):eq(0)', $table);
    var $checkallBox = $('<input/>').attr('type', 'checkbox')
      .addClass('bfs-checkall')
      .css('float', 'left')
      .css('margin-right', '5px');

    $('td', $firstRow).each(function(i, cell) {
      if ($(cell).find('input:checkbox').size() > 0) {
        var $checkbox = $checkallBox.clone();
        var index = i + 1;

        BfsSetupCheckAll.setCheckboxState($table, $checkbox, index);

        $('th:eq(' + i + ')', $headerRow)
          .css('padding-right', '25px')
          .prepend($checkbox);
      }
    });
  });
};

BfsSetupCheckAll.setCheckboxState = function($table, $checkbox, index) {
  var total = $('td:nth-child(' + index + ')', $table)
    .find('input:checkbox:not(:disabled)').size();
  var numChecked = $('td:nth-child(' + index + ')', $table)
    .find('input:checkbox:checked:not(:disabled)').size();

  $checkbox.prop('checked', false);
  $checkbox.prop('indeterminate', false);

  if (numChecked === total) {
    $checkbox.prop('checked', true);
  } else if (numChecked > 0) {
    $checkbox.prop('indeterminate', true);
  }
};

chrome.storage.sync.get({
  'setupcheckall': true
}, function(item) {
  if (item.setupcheckall === true) {
    if ($('div.quickfindContainer input#setupSearch').size() > 0) {
      BfsSetupCheckAll.init();
    }
  }
});