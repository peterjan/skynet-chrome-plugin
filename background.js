chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.executeScript(
    tab.tabId,
    { file: 'skynet.js', allFrames: true },
    () => chrome.runtime.lastError
  );
})

chrome.runtime.onMessage.addListener((request) => {
  if (request.sender === 'skynet') {
    chrome.storage.sync.set({ 'skylinks': request.skylinks });

    if (request.skylinks.length == 0) {
      chrome.browserAction.setBadgeText({ text: "" });
      return
    }

    if (request.skylinks.length < 10) {
      chrome.browserAction.setBadgeBackgroundColor({ color: "#333333" });
      chrome.browserAction.setBadgeText({ text: `${request.skylinks.length}` });
      return
    }

    chrome.browserAction.setBadgeBackgroundColor({ color: "#333333" });
    chrome.browserAction.setBadgeText({ text: "10+" });
  }
})