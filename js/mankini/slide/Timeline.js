(function() {
  function Item(className, start, duration, label) {
    this.$container = $('<div class="timeline-item"></div>').addClass( className || '' );

    if (label) {
      $('<div class="timeline-label"></div>').text(label).appendTo(this.$container);
    }

    this.start = start;
    this.duration = duration;
    this.dirty = true;
    this.drawn = false;
  }

  var ItemProto = Item.prototype;


  function Row(className) {
    this.$container = $('<div class="timeline-row"></div>').addClass( className || '' );
    this.items = [];
  }

  var RowProto = Row.prototype;

  RowProto.addItem = function(className, start, duration, label) {
    var item = new Item(className, start, duration, label);
    this.items.push(item);
    this.$container.append(item.$container);
    return item;
  };


  function Timeline(className) {
    this.$container = $('<div class="mankini-timeline"><div class="inner"></div></div>').addClass( className || '' );
    this._rows = [];
    this.start = 0;
    this.duration = 0;
    this._$inner = this.$container.find('.inner');
    this._drawn = false;
  }

  var TimelineProto = Timeline.prototype;

  TimelineProto.scale = function(start, duration) {
    var timeline = this;
    var end = 0;
    var oldStart = this.start;
    var oldDuration = this.duration;
    timeline.start = Infinity;

    if (duration) {
      timeline.start = start;
      timeline.duration = duration;
    }
    else {
      timeline._rows.forEach(function(row) {
        row.items.forEach(function(item) {
          timeline.start = Math.min(timeline.start, item.start);
          end = Math.max(end, item.start + item.duration);
        });
      });
      timeline.duration = end - timeline.start;
    }


    if (timeline.start != oldStart || timeline.duration != oldDuration) {
      timeline._rows.forEach(function(row) {
        row.items.forEach(function(item) {
          item.dirty = true;
        });
      });
    }
  };

  TimelineProto.addRow = function(className) {
    var row = new Row(className);
    this._$inner.append(row.$container);
    this._rows.push(row);
    return row;
  };

  TimelineProto.update = function(animate) {
    var timeline = this;
    var fullHeight = timeline._$inner.fullHeight();

    timeline._rows.forEach(function(row) {
      row.items.forEach(function(item) {
        if (!item.dirty) {
          return;
        }
        var left = (item.start - timeline.start) / timeline.duration;
        var width = item.duration / timeline.duration;
        var opacity = width ? 1 : 0;

        if (!item.drawn) {
          item.$container.css('left', left*100 + "%");
        }

        mankini.utils.transition(animate, item.$container, {
          left: left*100 + "%",
          width: width*100 + "%",
          opacity: opacity
        }, {
          duration: 600,
          easing: item.drawn ? 'easeInOutQuad' : 'easeOutQuad'
        });

        item.dirty = false;
        item.drawn = true;
      });
    });

    if (!this.drawn) {
      this.drawn = true;

      mankini.utils.transition(animate, timeline.$container, {
        opacity: 1
      }, {
        duration: 300,
        easing: 'easeInOutQuad'
      });
    }

    if (fullHeight != timeline._$inner.height()) {
      mankini.utils.transition(animate, timeline._$inner, {
        height: fullHeight + 'px'
      }, {
        duration: 300,
        easing: 'easeInOutQuad'
      });
    }
  };

  mankini.slide.Timeline = Timeline;
})();