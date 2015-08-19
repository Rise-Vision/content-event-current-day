var RiseVision = RiseVision || {};
RiseVision.ThemeEvents = {};

RiseVision.ThemeEvents = (function () {
  "use strict";

  var _calendar, _today, _current, _next;

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
    var todayEvents = RiseVision.ThemeEvents.Common.getTodaysEvents(events);

    // create new instance of Current object/section
    _current = new RiseVision.ThemeEvents.Current();
    _current.init(todayEvents);

    // create a new instance of Next object/section
    _next = new RiseVision.ThemeEvents.Next();
    _next.init(todayEvents);
  }

  function onCalendarRefresh(events) {
    var todayEvents = RiseVision.ThemeEvents.Common.getTodaysEvents(events);

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
