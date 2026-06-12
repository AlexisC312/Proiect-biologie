import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

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

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.getElementById("viewer").appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;

scene.add(new THREE.AmbientLight(0xffffff, 3));

const light = new THREE.DirectionalLight(0xffffff, 4);
light.position.set(5, 5, 5);
scene.add(light);

new GLTFLoader().load("skeleton.gltf", (gltf) => {

    const model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());

    model.position.sub(center);

    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    const scale = 2.5 / maxDim;
    model.scale.setScalar(scale);

    scene.add(model);

    const loading = document.getElementById("loading");
    if (loading) loading.style.display = "none";
});

window.addEventListener("resize", () => {

    camera.aspect =
    window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
    window.innerWidth,
    window.innerHeight
    );
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
