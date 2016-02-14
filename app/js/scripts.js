$.expr[':'].textEquals = $.expr.createPseudo(function(arg) {
  return function( elem ) {
    return $(elem).text().match("^" + arg + "$");
  };
});

$.expr[":"].containsi = $.expr.createPseudo(function(arg) {
  return function( elem ) {
    return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
  };
});