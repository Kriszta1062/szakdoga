import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { scenes } from "./globals";

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
  scenes.panelScene = panelGltf.scene;
  scenes.panelScene.scale.set(0.04, 0.04, 0.04);
  scenes.panelScene.receiveShadow = true;

  const iceCreamGltf = await gltfLoader.loadAsync(
    "/models/IceCream/gltf/icecream.gltf"
  );
  scenes.iceCreamScene = iceCreamGltf.scene;
  scenes.iceCreamScene.scale.set(0.03, 0.03, 0.03);
  scenes.iceCreamScene.receiveShadow = true;

  const houseGltf = await gltfLoader.loadAsync("/models/House/house.gltf");
  scenes.houseScene = houseGltf.scene;
  scenes.houseScene.receiveShadow = true;
  scenes.houseScene.scale.set(0.025, 0.025, 0.025);

  const officeGltf = await gltfLoader.loadAsync("/models/House/house.gltf");
  scenes.officeScene = officeGltf.scene;
  scenes.officeScene.scale.set(0.025, 0.025, 0.025);
  scenes.officeScene.receiveShadow = true;

  const hamburgerGltf = await gltfLoader.loadAsync("/models/House/house.gltf");
  scenes.hamburgerScene = hamburgerGltf.scene;
  scenes.hamburgerScene.scale.set(0.025, 0.025, 0.025);
  scenes.hamburgerScene.receiveShadow = true;

  const groceryGltf = await gltfLoader.loadAsync("/models/House/house.gltf");
  scenes.groceryScene = groceryGltf.scene;
  scenes.groceryScene.scale.set(0.025, 0.025, 0.025);
  scenes.groceryScene.receiveShadow = true;

  const toyShopGltf = await gltfLoader.loadAsync(
    "/models/toyshop/toyshop.gltf"
  );
  scenes.toyShopScene = toyShopGltf.scene;
  scenes.toyShopScene.scale.set(0.025, 0.025, 0.025);
  scenes.toyShopScene.receiveShadow = true;

  const playgroundGltf = await gltfLoader.loadAsync(
    "/models/Playground/playground.gltf"
  );
  scenes.playgroundScene = playgroundGltf.scene;
  scenes.playgroundScene.scale.set(0.04, 0.04, 0.04);
  scenes.playgroundScene.receiveShadow = true;

  const carGltf = await gltfLoader.loadAsync("/models/Car/car.gltf");
  scenes.carScene = carGltf.scene;
  scenes.carScene.scale.set(0.1, 0.1, 0.1);
  scenes.carScene.receiveShadow = true;
}

export { texture, loadModels };
