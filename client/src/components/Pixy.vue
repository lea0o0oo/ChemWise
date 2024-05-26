<script setup>
import * as PIXI from "pixi.js";
document.addEventListener("DOMContentLoaded", () => {
  const app = new PIXI.Application({
    background: "#1099bb",
    resizeTo: document.getElementById("eee"),
  });
  document.getElementById("eee").appendChild(app.view);

  const container = new PIXI.Container();

  app.stage.addChild(container);

  // Create a new texture
  const texture = PIXI.Texture.from("https://pixijs.com/assets/bunny.png");

  // Create a 5x5 grid of bunnies
  for (let i = 0; i < 25; i++) {
    const bunny = new PIXI.Sprite(texture);

    bunny.anchor.set(0.5);
    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    container.addChild(bunny);
  }

  // Move container to the center
  container.x = app.view.width / 2;
  container.y = app.view.height / 2;

  // Center bunny sprite in local container coordinates
  container.pivot.x = container.width / 2;
  container.pivot.y = container.height / 2;

  // Listen for animate update
  app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    container.rotation -= 0.01 * delta;
  });
});
</script>

<template>
  <div id="eee" style="width: 100%; height: 300px"></div>
</template>

<style scoped></style>
