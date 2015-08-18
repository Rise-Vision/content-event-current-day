/* global moment */

var RiseVision = RiseVision || {};
RiseVision.ThemeEvents = RiseVision.ThemeEvents || {};

RiseVision.ThemeEvents.Current = function() {
  "use strict";

  var _$current;

  var _currentEvent = null;

  function _compareEvents(event1, event2) {
    if (!moment(event1.start.dateTime).isSame(moment(event2.start.dateTime))) {
      return false;
    }

    return moment(event1.end.dateTime).isSame(moment(event2.end.dateTime));
  }

  function _noEvent() {
    // display message as event name
    _$current.find(".main--eventName").text("No Event Scheduled");

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
      suffix = current.format("Do"),
      month = current.format("MMMM").toUpperCase();

    // strip out the numbers to only get the suffix
    suffix = suffix.replace(/[0-9]/g, ''); // jshint ignore:line

    // event name
    _$current.find(".main--eventName").text(event.summary);
    // event date
    _$current.find(".main--eventDate").append("<p>" + month + " " + current.format("D") +
      "<span class='main-suffix'>" + suffix.toLowerCase() + "</span>" + " " + current.format("YYYY") + "</p>");
    // event time
    _$current.find(".main--time").append("<p>" +
      eventStart.format("h:mma") + " - " + eventEnd.format("h:mma") + "</p>");
    // event location
    _$current.find(".main--location").append("<p>" + event.location + "</p>");

    // ensure these are shown
    _$current.find(".main--eventDate").show();
    _$current.find(".main--time").show();
    _$current.find(".main--location").show();

  }

  function _getCurrentEvent(events) {
    var currentEvent = null,
      todayEvents = [],
      now = moment(),
      event;

    // compile list of todays events only
    events.some(function (event) {
      var startDate;

      // ensure this is not an all day event
      if (event.start && event.end && event.start.dateTime && event.end.dateTime) {
        startDate = moment(event.start.dateTime).format("YYYY-MM-DD");

        // is it today
        if (moment(startDate).isSame(now.format("YYYY-MM-DD"))) {
          todayEvents.push(event);
          return false;
        }

        if(moment(startDate).isAfter(now.format("YYYY-MM-DD"))) {
          // this event and all further ones will be after todays date, break out of inspecting the events array
          return true;
        }
      } else {
        return false;
      }
    });

    for (var i =0; i < todayEvents.length; i += 1) {
      event = events[i];

      // is the end time after right now
      if (moment(event.end.dateTime).isAfter(now)) {
        // is the start time the same or after right now
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
  }

  function update(events) {
    var updateEvent = _getCurrentEvent(events);

    if (updateEvent) {
      if (_currentEvent) {
        // is this a new current event
        if (!_compareEvents(updateEvent, _currentEvent)) {
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
