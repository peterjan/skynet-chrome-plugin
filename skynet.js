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
    return str && (
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
    console.log(element)
    return isSkylink(element.src)
        ? element.src
        : isSkylink(element.href)
            ? element.href
            : null

})
skylinks = skylinks.filter(Boolean)
chrome.runtime.sendMessage({ sender: 'skynet', skylinks });
