import {
  rotation,
  map,
  sizes,
  land,
  placePicker,
  scene,
  scenes,
  groundObject,
} from "./globals";

import { camera } from "./script";
import { generatingRoad, landGrow, isRoad } from "./functions";

function keydownListener(event) {
  if (event.keyCode == 38) {
    if (Math.abs(placePicker.position.z - 1) < land.scale.y / 2) {
      placePicker.position.z -= 1;
    }
    console.log(
      "x= " + placePicker.position.x + "z= " + placePicker.position.z
    );
  }
  if (event.keyCode == 39) {
    if (Math.abs(placePicker.position.x - -1) < land.scale.x / 2) {
      placePicker.position.x += 1;
    }
    console.log("x=" + placePicker.position.x + "z=" + placePicker.position.z);
  }
  if (event.keyCode == 37) {
    if (Math.abs(placePicker.position.x - 1) < land.scale.x / 2) {
      placePicker.position.x -= 1;
    }
    console.log("x=" + placePicker.position.x + "z=" + placePicker.position.z);
  }
  if (event.keyCode == 40) {
    if (Math.abs(placePicker.position.z - -1) < land.scale.y / 2) {
      placePicker.position.z += 1;
    }
    console.log("x=" + placePicker.position.x + "z=" + placePicker.position.z);
  }
  if (event.keyCode == 51) {
    rotation += Math.PI / 2;
    placePicker.rotation.z = rotation;
  }
  /* PANEL */
  if (event.keyCode == 49) {
    if (!map.has(`${placePicker.position.x}_${placePicker.position.z}`)) {
      const panelCopy = scenes.panelScene.clone();
      panelCopy.position.set(
        placePicker.position.x,
        land.position.y,
        placePicker.position.z
      );
      panelCopy.rotation.y -= rotation;
      map.set(
        `${placePicker.position.x}_${placePicker.position.z}`,
        groundObject.building.house
      );
      scene.add(panelCopy);
      console.log("panel added");

      generatingRoad(placePicker.position.x, placePicker.position.z);
      //     drawingRoad();
      landGrow(placePicker.position.x, placePicker.position.z);
    }
  }
  /* ICE CREAM */
  if (event.keyCode == 50) {
    if (!map.has(`${placePicker.position.x}_${placePicker.position.z}`)) {
      const iceCreamScene = scenes.iceCreamScene.clone();

      iceCreamScene.position.set(
        placePicker.position.x,
        land.position.y,
        placePicker.position.z
      );
      iceCreamScene.rotation.y -= rotation;
      scene.add(iceCreamScene);
      map.set(
        `${placePicker.position.x}_${placePicker.position.z}`,
        groundObject.building.house
      );
      console.log("icecream added");
      console.log(map);

      generatingRoad(placePicker.position.x, placePicker.position.z);
      //      drawingRoad();
      landGrow(placePicker.position.x, placePicker.position.z);
    }
  }
  /* HOUSE */
  if (event.keyCode == 52) {
    if (!map.has(`${placePicker.position.x}_${placePicker.position.z}`)) {
      const houseScene = scenes.houseScene.clone();

      houseScene.position.set(
        placePicker.position.x,
        land.position.y,
        placePicker.position.z
      );
      houseScene.rotation.y = -Math.PI / 2;
      houseScene.rotation.y -= rotation;
      scene.add(houseScene);
      map.set(
        `${placePicker.position.x}_${placePicker.position.z}`,
        groundObject.building.house
      );
      console.log("house added");
      generatingRoad(placePicker.position.x, placePicker.position.z);
      //     drawingRoad();
      landGrow(placePicker.position.x, placePicker.position.z);
    }
  }
  /*OFFICE */
  if (event.keyCode == 53) {
    if (!map.has(`${placePicker.position.x}_${placePicker.position.z}`)) {
      const officeScene = scenes.officeScene.clone();

      officeScene.position.set(
        placePicker.position.x,
        land.position.y,
        placePicker.position.z
      );
      officeScene.rotation.y = -Math.PI / 2;
      officeScene.rotation.y -= rotation;
      scene.add(officeScene);
      map.set(
        `${placePicker.position.x}_${placePicker.position.z}`,
        groundObject.building.house
      );
      console.log("house added");

      generatingRoad(placePicker.position.x, placePicker.position.z);
      //     drawingRoad();
      landGrow(placePicker.position.x, placePicker.position.z);
    }
  }
  /*HAMBURGER */
  if (event.keyCode == 54) {
    if (!map.has(`${placePicker.position.x}_${placePicker.position.z}`)) {
      const hamburgerScene = scenes.hamburgerScene.clone();

      hamburgerScene.position.set(
        placePicker.position.x,
        land.position.y,
        placePicker.position.z
      );
      hamburgerScene.rotation.y = -Math.PI / 2;
      hamburgerScene.rotation.y -= rotation;
      scene.add(hamburgerScene);
      map.set(
        `${placePicker.position.x}_${placePicker.position.z}`,
        groundObject.building.house
      );
      console.log("house added");

      generatingRoad(placePicker.position.x, placePicker.position.z);
      //     drawingRoad();
      landGrow(placePicker.position.x, placePicker.position.z);
    }
  }
  /*GROCERY */
  if (event.keyCode == 55) {
    if (!map.has(`${placePicker.position.x}_${placePicker.position.z}`)) {
      const groceryScene = scenes.groceryScene.clone();

      groceryScene.position.set(
        placePicker.position.x,
        land.position.y,
        placePicker.position.z
      );
      groceryScene.rotation.y = -Math.PI / 2;
      groceryScene.rotation.y -= rotation;
      scene.add(groceryScene);
      map.set(
        `${placePicker.position.x}_${placePicker.position.z}`,
        groundObject.building.house
      );
      console.log("house added");
      generatingRoad(placePicker.position.x, placePicker.position.z);
      //      drawingRoad();
      landGrow(placePicker.position.x, placePicker.position.z);
    }
  }
  /*TOYSHOP */
  if (event.keyCode == 56) {
    if (!map.has(`${placePicker.position.x}_${placePicker.position.z}`)) {
      const toyShopScene = scenes.toyShopScene.clone();

      toyShopScene.position.set(
        placePicker.position.x,
        land.position.y,
        placePicker.position.z
      );
      toyShopScene.rotation.y -= rotation;
      scene.add(toyShopScene);
      map.set(
        `${placePicker.position.x}_${placePicker.position.z}`,
        groundObject.building.house
      );
      console.log("toyshop added");
      generatingRoad(placePicker.position.x, placePicker.position.z);
      //      drawingRoad();
      landGrow(placePicker.position.x, placePicker.position.z);
    }
  }
  /*PLAYGROUND */
  if (event.keyCode == 57) {
    if (!map.has(`${placePicker.position.x}_${placePicker.position.z}`)) {
      const playgroundScene = scenes.playgroundScene.clone();

      playgroundScene.position.set(
        placePicker.position.x,
        land.position.y,
        placePicker.position.z
      );
      playgroundScene.rotation.y -= rotation;
      scene.add(playgroundScene);
      map.set(
        `${placePicker.position.x}_${placePicker.position.z}`,
        groundObject.building.house
      );
      console.log("toyshop added");
      generatingRoad(placePicker.position.x, placePicker.position.z);
      //      drawingRoad();
      landGrow(placePicker.position.x, placePicker.position.z);
    }
  }
  /*CAR */
  if (event.keyCode == 67) {
    if (
      isRoad(map.get(`${placePicker.position.x}_${placePicker.position.z}`))
    ) {
      // kellenek tovabbi feltetelek az utak iranyarol
      const carScene = scenes.carScene.clone();

      carScene.position.set(
        placePicker.position.x,
        land.position.y,
        placePicker.position.z
      );
      carScene.rotation.y = -Math.PI / 2;
      carScene.rotation.y -= rotation;
      scene.add(carScene);
      map.set(
        `${placePicker.position.x}_${placePicker.position.z}`,
        groundObject.vehicle.car
      );
      console.log("car added");
    }
  }
}

function resizeListener() {
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

export { keydownListener, resizeListener };
