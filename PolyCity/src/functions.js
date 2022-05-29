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
    newRoad(x - 1, z - 1, groundObject.road.road_down_right);
    roadRebuild();
  }
  if (!map.has(`${x}_${z - 1}`)) {
    newRoad(x, z - 1, groundObject.road.road_hori);

    roadRebuild();
  }
  if (!map.has(`${x - -1}_${z - 1}`)) {
    newRoad(x - -1, z - 1, groundObject.road.road_up_right);

    roadRebuild();
  }
  if (!map.has(`${x - -1}_${z}`)) {
    newRoad(x - -1, z, groundObject.road.road_verti);

    roadRebuild();
  }
  if (!map.has(`${x - -1}_${z - -1}`)) {
    newRoad(x - -1, z - -1, groundObject.road.road_up_left);

    roadRebuild();
  }
  if (!map.has(`${x}_${z - -1}`)) {
    newRoad(x, z - -1, groundObject.road.road_hori);

    roadRebuild();
  }
  if (!map.has(`${x - 1}_${z - -1}`)) {
    newRoad(x - 1, z - -1, groundObject.road.road_down_left);

    roadRebuild();
  }
  if (!map.has(`${x - 1}_${z}`)) {
    newRoad(x - 1, z, groundObject.road.road_verti);

    roadRebuild();
  }
}

function newRoad(x, z, place_value) {
  console.log(isRoad(map.get(`${x}_${z}`)));
  if (
    isRoad(map.get(`${x - 1}_${z}`)) &&
    isRoad(map.get(`${x - -1}_${z}`)) &&
    isRoad(map.get(`${x}_${z - 1}`)) &&
    isRoad(map.get(`${x}_${z - -1}`)) &&
    isRoad(map.get(`${x}_${z}`))
  ) {
    //map.set(`${x}_${z}`, groundObject.road.four_crossing);
  } else if (map.get(`${x}_${z}`) != groundObject.building.house) {
    map.set(`${x}_${z}`, place_value);
    console.log(`${x}_${z}` + "....." + place_value);
  }
}

function drawingRoad() {
  map.forEach((value, key) => {
    let [xKey, zKey] = key.split("_");
    const roadMaterial = new THREE.MeshStandardMaterial({ map: texture.road });
    const cornerMaterial = new THREE.MeshStandardMaterial({
      map: texture.corner,
    });
    const fourRoadMaterial = new THREE.MeshStandardMaterial({
      map: texture.fourRoad,
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
          const road44 = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(1, 1),
            fourRoadMaterial
          );
          road44.rotation.x = -Math.PI * 0.5;
          road44.rotation.z = -Math.PI * 1.5;

          road44.position.set(xKey, land.position.y + 0.01, zKey);
          scene.add(road44);
          break;
      }
    }
  });
}

function roadRebuild() {
  console.log("roadRe ");
  console.log(map);
  map.forEach((value, key) => {
    console.log("value, key, " + value + " " + key);
    // console.log(map);
    // console.log("value masik, key, " + value + " " + key);

    if (isRoad(value)) {
      let [xKey, zKey] = key.split("_");

      /*
      console.log(key + map.has(`${xKey - 1}_${zKey}`));
      console.log(map);
      */
      /*console.log(key + " " + map.has(`${xKey++}_${zKey}`) + " jobb");
      console.log(map.has(`${xKey - 1}_${zKey}`) + " bal");
      console.log(map.has(`${xKey}_${zKey++}`) + " alatta");
      console.log(map.has(`${xKey}_${zKey - 1}`) + " felette");*/
      /*
      console.log("start");
      console.log(map.get(`${xKey - 1}_${zKey}`));
      console.log(map.has(`${xKey - 1}_${zKey}`));
      console.log(map.get(`${xKey - 1}_${zKey}`) !== 1);
      console.log("end");
*/

      if (
        isRoad(map.get(`${xKey - 1}_${zKey}`)) &&
        isRoad(map.get(`${xKey - -1}_${zKey}`)) &&
        isRoad(map.get(`${xKey}_${zKey - 1}`)) &&
        isRoad(map.get(`${xKey}_${zKey - -1}`)) &&
        isRoad(map.get(`${xKey}_${zKey}`))
      ) {
        map.set(`${xKey}_${zKey}`, groundObject.road.four_crossing);
      }
      drawingRoad();
    }
  });
}

function isRoad(value) {
  return 100 <= value <= 200 && value !== undefined;
}

export { landGrow, generatingRoad, newRoad, drawingRoad, roadRebuild, isRoad };
