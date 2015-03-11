// Saves options to chrome.storage
function save_options() {
//must be updated to add more tabs
  var tab1 = document.getElementById('tab1').value;
  var tab2 = document.getElementById('tab2').value;
  var tab3 = document.getElementById('tab3').value;
  var tab4 = document.getElementById('tab4').value;
  var tab5 = document.getElementById('tab5').value;
  var tab6 = document.getElementById('tab6').value;
  var tab7 = document.getElementById('tab7').value;
  var tab8 = document.getElementById('tab8').value;
  var tab9 = document.getElementById('tab9').value;
  var tab10 = document.getElementById('tab10').value;
  //must be updated to add more tabs
  chrome.storage.sync.set({
    "tab1": tab1,
	"tab2": tab2,
	"tab3": tab3,
	"tab4": tab4,
	"tab5": tab5,
	"tab6": tab6,
	"tab7": tab7,
	"tab8": tab8,
	"tab9": tab9,
	"tab10": tab10
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
  //default settings
  //must be updated to add more tabs
  chrome.storage.sync.get({
	//default values specified here too just in case someone opens options before using extension
	//should check if there is a "on install" script instead, maybe in background.js but move it outside of "addListener" block
    "tab1": "netconfig_wifi.php",
	"tab2": "identify.php",
	"tab3": "proxy_disclaimer.php",
	"tab4": "roomlist.php",
	"tab5": "wifistats_disclaimers.php",
	"tab6": "subscr_audit.php",
	"tab7": "sysstatus_full.php",
	"tab8": "",
	"tab9": "",
	"tab10": ""
  }, function(items) { must be updated to add new tabs
    document.getElementById('tab1').value = items.tab1;
    document.getElementById('tab2').value = items.tab2;
	document.getElementById('tab3').value = items.tab3;
	document.getElementById('tab4').value = items.tab4;
	document.getElementById('tab5').value = items.tab5;
	document.getElementById('tab6').value = items.tab6;
	document.getElementById('tab7').value = items.tab7;
	document.getElementById('tab8').value = items.tab8;
	document.getElementById('tab9').value = items.tab9;
	document.getElementById('tab10').value = items.tab10;
  });
}
//must be updated to add new tabs
var tab_options = {
	"Not Set": "",
	"Wi-Fi Access Points": "netconfig_wifi.php",
	"DHCP/Real IP": "netconfig_dhcp.php?mode=realip",
	"SMTP": "netconfig_smtp.php",
	"MAC-Wg": "netconfig_macwg.php",
	"Online Devices": "identify.php",
	"Disclaimer Pages": "proxy_disclaimer.php",
	"Room/Port Binding": "roomlist.php",
	"Users and PINs": "radius_users.php",
	"Wi-Fi Disclaimer Logs": "wifistats_disclaimers.php",
	"Wired Disclaimer Logs": "vbnstats_disclaimers.php",
	"Wi-Fi Sessions": "wifistats_sessions.php",
	"Wired Sessions": "vbnstats_sessions.php",
	"HSIA Subscriptions": "subscr_audit.php",
	"Full Report": "sysstatus_full.php",
	"System Logs": "logs_system.php",
	"Ping Tool": "ping.php"
}
//must be updated to add new tabs
var total_tabs = 10;
var select_holder = '';
for(var i = 1; i <= total_tabs; i++) {
	select_holder += ('<p>Tab '+i+'<br><select id="tab'+i+'">');
	for(var key in tab_options) {
		select_holder += ('<option value="'+tab_options[key]+'">'+key+'</option>');
	}
	select_holder += '</select></p>';
}
//too lazy to figure out how to do this with plain javascript - better include jQuery LOL!
//can't seem to use .appendTo in the above nested for loops - it breaks it somehow
$(select_holder).appendTo('#tab_list');

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('reset').addEventListener('click',
    reset_options);