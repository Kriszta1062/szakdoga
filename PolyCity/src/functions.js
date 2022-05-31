import * as THREE from "three";
import { texture } from "./loader.js";
import { map, land, groundObject, scene } from "./globals";

function landGrow(x, y) {
  if (Math.abs(x) - -10 > land.scale.x / 2) {
    land.scale.y += Math.ceil(Math.abs(x) - -10 - land.scale.x / 2); //adunk minden épületnek egy 5 sugarú területet
    land.scale.x += Math.ceil(Math.abs(x) - -10 - land.scale.x / 2);
  }
  if (Math.abs(y) - -10 > land.scale.x / 2) {
    land.scale.x += Math.ceil(Math.abs(y) - -10 - land.scale.y / 2); // azért kell előbb az x, hogy ne változtassuk meg scale.y értékét, mert különben azzal számol tovább
    land.scale.y += Math.ceil(Math.abs(y) - -10 - land.scale.y / 2);
  }
}

function generatingRoad(x, z) {
  if (!map.has(`${x - 1}_${z - 1}`)) {
    map.set(`${x - 1}_${z - 1}`, groundObject.road.road_down_right);
  }
  if (!map.has(`${x}_${z - 1}`)) {
    map.set(`${x}_${z - 1}`, groundObject.road.road_hori);
  }
  if (!map.has(`${x - -1}_${z - 1}`)) {
    map.set(`${x - -1}_${z - 1}`, groundObject.road.road_up_right);
  }
  if (!map.has(`${x - -1}_${z}`)) {
    map.set(`${x - -1}_${z}`, groundObject.road.road_verti);
  }
  if (!map.has(`${x - -1}_${z - -1}`)) {
    map.set(`${x - -1}_${z - -1}`, groundObject.road.road_up_left);
  }
  if (!map.has(`${x}_${z - -1}`)) {
    map.set(`${x}_${z - -1}`, groundObject.road.road_hori);
  }
  if (!map.has(`${x - 1}_${z - -1}`)) {
    map.set(`${x - 1}_${z - -1}`, groundObject.road.road_down_left);
  }
  if (!map.has(`${x - 1}_${z}`)) {
    map.set(`${x - 1}_${z}`, groundObject.road.road_verti);
  }

  roadRebuild();
}

function drawingRoad() {
  map.forEach((value, key) => {
    let [xKey, zKey] = key.split("_");
    console.log("szures --------------------");
    console.log(map);

    const roadMaterial = new THREE.MeshStandardMaterial({ map: texture.road });

    const cornerMaterial = new THREE.MeshStandardMaterial({
      map: texture.corner,
    });

    const fourRoadMaterial = new THREE.MeshStandardMaterial({
      map: texture.fourRoad,
    });

    const threeRoadMaterial = new THREE.MeshStandardMaterial({
      map: texture.threeRoad,
    });

    if (isRoad(value)) {
      switch (value) {
        case groundObject.road.road_down_right:
          const road2 = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1, 1),
            cornerMaterial
          );
          road2.rotation.x = -Math.PI * 0.5;
          road2.position.set(xKey, land.position.y + 0.01, zKey);
          scene.add(road2);
          break;
        case groundObject.road.road_hori:
          const road3 = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1, 1),
            roadMaterial
          );
          road3.rotation.x = -Math.PI * 0.5;
          road3.rotation.z = -Math.PI * 0.5;
          road3.position.set(xKey, land.position.y + 0.01, zKey);
          scene.add(road3);

          break;
        case groundObject.road.road_up_right:
          const road4 = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1, 1),
            cornerMaterial
          );
          road4.rotation.x = -Math.PI * 0.5;
          road4.rotation.z = -Math.PI * 0.5;

          road4.position.set(xKey, land.position.y + 0.01, zKey);
          scene.add(road4);
          break;
        case groundObject.road.road_verti:
          const road5 = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1, 1),
            roadMaterial
          );
          road5.rotation.x = -Math.PI * 0.5;
          road5.position.set(xKey, land.position.y + 0.01, zKey);
          scene.add(road5);
          break;
        case groundObject.road.road_up_left:
          const road6 = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1, 1),
            cornerMaterial
          );
          road6.rotation.x = -Math.PI * 0.5;
          road6.rotation.z = -Math.PI;

          road6.position.set(xKey, land.position.y + 0.01, zKey);
          scene.add(road6);
          break;
        case groundObject.road.road_down_left:
          const road8 = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1, 1),
            cornerMaterial
          );
          road8.rotation.x = -Math.PI * 0.5;
          road8.rotation.z = -Math.PI * 1.5;

          road8.position.set(xKey, land.position.y + 0.01, zKey);
          scene.add(road8);
          break;
        case groundObject.road.four_crossing:
          const four = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1, 1),
            fourRoadMaterial
          );
          four.rotation.x = -Math.PI * 0.5;
          four.rotation.z = -Math.PI * 1.5;

          four.position.set(xKey, land.position.y + 0.0101, zKey);
          scene.add(four);
          break;
        case groundObject.road.three_up_crossing:
          const three_up = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1, 1),
            threeRoadMaterial
          );
          three_up.rotation.x = -Math.PI * 0.5;
          three_up.rotation.z = -Math.PI * 0.5; //jo

          three_up.position.set(xKey, land.position.y + 0.0101, zKey);
          scene.add(three_up);
          break;
        case groundObject.road.three_down_crossing:
          const three_down = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1, 1),
            threeRoadMaterial
          );
          three_down.rotation.x = -Math.PI * 0.5;
          three_down.rotation.z = -Math.PI * 1.5; //jo

          three_down.position.set(xKey, land.position.y + 0.0101, zKey);
          scene.add(three_down);
          break;
        case groundObject.road.three_left_crossing:
          const three_left = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1, 1),
            threeRoadMaterial
          );
          three_left.rotation.x = -Math.PI * 0.5;
          three_left.rotation.z = -Math.PI * 2; //jo

          three_left.position.set(xKey, land.position.y + 0.0101, zKey);
          scene.add(three_left);
          break;
        case groundObject.road.three_right_crossing:
          const three_right = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1, 1),
            threeRoadMaterial
          );
          three_right.rotation.x = -Math.PI * 0.5;
          three_right.rotation.z = -Math.PI * 1;

          three_right.position.set(xKey, land.position.y + 0.0101, zKey);
          scene.add(three_right);
          break;
      }
    }
  });
}

