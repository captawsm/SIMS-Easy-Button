chrome.browserAction.onClicked.addListener(function(activeTab) {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		//regexp that matches the first part of the URL
		var re = new RegExp("https:\\/\\/.*?\\/htadmin\\/");
		
		//places the matched part of the URL in baseURL[0]
		var baseURL = re.exec(tabs[0].url);
	
		//take baseURL[0] and concatenates the necessary subdirectories
		var SSID = baseURL[0] + "netconfig_wifi.php";
		var onlineDevices = baseURL[0] + "identify.php";
		var landingPage = baseURL[0] + "proxy_disclaimer.php";
		var roomBinding = baseURL[0] + "roomlist.php";
		var disclaimerLogs = baseURL[0] + "wifistats_disclaimers.php";
		var hsiaSubscription = baseURL[0] + "subscr_audit.php";
		var fullReport = baseURL[0] + "sysstatus_full.php";
		
		//open new tab in background with the new URL
		chrome.tabs.create({ url: onlineDevices, active: false });
		chrome.tabs.create({ url: landingPage, active: false });
		chrome.tabs.create({ url: roomBinding, active: false });
		chrome.tabs.create({ url: disclaimerLogs, active: false });
		chrome.tabs.create({ url: hsiaSubscription, active: false });
		chrome.tabs.create({ url: fullReport, active: false });
		
		//navigate the current selected tab to a new page
		chrome.tabs.update(tabs[0].id, {url: SSID});
	});
});