import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const boneInfo = {

craniu: `
<h2>🧠 Craniu</h2>
<p>
Craniul protejează creierul și organele de simț.
Este alcătuit din 22 de oase unite între ele.
</p>
`,

coloana: `
<h2>🦴 Coloană vertebrală</h2>
<p>
Coloana vertebrală este formată din 33-34 vertebre.
Susține corpul și protejează măduva spinării.
</p>
`,

coaste: `
<h2>🫁 Coaste</h2>
<p>
Cutia toracică este formată din 12 perechi de coaste.
Acestea protejează inima și plămânii.
</p>
`,

stern: `
<h2>❤️ Stern</h2>
<p>
Sternul este osul central al toracelui.
La el se atașează majoritatea coastelor.
</p>
`,

bazin: `
<h2>🚶 Bazin</h2>
<p>
Bazinul susține greutatea corpului și protejează organele pelvine.
</p>
`,

femur: `
<h2>🦵 Femur</h2>
<p>
Femurul este cel mai lung și mai rezistent os din corpul uman.
</p>
`,

tibie: `
<h2>🏃 Tibie</h2>
<p>
Tibia este principalul os al gambei și suportă mare parte din greutatea corpului.
</p>
`

};

window.showBone = function(name){
    document.getElementById("description").innerHTML =
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
