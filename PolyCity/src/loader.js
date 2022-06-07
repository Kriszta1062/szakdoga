import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import globals from "./globals";

/*MODEL LOADERS*/

const texture = {
  road: new THREE.TextureLoader().load("/texture/road3.jpg"),
  corner: new THREE.TextureLoader().load("/texture/corner.jpg"),
  fourRoad: new THREE.TextureLoader().load("/texture/fourRoad.jpg"),
  threeRoad: new THREE.TextureLoader().load("/texture/three_road.jpg"),
};

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

async function loadModels() {
  const panelGltf = await gltfLoader.loadAsync("/models/Panel/panel.gltf");
  globals.scenes.panelScene = panelGltf.scene;
  globals.scenes.panelScene.scale.set(0.04, 0.04, 0.04);
  globals.scenes.panelScene.receiveShadow = true;
  console.log("panel loaded");

  const iceCreamGltf = await gltfLoader.loadAsync(
    "/models/IceCream/gltf/icecream.gltf"
  );
  globals.scenes.iceCreamScene = iceCreamGltf.scene;
  globals.scenes.iceCreamScene.scale.set(0.03, 0.03, 0.03);
  globals.scenes.iceCreamScene.receiveShadow = true;
  console.log("icecream loaded");

  const houseGltf = await gltfLoader.loadAsync("/models/House/house.gltf");
  globals.scenes.houseScene = houseGltf.scene;
  globals.scenes.houseScene.receiveShadow = true;
  globals.scenes.houseScene.scale.set(0.025, 0.025, 0.025);
  console.log("house loaded");

  const officeGltf = await gltfLoader.loadAsync("/models/House/house.gltf");
  globals.scenes.officeScene = officeGltf.scene;
  globals.scenes.officeScene.scale.set(0.025, 0.025, 0.025);
  globals.scenes.officeScene.receiveShadow = true;
  console.log("office loaded");

  const hamburgerGltf = await gltfLoader.loadAsync("/models/House/house.gltf");
  globals.scenes.hamburgerScene = hamburgerGltf.scene;
  globals.scenes.hamburgerScene.scale.set(0.025, 0.025, 0.025);
  globals.scenes.hamburgerScene.receiveShadow = true;
  console.log("hamburger loaded");

  const groceryGltf = await gltfLoader.loadAsync("/models/House/house.gltf");
  globals.scenes.groceryScene = groceryGltf.scene;
  globals.scenes.groceryScene.scale.set(0.025, 0.025, 0.025);
  globals.scenes.groceryScene.receiveShadow = true;
  console.log("grocery loaded");

  const toyShopGltf = await gltfLoader.loadAsync(
    "/models/toyshop/toyshop.gltf"
  );
  globals.scenes.toyShopScene = toyShopGltf.scene;
  globals.scenes.toyShopScene.scale.set(0.025, 0.025, 0.025);
  globals.scenes.toyShopScene.receiveShadow = true;
  console.log("toyShop loaded");

  const playgroundGltf = await gltfLoader.loadAsync(
    "/models/Playground/playground.gltf"
  );
  globals.scenes.playgroundScene = playgroundGltf.scene;
  globals.scenes.playgroundScene.scale.set(0.04, 0.04, 0.04);
  globals.scenes.playgroundScene.receiveShadow = true;
  console.log("playground loaded");

  const carGltf = await gltfLoader.loadAsync("/models/Car/car2.gltf");
  globals.scenes.carScene = carGltf.scene;
  globals.scenes.carScene.scale.set(0.1, 0.1, 0.1);
  globals.scenes.carScene.receiveShadow = true;
  console.log("car loaded");
}

export { texture, loadModels };
