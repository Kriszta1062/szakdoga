import * as THREE from "three";
import globals from "./globals";

function landGrow(x, y) {
  if (Math.abs(x) - -10 > globals.land.scale.x / 2) {
    let old_size = globals.wall_west.scale.x;

    globals.land.scale.y += Math.ceil(
      Math.abs(x) - -10 - globals.land.scale.x / 2
    ); //adunk minden épületnek egy 5 sugarú területet
    globals.land.scale.x += Math.ceil(
      Math.abs(x) - -10 - globals.land.scale.x / 2
    );

    globals.orbit.maxDistance +=
      Math.ceil(Math.abs(x) - -10 - globals.land.scale.x / 2) / 2;

    /*SKY */
    globals.sky.scale.y += Math.ceil(
      Math.abs(x) - -10 - globals.sky.scale.x / 2
    ); //adunk minden épületnek egy 5 sugarú területet
    globals.sky.scale.x += Math.ceil(
      Math.abs(x) - -10 - globals.sky.scale.x / 2
    );

    /*EAST */
    globals.wall_east.scale.x += Math.ceil(
      Math.abs(x) - -10 - globals.wall_east.scale.x / 2
    );

    globals.wall_east.position.x -=
      Math.ceil(globals.wall_east.scale.x - old_size) / 2;

    /*NORTH */
    globals.wall_north.scale.x += Math.ceil(
      Math.abs(x) - -10 - globals.wall_north.scale.x / 2
    );

    globals.wall_north.position.z -=
      Math.ceil(globals.wall_north.scale.x - old_size) / 2;

    /*SOUTH */

    globals.wall_south.scale.x += Math.ceil(
      Math.abs(x) - -10 - globals.wall_south.scale.x / 2
    );

    globals.wall_south.position.z +=
      Math.ceil(globals.wall_south.scale.x - old_size) / 2;

    /*WEST */
    globals.wall_west.scale.x += Math.ceil(
      Math.abs(x) - -10 - globals.wall_west.scale.x / 2
    );

    globals.wall_west.position.x +=
      Math.ceil(globals.wall_west.scale.x - old_size) / 2;
  }
  if (Math.abs(y) - -10 > globals.land.scale.x / 2) {
    let old_size = globals.wall_west.scale.x;
    globals.land.scale.x += Math.ceil(
      Math.abs(y) - -10 - globals.land.scale.y / 2
    ); // azért kell előbb az x, hogy ne változtassuk meg scale.y értékét, mert különben azzal számol tovább
    globals.land.scale.y += Math.ceil(
      Math.abs(y) - -10 - globals.land.scale.y / 2
    );

    globals.orbit.maxDistance +=
      Math.ceil(Math.abs(y) - -10 - globals.land.scale.y / 2) / 2;

    /*SKY */
    globals.sky.scale.x += Math.ceil(
      Math.abs(y) - -10 - globals.sky.scale.y / 2
    );
    globals.sky.scale.y += Math.ceil(
      Math.abs(y) - -10 - globals.sky.scale.y / 2
    );

    /*EAST */
    globals.wall_east.scale.x += Math.ceil(
      Math.abs(y) - -10 - globals.wall_east.scale.x / 2
    );
    globals.wall_east.position.x -=
      Math.ceil(globals.wall_east.scale.x - old_size) / 2;

    /*NORTH */
    globals.wall_north.scale.x += Math.ceil(
      Math.abs(y) - -10 - globals.wall_north.scale.x / 2
    );
    globals.wall_north.position.z -=
      Math.ceil(globals.wall_north.scale.x - old_size) / 2;

    /*SOUTH */

    globals.wall_south.scale.x += Math.ceil(
      Math.abs(y) - -10 - globals.wall_south.scale.x / 2
    );
    globals.wall_south.position.z +=
      Math.ceil(globals.wall_south.scale.x - old_size) / 2;

    /*WEST */
    globals.wall_west.scale.x += Math.ceil(
      Math.abs(y) - -10 - globals.wall_west.scale.x / 2
    );
    globals.wall_west.position.x +=
      Math.ceil(globals.wall_west.scale.x - old_size) / 2;
  }
}

function generatingRoad(x, z) {
  if (!globals.map.has(`${x - 1}_${z - 1}`)) {
    globals.map.set(
      `${x - 1}_${z - 1}`,
      globals.groundObject.road.road_down_right
    );
  }
  if (!globals.map.has(`${x}_${z - 1}`)) {
    globals.map.set(`${x}_${z - 1}`, globals.groundObject.road.road_hori);
  }
  if (!globals.map.has(`${x - -1}_${z - 1}`)) {
    globals.map.set(
      `${x - -1}_${z - 1}`,
      globals.groundObject.road.road_up_right
    );
  }
  if (!globals.map.has(`${x - -1}_${z}`)) {
    globals.map.set(`${x - -1}_${z}`, globals.groundObject.road.road_verti);
  }
  if (!globals.map.has(`${x - -1}_${z - -1}`)) {
    globals.map.set(
      `${x - -1}_${z - -1}`,
      globals.groundObject.road.road_up_left
    );
  }
  if (!globals.map.has(`${x}_${z - -1}`)) {
    globals.map.set(`${x}_${z - -1}`, globals.groundObject.road.road_hori);
  }
  if (!globals.map.has(`${x - 1}_${z - -1}`)) {
    globals.map.set(
      `${x - 1}_${z - -1}`,
      globals.groundObject.road.road_down_left
    );
  }
  if (!globals.map.has(`${x - 1}_${z}`)) {
    globals.map.set(`${x - 1}_${z}`, globals.groundObject.road.road_verti);
  }

  roadRebuild();
}

