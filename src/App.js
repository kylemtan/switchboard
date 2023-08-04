import React from "react";
import Sketch from "react-p5";
import './App.css';

function App() {
  let width = 1400;
  let height = 1000;
  let backgroundImage;
  let holes = new Array(90).fill(null);
  let plugs = new Array(24).fill(true);
  let lights = new Array(12).fill(0); 
  let keys = new Array(12).fill(0); 
  let currentPlug = null;
  let contractY = 900;
  let contractStep = 0.1;
  let callsRemaining = 10;

  //set next two to the same amount
  let timeBetween = 10;
  let triggerNextCall = 10;

  let calls = [
    // {
    //   caller: int,
    //   receiver: int,
    //   status: int,
    //   duration: int,
    //   convoID: int,
    //   storyline: bool,
    // }
  ];
  

  const preload = (p5) => {
    p5.loadImage('./assets/tempbackground.jpg', img => {
      backgroundImage = img;
    });
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(1400, 1000).parent(canvasParentRef);
    p5.frameRate(60);
  };
  
  const draw = (p5) => {

    p5.background(0);
    // p5.image(backgroundImage, 0, 0, width, height);

    //switchboard, should be at top
    p5.rectMode(p5.CENTER);
    p5.stroke(0);
    p5.fill(125, 125, 125);
    p5.rect(width / 2, height - 625, 1000, 650);
    p5.quad(width / 2 - 500, height - 325, width / 2 + 500, height - 325, width / 2 + 800, height, width / 2 - 800, height);
    p5.textSize(15);

    //displays for holes
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 9; j++) {
        let offset = 0;
        if (i > 4) {
          offset = 50;
        }
        p5.fill(100, 100, 100);
        p5.ellipse(offset + width / 2 + 90 * i - 430, height - 900 + 60 * j, 45, 45);
        p5.fill(0);
        p5.ellipse(offset + width / 2 + 90 * i - 430, height - 900 + 60 * j, 40, 40);
        

        if (holes[10 * j + i] === false) {
          p5.fill(200, 200, 0);
          p5.ellipse(offset + width / 2 + 90 * i - 430, height - 900 + 60 * j, 30, 30);
          
        }

        p5.fill(0);
        p5.text(p5.char(i + 65) + j, offset + width / 2 + 90 * i - 400, height - 895 + 60 * j);
      }
    }

    //displays for plug lights
    for (let i = 0; i < 12; i++) {
      const currentColor = lights[i] ? 200 : 0;
          p5.fill(50, currentColor, 0);
          p5.ellipse( + width / 2 + 90 * i - 495, height - 206, 30, 15);
    }

    //displays for keys
    for (let i = 0; i < 12; i++) {
          p5.fill(0);
          p5.quad(width / 2 + 85 * i + (8 * (i - 5.5)) - 472.5, height - 166, width / 2 + 85 * i + (8 * (i - 5.5)) - 462.5, height - 166, width / 2 + 85 * i + (15 * (i - 5.5)) - 462.5, height - 116, width / 2 + 85 * i + (15 * (i - 5.5)) - 472.5, height - 116);
          if (keys[i] === 1) {
            p5.fill(100, 100, 100);
            p5.ellipse(width / 2 + 86 * i + (8 * (i - 5.5)) - 472.5, height - 160, 20, 10);
          } else if (keys[i] === 0) {
            p5.fill(100, 100, 100);
            p5.ellipse(width / 2 + 88.1 * i + (8 * (i - 5.5)) - 484, height - 143, 20, 10);
          } else {
            p5.fill(100, 100, 100);
            p5.ellipse(width / 2 + 91.1 * i + (8 * (i - 5.5)) - 501, height - 123, 20, 10);
          }
    }

    //displays for plugs
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 2; j++) {
        let currentColor = 17 * i
        let offset = i * 5 - 27.5
        if (j === 0) {
          offset = 0
        }
        p5.fill(100, 100, 100);
        p5.ellipse(offset + width / 2 + 80 * i - 440, height - 295 + 60 * j, 45, 25);
        p5.fill(0);
        p5.ellipse(offset + width / 2 + 80 * i - 440, height - 295 + 60 * j, 40, 20);
        //resting in hole
        if (plugs[j * 12 + i] === true) {
          p5.fill(150, currentColor, 50);
          p5.rect(offset + width / 2 + 80 * i - 440, height - 325 + 60 * j, 30, 60);
          p5.ellipse(offset + width / 2 + 80 * i - 440, height - 356 + 60 * j, 30, 15);
          p5.fill(150, 150, 150);
          p5.rect(offset + width / 2 + 80 * i - 440, height - 376 + 60 * j, 20, 40);
          p5.arc(offset + width / 2 + 80 * i - 440, height - 357 + 60 * j, 20, 10, 0, Math.PI);
          p5.ellipse(offset + width / 2 + 80 * i - 440, height - 396 + 60 * j, 20, 10);
          p5.fill(150, 150, 0);
          p5.ellipse(offset + width / 2 + 80 * i - 440, height - 396 + 60 * j, 25, 25);
          p5.fill(150, currentColor, 50);
          p5.arc(offset + width / 2 + 80 * i - 440, height - 297 + 60 * j, 30, 15, 0, Math.PI);
        // being hovered
        } else if (currentPlug === j * 12 + i) {
          p5.fill(150, 150, 0);
          p5.ellipse(p5.mouseX, p5.mouseY, 25, 15);
          p5.fill(150, 150, 150);
          p5.rect(p5.mouseX, p5.mouseY + 10, 20, 20);
          p5.arc(p5.mouseX, p5.mouseY + 1, 20, 10, Math.PI, 0);
          p5.fill(150, currentColor, 50)
          p5.rect(p5.mouseX, p5.mouseY + 24, 30, 5);
          p5.arc(p5.mouseX, p5.mouseY + 22, 30, 30, Math.PI, 0);
          p5.ellipse(p5.mouseX, p5.mouseY + 30, 30, 30);

          p5.fill(150, currentColor, 50);
          p5.stroke(0);
          p5.strokeWeight(21);
          p5.line(offset + width / 2 + 80 * i - 440, height - 296 + 57 * j, p5.mouseX, p5.mouseY + 30);
          p5.stroke(150, currentColor, 50);
          p5.strokeWeight(20);
          p5.line(offset + width / 2 + 80 * i - 440, height - 296 + 57 * j, p5.mouseX, p5.mouseY + 30);
          p5.stroke(0);
          p5.strokeWeight(1);
        //currently plugged
        } else {
          let tempOffset = 0;
          const tempX = plugs[j * 12 + i] % 10;
          if (tempX > 4) {
            tempOffset = 50;
          }
          const tempY = Math.floor(plugs[j * 12 + i] / 10);
          const x = tempOffset + width / 2 + 90 * tempX - 430
          const y = height - 900 + 60 * tempY - 20

          p5.fill(150, currentColor, 50)
          p5.rect(x, y + 24, 30, 5);
          p5.arc(x, y + 22, 30, 30, Math.PI, 0);
          p5.ellipse(x, y + 30, 30, 30);

          p5.fill(150, currentColor, 50);
          p5.stroke(0);
          p5.strokeWeight(21);
          p5.line(offset + width / 2 + 80 * i - 440, height - 296 + 57 * j, x, y + 30);
          p5.stroke(150, currentColor, 50);
          p5.strokeWeight(20);
          p5.line(offset + width / 2 + 80 * i - 440, height - 296 + 57 * j, x, y + 30);
          p5.stroke(0);
          p5.strokeWeight(1);
        }

      }
    }


    // //contract proto 1
    // p5.rectMode(p5.CORNER)
    // p5.fill(50, 50, 50);
    // p5.rect(50, contractY, 400, 600, 25);
    // p5.fill(125, 125, 125);
    // p5.rect(90, contractY - 200, 30, 200);
    // p5.rect(95, contractY - 400, 20, 200);
    // p5.rect(100, contractY - 600, 10, 200);
    // p5.rect(80, contractY - 625, 50, 25);
    // p5.fill(0, 125, 0);
    // p5.rect(75, contractY + 25, 350, 200, 50);
    // p5.fill(0, 0, 0);
    // p5.rect(75, contractY + 250, 350, 300, 25);

    // //contract logic
    // if (p5.mouseX > 100 && p5.mouseX < 500 && p5.mouseY > height - 100 && p5.mouseY < height) {
    //   if (contractStep <= 7) {
    //     contractY += contractStep * contractStep - 7 * contractStep;
    //     contractStep += 0.1;
    //   }
    // } else if (contractStep >= 0) {
      
    //   contractY -= contractStep * contractStep - 7 * contractStep;
    //   contractStep -= 0.1;
    // }

    // //reset contract position
    // if (contractY > 900 || contractStep <= 0) {
    //   contractY = 900;
    //   contractStep = 0;
    // }
    // if (contractY < 330 || contractStep >= 7) {
    //   contractY = 330;
    //   contractStep = 7;
    // }

        //contract proto 1
    p5.rectMode(p5.CORNER)
    p5.fill(160, 150, 150);
    p5.rect(50, contractY, 400, 600, 25);
    //contract logic
    if (p5.mouseX > 100 && p5.mouseX < 500 && p5.mouseY > height - 100 && p5.mouseY < height) {
      if (contractStep <= 7) {
        contractY += contractStep * contractStep - 7 * contractStep;
        contractStep += 0.1;
      }
    } else if (contractStep >= 0) {
      
      contractY -= contractStep * contractStep - 7 * contractStep;
      contractStep -= 0.1;
    }

    //reset contract position
    if (contractY > 900 || contractStep <= 0) {
      contractY = 900;
      contractStep = 0;
    }
    if (contractY < 330 || contractStep >= 7) {
      contractY = 330;
      contractStep = 7;
    }

    //scoring and stuff
    p5.rectMode(p5.CORNER)
    p5.fill(150, 150, 150);
    p5.rect(20, 20, 300, 50, 50);
    p5.fill(0);
    p5.textSize(25);
    //change to clock
    p5.text("Time: ", 30, 55);

    //full screen button, should be at bottom
    p5.rectMode(p5.CORNER)
    p5.fill(255, 255, 255);
    p5.rect(width - 60, 10, 50, 50);
    p5.fill(0);
    p5.rect(width - 60, 30, 50, 10);
    p5.rect(width - 40, 10, 10, 50);
    p5.rect(width - 50, 20, 30, 30);

    // *** Start of logic

    //alwaus countdown call timer
    if (p5.frameCount % 60 === 0) {
      triggerNextCall-= 0.5;
    }

    // Initiate a call
    if (callsRemaining > 0 && triggerNextCall <= 0) {
      let usedHoles = [];
      for (let i = 0; i < calls.length; i++) {
        usedHoles.push(calls[i].caller);
        usedHoles.push(calls[i].receiver);
      }

      let tempCaller = Math.floor(90 * Math.random());
      let tempReceiver = Math.floor(90 * Math.random());
      while (usedHoles.includes(tempCaller)) {
        tempCaller = Math.floor(90 * Math.random());
      }
      while (usedHoles.includes(tempReceiver)) {
        tempReceiver = Math.floor(90 * Math.random());
      }

      calls.push(
        {
          caller: tempCaller,
          receiver: tempReceiver,
          status: 0,
          /* needs work */
          duration: 30,
          convoID: 0,
          storyline: false,
        }
      );
      holes[tempCaller] = false;
      callsRemaining--;
      triggerNextCall = timeBetween;
    }

  };

  const mousePressed = (p5) => {
    const widthOffset = 20;
    const heightOffset = 50;

    //plug to cursor detection
    for (let i = 11; i >= 0; i--) {
      let exit = false;
      if (exit === true) {
        break;
      }
      for (let j = 1; j >= 0; j--) {
        let offset = i * 5 - 27.5
        if (j === 0) {
          offset = 0
        }
        //if plug is clicked
        if (p5.mouseX > offset + width / 2 + 80 * i - 440 - widthOffset && p5.mouseX < offset + width / 2 + 80 * i - 440 + widthOffset &&
          p5.mouseY > height - 356 + 60 * j - heightOffset && p5.mouseY < height - 356 + 60 * j + heightOffset) {
          //toggle off a currently held plug
            if (j * 12 + i === currentPlug) {
            currentPlug = null
            plugs[j * 12 + i] = !plugs[j * 12 + i]
            exit = true;
            break;
            //if mouse is over a resting plug
          } else if (currentPlug === null && plugs[j * 12 + i] === true) {
            plugs[j * 12 + i] = !plugs[j * 12 + i]
            currentPlug = j * 12 + i;
            exit = true;
            break;
          }
        }
      }
    }

    //plug and hole detection
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 9; j++) {
        let offset = 0;
        let radiusOffset = 25;
        if (i > 4) {
          offset = 50;
        }
        if (p5.mouseX < offset + width / 2 + 90 * i - 430 + radiusOffset && p5.mouseX > offset + width / 2 + 90 * i - 430 - radiusOffset && p5.mouseY < height - 900 + 60 * j + radiusOffset && p5.mouseY > height - 900 + 60 * j - radiusOffset) {
          // place plug into hole
          if ((!holes[10 * j + i] || holes[10 * j + i] === true) && currentPlug !== null) {
            if (currentPlug <= 11 && holes[10 * j + i] === false) {
              holes[10 * j + i] = currentPlug;
              lights[currentPlug] = 1;
              currentPlug = null;
              plugs[holes[10 * j + i]] = 10 * j + i;
            } else if (holes[10 * j + i] === null) {
              holes[10 * j + i] = currentPlug;  
              currentPlug = null;
              plugs[holes[10 * j + i]] = 10 * j + i;
            }
            //remove plug from hole *** NEEDS LOGIC FOR TAKING BOTH OUT WHEN CALL DONE LIGHT
          } else if ((holes[10 * j + i] && holes[10 * j + i] !== true) && currentPlug === null && lights[holes[10 * j + i] % 12] === 0) {
            currentPlug = holes[10 * j + i]
            plugs[holes[10 * j + i]] = false;
            holes[10 * j + i] = null;
          }
        }
      }
    }

    //key toggling
    for (let i = 0; i < 12; i++) {
      if (p5.mouseX > width / 2 + 88 * i + (8 * (i - 5.5)) - 484 && p5.mouseX < width / 2 + 88 * i + (8 * (i - 5.5)) - 424 && p5.mouseY > height - 186 && p5.mouseY < height - 106) {
        if (lights[i] === 1) {
          keys[i] = 1;
          // ** GET NOTIF FOR RECEIVER
        } else if (lights[i] === 2) {
          keys[i] = -1;
        }
        
      };
    }

    //toggle fullscreen
    if (p5.mouseX > width - 60 && p5.mouseX < width - 10 && p5.mouseY > 10 && p5.mouseY < 60) {
      if (width === 1400) {
        width = p5.windowWidth
        height = p5.displayHeight
      } else {
        width = 1400
        height = 1000
      }
      let fs = p5.fullscreen();
      p5.fullscreen(!fs);
    }
  };

  // on window resize, change canvas size
  const windowResized = (p5) => {
    p5.resizeCanvas(width, height)
  }

  return (
    <div className="container">
      <Sketch className={"game"} preload={preload} setup={setup} draw={draw} mousePressed={mousePressed} windowResized={windowResized} />
    </div>
  );
}

export default App;
