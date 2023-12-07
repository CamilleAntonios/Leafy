const rightArrowCode=39
const leftArrowCode=37
const upArrowCode=38
const downArrowCode=40

const MAX_DECHETS_DISPLAYED=5
const FRAMERATE=30

const horizontalPoissonSpeed=9
const verticalPoissonSpeed=4

let goLeft=false
let goRight=false
let goUp=false
let goDown = false

let poissonClass

let collisionDetectee=false

let elOcean
let elSol

var dechetListe=[]

let displayMethodsToCall=[]

$(() => {
    poissonClass=new Poisson($("#poisson"))
    elOcean=$("#ocean")
    elSol=$("#sol")



    window.requestAnimationFrame(loop)

    $("body").on("keydown", (e) => {
        poissonClass.receiveKeyDown(e)

    }).on("keyup", (e) => {
        poissonClass.receiveKeyUp(e)
    })

    setInterval(() => {
        dechetListe.push(new Dechet())
        if(dechetListe.length>MAX_DECHETS_DISPLAYED) {
            //$("#"+dechetListe[0].elDechet.attr("id")).remove()
            //dechetListe.shift()
        }
    }, 1000)

    requestAnimationFrame(loop)
})

function loop() {
    displayMethodsToCall = [poissonClass.computeNextDisplay()]

    for(let dechet of dechetListe) {
        displayMethodsToCall.push(dechet.computeNextDisplay())
        collisionDetectee=dechet.checkCollision(poissonClass)
        if(collisionDetectee) {
            alert("COLLISION OMG LE POISSONGGG")
        }
    }
    displayMethodsToCall[0](poissonClass)
    for(let i=1; i < displayMethodsToCall.length; i++) {
        displayMethodsToCall[i](dechetListe[i-1])
    }

    setTimeout(() => requestAnimationFrame(loop), 1000/FRAMERATE)
}
