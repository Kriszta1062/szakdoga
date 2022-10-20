import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/*Global variables*/

const globals = {
  sizes: {
    width: window.innerWidth,
    height: window.innerHeight,
    camera_size: 20,
  },

  rotation: 0,
  map: new Map(),
  roads: new Map(),

  groundObject: {
    road: {
      road_down_right: 121,
      road_up_right: 122,
      road_down_left: 124,
      road_up_left: 123,
      road_hori: 131,
      road_verti: 132,
      four_crossing: 144,
      three_up_crossing: 143,
      three_down_crossing: 142,
      three_left_crossing: 141,
      three_right_crossing: 140,
      final_road: 146,
    },

    building: {
      house: 10,
    },

    vehicle: {
      car: 201,
    },
  },

  circs: {
    population: 0,
    shopping: 0,
    work: 0,
    fun: 0,
  },

  scenes: {},

  // Scene
  scene: new THREE.Scene(),

  land: new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    new THREE.MeshStandardMaterial({ color: 0x60ba5b })
  ),

  sky: new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    new THREE.MeshStandardMaterial({ color: 0x82d1f4 })
  ),

  navigationHelper: {
    placePicker: new THREE.Mesh(
      new THREE.ConeGeometry(0.5, 1, 20),
      new THREE.MeshLambertMaterial({ color: 0xfa70aa })
    ),
  },

  canvas: document.querySelector("canvas.polycity"),

  texture: {},

  cars: [],

  dir: [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ],
};

globals.camera = new THREE.PerspectiveCamera(
  75,
  globals.sizes.width / globals.sizes.height,
  0.1,
  2000
);

globals.orbit = new OrbitControls(globals.camera, globals.canvas);
globals.orbit.maxDistance = 20; // itt allithatjuk be hogy ne menjunk ki a kameraval a dobozbol
globals.orbit.maxPolarAngle = Math.PI / 2;
globals.orbit.screenSpacePanning = false;

globals.renderer = new THREE.WebGLRenderer({
  canvas: globals.canvas,
});

export default globals;
