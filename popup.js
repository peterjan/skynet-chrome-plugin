let portal = 'https://siasky.net'

function render(skylinks) {
  const linksFound = skylinks.length > 0

  // handle UI
  if (linksFound) {
    document.getElementById('nolinks').style.display = 'none'
    document.getElementById('downloadall').disabled = false
  } else {
    document.getElementById('nolinks').style.display = 'block'
    document.getElementById('downloadall').disabled = true
  }

  // handle skylinks
  var linksTable = document.getElementById('skylinks');
  while (linksTable.children.length > 1) {
    linksTable.removeChild(linksTable.children[linksTable.children.length - 1])
  }

  for (var i = 0; i < skylinks.length; ++i) {
    var icon = document.createElement('td');
    icon.onclick = onclickDownload
    icon.innerHTML = `<span style="color: #ff0000;"><i class="fa fa-lg fa-download icon-dl" data-skylink="${skylinks[i]}"></i></span>`

    var link = document.createElement('td');
    link.innerText = skylinks[i];
    link.style.whiteSpace = 'nowrap';

    var row = document.createElement('tr');
    row.appendChild(icon);
    row.appendChild(link);
    linksTable.appendChild(row);
  }
}

function onclickDownload(evt) {
  const url = `${portal}/${stripSiaPrefix(evt.target.dataset.skylink)}`
  chrome.downloads.download({ url }, () => {
    evt.target.className = "fa fa-lg fa-check"
    evt.target.onclick = null
    evt.target.closest('td').style.cursor = 'auto'
    evt.target.closest('span').style.color = 'green'
  });
}

function onclickDownloadAll() {
  document.activeElement.blur();
  for (const el of document.getElementsByClassName("icon-dl")) {
    el.click()
  }
}

function onClickChangePortal(evt) {
  portal = evt.target.value
  document.activeElement.blur();
}

function stripSiaPrefix(skylink) {
  const prefixes = [
    "sia://",
    "https://siasky.net/",
    "https://sialoop.net/",
    "https://skynet.luxor.tech/",
    "https://skynet.tutemwesi.com/",
    "https://siacdn.com/",
    "https://vault.lightspeedhosting.com/",
    "https://skydrain.net/",
  ]
  for (const prefix of prefixes) {
    if (skylink.indexOf(prefix) != -1) {
      return skylink.slice(prefix.length)
    }
  }
  return skylink
}

window.onload = () => {
  this.document.getElementById('downloadall').onclick = onclickDownloadAll;
  this.document.getElementById('portal').onchange = onClickChangePortal;
  chrome.storage.sync.get(['skylinks'], (result) => render(result.skylinks));
};
