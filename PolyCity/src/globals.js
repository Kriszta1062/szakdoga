import * as THREE from "three";

/*Global variables*/

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

let rotation = 0;
let map = new Map();
const groundObject = {
  road: {
    road_down_right: 121,
    road_up_right: 122,
    road_down_left: 124,
    road_up_left: 123,
    road_hori: 131,
    road_verti: 132,
    four_crossing: 144,
    three_crossing: 143,
  },

  building: {
    house: 10,
  },
};

const scenes = {};

// Scene
const scene = new THREE.Scene();

const material = new THREE.MeshStandardMaterial({ color: 0x73db40 });
let land = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), material);

const placePicker = new THREE.Mesh(
  new THREE.ConeGeometry(0.5, 1, 20),
  new THREE.MeshLambertMaterial({ color: 0xfa70aa })
);

export { sizes, rotation, map, groundObject, scenes, scene, land, placePicker };
