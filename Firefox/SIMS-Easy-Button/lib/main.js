var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
  id: "SIMS-Easy-Button",
  label: "SIMS-Easy Button",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
	var re = new RegExp("https:\\/\\/.*?\\/htadmin\\/");
	var baseURL = re.exec(tabs.activeTab.url);
	if(baseURL) {
		tabs.open({
			url: baseURL + "netconfig_wifi.php",
			inBackground: true
		});
		tabs.open({
			url: baseURL + "identify.php",
			inBackground: true
		});
		tabs.open({
			url: baseURL + "proxy_disclaimer.php",
			inBackground: true
		});
		tabs.open({
			url: baseURL + "roomlist.php",
			inBackground: true
		});
		tabs.open({
			url: baseURL + "wifistats_disclaimers.php",
			inBackground: true
		});
		tabs.open({
			url: baseURL + "subscr_audit.php",
			inBackground: true
		});
		tabs.open({
			url: baseURL + "sysstatus_full.php",
			inBackground: true
		});
		tabs.activeTab.close();
	}
}