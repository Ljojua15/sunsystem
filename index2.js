const app = new PIXI.Application({ background: "#1099bb", resizeTo: window });

document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

// Create a new texture

const texture = PIXI.Texture.from("./assets/image.png");

let bunny;

for (let i = 0; i < 25; i++) {
  bunny = new PIXI.Sprite(texture);

  bunny.anchor.set(0.5);

  bunny.x = (i % 5) * 40;

  bunny.y = Math.floor(i / 5) * 40;

  container.addChild(bunny);
}

// Move container to the center

container.x = app.screen.width / 2;

container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates

container.pivot.x = container.width / 2;

container.pivot.y = container.height / 2;

let rotating = false;

let rotationSpeed = 0.1;

let canClick = true;

let rotationTimeout;

var angleStep = 40;

container.interactive = true;

function animate() {
  bunny.angle += angleStep;

  angleStep = angleStep - angleStep / rotationSpeed;

  if (angleStep <= 0.1) {
    console.log("stopped rotation");

    bunny.angle = bunny.angle;

    return bunny.angle;
  } else {
    requestAnimationFrame(animate);
  }
}

container.on("click", () => {
  if (!rotating && canClick) {
    rotating = true;

    canClick = false; // Disable further clicks until the rotation is complete

    const deceleration = 0.05;

    const stopRotation = () => {
      rotating = false;

      rotationSpeed = 0;

      canClick = true;

      // Enable clicks again
    };

    const easeOut = (t) => Math.sin((t * Math.PI) / 2);

    // Clear any previous timeouts

    clearTimeout(rotationTimeout);

    // Schedule the stop after 10 seconds

    rotationTimeout = setTimeout(stopRotation, 10000);

    console.log(rotationTimeout);

    const decelerate = () => {
      if (rotating) {
        rotationSpeed = deceleration;

        container.rotation -= rotationSpeed * easeOut(rotationSpeed);

        animate();
      }
    };

    console.log(container.rotation);

    decelerate();
  }
});

// Listen for animate update

PIXI.Ticker.shared.add((delta) => {
  if (rotating) {
    container.rotation += rotationSpeed;
  }
});
