import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
//import {TWEEN} from 'three/examples/jsm/libs/tween.module.min.js';
//import gsap from 'gsap'
import * as dat from "dat.gui";

/*Global variables*/

let rotation = 0;
let landWidth = 30;
let landHeight = 30;
let map = new Map();

/*Base*/
// Canvas
const canvas = document.querySelector("canvas.polycity");

// Scene
const scene = new THREE.Scene();

/*MODEL LOADERS*/

//a videoban: 21. video 56. perc

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

const roadTexture = new THREE.TextureLoader().load("/texture/road3.jpg");
const cornerTexture = new THREE.TextureLoader().load("/texture/corner.jpg");
const fourRoadTexture = new THREE.TextureLoader().load("/texture/fourRoad.jpg");

/*Objects*/

console.log("land width " + landWidth);

/* Land */
const material = new THREE.MeshStandardMaterial({ color: 0x73db40 });
let land = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), material);
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
const object = new THREE.Mesh(
  new THREE.ConeGeometry(0.5, 1, 20),
  new THREE.MeshLambertMaterial({ color: 0xfa70aa })
);
object.castShadow = true;
object.receiveShadow = true;
object.position.set(0, -1.5, 0);
object.rotation.x = Math.PI / 2;
scene.add(object);

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

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Resize updter

