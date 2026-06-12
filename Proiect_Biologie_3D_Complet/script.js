import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const boneInfo = {

craniu: `
<h3>🧠 Craniu</h3>
Craniul protejează creierul și organele de simț.
Este format din 22 de oase.
`,

coloana: `
<h3>🦴 Coloană vertebrală</h3>
Coloana vertebrală este formată din 33-34 vertebre.
Protejează măduva spinării și susține corpul.
`,

coaste: `
<h3>🫁 Coaste</h3>
Coastele formează cutia toracică.
Protejează inima și plămânii.
`,

stern: `
<h3>🔹 Stern</h3>
Sternul este osul central al toracelui.
La el se fixează coastele.
`,

bazin: `
<h3>🦵 Bazin</h3>
Bazinul susține greutatea corpului și protejează organele pelvine.
`,

femur: `
<h3>🦿 Femur</h3>
Femurul este cel mai lung și mai rezistent os din corpul uman.
`,

tibie: `
<h3>🦶 Tibie</h3>
Tibia este principalul os al gambei și suportă mare parte din greutatea corpului.
`

};

window.showBone = function(name){
document.getElementById("description").innerHTML = boneInfo[name];
};

window.showGeneral = function(){
document.getElementById("description").innerHTML = `
<h3>📚 Sistemul osos</h3>

<ul>
<li>Corpul uman are aproximativ 206 oase.</li>
<li>Sistemul osos susține întregul corp.</li>
<li>Protejează organele vitale.</li>
<li>Permite mișcarea împreună cu mușchii.</li>
<li>Măduva osoasă produce celule sanguine.</li>
<li>Oasele stochează calciu și fosfor.</li>
</ul>
`;
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07111f);

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth / window.innerHeight,
0.1,
1000
);

camera.position.set(0, 1.5, 4);

const renderer = new THREE.WebGLRenderer({
antialias: true
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

const controls = new OrbitControls(
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

const light = new THREE.DirectionalLight(
0xffffff,
4
);

light.position.set(
5,
5,
5
);

scene.add(light);

const loader = new GLTFLoader();

loader.load(

"skeleton.gltf",

(gltf)=>{

const model = gltf.scene;

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

},

undefined,

(error)=>{
console.error(error);
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
