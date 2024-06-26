    ////////////////////////////////////////
    ///////        GLOBAL VARS         ///////
    ////////////////////////////////////////
    const screenHeight = window.innerHeight;
    const screenWidth = window.innerWidth;
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const NUMPARTICLES = 5;
    const particleWorldStateObject = {};
    const velocity = 2;

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
        generateParticleDivElement(NUMPARTICLES);
        generateMultipleRoundedRecOnScreen(draw, particleWorldStateObject, NUMPARTICLES);
        document.addEventListener("click", (e) => {
            let elementId = e.target.id;
            popCircle(elementId);
        });
    }

    function popCircle(elementId) {
        let particleElement = elementId.startsWith("particle");
        if (particleElement) {
            let particleDiv = document.getElementById(elementId);
            delete particleWorldStateObject[elementId];
            particleDiv.className = "particle is-popping";
            particleDiv.addEventListener("animationend", function() {
                // Remove the particle element from the DOM after the animation ends
                particleDiv.remove();
            });
        }
    }

    ////////////////////////////////////////
    ///////        FUNCTIONS         ///////
    ////////////////////////////////////////
    function generateParticleDivElement(numberOfParticles) {
        function addEmptyParticleToWorldStateObj(particleWorldStateObject, particleName) {
            particleWorldStateObject[particleName] = {};
        }

        for (let i = 0; i < numberOfParticles; i++) {
            const particleName = `particle${i}`;
            let newDiv = document.createElement('div');
            newDiv.id = particleName;
            newDiv.classList.add("particle");
            document.body.appendChild(newDiv);
            addEmptyParticleToWorldStateObj(particleWorldStateObject, particleName);
        }
    }

    function generateMultipleRoundedRecOnScreen(drawFunc, particleWorldStateObject, numberOfObjOnScreen) {
        for (let i = 0; i < numberOfObjOnScreen; i++) {
            const particleName = `particle${i}`;
            randomX = Math.floor(Math.random() * (screenHeight / 2) + 50);
            randomY = Math.floor(Math.random() * (screenWidth / 2) + 50);
            drawFunc(particleWorldStateObject, particleName, ctx, randomX, randomY, 100, 50, 100);
        }
    }

    function draw(worldStateObj, particleName, canvasObj, x, y, w, h, borderRadius) {
        updateParticlePositionObject(worldStateObj, particleName, x, y, w, h, borderRadius);
        placeElementOnScreen(worldStateObj, particleName);
    }

    function placeElementOnScreen(worldStateObj, particleName) {
        const particleDiv = document.getElementById(particleName);
        const particleObj = worldStateObj[particleName];
        particleDiv.style.left = particleObj.x + "px";
        particleDiv.style.top = particleObj.y + "px";
    }

    function updateParticlePositionObject(worldStateObj, particleName, x, y, w, h, borderRadius) {
        const particleObj = worldStateObj[particleName];
        particleObj["x"] = x;
        particleObj["y"] = y;
        particleObj["w"] = w;
        particleObj["h"] = h;
        particleObj["radii"] = borderRadius;
    }