chrome.browserAction.onClicked.addListener(function(activeTab) {
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		//regexp that matches the first part of the URL
		var re = new RegExp("https:\\/\\/.*?\\/htadmin\\/");
		
		//places the matched part of the URL in baseURL[0]
		var baseURL = re.exec(tabs[0].url);
		
		//check to make sure there was a match
		//further research indicates if(baseURL) or if(baseURL !== null) should be used instead
		//will test and decide
		if(baseURL) {
			chrome.storage.sync.get(
			{
				tab1: "netconfig_wifi.php",
				tab2: "identify.php",
				tab3: "proxy_disclaimer.php",
				tab4: "roomlist.php",
				tab5: "wifistats_disclaimers.php",
				tab6: "subscr_audit.php",
				tab7: "sysstatus_full.php"
			}, function(items) {
				//open new tab in background with the new URL
				chrome.tabs.create({ url: baseURL[0] + items.tab2, active: false });
				chrome.tabs.create({ url: baseURL[0] + items.tab3, active: false });
				chrome.tabs.create({ url: baseURL[0] + items.tab4, active: false });
				chrome.tabs.create({ url: baseURL[0] + items.tab5, active: false });
				chrome.tabs.create({ url: baseURL[0] + items.tab6, active: false });
				chrome.tabs.create({ url: baseURL[0] + items.tab7, active: false });
				
				//navigate the current selected tab to a new page
				chrome.tabs.update(tabs[0].id, {url: baseURL[0] + items.tab1});
			});
		}
	});
});

