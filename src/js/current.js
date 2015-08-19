/* global moment */

var RiseVision = RiseVision || {};
RiseVision.ThemeEvents = RiseVision.ThemeEvents || {};

RiseVision.ThemeEvents.Current = function() {
  "use strict";

  var _$current;

  var _currentEvent = null;

  function _noEvent() {
    // display message as event name
    _$current.find(".main--eventName").append("<p class = 'noEventText'>No Event Scheduled<p>");

    // hide the rest
    _$current.find(".main--eventDate").hide();
    _$current.find(".main--time").hide();
    _$current.find(".main--location").hide();
  }

  function _reset() {
    // clear all the contents
    _$current.find(".main--eventName").text("");
    _$current.find(".main--eventDate p").remove();
    _$current.find(".main--time p").remove();
    _$current.find(".main--location p").remove();
  }

  function _configure(event) {
    var eventStart = moment(event.start.dateTime),
      eventEnd = moment(event.end.dateTime),
      current = moment(),
      suffix = current.format("Do");

    // strip out the numbers to only get the suffix
    suffix = suffix.replace(/[0-9]/g, ''); // jshint ignore:line

    // event name
    _$current.find(".main--eventName").text(event.summary);
    // event date
    _$current.find(".main--eventDate p").html(current.format("MMMM") + " " + current.format("D") +
      "<span class='main--suffix'>" + suffix + "</span>" + " " + current.format("YYYY"));
    // event time
    _$current.find(".main--time p").text(eventStart.format("h:mma") + " - " + eventEnd.format("h:mma"));
    // event location
    _$current.find(".main--location p").text(event.location);

    // ensure these are shown
    _$current.find(".main--eventDate").show();
    _$current.find(".main--time").show();
    _$current.find(".main--location").show();

  }

  function _getCurrentEvent(events) {
    var currentEvent = null,
      now = moment(),
      event;

    for (var i =0; i < events.length; i += 1) {
      event = events[i];

      // is the end time after right now
      if (moment(event.end.dateTime).isAfter(now)) {
        // is the start time the same or before right now
        if (moment(event.start.dateTime).isSame(now) || moment(event.start.dateTime).isBefore(now)) {
          currentEvent = event;
          break;
        }
      }
    }

    return currentEvent;
  }

  /*
   *  Public Methods
   */

  function init(events) {
    _$current = $(".area--mainEvent");

    _currentEvent = _getCurrentEvent(events);

    if (_currentEvent) {
      _configure(_currentEvent);
    } else {
      _noEvent();
    }

    // remove the initial "hide" class so this area is visible
    _$current.removeClass("hide");
    // fade in
    _$current.hide().fadeIn(250);
  }

  function update(events) {
    var updateEvent = _getCurrentEvent(events);

    if (updateEvent) {
      if (_currentEvent) {
        // is this a new current event
        if (!RiseVision.ThemeEvents.Common.compareEvents(updateEvent, _currentEvent)) {
          // this is a new current event that has started
          _reset();
          _currentEvent = $.extend({}, updateEvent);
          _configure(_currentEvent);
        }
      } else {
        _currentEvent = $.extend({}, updateEvent);
        _configure(_currentEvent);
      }
    } else {
      if (_currentEvent) {
        _reset();
        _currentEvent = null;
        _noEvent();
      }
    }
  }

  return {
    init: init,
    update: update
  };
};
