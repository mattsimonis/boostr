var BfsFieldHistoryCount = BfsFieldHistoryCount || {};

BfsFieldHistoryCount.init = function() {
  $('#ep td[id$="ButtonRow"]').each(function(i, el) {
    $(el).append('<span class="bfs-history-count">' + BfsFieldHistoryCount.getMessage() + '</span>');
  });
  $('#ep table.detailList td.dataCol [type="checkbox"]').change(this.updateCount);
  $('#ep table.detailList tr.last.detailRow a').click(function() {setTimeout(function(){BfsFieldHistoryCount.updateCount();}, 100);});
}

BfsFieldHistoryCount.getMessage = function() {
  return '(' + $('#ep table.detailList td.dataCol [type="checkbox"]:checked').length + ' of 20 selected)';
}

BfsFieldHistoryCount.updateCount = function() {
  var selectedMessage = BfsFieldHistoryCount.getMessage();
  $('td[id$="ButtonRow"] span.bfs-history-count').each(function(i, el) {
    $(el).text(selectedMessage);
  });
}

BfsFieldHistoryCount.init();