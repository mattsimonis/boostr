$(function() {
  $('a.modalLink').click(function(e) {
    e.preventDefault();
  });
  $('a#clearadminlinks').click(function(e) {
    e.preventDefault();
    chrome.storage.sync.set({
      adminlinks: {}
    }, function() {
      // Update status to let user know history was cleared.
      $('#status').text('Admin link history cleared.').show().delay(2000).fadeOut();
    });
  });
});

// Saves options to chrome.storage
function save_options() {
  var changeset = document.getElementById('changeset').checked;
  var fieldset = document.getElementById('fieldset').checked;
  var setupsearch = document.getElementById('setupsearch').checked;
  var apiname = document.getElementById('apiname').checked;
  
  chrome.storage.sync.set({
    changeset: changeset,
    fieldset: fieldset,
    setupsearch: setupsearch,
    apiname: apiname
  }, function() {
    // Update status to let user know options were saved.
    $('#status').text('Options saved.').show().delay(2000).fadeOut();
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    changeset: true,
    fieldset: true,
    setupsearch: true,
    apiname: false
  }, function(items) {
    document.getElementById('changeset').checked = items.changeset;
    document.getElementById('fieldset').checked = items.fieldset;
    document.getElementById('setupsearch').checked = items.setupsearch;
    document.getElementById('apiname').checked = items.apiname;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);