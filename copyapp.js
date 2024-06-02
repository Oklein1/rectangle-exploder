// //////////////////////////////////////////
// ///////        GLOBAL VARS         ///////
// //////////////////////////////////////////

// const screenHeight = window.innerHeight
// const screenWidth = window.innerWidth
// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// const particleWorldStateObject = []

// setCanvasSize()
// main()


// ////////////////////////////////////////
// ///////        MAIN FUNC         ///////
// ////////////////////////////////////////


// function main(){
//     generateMultipleRoundedRecOnScreen(generateRoundedRectOnScreen, particleWorldStateObject, 5)

//     console.log(particleWorldStateObject)
// }





// ////////////////////////////////////////
// ///////        FUNCTIONS         ///////
// ////////////////////////////////////////

// function setCanvasSize(){
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }


// function generateRoundedRectOnScreen(worldStateObj, canvasObj, x, y, w, h, borderRadius){
//     canvasObj.beginPath();
//     canvasObj.roundRect(x, y, w, h, borderRadius)
//     canvasObj.stroke();
//     updateParticleWorldStateObject(worldStateObj, x, y, w, h, borderRadius)
// }

// function generateMultipleRoundedRecOnScreen(generateRoundedRectOnScreenFunc, particleWorldStateObject, numberOfObjOnScreen){
//     for(let i=0; i < numberOfObjOnScreen; i++){
//         randomX = Math.floor(Math.random() * (screenHeight/2) + 50) // ACHTUNG
//         randomY = Math.floor(Math.random() * (screenWidth/2) + 50) // ACHTUNG
//         generateRoundedRectOnScreenFunc(particleWorldStateObject, ctx, randomX, randomY, 100, 50, 100)
//     }

// }

// function updateParticleWorldStateObject(worldStateObj,x,y, w, h, borderRadius){
//     worldStateObj.push({"x":x,"y":y, "w": w, "h": h, "radius": borderRadius})
// }




//////////////////////////////////////////
///////        GLOBAL VARS         ///////
//////////////////////////////////////////

const screenHeight = window.innerHeight
const screenWidth = window.innerWidth
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
// const particleWorldStateObject = []
const particleWorldStateObject = {}
const velocity = 2

setCanvasSize();
main();


////////////////////////////////////////
///////        MAIN FUNC         ///////
////////////////////////////////////////

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}




function main() {

    generateParticleDivElement(1)



    generateMultipleRoundedRecOnScreen(generateRoundedRectOnScreen, particleWorldStateObject, 1);
    
    
    canvas.addEventListener("click", (e) => {
        let mouseX = e.pageX;
        let mouseY = e.pageY;

        particleWorldStateObject.forEach((particle) => {
            let distanceX = mouseX - particle.x;
            let distanceY = mouseY - particle.y;
            let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            let forceMagnitude = 2000 / distance; // Adjust the force magnitude as needed

            particle.velocityX += forceMagnitude * (distanceX / distance);
            particle.velocityY += forceMagnitude * (distanceY / distance);
        });
    });

    animate(); // Start animation loop
}

function animate() {
    // Update particles position
    updateParticles();

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw particles
    particleWorldStateObject.forEach((particle) => {
        generateRoundedRectOnScreen(particle, ctx);
    });

    // Request next animation frame
    requestAnimationFrame(animate);
}

function updateParticles() {
    particleWorldStateObject.forEach((particle) => {
        // Update particle position
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        // Apply friction (optional)
        particle.velocityX *= 0.99;
        particle.velocityY *= 0.99;

        // Reset velocity if particle goes off-screen
        if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
            particle.velocityX = 0;
            particle.velocityY = 0;
        }
    });
}


////////////////////////////////////////
/////         EFFECT FUNCS         /////
////////////////////////////////////////

function generateParticleDivElement(numberOfParticles){
    for(let i=0; i < numberOfParticles; i++){
        let newDiv = document.createElement('div');
        console.log(newDiv)
        newDiv.id = `particle${i}`;
        document.body.appendChild(newDiv);
    }
}



function generateRoundedRectOnScreen(particle, canvasObj) {
    const circleRadius = 5;
    const circleGap = 2;
    const circlesHorizontal = Math.floor((particle.w - circleGap) / (circleRadius * 2 + circleGap));
    const circlesVertical = Math.floor((particle.h - circleGap) / (circleRadius * 2 + circleGap));

    for (let i = 0; i < circlesHorizontal * circlesVertical; i++) {
        const row = Math.floor(i / circlesHorizontal);
        const col = i % circlesHorizontal;

        const cx = particle.x + particle.radius + circleRadius + col * (circleRadius * 2 + circleGap);
        const cy = particle.y + particle.radius + circleRadius + row * (circleRadius * 2 + circleGap);

        // Draw a circle
        canvasObj.beginPath();
        canvasObj.arc(cx, cy, circleRadius, 0, Math.PI * 2);
        canvasObj.closePath();
        canvasObj.stroke();
    }
}

function generateMultipleRoundedRecOnScreen(generateRoundedRectOnScreenFunc, particleWorldStateObject, numberOfObjOnScreen) {
    for (let i = 0; i < numberOfObjOnScreen; i++) {
        randomX = Math.floor(Math.random() * (screenHeight / 2) + 50);
        randomY = Math.floor(Math.random() * (screenWidth / 2) + 50);
        const particle = { "x": randomX, "y": randomY, "w": 100, "h": 50, "radius": 100, "velocityX": 0, "velocityY": 0 };
        generateRoundedRectOnScreenFunc(particle, ctx);
        particleWorldStateObject.push(particle);
    }
}


// function draw(worldStateObj, particleName,canvasObj, x, y, w, h, borderRadius){
//     function clear(ctx,x,y,w,h) {
//         ctx.clearRect(x,y,w,h);
//     }
//     clear(ctx)
//     canvasObj.beginPath();
//     canvasObj.roundRect(x, y, w, h, borderRadius)
//     canvasObj.stroke();
//     updateParticlePositionObject(worldStateObj, particleName,x, y, w, h, borderRadius)
// }