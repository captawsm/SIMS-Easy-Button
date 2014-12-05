// Saves options to chrome.storage
function save_options() {
  var tab1 = document.getElementById('tab1').value;
  var tab2 = document.getElementById('tab2').value;
  var tab3 = document.getElementById('tab3').value;
  var tab4 = document.getElementById('tab4').value;
  var tab5 = document.getElementById('tab5').value;
  var tab6 = document.getElementById('tab6').value;
  var tab7 = document.getElementById('tab7').value;
  chrome.storage.sync.set({
    tab1: tab1,
	tab2: tab2,
	tab3: tab3,
	tab4: tab4,
	tab5: tab5,
	tab6: tab6,
	tab7: tab7
  }, function() {
    // Update status to let user know options were saved.
    var save_status = document.getElementById('save_status');
    save_status.textContent = 'Options saved.';
    setTimeout(function() {
      save_status.textContent = '';
    }, 750);
  });
}

//reset to default options
function reset_options() {
  chrome.storage.sync.clear(function() {
    // Update status to let user know options were reset
    var reset_status = document.getElementById('reset_status');
    reset_status.textContent = 'Options reset.';
    setTimeout(function() {
      reset_status.textContent = '';
    }, 750);
  });
  restore_options();
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  //default
  chrome.storage.sync.get({
    tab1: "netconfig_wifi.php",
	tab2: "identify.php",
	tab3: "proxy_disclaimer.php",
	tab4: "roomlist.php",
	tab5: "wifistats_disclaimers.php",
	tab6: "subscr_audit.php",
	tab7: "sysstatus_full.php"
  }, function(items) {
    document.getElementById('tab1').value = items.tab1;
    document.getElementById('tab2').value = items.tab2;
	document.getElementById('tab3').value = items.tab3;
	document.getElementById('tab4').value = items.tab4;
	document.getElementById('tab5').value = items.tab5;
	document.getElementById('tab6').value = items.tab6;
	document.getElementById('tab7').value = items.tab7;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('reset').addEventListener('click',
    reset_options);