/* global moment */

var RiseVision = RiseVision || {};
RiseVision.ThemeEvents = RiseVision.ThemeEvents || {};

RiseVision.ThemeEvents.Today = function() {
  "use strict";

  var _$today;

  var _current, intervalId;

  var _intervalDuration = 30000; // 30 seconds

  function _configureTime() {
    _$today.find(".date--time").text(moment().format("h:mma"));
  }

  function _configureDate() {
    var suffix = _current.format("Do"),
      month = _current.format("MMM").toUpperCase();

    // strip out the numbers to only get the suffix
    suffix = suffix.replace(/[0-9]/g, ''); // jshint ignore:line

    _$today.find(".date--weekday").text(_current.format("dddd"));
    _$today.find(".date--subsection .date--month").html(month + " " + _current.format("D") +
      '<span class="date--suffix">' + suffix.toLowerCase() + '</span>'); // jshint ignore:line
    _$today.find(".date--subsection .date--year").text(_current.format("YYYY"));

  }

  function _update() {
    // update the time
    _configureTime();

    if (!moment(_current.format("YYYY-MM-DD")).isSame(moment().format("YYYY-MM-DD"))) {
      // the day has changed, store new today value
      _current = moment();

      // update the date
      _configureDate();
    }
  }

  /*
   *  Public Methods
   */

  function init() {
    _$today = $(".area--date");
    _current = moment();

    _configureTime();
    _configureDate();

    if (!intervalId) {
      intervalId = setInterval(function () {
        _update();
      }, _intervalDuration);
    }
  }

  return {
    init: init
  };
};