// delete this line:
let fourRoadsCount = 0;

function drawingRoad() {
  globals.map.forEach((value, key) => {
    let [xKey, zKey] = key.split("_");
    const roadMaterial = new THREE.MeshStandardMaterial({
      map: globals.texture.road,
    });

    const cornerMaterial = new THREE.MeshStandardMaterial({
      map: globals.texture.corner,
    });

    const fourRoadMaterial = new THREE.MeshStandardMaterial({
      map: globals.texture.fourRoad,
    });

    const threeRoadMaterial = new THREE.MeshStandardMaterial({
      map: globals.texture.threeRoad,
    });

    if (isRoad(value) && value != globals.groundObject.road.final_road) {
      if (globals.roads.get(key) !== value || !globals.roads.has(key)) {
        switch (value) {
          case globals.groundObject.road.road_down_right:
            const road2 = new THREE.Mesh(
              new THREE.PlaneBufferGeometry(1, 1),
              cornerMaterial
            );
            road2.rotation.x = -Math.PI * 0.5;
            road2.position.set(xKey, globals.land.position.y + 0.01, zKey);
            globals.scene.add(road2);
            globals.roads.set(key, value);
            break;
          case globals.groundObject.road.road_hori:
            const road3 = new THREE.Mesh(
              new THREE.PlaneBufferGeometry(1, 1),
              roadMaterial
            );
            road3.rotation.x = -Math.PI * 0.5;
            road3.rotation.z = -Math.PI * 0.5;
            road3.position.set(xKey, globals.land.position.y + 0.01, zKey);
            globals.scene.add(road3);
            globals.roads.set(key, value);

            break;
          case globals.groundObject.road.road_up_right:
            const road4 = new THREE.Mesh(
              new THREE.PlaneBufferGeometry(1, 1),
              cornerMaterial
            );
            road4.rotation.x = -Math.PI * 0.5;
            road4.rotation.z = -Math.PI * 0.5;

            road4.position.set(xKey, globals.land.position.y + 0.01, zKey);
            globals.scene.add(road4);
            globals.roads.set(key, value);
            break;
          case globals.groundObject.road.road_verti:
            const road5 = new THREE.Mesh(
              new THREE.PlaneBufferGeometry(1, 1),
              roadMaterial
            );
            road5.rotation.x = -Math.PI * 0.5;
            road5.position.set(xKey, globals.land.position.y + 0.01, zKey);
            globals.scene.add(road5);
            globals.roads.set(key, value);
            break;
          case globals.groundObject.road.road_up_left:
            const road6 = new THREE.Mesh(
              new THREE.PlaneBufferGeometry(1, 1),
              cornerMaterial
            );
            road6.rotation.x = -Math.PI * 0.5;
            road6.rotation.z = -Math.PI;

            road6.position.set(xKey, globals.land.position.y + 0.01, zKey);
            globals.scene.add(road6);
            globals.roads.set(key, value);
            break;
          case globals.groundObject.road.road_down_left:
            const road8 = new THREE.Mesh(
              new THREE.PlaneBufferGeometry(1, 1),
              cornerMaterial
            );
            road8.rotation.x = -Math.PI * 0.5;
            road8.rotation.z = -Math.PI * 1.5;

            road8.position.set(xKey, globals.land.position.y + 0.01, zKey);
            globals.scene.add(road8);
            globals.roads.set(key, value);
            break;
          case globals.groundObject.road.four_crossing:
            const four = new THREE.Mesh(
              new THREE.PlaneBufferGeometry(1, 1),
              fourRoadMaterial
            );
            four.rotation.x = -Math.PI * 0.5;
            four.rotation.z = -Math.PI * 1.5;

            four.position.set(xKey, globals.land.position.y + 0.013, zKey);
            globals.scene.add(four);
            globals.map.set(key, globals.groundObject.road.final_road);
            console.log(
              `four added (${fourRoadsCount++}), total scene children: ${
                globals.scene.children.length
              }`
            );
            break;
          case globals.groundObject.road.three_up_crossing:
            const three_up = new THREE.Mesh(
              new THREE.PlaneBufferGeometry(1, 1),
              threeRoadMaterial
            );
            three_up.rotation.x = -Math.PI * 0.5;
            three_up.rotation.z = -Math.PI * 0.5;

            three_up.position.set(xKey, globals.land.position.y + 0.0101, zKey);
            globals.scene.add(three_up);
            globals.roads.set(key, value);
            break;
          case globals.groundObject.road.three_down_crossing:
            const three_down = new THREE.Mesh(
              new THREE.PlaneBufferGeometry(1, 1),
              threeRoadMaterial
            );
            three_down.rotation.x = -Math.PI * 0.5;
            three_down.rotation.z = -Math.PI * 1.5;

            three_down.position.set(
              xKey,
              globals.land.position.y + 0.0101,
              zKey
            );
            globals.scene.add(three_down);
            globals.roads.set(key, value);
            break;
          case globals.groundObject.road.three_left_crossing:
            const three_left = new THREE.Mesh(
              new THREE.PlaneBufferGeometry(1, 1),
              threeRoadMaterial
            );
            three_left.rotation.x = -Math.PI * 0.5;
            three_left.rotation.z = -Math.PI * 2;

            three_left.position.set(
              xKey,
              globals.land.position.y + 0.0101,
              zKey
            );
            globals.scene.add(three_left);
            globals.roads.set(key, value);
            break;
          case globals.groundObject.road.three_right_crossing:
            const three_right = new THREE.Mesh(
              new THREE.PlaneBufferGeometry(1, 1),
              threeRoadMaterial
            );
            three_right.rotation.x = -Math.PI * 0.5;
            three_right.rotation.z = -Math.PI * 1;

            three_right.position.set(
              xKey,
              globals.land.position.y + 0.0101,
              zKey
            );
            globals.scene.add(three_right);
            globals.roads.set(key, value);
            break;
        }
      }
    }
  });
}

