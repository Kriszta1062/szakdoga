import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { landGrow, generatingRoad } from "./functions";
//import {TWEEN} from 'three/examples/jsm/libs/tween.module.min.js';
//import gsap from 'gsap'
import * as dat from "dat.gui";
import { keydownListener, resizeListener } from "./listeners";
import { loadModels } from "./loader";
import globals from "./globals";

(async () => {
  console.log("Loading models...");
  await loadModels();
  console.log("Models loaded");
  initWorld();
})();

function initWorld() {
  let landWidth = 30;
  let landHeight = 30;

  //a videoban: 21. video 56. perc

  /* Land */
  globals.land.receiveShadow = true;
  globals.land.rotation.x = -Math.PI * 0.5;
  globals.land.position.y = -1.5;
  globals.scene.add(globals.land);
  const y = globals.land.position.y;
  globals.land.geometry.needsUpdate = true;
  globals.land.geometry.dynamic = true;
  globals.land.scale.x = landWidth;
  globals.land.scale.y = landHeight;

  /* Place picker */
  globals.navigationHelper.placePicker.castShadow = true;
  globals.navigationHelper.placePicker.receiveShadow = true;
  globals.navigationHelper.placePicker.position.set(0, -1.5, 0);
  globals.navigationHelper.placePicker.rotation.x = Math.PI / 2;
  globals.scene.add(globals.navigationHelper.placePicker);

  /*Lights*/
  // Ambient light
  const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
  globals.scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.6, 0, 2);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.set(1024, 1024);
  pointLight.position.set(10, 3, 0);
  globals.scene.add(pointLight);
  //const helper = new THREE.PointLightHelper( pointLight, 10 )
  //globals.scene.add( helper )

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

  // Controls
  const controls = new OrbitControls(globals.camera, globals.canvas);
  controls.enableDamping = true;

  /*Renderer*/

  globals.renderer.setSize(globals.sizes.width, globals.sizes.height);

  /*Animate*/

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    globals.renderer.render(globals.scene, globals.camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
}

/*
  - parenthez kötni az utat és minden generáláskor kitörölni és újraépíteni az utakat 


útgenerálást törölni, majd frissíteni az új elemek szerint 
*/
