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
			//have to use key/value pairs instead of list of keys since defaults not otherwise set unless options is opened first
			//example: ["tab1", "tab2", "tab3", "tab4", "tab5", "tab6", "tab7"]
			{
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
			}, function(items) {
				//open new tab in background with the new URL
				
				//this is shit but i don't know how to iterate through an objects properties
				var loadTabs = [items.tab1, items.tab2, items.tab3, items.tab4, items.tab5, items.tab6, items.tab7, items.tab8, items.tab9, items.tab10];
				var firstTab = true;
				for(i = 0; i < loadTabs.length; i++) {
					if(loadTabs[i]) {
						if(firstTab) {
							chrome.tabs.update(tabs[0].id, {url: baseURL[0] + loadTabs[i]});
							firstTab = false;
						} else {
							chrome.tabs.create({ url: baseURL[0] + loadTabs[i], active: false });
						}
					}
				}
			});
		}
	});
});

