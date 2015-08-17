var RiseVision = RiseVision || {};
RiseVision.ThemeEvents = {};

RiseVision.ThemeEvents = (function () {
  "use strict";

  var calendar, today;

  function init() {
    // create instance of Today object/section
    today = new RiseVision.ThemeEvents.Today();
    today.init();

    // create new instance of Calendar object which manages rise-google-calendar component
    calendar = new RiseVision.ThemeEvents.Calendar();
    calendar.init();
  }

  function onCalendarInit(events) {
    console.log("onCalendarInit", events);
    // TODO: continue here
  }

  function onCalendarRefresh(events) {
    console.log("onCalendarRefresh", events);
    // TODO: continue here
  }

  return {
    "init": init,
    "onCalendarInit": onCalendarInit,
    "onCalendarRefresh": onCalendarRefresh
  };

})();
