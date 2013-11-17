(function() {
  function Columns(num, className) {
    this.$container = $('<div class="mankini-cols"></div>')
      .addClass('cols-' + num)
      .addClass(className);

    this.$cols = $();
    
    for (var i = 0; i < num; i++) {
      this.$cols = this.$cols.add('<div class="col col-' + (i+1) + '"></div>');
    }

    this.$container.append(this.$cols);
  }

  var ColumnsProto = Columns.prototype;

  mankini.slide.Columns = Columns;
})();