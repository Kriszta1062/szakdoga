import globals from "./globals";

import { generatingRoad, landGrow, isRoad } from "./functions";

function keydownListener(event) {
  if (event.keyCode == 38) {
    if (
      Math.abs(globals.navigationHelper.placePicker.position.z - 1) <
      globals.land.scale.y / 2
    ) {
      globals.navigationHelper.placePicker.position.z -= 1;
    }
    console.log(
      "x= " +
        globals.navigationHelper.placePicker.position.x +
        "z= " +
        globals.navigationHelper.placePicker.position.z
    );
  }
  if (event.keyCode == 39) {
    if (
      Math.abs(globals.navigationHelper.placePicker.position.x - -1) <
      globals.land.scale.x / 2
    ) {
      globals.navigationHelper.placePicker.position.x += 1;
    }
    console.log(
      "x=" +
        globals.navigationHelper.placePicker.position.x +
        "z=" +
        globals.navigationHelper.placePicker.position.z
    );
  }
  if (event.keyCode == 37) {
    if (
      Math.abs(globals.navigationHelper.placePicker.position.x - 1) <
      globals.land.scale.x / 2
    ) {
      globals.navigationHelper.placePicker.position.x -= 1;
    }
    console.log(
      "x=" +
        globals.navigationHelper.placePicker.position.x +
        "z=" +
        globals.navigationHelper.placePicker.position.z
    );
  }
  if (event.keyCode == 40) {
    if (
      Math.abs(globals.navigationHelper.placePicker.position.z - -1) <
      globals.land.scale.y / 2
    ) {
      globals.navigationHelper.placePicker.position.z += 1;
    }
    console.log(
      "x=" +
        globals.navigationHelper.placePicker.position.x +
        "z=" +
        globals.navigationHelper.placePicker.position.z
    );
  }
  if (event.keyCode == 51) {
    globals.rotation += Math.PI / 2;
    globals.navigationHelper.placePicker.rotation.z = globals.rotation;
  }
  /* PANEL */
  if (event.keyCode == 49) {
    if (
      !globals.map.has(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`
      )
    ) {
      const panelCopy = globals.scenes.panelScene.clone();
      panelCopy.position.set(
        globals.navigationHelper.placePicker.position.x,
        globals.land.position.y,
        globals.navigationHelper.placePicker.position.z
      );
      panelCopy.rotation.y -= globals.rotation;
      globals.map.set(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`,
        globals.groundObject.building.house
      );
      globals.scene.add(panelCopy);
      globals.circs.population += 40;
      globals.circs.fun -= 40;
      globals.circs.shopping -= 30;
      globals.circs.work -= 20;
      console.log(globals.circs);
      console.log("panel added");

      generatingRoad(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
      landGrow(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
    }
  }
  /* ICE CREAM */
  if (event.keyCode == 50) {
    if (
      !globals.map.has(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`
      )
    ) {
      const iceCreamScene = globals.scenes.iceCreamScene.clone();

      iceCreamScene.position.set(
        globals.navigationHelper.placePicker.position.x,
        globals.land.position.y,
        globals.navigationHelper.placePicker.position.z
      );
      iceCreamScene.rotation.y -= globals.rotation;
      globals.scene.add(iceCreamScene);
      globals.map.set(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`,
        globals.groundObject.building.house
      );
      globals.circs.fun += 10;
      globals.circs.shopping += 5;
      globals.circs.work += 3;
      console.log(globals.circs);
      console.log("icecream added");

      generatingRoad(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
      landGrow(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
    }
  }
  /* HOUSE */
  if (event.keyCode == 52) {
    if (
      !globals.map.has(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`
      )
    ) {
      const houseScene = globals.scenes.houseScene.clone();

      houseScene.position.set(
        globals.navigationHelper.placePicker.position.x,
        globals.land.position.y,
        globals.navigationHelper.placePicker.position.z
      );
      houseScene.rotation.y = -Math.PI / 2;
      houseScene.rotation.y -= globals.rotation;
      globals.scene.add(houseScene);
      globals.map.set(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`,
        globals.groundObject.building.house
      );
      globals.circs.population += 5;
      globals.circs.fun -= 5;
      globals.circs.shopping -= 2;
      globals.circs.work -= 2;
      console.log(globals.circs);
      console.log("house added");
      generatingRoad(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
      landGrow(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
    }
  }
  /*OFFICE */
  if (event.keyCode == 53) {
    if (
      !globals.map.has(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`
      )
    ) {
      const officeScene = globals.scenes.officeScene.clone();

      officeScene.position.set(
        globals.navigationHelper.placePicker.position.x,
        globals.land.position.y,
        globals.navigationHelper.placePicker.position.z
      );
      officeScene.rotation.y = -Math.PI / 2;
      officeScene.rotation.y -= globals.rotation;
      globals.scene.add(officeScene);
      globals.map.set(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`,
        globals.groundObject.building.house
      );
      globals.circs.fun += 3;
      globals.circs.work += 30;
      console.log(globals.circs);
      console.log("office added");

      generatingRoad(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
      landGrow(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
    }
  }
  /*HAMBURGER */
  if (event.keyCode == 54) {
    if (
      !globals.map.has(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`
      )
    ) {
      const hamburgerScene = globals.scenes.hamburgerScene.clone();

      hamburgerScene.position.set(
        globals.navigationHelper.placePicker.position.x,
        globals.land.position.y,
        globals.navigationHelper.placePicker.position.z
      );
      hamburgerScene.rotation.y = -Math.PI / 2;
      hamburgerScene.rotation.y -= globals.rotation;
      globals.scene.add(hamburgerScene);
      globals.map.set(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`,
        globals.groundObject.building.house
      );
      globals.circs.fun += 5;
      globals.circs.shopping += 5;
      globals.circs.work += 5;
      console.log(globals.circs);
      console.log("hamburger added");

      generatingRoad(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
      landGrow(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
    }
  }
  /*GROCERY */
  if (event.keyCode == 55) {
    if (
      !globals.map.has(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`
      )
    ) {
      const groceryScene = globals.scenes.groceryScene.clone();

      groceryScene.position.set(
        globals.navigationHelper.placePicker.position.x,
        globals.land.position.y,
        globals.navigationHelper.placePicker.position.z
      );
      groceryScene.rotation.y = -Math.PI / 2;
      groceryScene.rotation.y -= globals.rotation;
      globals.scene.add(groceryScene);
      globals.map.set(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`,
        globals.groundObject.building.house
      );
      globals.circs.shopping += 15;
      globals.circs.work += 10;
      console.log(globals.circs);
      console.log("grocery added");
      generatingRoad(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
      landGrow(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
    }
  }
  /*TOYSHOP */
  if (event.keyCode == 56) {
    if (
      !globals.map.has(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`
      )
    ) {
      const toyShopScene = globals.scenes.toyShopScene.clone();

      toyShopScene.position.set(
        globals.navigationHelper.placePicker.position.x,
        globals.land.position.y,
        globals.navigationHelper.placePicker.position.z
      );
      toyShopScene.rotation.y -= globals.rotation;
      globals.scene.add(toyShopScene);
      globals.map.set(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`,
        globals.groundObject.building.house
      );
      globals.circs.fun += 10;
      globals.circs.shopping += 5;
      globals.circs.work += 5;
      console.log(globals.circs);
      console.log("toyshop added");
      generatingRoad(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
      landGrow(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
    }
  }

  const city_stat_pop = document.getElementById("city_stat_pop");
  city_stat_pop.innerHTML =
    "<h4>Population: " + globals.circs.population + "</h4>";

  const city_stat_work = document.getElementById("city_stat_work");
  city_stat_work.innerHTML =
    "<h4>Woking place: " + globals.circs.work + "</h4>";

  const city_stat_fun = document.getElementById("city_stat_fun");
  city_stat_fun.innerHTML = "<h4>Fun level: " + globals.circs.fun + "</h4>";

  const city_stat_shop = document.getElementById("city_stat_shop");
  city_stat_shop.innerHTML =
    "<h4>Shopping opportunity: " + globals.circs.shopping + "</h4>";

  const stat_title = document.getElementById("stat_title");
  stat_title.innerHTML = "<h3>City Stats</h3>";

  /*PLAYGROUND */
  if (event.keyCode == 57) {
    if (
      !globals.map.has(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`
      )
    ) {
      const playgroundScene = globals.scenes.playgroundScene.clone();

      playgroundScene.position.set(
        globals.navigationHelper.placePicker.position.x,
        globals.land.position.y,
        globals.navigationHelper.placePicker.position.z
      );
      playgroundScene.rotation.y -= globals.rotation;
      globals.scene.add(playgroundScene);
      globals.map.set(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`,
        globals.groundObject.building.house
      );
      globals.circs.fun += 15;
      console.log(globals.circs);
      console.log("playground added");
      generatingRoad(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
      landGrow(
        globals.navigationHelper.placePicker.position.x,
        globals.navigationHelper.placePicker.position.z
      );
    }
  }
  /*CAR */
  if (event.keyCode == 67) {
    if (
      isRoad(
        globals.map.get(
          `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`
        )
      )
    ) {
      // kellenek tovabbi feltetelek az utak iranyarol
      const carScene = globals.scenes.carScene.clone();

      carScene.position.set(
        globals.navigationHelper.placePicker.position.x,
        globals.land.position.y,
        globals.navigationHelper.placePicker.position.z
      );
      carScene.rotation.y = Math.PI / 2;
      carScene.rotation.y -= globals.rotation;
      globals.scene.add(carScene);
      globals.map.set(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`,
        globals.groundObject.vehicle.car
      );
      globals.cars.push(carScene);

      globals.groundObject.vehicle.car++;

      console.log("cars array    " + JSON.stringify(global.cars));
    }
  }
  /*
  if (event.keyCode == 79) {
    globals.orbit.enabled = true;
  }

  if (event.keyCode == 80) {
    globals.pointer.enabled = true;
  }
  */
}

function resizeListener() {
  globals.sizes.height = window.innerHeight;
  globals.sizes.width = window.innerWidth;

  globals.camera.aspect = globals.sizes.width / globals.sizes.height;
  globals.camera.updateProjectionMatrix();

  globals.renderer.setSize(globals.sizes.width, globals.sizes.height);
  globals.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}
/*
function animate(){
  requestAnimationFrame(animate);
  controls.update();

  if(globals.map.get() > 200){
    
  }
}*/

export { keydownListener, resizeListener };
