import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/GLTFLoader.js';

// Set up the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
);

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set renderer background color to make sure we see the cube
renderer.setClearColor(0xaaaaaa);

// Create the GLTF loader
const loader = new GLTFLoader();

let currentShape;

// Function to load a GLB model
function loadModel(url) {
    return new Promise((resolve, reject) => {
        loader.load(url, (gltf) => {
            resolve(gltf.scene);
        }, undefined, (error) => {
            reject(error);
        });
    });
}

// Add a directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1).normalize();
scene.add(light);

// Position the camera
camera.position.z = 5;

// Set up OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an option for smoother control
controls.dampingFactor = 0.25; // damping factor for smoothing
controls.enableZoom = true; // enable zooming

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Function to reset the camera
function resetCamera() {
    camera.position.set(0, 0, 5);
    camera.rotation.set(0, 0, 0);
    controls.update();
}

// Function to update the shape in the scene
async function updateShape(shapeType) {
    if (currentShape) {
        scene.remove(currentShape);
    }

    let modelUrl;
    if (shapeType === 'cube') {
        modelUrl = 'test_gltfs/rock.glb';
    } else if (shapeType === 'sphere') {
        modelUrl = 'test_gltfs/strawberry.gltf';
    }

    if (modelUrl) {
        currentShape = await loadModel(modelUrl);
        scene.add(currentShape);
    }

    // Reset the camera after updating the shape
    resetCamera();
}

// Create an animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update controls
    controls.update();

    // Render the scene from the perspective of the camera
    renderer.render(scene, camera);
}

// Start the animation loop
animate();

// Handle form submission
document.getElementById('generate').addEventListener('click', (event) => {
    event.preventDefault();
    const selectedShape = document.querySelector('input[name="shape"]:checked').value;
    updateShape(selectedShape);
});
