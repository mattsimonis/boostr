(function () {
  var event = document.createEvent('CustomEvent');

  var data = {};

  if (window.ProfileDependentCheckboxes != null) {
    data.dependents = ProfileDependentCheckboxes.dependents;
    data.antecedents = ProfileDependentCheckboxes.antecedents;
    data.map = ProfileDependentCheckboxes.map;
  }

  event.initCustomEvent('BfsSetupCheckAllEvent', true, true, data);
  window.dispatchEvent(event);
})();