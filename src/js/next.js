/* global moment */

var RiseVision = RiseVision || {};
RiseVision.ThemeEvents = RiseVision.ThemeEvents || {};

RiseVision.ThemeEvents.Next = function() {
  "use strict";

  var _$next;

  var _nextEvent = null;

  function _noNextEvent() {
    // display message as event name
    _$next.find(".next--event").text("No Events Scheduled");

    // hide the rest
    _$next.find(".next--subsection").hide();
  }

  function _reset() {
    // clear all the contents
    _$next.find(".next--event").text("");
    _$next.find(".next--date").empty("");
    _$next.find(".next--time").text("");
  }

  function _configure(event) {
    var eventStart = moment(event.start.dateTime),
      eventEnd = moment(event.end.dateTime),
      current = moment(),
      suffix = current.format("Do");

    // strip out the numbers to only get the suffix
    suffix = suffix.replace(/[0-9]/g, ''); // jshint ignore:line

    // event name
    _$next.find(".next--event").text(event.summary);
    // event date
    _$next.find(".next--date").html(current.format("MMM") + " " + current.format("D") +
      "<span class='next--suffix'>" + suffix + "</span>" + " " + current.format("YYYY"));
    // event time
    _$next.find(".next--time").text(eventStart.format("h:mma") + " - " + eventEnd.format("h:mma"));

    // ensure the they are shown
    _$next.find(".next--subsection").show();
  }

  function _getNextEvent(events) {
    var nextEvent = null,
      now = moment();

    for (var i =0; i < events.length; i += 1) {
      // is the start time after right now, first one in array is the next event
      if (moment(events[i].start.dateTime).isAfter(now)) {
        nextEvent = events[i];
        break;
      }
    }

    return nextEvent;
  }

  /*
   *  Public Methods
   */

  function init(events) {
    _$next = $(".area--nextEvent");

    _nextEvent = _getNextEvent(events);

    if (_nextEvent) {
      _configure(_nextEvent);
    } else {
      _noNextEvent();
    }

    // remove the initial "hide" class so this area is visible
    _$next.removeClass("hide");
    // fade in
    _$next.hide().fadeIn(250);
  }

  function update(events) {
    var updateNextEvent = _getNextEvent(events);

    if (updateNextEvent) {
      if (_nextEvent) {
        // is this a new next event
        if (!RiseVision.ThemeEvents.Common.compareEvents(updateNextEvent, _nextEvent)) {
          // this is a new current event that has started
          _reset();
          _nextEvent = $.extend({}, updateNextEvent);
          _configure(_nextEvent);
        }
      } else {
        _nextEvent = $.extend({}, updateNextEvent);
        _configure(_nextEvent);
      }
    } else {
      if (_nextEvent) {
        _reset();
        _nextEvent = null;
        _noNextEvent();
      }
    }
  }

  return {
    init: init,
    update: update
  };
};
