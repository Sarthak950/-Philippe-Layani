import * as THREE from "three";

// create a cube scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);

camera.position.z = 20;

const canvas = document.getElementById("cube");
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    // alpha: true,
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.LinearFilter;
renderer.toneMappingExposure = 0.8;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);

// add a cube
const cubeScale = 1;
const geometry = new THREE.BoxGeometry(
    16 * cubeScale,
    9 * cubeScale,
    16 * cubeScale,
);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const material = [
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("cube/4.png"),
    }), // Right
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("cube/2.png"),
    }), // Left
    new THREE.MeshBasicMaterial({
        color: 0xffffff,
        // map: new THREE.TextureLoader().load("cube/2.png"),
    }), // Top
    new THREE.MeshBasicMaterial({
        // map: new THREE.TextureLoader().load("cube/2.png"),
        color: 0xffffff,
    }), // Bottom
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("cube/1.png"),
    }), // Front
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("cube/3.png"),
    }), // Back
];
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.set(0, 0, 0);

const handleResize = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    // Update renderer size and camera aspect ratio
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
};

const winCount = 3;
const cubeAnimationTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#dummy",
        start: "top 0%",
        end: `top -100%`,
        scrub: true,
        pin: true,
        markers: true,
        // anticipatePin: 1,
    },
});

cubeAnimationTimeline
    .to(
        cube.position,
        {
            x: -10,
            duration: 1,
        },
    );

// Corrected event listener for window resize
window.addEventListener("resize", handleResize);

const animate = () => {
    requestAnimationFrame(animate);

    // cube.rotation.y += 0.01;
    // cube.rotation.x += 0.01;

    renderer.render(scene, camera);
};

animate();