function roadRebuild() {
  map.forEach((value, key) => {
    if (isRoad(value)) {
      let [xKey, zKey] = key.split("_");

      if (
        isRoad(map.get(`${xKey - 1}_${zKey}`)) &&
        isRoad(map.get(`${xKey - -1}_${zKey}`)) &&
        isRoad(map.get(`${xKey}_${zKey - 1}`)) &&
        isRoad(map.get(`${xKey}_${zKey - -1}`)) &&
        isRoad(map.get(`${xKey}_${zKey}`))
      ) {
        map.set(`${xKey}_${zKey}`, groundObject.road.four_crossing);
      } else if (
        isRoad(map.get(`${xKey - 1}_${zKey}`)) &&
        isRoad(map.get(`${xKey - -1}_${zKey}`)) &&
        isRoad(map.get(`${xKey}_${zKey - 1}`)) &&
        notRoad(map.get(`${xKey}_${zKey - -1}`)) &&
        isRoad(map.get(`${xKey}_${zKey}`))
      ) {
        map.set(`${xKey}_${zKey}`, groundObject.road.three_up_crossing);
      } else if (
        isRoad(map.get(`${xKey - 1}_${zKey}`)) &&
        isRoad(map.get(`${xKey - -1}_${zKey}`)) &&
        notRoad(map.get(`${xKey}_${zKey - 1}`)) &&
        isRoad(map.get(`${xKey}_${zKey - -1}`)) &&
        isRoad(map.get(`${xKey}_${zKey}`))
      ) {
        map.set(`${xKey}_${zKey}`, groundObject.road.three_down_crossing);
      } else if (
        isRoad(map.get(`${xKey - 1}_${zKey}`)) &&
        notRoad(map.get(`${xKey - -1}_${zKey}`)) &&
        isRoad(map.get(`${xKey}_${zKey - 1}`)) &&
        isRoad(map.get(`${xKey}_${zKey - -1}`)) &&
        isRoad(map.get(`${xKey}_${zKey}`))
      ) {
        map.set(`${xKey}_${zKey}`, groundObject.road.three_left_crossing);
      } else if (
        notRoad(map.get(`${xKey - 1}_${zKey}`)) &&
        isRoad(map.get(`${xKey - -1}_${zKey}`)) &&
        isRoad(map.get(`${xKey}_${zKey - 1}`)) &&
        isRoad(map.get(`${xKey}_${zKey - -1}`)) &&
        isRoad(map.get(`${xKey}_${zKey}`))
      ) {
        map.set(`${xKey}_${zKey}`, groundObject.road.three_right_crossing);
      }
      drawingRoad();
    }
  });
}

function isRoad(value) {
  return 100 <= value && value <= 200;
}

function notRoad(value) {
  return 100 > value || value > 200 || value === undefined;
}

export { landGrow, generatingRoad, drawingRoad, roadRebuild, isRoad };
