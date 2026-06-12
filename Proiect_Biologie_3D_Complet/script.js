import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const boneInfo = {

craniu:
"Craniul protejează creierul și organele de simț. Este format din 22 de oase.",

coloana:
"Coloana vertebrală este formată din 33-34 vertebre și protejează măduva spinării.",

coaste:
"Coastele formează cutia toracică și protejează inima și plămânii.",

stern:
"Sternul este osul central al toracelui de care se atașează coastele.",

bazin:
"Bazinul susține greutatea corpului și protejează organele pelvine.",

femur:
"Femurul este cel mai lung și mai rezistent os din corpul uman.",

tibie:
"Tibia este principalul os al gambei și suportă mare parte din greutatea corpului."

};

window.showBone = function(name){

document.getElementById("description").innerHTML =
"<h3>" +
name.charAt(0).toUpperCase() +
name.slice(1) +
"</h3><br>" +
boneInfo[name];

};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07111f);

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
1000
);

camera.position.set(0,1.5,4);

const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

renderer.setPixelRatio(
window.devicePixelRatio
);

document
.getElementById("viewer")
.appendChild(renderer.domElement);

const controls =
new OrbitControls(
camera,
renderer.domElement
);

controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

scene.add(
new THREE.AmbientLight(
0xffffff,
3
)
);

const light =
new THREE.DirectionalLight(
0xffffff,
4
);

light.position.set(
5,
5,
5
);

scene.add(light);

const loader =
new GLTFLoader();

loader.load(

"skeleton.gltf",

(gltf)=>{

const model =
gltf.scene;

const box =
new THREE.Box3()
.setFromObject(model);

const center =
box.getCenter(
new THREE.Vector3()
);

model.position.sub(center);

const size =
box.getSize(
new THREE.Vector3()
);

const maxDim =
Math.max(
size.x,
size.y,
size.z
);

const scale =
2.5 / maxDim;

model.scale.setScalar(scale);

scene.add(model);

document
.getElementById("loading")
.style.display =
"none";

}

);

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);

function animate(){

requestAnimationFrame(
animate
);

controls.update();

renderer.render(
scene,
camera
);

}

animate();
