// Note: must be var
var skylinks = []
var srcElementTags = [
    'audio',
    'embed',
    'iframe',
    'img',
    'input',
    // 'script',
    'source',
    'track',
    'video',
    'a'
]

srcElementTags.forEach(tag => {
    skylinks = skylinks.concat(...document.getElementsByTagName(tag))
})

isSkylink = (str) => {
    const regex = RegExp('[a-zA-Z0-9_-]{46}');
    return str && (
        regex.test(str) ||
        str.startsWith('sia://') ||
        str.startsWith('https://siasky.net/') ||
        str.startsWith('https://sialoop.net/') ||
        str.startsWith('https://skynet.luxor.tech/') ||
        str.startsWith('https://skynet.tutemwesi.com/') ||
        str.startsWith('https://siacdn.com/') ||
        str.startsWith('https://vault.lightspeedhosting.com/') ||
        str.startsWith('https://skydrain.net/')
    )
}

skylinks = skylinks.map(element => {
    if (isSkylink(element.src)) {
        return element.src
    }
    if (isSkylink(element.href)) {
        return element.href
    }
    if (isSkylink(element.getAttribute('href'))) {
        return element.getAttribute('href')
    }
    return null
})
skylinks = skylinks.filter(Boolean)
chrome.runtime.sendMessage({ sender: 'skynet', skylinks });
