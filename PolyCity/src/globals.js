import * as THREE from "three";

/*Global variables*/
const globals = {
  sizes: {
    width: window.innerWidth,
    height: window.innerHeight,
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
    },

    building: {
      house: 10,
    },

    vehicle: {
      car: 201,
    },
  },

  scenes: {},

  // Scene
  scene: new THREE.Scene(),

  land: new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    new THREE.MeshStandardMaterial({ color: 0x54cc58 })
  ),

  wall_north: new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    new THREE.MeshStandardMaterial({ color: 0x6db8d6 })
  ),

  wall_south: new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    new THREE.MeshStandardMaterial({ color: 0x6db8d6 })
  ),

  wall_east: new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    new THREE.MeshStandardMaterial({ color: 0x6db8d6 })
  ),

  wall_west: new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    new THREE.MeshStandardMaterial({ color: 0x6db8d6 })
  ),

  sky: new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1),
    new THREE.MeshStandardMaterial({ color: 0x6db8d6 })
  ),

  navigationHelper: {
    placePicker: new THREE.Mesh(
      new THREE.ConeGeometry(0.5, 1, 20),
      new THREE.MeshLambertMaterial({ color: 0xfa70aa })
    ),
  },

  canvas: document.querySelector("canvas.polycity"),
};

globals.camera = new THREE.PerspectiveCamera(
  75,
  globals.sizes.width / globals.sizes.height,
  0.1,
  200
);

globals.renderer = new THREE.WebGLRenderer({
  canvas: globals.canvas,
});

export default globals;
