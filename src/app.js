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

function setCanvasSize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function main(){
    generateMultipleRoundedRecOnScreen(generateRoundedRectOnScreen, particleWorldStateObject, 1)
    canvas.addEventListener("click", ()=>{
        console.log("hi") // START ON EFFFECT HERE
    })
}



////////////////////////////////////////
/////         EFFECT FUNCS         /////
////////////////////////////////////////








////////////////////////////////////////
/////         CIRCLE FUNCS         /////
////////////////////////////////////////


function generateRoundedRectOnScreen(worldStateObj, canvasObj, x, y, w, h, borderRadius){
    const circleRadius = 5; 
    const circleGap = 2; 
    const circlesHorizontal = Math.floor((w - circleGap) / (circleRadius * 2 + circleGap));
    const circlesVertical = Math.floor((h - circleGap) / (circleRadius * 2 + circleGap));

    for (let i = 0; i < circlesHorizontal * circlesVertical; i++) {
        const row = Math.floor(i / circlesHorizontal);
        const col = i % circlesHorizontal;

        const cx = x + borderRadius + circleRadius + col * (circleRadius * 2 + circleGap);
        const cy = y + borderRadius + circleRadius + row * (circleRadius * 2 + circleGap);

        // Draw a circle
        canvasObj.beginPath();
        canvasObj.arc(cx, cy, circleRadius, 0, Math.PI * 2);
        canvasObj.closePath();
        canvasObj.stroke();

        // Update particleWorldStateObject
        updateParticleWorldStateObject(worldStateObj, cx - circleRadius, cy - circleRadius, circleRadius * 2, circleRadius * 2, circleRadius);
    }
}


function generateMultipleRoundedRecOnScreen(generateRoundedRectOnScreenFunc, particleWorldStateObject, numberOfObjOnScreen){
    for(let i=0; i < numberOfObjOnScreen; i++){
        randomX = Math.floor(Math.random() * (screenHeight/2) + 50) // ACHTUNG
        randomY = Math.floor(Math.random() * (screenWidth/2) + 50) // ACHTUNG
        generateRoundedRectOnScreenFunc(particleWorldStateObject, ctx, randomX, randomY, 100, 50, 100)
    }
}

function updateParticleWorldStateObject(worldStateObj,x,y, w, h, radius){
    worldStateObj.push({"x":x,"y":y, "w": w, "h": h, "radius": radius})
}
