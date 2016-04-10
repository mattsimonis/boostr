(function () {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('BfsFieldSetDataEvent', true, true, Sfdc.fieldset.Data.troughData);
  window.dispatchEvent(event);
})();