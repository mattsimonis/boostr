var BfsAdminLinks = BfsAdminLinks || {};

BfsAdminLinks.init = function() {
  var adminlinks = {};

  chrome.storage.sync.get({
    adminlinks: {}
  }, function(items) {
    adminlinks = items.adminlinks;
    BfsAdminLinks.displayLinks(adminlinks);
  });

  $('div#setupNavTree div.setupLeaf a, div#setupNavTree div.setupHighlightLeaf a').on('click', function(e) {
    var $link = $(this);
    var linkId = $link.attr('id');
    var path = BfsAdminLinks.getPath($(this));

    if (adminlinks[linkId] == null) {
      adminlinks[linkId] = {
        'clicks': 0
      };
    }

    adminlinks[linkId].clicks += 1;
    adminlinks[linkId].path = path;
    adminlinks[linkId].url = $link.attr('href');

    chrome.storage.sync.set({
      adminlinks: adminlinks
    });
  });
}

BfsAdminLinks.getPath = function($link) {
  var path = $link.text();
  var $parentLink = $link.closest('.childContainer').closest('.parent').find('> a.setupFolder');
  if ($parentLink.size() > 0) {
    path = BfsAdminLinks.getPath($parentLink) + ' > ' + path;
  }
  return path;
}

BfsAdminLinks.displayLinks = function(adminlinks) {
  var arr = [];
  for (var prop in adminlinks) {
    if (adminlinks.hasOwnProperty(prop)) {
      var obj = adminlinks[prop];
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
    var adminlink = arr[i];
    var $linkWrapper = $('<div/>').addClass('setupLeaf').css('white-space', 'normal');
    var $deleteLink = $('<a/>').attr('href', '#').addClass('bfsclose').text('X');
    var $link = $('<a/>').attr('href', adminlink.url).text(adminlink.path + ' (' + adminlink.clicks + ')');
    $linkWrapper.append($deleteLink);
    $linkWrapper.append($link);
    $wrapper.append($linkWrapper);
  }
  $('div#setupNavTree div.setupNavtree:eq(0)').before($wrapper.html());
}

chrome.storage.sync.get({
  'adminquicklinks': true
}, function(item) {
  if (item.adminquicklinks === true) {
    if ($('div#setupNavTree').size() > 0) {
      BfsAdminLinks.init();
    }
  }
});