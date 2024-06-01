//////////////////////////////////////////
///////        GLOBAL VARS         ///////
//////////////////////////////////////////

const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const particleWorldStateObject = []

setCanvasSize()
main()


////////////////////////////////////////
///////        MAIN FUNC         ///////
////////////////////////////////////////


function main(){
    generateMultipleRoundedRecOnScreen(generateRoundedRectOnScreen, particleWorldStateObject, 5)

    console.log(particleWorldStateObject)
}





////////////////////////////////////////
///////        FUNCTIONS         ///////
////////////////////////////////////////

function setCanvasSize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}


function generateRoundedRectOnScreen(worldStateObj, canvasObj, x, y, w, h, borderRadius){
    canvasObj.beginPath();
    canvasObj.roundRect(x, y, w, h, borderRadius)
    canvasObj.stroke();
    updateParticleWorldStateObject(worldStateObj, x, y, w, h, borderRadius)
}

function generateMultipleRoundedRecOnScreen(generateRoundedRectOnScreenFunc, particleWorldStateObject, numberOfObjOnScreen){
    for(let i=0; i < numberOfObjOnScreen; i++){
        randomX = Math.floor(Math.random() * (screenHeight/2) + 50) // ACHTUNG
        randomY = Math.floor(Math.random() * (screenWidth/2) + 50) // ACHTUNG
        generateRoundedRectOnScreenFunc(particleWorldStateObject, ctx, randomX, randomY, 100, 50, 100)
    }

}

function updateParticleWorldStateObject(worldStateObj,x,y, w, h, borderRadius){
    worldStateObj.push({"x":x,"y":y, "w": w, "h": h, "radius": borderRadius})
}