$(function() {
  $('a.modalLink').click(function(e) {
    e.preventDefault();
  });
});

// Saves options to chrome.storage
function save_options() {
  var changeset = document.getElementById('changeset').checked;
  var fieldset = document.getElementById('fieldset').checked;
  var setupsearch = document.getElementById('setupsearch').checked;
  var apiname = document.getElementById('apiname').checked;
  var fieldlevelsecurity = document.getElementById('fieldlevelsecurity').checked;
  
  chrome.storage.sync.set({
    changeset: changeset,
    fieldset: fieldset,
    setupsearch: setupsearch,
    apiname: apiname,
    fieldlevelsecurity: fieldlevelsecurity
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.style.display = 'block';
    setTimeout(function() {
      status.style.display = 'none';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    changeset: true,
    fieldset: true,
    setupsearch: true,
    apiname: false,
    fieldlevelsecurity: true
  }, function(items) {
    document.getElementById('changeset').checked = items.changeset;
    document.getElementById('fieldset').checked = items.fieldset;
    document.getElementById('setupsearch').checked = items.setupsearch;
    document.getElementById('apiname').checked = items.apiname;
    document.getElementById('fieldlevelsecurity').checked = items.fieldlevelsecurity;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);