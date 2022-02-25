function findSeekerBar() {
    return document.getElementById("scorm_object").contentWindow.document.getElementById("seek")
}

function updateSeekerBar() {
    var seekerBar = findSeekerBar()
    if (seekerBar.getAttribute("class") != "progress-bar cs-seekcontrol") {
        seekerBar.setAttribute("class", "progress-bar cs-seekcontrol")
        console.log("Seeker bar updated")
        return true
    }
}

let seekerBarObserver = new MutationObserver((mutations) => {
    updateSeekerBar()
})

let pageObserver = new MutationObserver((mutations) => {
    var seekerBar = findSeekerBar()
    if (seekerBar != null) {
        console.log("Seeker bar found")
        seekerBarObserver.observe(seekerBar, {
            childList: false, 
            subtree: false, 
            attributes: true, 
            characterData: false
        })
        updateSeekerBar()
    } else {
        seekerBarObserver.disconnect()
    }
})
pageObserver.observe(document.body, {
    childList: true, 
    subtree: true, 
    attributes: true, 
    characterData: false
})

window.addEventListener('load', function () {
    console.log("Page loaded")
    if (updateSeekerBar()) {
        var seekerBar = findSeekerBar()
        seekerBarObserver.observe(seekerBar, {
            childList: false, 
            subtree: false, 
            attributes: true, 
            characterData: false
        })
    }
})