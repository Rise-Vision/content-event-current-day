/* global moment */

var RiseVision = RiseVision || {};
RiseVision.ThemeEvents = RiseVision.ThemeEvents || {};

RiseVision.ThemeEvents.Calendar = function () {
  "use strict";

  var _initialLoad = true;

  /*
   *  Public Methods
   */
  function init() {
    var calendar = document.querySelector("rise-google-calendar");

    if (!calendar) {
      return;
    }

    calendar.addEventListener("rise-google-calendar-response", function(e) {
      if (e.detail && e.detail.items) {

        if (_initialLoad) {
          _initialLoad = false;

          RiseVision.ThemeEvents.onCalendarInit(e.detail.items);
        }
        else {
          RiseVision.ThemeEvents.onCalendarRefresh(e.detail.items);
        }
      }
    });

    calendar.addEventListener("rise-goggle-calendar-error", function (e) {
      // TODO: potentially do something more with an error
      console.log(e);
    });

    calendar.setAttribute("start-date", moment().format("YYYY-MM-DD"));
    calendar.go();
  }

  return {
    "init": init
  };
};
