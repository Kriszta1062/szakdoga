import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
//import {TWEEN} from 'three/examples/jsm/libs/tween.module.min.js';
//import gsap from 'gsap'
import * as dat from 'dat.gui'

/*Global variables*/

let rotation = 0
let landWidth = 30
let landHeight= 30

//array[0][0] = x=-14 z=-14

let horisontal = -14 /*-((landwidth/2)-2)*/
let vertical = -14 /*-((landwidth/2)-2)*/
let value = 0

let arr = Array.from(Array(landWidth), () => new Array(landHeight));
for(let i=0; i<landWidth; i++){
    for(let j=0; j<landHeight; j++){
        arr[i][j]= [horisontal,vertical,value]
        horisontal++
    }
    horisontal=-14
    vertical++
}


/*Dat.Gui*/

const gui = new dat.GUI({closed: true})

const param = {
    color: 0x73db40,
}

gui.addColor(param, 'color').onChange(() => {
    material.color.set(param.color)
})


/*Base*/
// Canvas
const canvas = document.querySelector('canvas.polycity')

// Scene
const scene = new THREE.Scene()

/*MODEL LOADERS*/

//a videoban: 21. video 56. perc

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)


/*Objects*/


const material = new THREE.MeshStandardMaterial({color: param.color})
const land = new THREE.Mesh(new THREE.PlaneBufferGeometry(landWidth, landHeight), material)
land.receiveShadow = true
land.rotation.x = - Math.PI * 0.5
land.position.y = -1.5
scene.add(land)
const y = land.position.y

 /*Debug Object */
//  gui.add(land.position, 'y', -3, 3, 0.01).name('icecream stand') // min, max, step 
//  gui.add(land.position, 'x', -3, 3, 0.01)
//  gui.add(land.position, 'z', -3, 3, 0.01)
//  gui.add(land, 'visible')


 const object = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1,20), new THREE.MeshBasicMaterial({color: 0xfa70aa}))
 object.position.set(0, -1.5, 0)
 object.rotation.x=Math.PI/2
 scene.add(object)

//gui.addColor()

/*Lights*/
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
//gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)


const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(-5, 5, 0)
scene.add(directionalLight)


/*Sizes*/

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//Resize updter

window.addEventListener('resize', () => {
    sizes.height= window.innerHeight
    sizes.width = window.innerWidth

    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()
    
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})
/*
// Fullschreen function

window.addEventListener('dblclick', ()=>{
    if(!document.fullscreenElement){
        canvas.requestFullscreen()
    }else{
        document.exitFullscreen()
    }
})
*/

