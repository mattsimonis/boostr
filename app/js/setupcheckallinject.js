(function () {
  var event = document.createEvent('CustomEvent');
  var data = {
    'dependents': ProfileDependentCheckboxes.dependents,
    'antecedents': ProfileDependentCheckboxes.antecedents,
    'map': ProfileDependentCheckboxes.map
  };

  event.initCustomEvent('BfsSetupCheckAllEvent', true, true, data);
  window.dispatchEvent(event);
})();