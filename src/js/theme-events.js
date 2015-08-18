var RiseVision = RiseVision || {};
RiseVision.ThemeEvents = {};

RiseVision.ThemeEvents = (function () {
  "use strict";

  var calendar, today, current;

  /*
   *  Public Methods
   */
  function init() {
    // create instance of Today object/section
    today = new RiseVision.ThemeEvents.Today();
    today.init();

    // create new instance of Calendar object which manages rise-google-calendar component
    calendar = new RiseVision.ThemeEvents.Calendar();
    calendar.init();
  }

  function onCalendarInit(events) {
    // create new instance of Current object/section
    current = new RiseVision.ThemeEvents.Current();
    current.init(events);
  }

  function onCalendarRefresh(events) {
    current.update(events);
  }

  return {
    "init": init,
    "onCalendarInit": onCalendarInit,
    "onCalendarRefresh": onCalendarRefresh
  };

})();
