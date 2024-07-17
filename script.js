import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js';


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

// Create a geometry and a material, then combine them into a mesh
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// Add the cube to the scene
scene.add(cube);

// Add a directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1).normalize();
scene.add(light);

// Position the camera
camera.position.z = 5;

// Ensure OrbitControls is loaded before use
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