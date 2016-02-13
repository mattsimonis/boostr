var BfsChangeSet = BfsChangeSet || {};

BfsChangeSet.init = function() {
  if ($('.fewerMore a:contains("more")').size() > 0) {
    var showAllLink = $('.fewerMore a:contains("more")').prop('href');
    showAllLink = showAllLink.replace(/rowsperpage=\d+/i, 'rowsperpage=50000');
    $('.fewerMore a:contains("more")').prop('href', showAllLink);
    $('<div style="text-align: right;"><a style="margin-left: 5px;" href="' + showAllLink + '">Show All</a></div>').insertBefore($('table.detailList').find('.bNext .withFilter .next'));
  }

  var select;

  if ($('.listRelatedObject table.list tr.headerRow th a:contains("Type")').size() > 0) {
    var types = [];
    $('.listRelatedObject table.list tr.dataRow td.dataCell').each(function(idx, el) {
      types.push($(el).text());
    });
    var selectTypes = $.unique(types).sort();
    select = $('<select/>').prop('id', 'sfceFilterType').addClass('sfce-input');
    select.append($('<option/>').text('- Type Filter -').val('').prop('selected', true));
    $(selectTypes).each(function(idx, val) {
      select.append($('<option/>').text(val).val(val));
    });
  }

  var wrapper = $('<div/>').addClass('sfce-search-wrapper');
  var row = $('<div/>').addClass('sfce-row');
  var searchBar = $('<div/>').addClass(select == null ? 'sfce-col-11' : 'sfce-col-8');
  searchBar.append('<input id="sfceSearchBar" class="sfce-input sfce-search-bar" type="text" placeholder="Search...">');
  row.append(searchBar);

  if (select != null) {
    var selectBox = $('<div/>').addClass('sfce-col-3');
    selectBox.append(select);
    row.append(selectBox);
  }

  var clearButton = $('<div/>').addClass('sfce-col-1');
  clearButton.append('<button id="sfceClear" class="sfce-btn sfce-btn-default sfce-btn-block">Clear</button>');
  row.append(clearButton);

  wrapper.append(row);
  wrapper.insertBefore($('table.detailList').find('.listRelatedObject'))

  $('#sfceSearchBar').keydown(function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  });

  $('#sfceSearchBar').keyup(function(e) {
    BfsChangeSet.filterTable();
  });

  $('#sfceFilterType').change(function(e) {
    BfsChangeSet.filterTable();
  });

  $('#sfceClear').click(function(e) {
    e.preventDefault();
    $('.listRelatedObject table.list tr.dataRow').show();
    $('#sfceSearchBar').val('');
    $('#sfceFilterType').val('');
  });

  var allBox = $('<input/>').prop('id', 'sfceAllBox').prop('type', 'checkbox');
  $('#allBox').replaceWith(allBox);

  $('#sfceAllBox').change(function(e) {
    var checked = $(this).prop('checked');
    $(this).closest('table').find('tr.dataRow:visible td.actionColumn input').prop('checked', checked);
  });
}

BfsChangeSet.filterTable = function() {
  var typeFilter = $('#sfceFilterType').val();
  var textFilter = $('#sfceSearchBar').val();

  $('.listRelatedObject table.list tr.dataRow').hide();

  $('.listRelatedObject table.list tr.dataRow').filter(function(idx) {
    if (typeFilter != null && typeFilter.length > 0 && $(this).find('td.dataCell:textEquals("' + typeFilter + '")').size() === 0) {
      return false;
    }
    if (textFilter.length > 0 && $(this).find('th.dataCell:containsi("' + textFilter + '")').size() === 0) {
      return false;
    }
    return true;
  }).show();
}

chrome.storage.sync.get({
  'changeset': true
}, function(item) {
  if (item.changeset === true) {
    BfsChangeSet.init();
  }
});