window.addEventListener("resize", () => {
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
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

window.addEventListener("keydown", (event) => {
  if (event.keyCode == 38) {
    if (Math.abs(object.position.z - 1) < land.scale.y / 2) {
      object.position.z -= 1;
    }
    console.log("x= " + object.position.x + "z= " + object.position.z);
  }
  if (event.keyCode == 39) {
    if (Math.abs(object.position.x + 1) < land.scale.x / 2) {
      object.position.x += 1;
    }
    console.log("x=" + object.position.x + "z=" + object.position.z);
  }
  if (event.keyCode == 37) {
    if (Math.abs(object.position.x - 1) < land.scale.x / 2) {
      object.position.x -= 1;
    }
    console.log("x=" + object.position.x + "z=" + object.position.z);
  }
  if (event.keyCode == 40) {
    if (Math.abs(object.position.z + 1) < land.scale.y / 2) {
      object.position.z += 1;
    }
    console.log("x=" + object.position.x + "z=" + object.position.z);
  }
  if (event.keyCode == 51) {
    rotation += Math.PI / 2;
    object.rotation.z = rotation;
  }
  if (event.keyCode == 49) {
    if (!map.has(`${object.position.x}_${object.position.z}`)) {
      gltfLoader.load("/models/Panel/panel.gltf", (gltf) => {
        gltf.scene.scale.set(0.04, 0.04, 0.04);
        gltf.scene.position.set(object.position.x, y, object.position.z);
        gltf.scene.rotation.y -= rotation;
        gltf.scene.receiveShadow = true;
        scene.add(gltf.scene);
        map.set(`${object.position.x}_${object.position.z}`, 1);
        console.log("panel added");
      });
      generatingRoad(object.position.x, object.position.z);
      //     drawingRoad();
      landGrow(object.position.x, object.position.z);
    }
  }

  if (event.keyCode == 50) {
    if (!map.has(`${object.position.x}_${object.position.z}`)) {
      gltfLoader.load("/models/IceCream/gltf/icecream.gltf", (gltf) => {
        gltf.scene.scale.set(0.02, 0.02, 0.02);
        gltf.scene.position.set(object.position.x, y, object.position.z);
        gltf.scene.rotation.y -= rotation;
        gltf.scene.receiveShadow = true;
        scene.add(gltf.scene);
        map.set(`${object.position.x}_${object.position.z}`, 1);
        console.log("icecream added");
      });
      generatingRoad(object.position.x, object.position.z);
      //      drawingRoad();
      landGrow(object.position.x, object.position.z);
    }
  }

  if (event.keyCode == 52) {
    if (!map.has(`${object.position.x}_${object.position.z}`)) {
      gltfLoader.load("/models/House/house.gltf", (gltf) => {
        gltf.scene.scale.set(0.025, 0.025, 0.025);
        gltf.scene.position.set(object.position.x, y, object.position.z);
        gltf.scene.rotation.y = -Math.PI / 2;
        gltf.scene.rotation.y -= rotation;
        gltf.scene.receiveShadow = true;
        scene.add(gltf.scene);
        map.set(`${object.position.x}_${object.position.z}`, 1);
        console.log("house added");
      });
      generatingRoad(object.position.x, object.position.z);
      //     drawingRoad();
      landGrow(object.position.x, object.position.z);
    }
  }
  /*OFFICE */
  if (event.keyCode == 53) {
    if (!map.has(`${object.position.x}_${object.position.z}`)) {
      gltfLoader.load("/models/House/house.gltf", (gltf) => {
        gltf.scene.scale.set(0.025, 0.025, 0.025);
        gltf.scene.position.set(object.position.x, y, object.position.z);
        gltf.scene.rotation.y = -Math.PI / 2;
        gltf.scene.rotation.y -= rotation;
        gltf.scene.receiveShadow = true;
        scene.add(gltf.scene);
        map.set(`${object.position.x}_${object.position.z}`, 1);
        console.log("house added");
      });
      generatingRoad(object.position.x, object.position.z);
      //     drawingRoad();
      landGrow(object.position.x, object.position.z);
    }
  }
  /*HAMBURGER */
  if (event.keyCode == 54) {
    if (!map.has(`${object.position.x}_${object.position.z}`)) {
      gltfLoader.load("/models/House/house.gltf", (gltf) => {
        gltf.scene.scale.set(0.025, 0.025, 0.025);
        gltf.scene.position.set(object.position.x, y, object.position.z);
        gltf.scene.rotation.y = -Math.PI / 2;
        gltf.scene.rotation.y -= rotation;
        gltf.scene.receiveShadow = true;
        scene.add(gltf.scene);
        map.set(`${object.position.x}_${object.position.z}`, 1);
        console.log("house added");
      });
      generatingRoad(object.position.x, object.position.z);
      //     drawingRoad();
      landGrow(object.position.x, object.position.z);
    }
  }
  /*GROCERY */
  if (event.keyCode == 55) {
    if (!map.has(`${object.position.x}_${object.position.z}`)) {
      gltfLoader.load("/models/House/house.gltf", (gltf) => {
        gltf.scene.scale.set(0.025, 0.025, 0.025);
        gltf.scene.position.set(object.position.x, y, object.position.z);
        gltf.scene.rotation.y = -Math.PI / 2;
        gltf.scene.rotation.y -= rotation;
        gltf.scene.receiveShadow = true;
        scene.add(gltf.scene);
        map.set(`${object.position.x}_${object.position.z}`, 1);
        console.log("house added");
      });
      generatingRoad(object.position.x, object.position.z);
      //      drawingRoad();
      landGrow(object.position.x, object.position.z);
    }
  }
});

/*functions */

function landGrow(x, y) {
  if (Math.abs(x) + 10 > land.scale.x / 2) {
    land.scale.y += Math.ceil(Math.abs(x) + 10 - land.scale.x / 2); //adunk minden épületnek egy 5 sugarú területet
    land.scale.x += Math.ceil(Math.abs(x) + 10 - land.scale.x / 2);
  }
  if (Math.abs(y) + 10 > land.scale.x / 2) {
    land.scale.x += Math.ceil(Math.abs(y) + 10 - land.scale.y / 2); // azért kell előbb az x, hogy ne változtassuk meg scale.y értékét, mert különben azzal számol tovább
    land.scale.y += Math.ceil(Math.abs(y) + 10 - land.scale.y / 2);
  }
}

function generatingRoad(x, z) {
  // TODO: ellenőrizzük le, hogy van e már azon a helyen valami. ha igen akkor ne csináljunk semmit
  map.set(`${object.position.x - 1}_${object.position.z - 1}`, 21);
  map.set(`${object.position.x}_${object.position.z - 1}`, 31);
  map.set(`${object.position.x + 1}_${object.position.z - 1}`, 22);
  map.set(`${object.position.x + 1}_${object.position.z}`, 32);
  map.set(`${object.position.x + 1}_${object.position.z + 1}`, 23);
  map.set(`${object.position.x}_${object.position.z + 1}`, 31);
  map.set(`${object.position.x - 1}_${object.position.z + 1}`, 24);
  map.set(`${object.position.x - 1}_${object.position.z}`, 32);
  roadRebuild();
}

function drawingRoad() {
  map.forEach((value, key) => {
    let [xKey, zKey] = key.split("_");
    const roadMaterial = new THREE.MeshStandardMaterial({ map: roadTexture });
    const cornerMaterial = new THREE.MeshStandardMaterial({
      map: cornerTexture,
    });
    const fourRoadMaterial = new THREE.MeshStandardMaterial({
      map: fourRoadTexture,
    });

    switch (value) {
      case 21:
        const road2 = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(1, 1),
          cornerMaterial
        );
        road2.rotation.x = -Math.PI * 0.5;
        road2.position.set(xKey, y + 0.01, zKey);
        scene.add(road2);
        break;
      case 31:
        const road3 = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(1, 1),
          roadMaterial
        );
        road3.rotation.x = -Math.PI * 0.5;
        road3.rotation.z = -Math.PI * 0.5;
        road3.position.set(xKey, y + 0.01, zKey);
        scene.add(road3);

        break;
      case 22:
        const road4 = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(1, 1),
          cornerMaterial
        );
        road4.rotation.x = -Math.PI * 0.5;
        road4.rotation.z = -Math.PI * 0.5;

        road4.position.set(xKey, y + 0.01, zKey);
        scene.add(road4);
        break;
      case 32:
        const road5 = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(1, 1),
          roadMaterial
        );
        road5.rotation.x = -Math.PI * 0.5;
        road5.position.set(xKey, y + 0.01, zKey);
        scene.add(road5);
        break;
      case 23:
        const road6 = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(1, 1),
          cornerMaterial
        );
        road6.rotation.x = -Math.PI * 0.5;
        road6.rotation.z = -Math.PI;

        road6.position.set(xKey, y + 0.01, zKey);
        scene.add(road6);
        break;
      case 24:
        const road8 = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(1, 1),
          cornerMaterial
        );
        road8.rotation.x = -Math.PI * 0.5;
        road8.rotation.z = -Math.PI * 1.5;

        road8.position.set(xKey, y + 0.01, zKey);
        scene.add(road8);
        break;
      case 44:
        const road44 = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(1, 1),
          fourRoadMaterial
        );

        road44.position.set(xKey, y + 0.01, zKey);
        scene.add(road44);
        break;
    }
  });
}

