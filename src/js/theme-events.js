/* global moment */

var RiseVision = RiseVision || {};
RiseVision.ThemeEvents = {};

RiseVision.ThemeEvents = (function () {
  "use strict";

  var _calendar, _today, _current, _next;

  function _getTodaysEvents(events) {
    var _todayEvents = [],
      now = moment();

    // compile list of todays events only
    events.some(function (event) {
      var startDate;

      // ensure this is not an all day event
      if (event.start && event.end && event.start.dateTime && event.end.dateTime) {
        startDate = moment(event.start.dateTime).format("YYYY-MM-DD");

        // is it today
        if (moment(startDate).isSame(now.format("YYYY-MM-DD"))) {
          _todayEvents.push(event);
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

    return _todayEvents;
  }

  /*
   *  Public Methods
   */
  function init() {
    // create instance of Today object/section
    _today = new RiseVision.ThemeEvents.Today();
    _today.init();

    // create new instance of Calendar object which manages rise-google-calendar component
    _calendar = new RiseVision.ThemeEvents.Calendar();
    _calendar.init();
  }

  function onCalendarInit(events) {
    var todayEvents = _getTodaysEvents(events);

    // create new instance of Current object/section
    _current = new RiseVision.ThemeEvents.Current();
    _current.init(todayEvents);

    // create a new instance of Next object/section
    _next = new RiseVision.ThemeEvents.Next();
    _next.init(todayEvents);
  }

  function onCalendarRefresh(events) {
    var todayEvents = _getTodaysEvents(events);

    // update Current and Next section with latest array of todays events
    _current.update(todayEvents);
    _next.update(todayEvents);
  }

  return {
    "init": init,
    "onCalendarInit": onCalendarInit,
    "onCalendarRefresh": onCalendarRefresh
  };

})();
