import * as THREE from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const scene = new THREE.Scene();

let mixer;
let mixers = []; // Array to store mixers
let Astronot;
let loaded = false;
const modelScale = 300;

const modelUrlList = [
    "/model/model/ball_L.gltf",
    "/model/model/ball_R.gltf",
    "/model/model/cube1.gltf",
    "/model/model/cube2.gltf",
    "/model/model/donut_L.gltf",
    "/model/model/donut_R.gltf",
    "/model/model/line_L.gltf",
    "/model/model/line_R.gltf",
    "/model/model/tri_L.gltf",
    "/model/model/tri_R.gltf",
    "/model/stage.gltf",
];

// const texture = "/model/hdri.hdr";
const texture = "studio.hdr";
const RgbeLoader = new RGBELoader();
RgbeLoader.load(texture, function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    scene.background = texture;
    texture.dispose();
});

function loadModel(modelUrl) {
    loader.load(
        modelUrl,
        function(gltf) {
            const model = gltf.scene;
            scene.add(model);
            loaded = true;
            model.position.y = -370; // Adjust the y-coordinate as needed
            model.scale.set(modelScale, modelScale, modelScale);

            const mixer = new THREE.AnimationMixer(model);
            mixers.push(mixer); // Add the mixer to the array

            const animation = gltf.animations[0];
            if (animation) {
                const action = mixer.clipAction(animation);
                action.play();
                action.setLoop(THREE.LoopRepeat, Infinity);
            }
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
            if ((xhr.loaded / xhr.total) * 100 === 100) {
                window.scrollTo(0, 0);
                console.log("loading done");
            }
        },
        function(error) {
            console.log("Error loading model:", modelUrl);
            console.log(error);
        },
    );
}

// Loop through the modelUrlList and load each model
modelUrlList.forEach((modelUrl) => {
    loadModel(modelUrl);
});

// Replace the perspective camera with an orthographic camera
const camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    0.01, // Adjust near clipping plane
    10000000, // Adjust far clipping plane
);

// Set the camera position
camera.position.set(0, 2000, 10000);
const tiltAngle = Math.PI / 8; // Adjust the angle as needed

// Rotate the camera upwards
camera.rotation.x = tiltAngle;

// Set the camera's target
camera.lookAt(new THREE.Vector3(0, 0, 0));

const canvas = document.getElementById("bg-canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.LinearFilter;
renderer.toneMappingExposure = .8;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Adjust the shadow map type if needed
renderer.render(scene, camera);
renderer.setClearColor(0xE0E1E3, 1);

renderer.setSize(window.innerWidth, window.innerHeight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5); // Adjust the position of the light source
scene.add(directionalLight);

const mouse = new THREE.Vector2();

// Event listener for mouse movements
const mouseSensitivity = 0.02;// Adjust the sensitivity of the mouse movement
document.addEventListener("mousemove", (event) => {
    // Normalize mouse coordinates to range [-1, 1]
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update camera position based on mouse movement

    camera.position.x = -mouse.x * mouseSensitivity * window.innerWidth * 40;
    camera.position.y = -mouse.y * mouseSensitivity * window.innerHeight * 20 +
        1000;

    // Set the camera's target
    camera.lookAt(new THREE.Vector3(0, 0, 0));
});

const handleResize = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Update renderer size and camera aspect ratio
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
};
document.addEventListener("resize", handleResize);

// camera.position.z = 2.8;
// camera.position.y = 1;

const animate = () => {
    requestAnimationFrame(animate);
    mixers.forEach((mixer) => {
        mixer.update(0.016); // You can use a clock delta here
    });
    renderer.render(scene, camera);
};
animate();
