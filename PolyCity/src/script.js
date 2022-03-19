import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import {TWEEN} from 'three/examples/jsm/libs/tween.module.min.js';
import gsap from 'gsap'
import * as dat from 'dat.gui'

/*Global variables*/

let landWidth = 30
let landHeight= 30

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

let icecream

gltfLoader.load(
    '/models/IceCream/gltf/icecream.gltf',
    (gltf) =>{
        icecream= gltf.scene
        gltf.scene.scale.set(0.1,0.1,0.1)
        gltf.scene.position.set(-3, -1.5, 0)
        scene.add(gltf.scene)

        /*Debug Object */
        gui.add(icecream.position, 'y', -3, 3, 0.01).name('icecream stand') // min, max, step 
        gui.add(icecream.position, 'x', -3, 3, 0.01)
        gui.add(icecream.position, 'z', -3, 3, 0.01)
        gui.add(icecream, 'visible')
    }
)

gltfLoader.load('/models/Panel/panel.gltf',
    (gltf) =>{
        gltf.scene.scale.set(0.1,0.1,0.1)
        gltf.scene.position.set(0, -1.5, 0)
        scene.add(gltf.scene)
    }
)


/*Objects*/

const material = new THREE.MeshStandardMaterial({color: param.color})
const land = new THREE.Mesh(new THREE.PlaneBufferGeometry(landWidth, landHeight), material)
land.rotation.x = - Math.PI * 0.5
land.position.y = -1.5
scene.add(land)

 /*Debug Object */
 gui.add(land.position, 'y', -3, 3, 0.01).name('icecream stand') // min, max, step 
 gui.add(land.position, 'x', -3, 3, 0.01)
 gui.add(land.position, 'z', -3, 3, 0.01)
 gui.add(land, 'visible')


 const object = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0x3246a8}))
 object.position.set(3, -0.5, 0)
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
                // const tween = new TWEEN.Tween(object.position);
                // tween.to({z: object.position.z - 1}, 1000);
                // tween.start();
                object.position.z -= 1
        }
        if( event.keyCode == 39) {
                // const tween = new TWEEN.Tween(object.position);
                // tween.to({x: object.position.x + 1}, 1000);
                // tween.start();
                object.position.x += 1
        }
        if( event.keyCode == 37) {
                // const tween = new TWEEN.Tween(object.position);
                // tween.to({x: object.position.x - 1}, 1000);
                // tween.start();
                object.position.x -= 1

        }
        if( event.keyCode == 40) {
                // const tween = new TWEEN.Tween(object.position);
                // tween.to({z: object.position.z + 1}, 1000);
                // tween.start();
                object.position.z += 1
        }
    }
/*
//Place objects
let x = 0
let y = 0
let z = 0

window.addEventListener('keydown', ()=>{
    console.log('ok');
   /* gltfLoader.load('/models/IceCream/gltf/icecream.gltf',
    (gltf) =>{
        gltf.scene.scale.set(0.025, 0.025, 0.025)
        gltf.scene.position.set(x, y, z)
        scene.add(gltf.scene)
    }, x++, z++
)

}*/
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

