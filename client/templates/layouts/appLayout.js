Template.appLayout.rendered = function() {
  this.find('#main')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    },
    removeElement: function(node) {
      $(node).remove();
    }
  }
}
