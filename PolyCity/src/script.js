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
import { sizes, land, placePicker, scene } from "./globals";

(async () => {
  console.log("Loading models...");
  await loadModels();
  console.log("Models loaded");
  initWorld();
})();

function initWorld() {
  let landWidth = 30;
  let landHeight = 30;

  /*Base*/
  // Canvas
  const canvas = document.querySelector("canvas.polycity");

  //a videoban: 21. video 56. perc

  /* Land */
  land.receiveShadow = true;
  land.rotation.x = -Math.PI * 0.5;
  land.position.y = -1.5;
  scene.add(land);
  const y = land.position.y;
  land.geometry.needsUpdate = true;
  land.geometry.dynamic = true;
  land.scale.x = landWidth;
  land.scale.y = landHeight;

  /* Place picker */
  placePicker.castShadow = true;
  placePicker.receiveShadow = true;
  placePicker.position.set(0, -1.5, 0);
  placePicker.rotation.x = Math.PI / 2;
  scene.add(placePicker);

  /*Lights*/
  // Ambient light
  const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.6, 0, 2);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.set(1024, 1024);
  pointLight.position.set(10, 3, 0);
  scene.add(pointLight);
  //const helper = new THREE.PointLightHelper( pointLight, 10 )
  //scene.add( helper )

  /*Sizes*/

  //Resize updter

  window.addEventListener("resize", resizeListener);
  /*
// Fullschreen function

window.addEventListener('dblclick', ()=>{
    if(!document.fullscreenElement){
        canvas.requestFullscreen()
    }else{
        document.exitFullscreen()
    }
})
*/

  window.addEventListener("keydown", keydownListener);

  /*Camera*/

  // Base camera

  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.z = 3;
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  /*Renderer*/

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);

  /*Animate*/

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
}

/*
  - parenthez kötni az utat és minden generáláskor kitörölni és újraépíteni az utakat 


útgenerálást törölni, majd frissíteni az új elemek szerint 
*/
