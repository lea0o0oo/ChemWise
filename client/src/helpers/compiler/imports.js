function resolveImports(code) {
  if (code.includes("await delay(")) {
    const toPut =
      "const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));";
    code = toPut + "\n" + code;
  }
  if (code.includes("slideSprite(")) {
    const toPut = `function slideSprite(sprite, params) {
 return new Promise((resolve, reject) => {
   let startTime = Date.now();

   app.ticker.add((delta) => {
     let elapsed = Date.now() - startTime;
     if (elapsed > params.duration) {
        sprite.x = params.endX;
       sprite.y = params.endY;
        app.ticker.remove(slideSprite);
        resolve();
      } else {
        let t = elapsed / params.duration;
        sprite.x = params.startX + t * (params.endX - params.startX);
       sprite.y = params.startY + t * (params.endY - params.startY);
      }
    });
  });
}`;
    code = toPut + "\n" + code;
  }
  return code;
}

export default { resolveImports };