function roadRebuild() {
  map.forEach((value, key) => {
    if (value !== 1) {
      let [xKey, zKey] = key.split("_");
      console.log(
        map.has(`${xKey - 1}_${zKey}`) &&
          map.get(`${xKey - 1}_${zKey}`) !== 1 &&
          map.has(`${xKey + 1}_${zKey}`) &&
          map.get(`${xKey + 1}_${zKey}`) !== 1 &&
          (
            map.has(`${xKey}_${zKey - 1}`) &&
            map.get(`${xKey}_${zKey - 1}`) !== 1
          )(
            map.has(`${xKey}_${zKey + 1}`) &&
              map.get(`${xKey}_${zKey + 1}`) !== 1
          )
      );
      /* console.log(key + map.has(`${xKey - 1}_${zKey}`));
      console.log(map);
*/
      console.log(key + " " + map.has(`${xKey - 1}_${zKey}`) + "jobb");
      console.log(map.has(`${xKey + 1}_${zKey}`) + "alatta");
      console.log(map.has(`${xKey}_${zKey + 1}`) + " felette");
      console.log(map.has(`${xKey}_${zKey - 1}`) + " bal");

      if (
        map.has(`${xKey - 1}_${zKey}`) &&
        map.get(`${xKey - 1}_${zKey}`) !== 1 &&
        map.has(`${xKey + 1}_${zKey}`) &&
        map.get(`${xKey + 1}_${zKey}`) !== 1 &&
        (
          map.has(`${xKey}_${zKey - 1}`) && map.get(`${xKey}_${zKey - 1}`) !== 1
        )(
          map.has(`${xKey}_${zKey + 1}`) && map.get(`${xKey}_${zKey + 1}`) !== 1
        )
      ) {
        console.log("set44");

        map.set(`${xKey}_${zKey}`, 44);
      }
    }
  });
  drawingRoad();
}
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

/*
útgenerálást törölni, majd frissíteni az új elemek szerint 
*/
