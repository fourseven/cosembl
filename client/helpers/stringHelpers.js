Template.registerHelper('truncate', function(string, length) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(length);
});

Template.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});

Template.registerHelper('firstName', function(string) {
  return _.first(string.split(" "));
});
