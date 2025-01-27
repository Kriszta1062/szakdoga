import "./style.css";
import * as THREE from "three";
import { keydownListener, resizeListener, setCityStats } from "./listeners";
import { loadModels } from "./loader";
import globals from "./globals";
import { movingCars } from "./functions";

(async () => {
  let loading_schreen = document.getElementById("loading");
  let glass_panel = document.getElementById("glasspanel");

  console.log("Loading models...");
  await loadModels();
  console.log("Models loaded");
  loading_schreen.style.visibility = "hidden";
  glass_panel.style.visibility = "visible";
  initWorld();
})();

function initWorld() {
  let landWidth = 100;
  let landHeight = 100;

  setCityStats();

  /* Land */
  globals.land.receiveShadow = true;
  globals.land.rotation.x = -Math.PI * 0.5;
  globals.land.position.y = -1.5;
  globals.scene.add(globals.land);
  globals.land.geometry.needsUpdate = true;
  globals.land.geometry.dynamic = true;
  globals.land.scale.x = landWidth;
  globals.land.scale.y = landHeight;

  globals.wall_east.receiveShadow = true;
  globals.wall_east.position.y = landWidth / 4 - 1.5;
  globals.wall_east.position.x = -landWidth / 2;
  globals.scene.add(globals.wall_east);
  globals.wall_east.geometry.needsUpdate = true;
  globals.wall_east.geometry.dynamic = true;
  globals.wall_east.scale.x = landWidth;
  globals.wall_east.scale.y = landHeight / 2;
  globals.wall_east.rotation.y = Math.PI * 0.5;

  globals.wall_north.receiveShadow = true;
  globals.wall_north.position.y = landWidth / 4 - 1.5;
  globals.wall_north.position.z = -landWidth / 2;
  globals.scene.add(globals.wall_north);
  globals.wall_north.geometry.needsUpdate = true;
  globals.wall_north.geometry.dynamic = true;
  globals.wall_north.scale.x = landWidth;
  globals.wall_north.scale.y = landHeight / 2;

  globals.wall_south.receiveShadow = true;
  globals.wall_south.position.y = landWidth / 4 - 1.5;
  globals.wall_south.position.z = landWidth / 2;
  globals.scene.add(globals.wall_south);
  globals.wall_south.geometry.needsUpdate = true;
  globals.wall_south.geometry.dynamic = true;
  globals.wall_south.scale.x = landWidth;
  globals.wall_south.scale.y = landHeight / 2;
  globals.wall_south.rotation.y = Math.PI;

  globals.wall_west.receiveShadow = true;
  globals.wall_west.position.y = landWidth / 4 - 1.5;
  globals.wall_west.position.x = landWidth / 2;
  globals.scene.add(globals.wall_west);
  globals.wall_west.geometry.needsUpdate = true;
  globals.wall_west.geometry.dynamic = true;
  globals.wall_west.scale.x = landWidth;
  globals.wall_west.scale.y = landHeight / 2;
  globals.wall_west.rotation.y = -Math.PI * 0.5;

  globals.sky.receiveShadow = true;
  globals.sky.rotation.x = Math.PI * 0.5;
  globals.sky.position.y = landWidth / 2 - 1.5;
  globals.scene.add(globals.sky);
  globals.sky.geometry.needsUpdate = true;
  globals.sky.geometry.dynamic = true;
  globals.sky.scale.x = landWidth;
  globals.sky.scale.y = landHeight;

  /* Place picker */
  globals.navigationHelper.placePicker.castShadow = true;
  globals.navigationHelper.placePicker.receiveShadow = true;
  globals.navigationHelper.placePicker.position.set(0, -1.5, 0);
  globals.navigationHelper.placePicker.rotation.x = Math.PI / 2;
  globals.scene.add(globals.navigationHelper.placePicker);

  /*Lights*/
  // Ambient light
  const ambientLight = new THREE.AmbientLight("#ffffff", 0.6);
  globals.scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5, 0, 2);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.set(1024, 1024);
  pointLight.position.set(0, 5, 0);
  globals.scene.add(pointLight);

  /*Sizes*/

  //Resize updter

  window.addEventListener("resize", resizeListener);

  /*Fullschreen function*/

  window.addEventListener("dblclick", () => {
    if (!document.fullscreenElement) {
      globals.canvas.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  });

  window.addEventListener("keydown", keydownListener);

  /*Camera*/

  // Base globals.camera

  globals.camera.position.z = 3;
  globals.scene.add(globals.camera);

  /*Renderer*/

  globals.renderer.setSize(globals.sizes.width, globals.sizes.height);

  /*Animate*/

  // const clock = new THREE.Clock();

  const tick = () => {
    // const elapsedTime = clock.getElapsedTime();

    // Update controls
    globals.orbit.update();

    // Render
    globals.renderer.render(globals.scene, globals.camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();

  movingCars();
}
