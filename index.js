const app = new PIXI.Application({
  width: 1000, // Set the width to 500 pixels
  height: 800, // Set the height to 500 pixels
  transparent: true,
});

document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;

loader.add("background", "path/to/your/BG.jpg").load(setup);

function setup() {
  const texture = PIXI.utils.TextureCache["background"];
  const sprite = new PIXI.Sprite(texture);

  // Initially position and scale the sprite to cover the whole stage
  resizeBackground(sprite);

  // Add the sprite to the stage as a background
  app.stage.addChild(sprite);

  // Listen for window resize events
  window.addEventListener("resize", () => {
    resizeBackground(sprite);
  });
}

function resizeBackground(sprite) {
  // Calculate the scale factor to maintain a 1:1 aspect ratio
  const scaleFactor = Math.min(
    window.innerWidth / 500, // 500 is the desired width
    window.innerHeight / 500 // 500 is the desired height
  );

  // Update sprite size and position to cover the entire stage while maintaining aspect ratio
  //   sprite.width = 500 * scaleFactor;
  //   sprite.height = 500 * scaleFactor;
  //   sprite.position.set(
  //     (window.innerWidth - sprite.width) / 5,
  //     (window.innerHeight - sprite.height) / 5
  //   );
}
