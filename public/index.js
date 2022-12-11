const socket = io()

// Colors
const red = "invert(15%) sepia(75%) saturate(6700%) hue-rotate(358deg) brightness(106%) contrast(114%)"
const blue = "invert(10%) sepia(98%) saturate(4747%) hue-rotate(239deg) brightness(107%) contrast(147%)"
const purple = "invert(12%) sepia(34%) saturate(6779%) hue-rotate(270deg) brightness(113%) contrast(131%)"
const green = "invert(33%) sepia(82%) saturate(1490%) hue-rotate(74deg) brightness(95%) contrast(106%)"
const orange = "invert(43%) sepia(94%) saturate(3758%) hue-rotate(357deg) brightness(92%) contrast(94%)"
const pink = "invert(67%) sepia(62%) saturate(406%) hue-rotate(285deg) brightness(102%) contrast(96%)"
let current = red

function colorPick(color){
    console.log(color)
    current = color
}

document.querySelector("main").addEventListener('click', (e) => {
    var test = (e.clientX-this.offsetLeft) / this.offsetWidth * 100;
    console.log(test);
    let cursorX = e.pageX
    let cursorY = e.pageY
    let width = screen.width
    let height = screen.height
    let leftPosition = ((cursorX/width))*100
    let topPosition = ((cursorY/height))*100
    const fingerprint = document.createElement("img")
    fingerprint.classList.add("fingerprint")
    fingerprint.src = "fingerprint-r.png"
    fingerprint.style.filter = current
    fingerprint.style.left = leftPosition+"%"
    fingerprint.style.top = topPosition+"%"
    fingerprint.style.transform = "translate(-50%, -50%)"
    const rotateNum = Math.floor(Math.random() * (50) ) + -25
    const randomNum = Math.floor(Math.random() * (3) ) + 1
    let size = 1
    switch(randomNum){
        case 2:
            fingerprint.style.scale = "0.9"
            size = 0.9
            break
        case 3:
            fingerprint.style.scale = "1.1"
            size = 1.1
            break
    }
    let intensity = 1
    fingerprint.style.rotate = rotateNum+"deg"

    document.querySelector("main").appendChild(fingerprint.cloneNode(true))
    if(rotateNum > -5){
        document.querySelector("main").appendChild(fingerprint.cloneNode(true))
        intensity = 2
    }
    if(rotateNum > 10){
        document.querySelector("main").appendChild(fingerprint.cloneNode(true))
        intensity = 3
    }
    socket.emit('chatMessage', {
        lp: leftPosition,
        tp: topPosition, 
        r: rotateNum, 
        color: current,
        size: size,
        intensity: intensity
    })
})

socket.on('point', message => {
    const fingerprint = document.createElement("img")
    fingerprint.classList.add("fingerprint")
    fingerprint.src = "fingerprint-r.png"
    fingerprint.style.left = message.lp+"%"
    fingerprint.style.top = message.tp+"%"
    fingerprint.style.rotate = message.r+"deg"
    fingerprint.style.filter = message.color
    fingerprint.style.scale = message.size
    fingerprint.style.transform = "translate(-50%, -50%)"
    for(let i = 0; i < message.intensity; i++){
        document.querySelector("main").appendChild(fingerprint.cloneNode(true))
    }
})

// document.querySelector("button").addEventListener('click', (e) => {
//     e.preventDefault()
    // const msg = e.target.elements.msg.value
//     const msg = "monkey"
//     socket.emit('chatMessage', msg)
//   })