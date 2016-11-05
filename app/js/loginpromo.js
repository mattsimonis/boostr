var BfsLoginPromo = BfsLoginPromo || {};

var quotes = [
  {
    'quote': 'Your life does not get better by chance. It gets better by change.',
    'author': 'Jim Rohn',
    'image': 'https://theysaidso.com/img/bgs/man_on_the_mountain.jpg'
  },
  {
    'quote': 'A leader is a dealer in hope.',
    'author': 'Napoleon Bonaparte',
    'image': 'https://theysaidso.com/img/bgs/hang_on_building_top.jpg'
  },
  {
    'quote': 'Business underlies everything in our national life, including our spiritual life. Witness the fact that in the Lord\'s Prayer, the first petition is for daily bread. No one can worship God or love his neighbor on an empty stomach.',
    'author': 'Woodrow Wilson',
    'image': 'https://theysaidso.com/img/bgs/yoga_on_cliff.jpg'
  }
];

BfsLoginPromo.init = function() {
  $(function() {
    var quoteItem = quotes[Math.floor(Math.random() * quotes.length)];

    $('#layout .cell-content').hide();
    var wrapper = $('<div/>').attr('class', 'login-promo customer-only random-promo-pick stretchMe')
      .attr('style', 'display: block; position: relative; background: #000;opacity: 0.6;');
    var content = $('<div/>').attr('class', 'top-40 right-40 bottom-60 left-40');

    var quote = $('<p/>').attr('class', 'font-32 center font-family-salesforce-light')
      .attr('style', 'color:rgb(238, 238, 238)')
      .html('&ldquo;' + quoteItem.quote + '&rdquo;');
    var author = $('<p/>').attr('class', 'font-22 center font-family-salesforce-light')
      .attr('style', 'color:rgb(238, 238, 238)')
      .html(quoteItem.author);

    content.append(quote);
    content.append(author);
    wrapper.append(content);

    $('#layout .cell-content').after(wrapper);

    wrapper.anystretch(quoteItem.image)
  });
}

chrome.storage.sync.get({
  'loginpromo': true
}, function(item) {
  if (item.loginpromo === true) {
    if ($('#layout .cell-content').size() > 0) {
      BfsLoginPromo.init();
    }
  }
});