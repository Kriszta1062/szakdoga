import globals from "./globals";
import { generatingRoad, landGrow, isRoad, outOfAccepted } from "./functions";

function keydownListener(event) {
  if (event.keyCode == 38) {
    if (
      Math.abs(globals.navigationHelper.placePicker.position.z - 1) <
      globals.land.scale.y / 2
    ) {
      globals.navigationHelper.placePicker.position.z -= 1;
    }
  }
  if (event.keyCode == 39) {
    if (
      Math.abs(globals.navigationHelper.placePicker.position.x - -1) <
      globals.land.scale.x / 2
    ) {
      globals.navigationHelper.placePicker.position.x += 1;
    }
  }
  if (event.keyCode == 37) {
    if (
      Math.abs(globals.navigationHelper.placePicker.position.x - 1) <
      globals.land.scale.x / 2
    ) {
      globals.navigationHelper.placePicker.position.x -= 1;
    }
  }
  if (event.keyCode == 40) {
    if (
      Math.abs(globals.navigationHelper.placePicker.position.z - -1) <
      globals.land.scale.y / 2
    ) {
      globals.navigationHelper.placePicker.position.z += 1;
    }
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
    console.log(globals.roads);
    console.log(globals.map);
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
  /*Church */
  if (event.keyCode == 54) {
    if (
      !globals.map.has(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`
      )
    ) {
      const churchScene = globals.scenes.churchScene.clone();

      churchScene.position.set(
        globals.navigationHelper.placePicker.position.x,
        globals.land.position.y,
        globals.navigationHelper.placePicker.position.z
      );
      churchScene.rotation.y += globals.rotation;
      globals.scene.add(churchScene);
      globals.map.set(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`,
        globals.groundObject.building.house
      );
      globals.circs.fun += 10;
      globals.circs.work += 5;

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
  /*Factory */
  if (event.keyCode == 55) {
    if (
      !globals.map.has(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`
      )
    ) {
      const factoryCopy = globals.scenes.factoryScene.clone();
      factoryCopy.position.set(
        globals.navigationHelper.placePicker.position.x,
        globals.land.position.y,
        globals.navigationHelper.placePicker.position.z
      );
      factoryCopy.rotation.y -= globals.rotation;
      globals.map.set(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`,
        globals.groundObject.building.house
      );
      globals.scene.add(factoryCopy);
      globals.circs.fun -= 20;
      globals.circs.work += 20;

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

  const city_stat_con = document.getElementById("city_stat_con");
  city_stat_con.innerHTML = "<h4>Contamination: " + globals.circs.con + "</h4>";

  const city_stat_pub_supply = document.getElementById("city_stat_pub_supply");
  city_stat_pub_supply.innerHTML =
    "<h4>Public supply: " + globals.circs.pub_supply + "</h4>";

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

      globals.scene.add(carScene);
      globals.map.set(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`,
        globals.groundObject.vehicle.car
      );

      let direction = globals.dir[Math.floor(Math.random() * 4)]; // igy 0 es 4 kozotti szamot kapunk

      if (direction[0] == 0 && direction[1] == 1) {
        carScene.rotation.y = Math.PI / 2;
      } else if (direction[0] == 0 && direction[1] == -1) {
        carScene.rotation.y = Math.PI * 1.5;
      } else if (direction[0] == 1 && direction[1] == 0) {
        carScene.rotation.y = Math.PI;
      } else if (direction[0] == -1 && direction[1] == 0) {
        carScene.rotation.y = Math.PI * 2;
      }

      globals.cars.push({ carScene, direction });
      globals.groundObject.vehicle.car++;
    }
  }
}

/*A felntieknel a lehelyezo billentyuket le lehet torolni */

/*GETTING ELEMENTS BY ID */

const car_button = document.getElementById("car");
car_button.addEventListener("click", addCar);

const ice_button = document.getElementById("ice");
ice_button.addEventListener("click", addIcecream);

const panel_button = document.getElementById("panel");
panel_button.addEventListener("click", addPanel);

const house_button = document.getElementById("house");
house_button.addEventListener("click", addHouse);

const toy_button = document.getElementById("toy");
toy_button.addEventListener("click", addToy);

const church_button = document.getElementById("church");
church_button.addEventListener("click", addChurch);

const factory_button = document.getElementById("factory");
factory_button.addEventListener("click", addFactory);

function addCar() {
  if (
    isRoad(
      globals.map.get(
        `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`
      )
    )
  ) {
    const carScene = globals.scenes.carScene.clone();

    carScene.position.set(
      globals.navigationHelper.placePicker.position.x,
      globals.land.position.y,
      globals.navigationHelper.placePicker.position.z
    );

    globals.scene.add(carScene);

    let direction = globals.dir[Math.floor(Math.random() * 4)]; // igy 0 es 4 kozotti szamot kapunk

    if (direction[0] == 0 && direction[1] == 1) {
      carScene.rotation.y = Math.PI / 2;
    } else if (direction[0] == 0 && direction[1] == -1) {
      carScene.rotation.y = Math.PI * 1.5;
    } else if (direction[0] == 1 && direction[1] == 0) {
      carScene.rotation.y = Math.PI;
    } else if (direction[0] == -1 && direction[1] == 0) {
      carScene.rotation.y = Math.PI * 2;
    }

    globals.cars.push({ carScene, direction });
    globals.groundObject.vehicle.car++;
  }
  outOfAccepted();
}

function addPanel() {
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

    generatingRoad(
      globals.navigationHelper.placePicker.position.x,
      globals.navigationHelper.placePicker.position.z
    );
    landGrow(
      globals.navigationHelper.placePicker.position.x,
      globals.navigationHelper.placePicker.position.z
    );
    outOfAccepted();
  }
}

function addFactory() {
  if (
    !globals.map.has(
      `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`
    )
  ) {
    const factoryCopy = globals.scenes.factoryScene.clone();
    factoryCopy.position.set(
      globals.navigationHelper.placePicker.position.x,
      globals.land.position.y,
      globals.navigationHelper.placePicker.position.z
    );
    factoryCopy.rotation.y -= globals.rotation;
    globals.map.set(
      `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`,
      globals.groundObject.building.house
    );
    globals.scene.add(factoryCopy);
    globals.circs.fun -= 20;
    globals.circs.work += 20;

    generatingRoad(
      globals.navigationHelper.placePicker.position.x,
      globals.navigationHelper.placePicker.position.z
    );
    landGrow(
      globals.navigationHelper.placePicker.position.x,
      globals.navigationHelper.placePicker.position.z
    );
    outOfAccepted();
  }
}

function addHouse() {
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
    generatingRoad(
      globals.navigationHelper.placePicker.position.x,
      globals.navigationHelper.placePicker.position.z
    );
    landGrow(
      globals.navigationHelper.placePicker.position.x,
      globals.navigationHelper.placePicker.position.z
    );
    outOfAccepted();
  }
}

function addToy() {
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
    generatingRoad(
      globals.navigationHelper.placePicker.position.x,
      globals.navigationHelper.placePicker.position.z
    );
    landGrow(
      globals.navigationHelper.placePicker.position.x,
      globals.navigationHelper.placePicker.position.z
    );
    outOfAccepted();
  }
}

function addChurch() {
  if (
    !globals.map.has(
      `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`
    )
  ) {
    const churchScene = globals.scenes.churchScene.clone();

    churchScene.position.set(
      globals.navigationHelper.placePicker.position.x,
      globals.land.position.y,
      globals.navigationHelper.placePicker.position.z
    );
    churchScene.rotation.y += globals.rotation;
    globals.scene.add(churchScene);
    globals.map.set(
      `${globals.navigationHelper.placePicker.position.x}_${globals.navigationHelper.placePicker.position.z}`,
      globals.groundObject.building.house
    );
    globals.circs.fun += 10;
    globals.circs.work += 5;
    generatingRoad(
      globals.navigationHelper.placePicker.position.x,
      globals.navigationHelper.placePicker.position.z
    );
    landGrow(
      globals.navigationHelper.placePicker.position.x,
      globals.navigationHelper.placePicker.position.z
    );
    outOfAccepted();
  }
}

function addPlayground() {
  /*PLAYGROUND */
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
    generatingRoad(
      globals.navigationHelper.placePicker.position.x,
      globals.navigationHelper.placePicker.position.z
    );
    landGrow(
      globals.navigationHelper.placePicker.position.x,
      globals.navigationHelper.placePicker.position.z
    );
    outOfAccepted();
  }
}

function addIcecream() {
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

    generatingRoad(
      globals.navigationHelper.placePicker.position.x,
      globals.navigationHelper.placePicker.position.z
    );
    landGrow(
      globals.navigationHelper.placePicker.position.x,
      globals.navigationHelper.placePicker.position.z
    );
    outOfAccepted();
  }
}

function resizeListener() {
  globals.sizes.height = window.innerHeight;
  globals.sizes.width = window.innerWidth;

  globals.camera.aspect = globals.sizes.width / globals.sizes.height;
  globals.camera.updateProjectionMatrix();

  globals.renderer.setSize(globals.sizes.width, globals.sizes.height);
  globals.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

export { keydownListener, resizeListener };
