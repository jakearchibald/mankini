(function() {
  function Columns(num, className, hdOnly) {
    this.$container = $('<div class="mankini-cols"></div>')
      .addClass('cols-' + num)
      .addClass(className);

    this.$cols = $();

    if (hdOnly) {
      this.$container.addClass('hd-cols');
    }
    else {
      this.$container.addClass('all-cols');
    }

    for (var i = 0; i < num; i++) {
      this.$cols = this.$cols.add('<div class="col col-' + (i+1) + '"></div>');
    }

    this.$container.append(this.$cols);
  }

  var ColumnsProto = Columns.prototype;

  mankini.slide.Columns = Columns;
})();