window.addEventListener('keydown', (event) => {
        if( event.keyCode == 38) {
                object.position.z -= 1
                console.log('x=' + object.position.x + 'z=' + object.position.z);
        }
        if( event.keyCode == 39) {
                object.position.x += 1
                console.log('x=' + object.position.x + 'z=' + object.position.z);
        }
        if( event.keyCode == 37) {
                object.position.x -= 1
                console.log('x=' + object.position.x + 'z=' + object.position.z);
        }
        if( event.keyCode == 40) {
                object.position.z += 1
                console.log('x=' + object.position.x + 'z=' + object.position.z);
        }
        if(event.keyCode == 51){
            rotation += Math.PI/2 
            object.rotation.z =rotation
        }
        if( event.keyCode == 49) {
            for(let i = 0; i < arr.length; i++){
                for(let j = 0; j < arr.length; j++){
                    if(arr[i][j][0] == object.position.x && arr[i][j][1] == object.position.z){
                        if(arr[i][j][2] == 0){
                            gltfLoader.load('/models/Panel/panel.gltf',
                                (gltf) =>{
                                    gltf.scene.scale.set(0.04,0.04,0.04)
                                    gltf.scene.position.set(object.position.x, y, object.position.z)
                                    gltf.scene.rotation.y -= rotation
                                    gltf.scene.receiveShadow = true
                                    scene.add(gltf.scene)
                                    arr[i][j][2]=1
                                    console.log('panel added');
                                }
                            )
                            generatingRoad(i,j)
                            drawingRoad(i,j)
                            landGrow(i,j)
                        }
                    }
                } 
            }
        }
        if(event.keyCode == 50){
            for(let i = 0; i < arr.length; i++){
                for(let j = 0; j < arr.length; j++){
                    if(arr[i][j][0] == object.position.x && arr[i][j][1] == object.position.z){
                        if(arr[i][j][2] == 0){
                            gltfLoader.load(
                                '/models/IceCream/gltf/icecream.gltf',
                                (gltf) =>{
                                    gltf.scene.scale.set(0.02,0.02,0.02)
                                    gltf.scene.position.set(object.position.x, y, object.position.z)
                                    gltf.scene.rotation.y-= rotation 
                                    gltf.scene.receiveShadow = true
                                    scene.add(gltf.scene)
                                    arr[i][j][2]=1
                                    console.log('icecream added');
                                }
                            )
                            generatingRoad(i,j)
                            drawingRoad(i,j)
                            landGrow(i,j)
                        }
                    }
                }
            }
        }
        if(event.keyCode == 52){
            for(let i = 0; i < arr.length; i++){
                for(let j = 0; j < arr.length; j++){
                    if(arr[i][j][0] == object.position.x && arr[i][j][1] == object.position.z){
                        if(arr[i][j][2] == 0){
                            gltfLoader.load(
                                '/models/House/house.gltf',
                                (gltf) =>{
                                    gltf.scene.scale.set(0.025,0.025,0.025)
                                    gltf.scene.position.set(object.position.x, y, object.position.z)  
                                    gltf.scene.rotation.y =- Math.PI /2
                                    gltf.scene.rotation.y -= rotation 
                                    gltf.scene.receiveShadow = true
                                    scene.add(gltf.scene)
                                    arr[i][j][2]=1
                                    console.log('house added');
                                }
                            )
                            generatingRoad(i,j)
                            drawingRoad(i,j)
                            landGrow(i,j)
                        }
                    }
                }
            }
        }
        /*OFFICE */
        if(event.keyCode == 53){
            for(let i = 0; i < arr.length; i++){
                for(let j = 0; j < arr.length; j++){
                    if(arr[i][j][0] == object.position.x && arr[i][j][1] == object.position.z){
                        if(arr[i][j][2] == 0){
                            gltfLoader.load(
                                '/models/House/house.gltf',
                                (gltf) =>{
                                    gltf.scene.scale.set(0.025,0.025,0.025)
                                    gltf.scene.position.set(object.position.x, y, object.position.z)  
                                    gltf.scene.rotation.y =- Math.PI /2
                                    gltf.scene.rotation.y -= rotation 
                                    gltf.scene.receiveShadow = true
                                    scene.add(gltf.scene)
                                    arr[i][j][2]=1
                                    console.log('house added');
                                }
                            )
                            generatingRoad(i,j)
                            drawingRoad(i,j)
                            landGrow(i,j)
                        }
                    }
                }
            }
        }
        /*HAMBURGER */
        if(event.keyCode == 54){
            for(let i = 0; i < arr.length; i++){
                for(let j = 0; j < arr.length; j++){
                    if(arr[i][j][0] == object.position.x && arr[i][j][1] == object.position.z){
                        if(arr[i][j][2] == 0){
                            gltfLoader.load(
                                '/models/House/house.gltf',
                                (gltf) =>{
                                    gltf.scene.scale.set(0.025,0.025,0.025)
                                    gltf.scene.position.set(object.position.x, y, object.position.z)  
                                    gltf.scene.rotation.y =- Math.PI /2
                                    gltf.scene.rotation.y -= rotation 
                                    gltf.scene.receiveShadow = true
                                    scene.add(gltf.scene)
                                    arr[i][j][2]=1
                                    console.log('house added');
                                }
                            )
                            generatingRoad(i,j)
                            drawingRoad(i,j)
                            landGrow(i,j)
                        }
                    }
                }
            }
        }
        /*GROCERY */
        if(event.keyCode == 55){
            for(let i = 0; i < arr.length; i++){
                for(let j = 0; j < arr.length; j++){
                    if(arr[i][j][0] == object.position.x && arr[i][j][1] == object.position.z){
                        if(arr[i][j][2] == 0){
                            gltfLoader.load(
                                '/models/House/house.gltf',
                                (gltf) =>{
                                    gltf.scene.scale.set(0.025,0.025,0.025)
                                    gltf.scene.position.set(object.position.x, y, object.position.z)  
                                    gltf.scene.rotation.y =- Math.PI /2
                                    gltf.scene.rotation.y -= rotation 
                                    gltf.scene.receiveShadow = true
                                    scene.add(gltf.scene)
                                    arr[i][j][2]=1
                                    console.log('house added');
                                }
                            )
                            generatingRoad(i,j)
                            drawingRoad(i,j)
                            landGrow(i,j)
                        }
                    }
                }
            }
        }
    }
)


/*functions */

function landGrow (i, j){
    if(Math.abs(arr[i][j][0])+10 > landWidth/2){
        landWidth+= (arr.length/2) - Math.abs(arr[i][j][0])+10
        console.log(landWidth);
         console.log(landHeight);
        landHeight+= (arr.length/2) - Math.abs(arr[i][j][0])+10
         console.log(landWidth);
         console.log(landHeight);
    }
    if(Math.abs(arr[i][j][1])+10 > landHeight/2){
        landWidth+= (arr.length/2) - Math.abs(arr[i][j][1])+10
        console.log(landWidth);
         console.log(landHeight);
        landHeight+= (arr.length/2) - Math.abs(arr[i][j][1])+10
         console.log(landWidth);
         console.log(landHeight);
    }
     console.log(landWidth);
     console.log(landHeight);
}

function generatingRoad (i,j){
    arr[i-1][j-1][2] = 2
    arr[i-1][j][2] = 2
    arr[i-1][j+1][2] = 2
    arr[i][j-1][2] = 2
    arr[i][j+1][2] = 2
    arr[i+1][j-1][2] = 2
    arr[i+1][j][2] = 2
    arr[i+1][j+1][2] = 2
}

function drawingRoad(i,j){
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length; j++){
            if(arr[i][j][2]==2){
                const grey = new THREE.MeshStandardMaterial({color: 0x57544d})
                const road = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), grey)
                road.rotation.x = - Math.PI * 0.5
                road.position.set(arr[i][j][0],y+0.01,arr[i][j][1])
                scene.add(road)
            }
        }
    }
}

/*Camera*/

// Base camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/*Renderer*/

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/*Animate*/

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


tick()