function roadRebuild() {
  globals.map.forEach((value, key) => {
    if (isRoad(value)) {
      let [xKey, zKey] = key.split("_");

      if (
        isRoad(globals.map.get(`${xKey - 1}_${zKey}`)) &&
        isRoad(globals.map.get(`${xKey - -1}_${zKey}`)) &&
        isRoad(globals.map.get(`${xKey}_${zKey - 1}`)) &&
        isRoad(globals.map.get(`${xKey}_${zKey - -1}`)) &&
        isRoad(globals.map.get(`${xKey}_${zKey}`))
      ) {
        globals.map.set(
          `${xKey}_${zKey}`,
          globals.groundObject.road.four_crossing
        );
      } else if (
        isRoad(globals.map.get(`${xKey - 1}_${zKey}`)) &&
        isRoad(globals.map.get(`${xKey - -1}_${zKey}`)) &&
        isRoad(globals.map.get(`${xKey}_${zKey - 1}`)) &&
        notRoad(globals.map.get(`${xKey}_${zKey - -1}`)) &&
        isRoad(globals.map.get(`${xKey}_${zKey}`))
      ) {
        globals.map.set(
          `${xKey}_${zKey}`,
          globals.groundObject.road.three_up_crossing
        );
      } else if (
        isRoad(globals.map.get(`${xKey - 1}_${zKey}`)) &&
        isRoad(globals.map.get(`${xKey - -1}_${zKey}`)) &&
        notRoad(globals.map.get(`${xKey}_${zKey - 1}`)) &&
        isRoad(globals.map.get(`${xKey}_${zKey - -1}`)) &&
        isRoad(globals.map.get(`${xKey}_${zKey}`))
      ) {
        globals.map.set(
          `${xKey}_${zKey}`,
          globals.groundObject.road.three_down_crossing
        );
      } else if (
        isRoad(globals.map.get(`${xKey - 1}_${zKey}`)) &&
        notRoad(globals.map.get(`${xKey - -1}_${zKey}`)) &&
        isRoad(globals.map.get(`${xKey}_${zKey - 1}`)) &&
        isRoad(globals.map.get(`${xKey}_${zKey - -1}`)) &&
        isRoad(globals.map.get(`${xKey}_${zKey}`))
      ) {
        globals.map.set(
          `${xKey}_${zKey}`,
          globals.groundObject.road.three_left_crossing
        );
      } else if (
        notRoad(globals.map.get(`${xKey - 1}_${zKey}`)) &&
        isRoad(globals.map.get(`${xKey - -1}_${zKey}`)) &&
        isRoad(globals.map.get(`${xKey}_${zKey - 1}`)) &&
        isRoad(globals.map.get(`${xKey}_${zKey - -1}`)) &&
        isRoad(globals.map.get(`${xKey}_${zKey}`))
      ) {
        globals.map.set(
          `${xKey}_${zKey}`,
          globals.groundObject.road.three_right_crossing
        );
      }
    }
  });
  drawingRoad();
}

function isRoad(value) {
  return 100 <= value && value <= 210;
}

function notRoad(value) {
  return 100 > value || value > 210 || value === undefined;
}

export { landGrow, generatingRoad, drawingRoad, roadRebuild, isRoad };
