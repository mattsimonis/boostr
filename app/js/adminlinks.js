var BfsSetupLinks = BfsSetupLinks || {};

BfsSetupLinks.init = function() {
  var setuplinkshistory = {};

  chrome.storage.sync.get({
    setuplinkshistory: {}
  }, function(items) {
    setuplinkshistory = items.setuplinkshistory;
    BfsSetupLinks.displayLinks(setuplinkshistory);
  });

  $('div#setupNavTree div.setupLeaf a, div#setupNavTree div.setupHighlightLeaf a').on('click', function(e) {
    var $link = $(this);
    var linkId = $link.attr('id');
    var path = BfsSetupLinks.getPath($(this));

    if (setuplinkshistory[linkId] == null) {
      setuplinkshistory[linkId] = {
        'clicks': 0
      };
    }

    setuplinkshistory[linkId].clicks += 1;
    setuplinkshistory[linkId].path = path;
    setuplinkshistory[linkId].url = $link.attr('href');

    chrome.storage.sync.set({
      setuplinkshistory: setuplinkshistory
    });
  });
}

BfsSetupLinks.getPath = function($link) {
  var path = $link.text();
  var $parentLink = $link.closest('.childContainer').closest('.parent').find('> a.setupFolder');
  if ($parentLink.size() > 0) {
    path = BfsSetupLinks.getPath($parentLink) + ' > ' + path;
  }
  return path;
}

BfsSetupLinks.displayLinks = function(setuplinkshistory) {
  var arr = [];
  for (var prop in setuplinkshistory) {
    if (setuplinkshistory.hasOwnProperty(prop)) {
      var obj = setuplinkshistory[prop];
      obj.linkid = prop;
      arr.push(obj);
    }
  }
  arr.sort(function(a, b) {
    return (a.clicks < b.clicks) ? 1 : ((b.clicks > a.clicks) ? -1 : 0);
  });
  arr = arr.slice(0, 5);
  var $wrapper = $('<div/>');
  var $links = $('<div/>').addClass('setupNavtree');
  $links.append($('<h2/>').text('Most Clicked'));
  $wrapper.append($links);
  for (var i = 0; i < arr.length; i++) {
    var setuplink = arr[i];
    var $linkWrapper = $('<div/>').addClass('setupLeaf').css('white-space', 'normal');
    var $link = $('<a/>').attr('href', setuplink.url).text(setuplink.path + ' (' + setuplink.clicks + ')');
    $linkWrapper.append($link);
    $wrapper.append($linkWrapper);
  }
  $('div#setupNavTree div.setupNavtree:eq(0)').before($wrapper.html());
}

chrome.storage.sync.get({
  'setuplinks': true
}, function(item) {
  if (item.setuplinks === true) {
    if ($('div#setupNavTree').size() > 0) {
      BfsSetupLinks.init();
    }
  }
});