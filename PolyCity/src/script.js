import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import {TWEEN} from 'three/examples/jsm/libs/tween.module.min.js';
import gsap from 'gsap'
import * as dat from 'dat.gui'

/*Global variables*/

let rotation = 0
let landWidth = 30
let landHeight= 30

//array[0][0] = x=-14 z=-14

let horisontal = -14
let vertical = -14
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
console.log(arr);

/*Dat.Gui */

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

/*MODELS*/

//a videoban: 21. video 56. perc

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)


/*Objects*/


const material = new THREE.MeshStandardMaterial({color: param.color})
const land = new THREE.Mesh(new THREE.PlaneBufferGeometry(landWidth, landHeight), material)
land.rotation.x = - Math.PI * 0.5
land.position.y = -1.5
scene.add(land)
const y = land.position.y

 /*Debug Object */
//  gui.add(land.position, 'y', -3, 3, 0.01).name('icecream stand') // min, max, step 
//  gui.add(land.position, 'x', -3, 3, 0.01)
//  gui.add(land.position, 'z', -3, 3, 0.01)
//  gui.add(land, 'visible')


 const object = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1,20), new THREE.MeshBasicMaterial({color: 0x3246a8}))
 object.position.set(3, -1.5, 0)
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
directionalLight.position.set(- 5, 5, 0)
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

                    console.log(arr[i][j][2]);

                    if(arr[i][j][0] == object.position.x && arr[i][j][1] == object.position.z){
                        if(arr[i][j][2] == 0){
                            gltfLoader.load('/models/Panel/panel.gltf',
                            (gltf) =>{
                                gltf.scene.scale.set(0.1,0.1,0.1)
                                gltf.scene.position.set(object.position.x, y, object.position.z)
                                gltf.scene.rotation.y-= rotation 
                                scene.add(gltf.scene)
                                arr[i][j][2]=1
                                console.log('panel added');
                                // landWidth+= Math.abs(gltf.scene.position.x)
                                // landHeight+= Math.abs(gltf.scene.position.z)
                                // console.log(landWidth);
                                // console.log(landHeight);
                                }

                            )
                            }
                    }
                }
                
            }
        }
        if(event.keyCode == 50){
            for(let i = 0; i < arr.length; i++){
                for(let j = 0; j < arr.length; j++){

                    console.log(arr[i][j][2]);

                    if(arr[i][j][0] == object.position.x && arr[i][j][1] == object.position.z){
                        if(arr[i][j][2] == 0){
                            gltfLoader.load(
                                '/models/IceCream/gltf/icecream.gltf',
                                (gltf) =>{
                                    gltf.scene.scale.set(0.1,0.1,0.1)
                                    gltf.scene.position.set(object.position.x, y, object.position.z)
                                    gltf.scene.rotation.y-= rotation 
                                    scene.add(gltf.scene)
                                    arr[i][j][2]=1
                                    console.log('icecream added');
                                    }
                                )
                        }
                    }
                }
                
            }
        }
        
    }
)



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

