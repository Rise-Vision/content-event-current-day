/* global RiseVision */

(function () {
  "use strict";

  function webComponentsReady() {
    window.removeEventListener("WebComponentsReady", webComponentsReady);

    // initialize the ThemeEvents
    RiseVision.ThemeEvents.init();
  }

  window.addEventListener("WebComponentsReady", webComponentsReady);

})();
