/* global moment */

var RiseVision = RiseVision || {};
RiseVision.ThemeEvents = RiseVision.ThemeEvents || {};

RiseVision.ThemeEvents.Common = (function () {
  "use strict";

  /*
   *  Public Methods
   */
  function compareEvents(event1, event2) {
    if (!moment(event1.start.dateTime).isSame(moment(event2.start.dateTime))) {
      return false;
    }

    return moment(event1.end.dateTime).isSame(moment(event2.end.dateTime));
  }

  function getTodaysEvents(events) {
    var todayEvents = [],
      now = moment();

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

    return todayEvents;
  }

  return {
    compareEvents: compareEvents,
    getTodaysEvents: getTodaysEvents
  };

})();
