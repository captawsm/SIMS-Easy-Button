chrome.browserAction.onClicked.addListener(function(activeTab) { //run when button click
	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) { //get URL of current tab
		//regexp that matches the first part of the URL
		var re = new RegExp("https:\\/\\/.*?\\/htadmin\\/");
		
		//places the matched part of the URL in baseURL[0]
		var baseURL = re.exec(tabs[0].url);
		
		//check to make sure there was a match
		//further research indicates if(baseURL) or if(baseURL !== null) should be used instead
		//will test and decide
		//decided to use if(baseURL) since if there's something there it should be "truthy"
		if(baseURL) {
			chrome.storage.sync.get(
			//must be updated to add new tabs
			//have to use key/value pairs instead of list of keys since defaults not otherwise set unless options is opened first
			//investigate if default value option can be moved outside of the ...addListener block to decrease code complexity/redundancy
			//test block: ["tab1", "tab2", "tab3", "tab4", "tab5", "tab6", "tab7", "tab8", "tab9", "tab10"], function(items) {
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
				//this is shit but i don't know how to iterate through an objects properties [actually can use "for(var in object)"]
				//var loadTabs = [items.tab1, items.tab2, items.tab3, items.tab4, items.tab5, items.tab6, items.tab7, items.tab8, items.tab9, items.tab10];
				var firstTab = true;
				for(var key in items) { //just testing [seems to work actually!]
				//for(i = 0; i < loadTabs.length; i++) {
					if(items[key]) {
					//if(loadTabs[i]) {
						if(firstTab) {
							chrome.tabs.update(tabs[0].id, {url: baseURL[0] + items[key]}); //seems to work
							//chrome.tabs.update(tabs[0].id, {url: baseURL[0] + loadTabs[i]});							
							firstTab = false;
						} else {
							chrome.tabs.create({url: baseURL[0] + items[key], active: false }); //seems to work
							//chrome.tabs.create({ url: baseURL[0] + loadTabs[i], active: false });
						}
					}
				}
			});
		}
	});
});

