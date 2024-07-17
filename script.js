console.log("Script started");

// Set up the scene
const scene = new THREE.Scene();
console.log("Scene created");

// Set up the camera
const camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
);
console.log("Camera created");

// Set up the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
console.log("Renderer created and added to DOM");

// Set renderer background color to make sure we see the cube
renderer.setClearColor(0xaaaaaa);

// Create a geometry and a material, then combine them into a mesh
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// Add the cube to the scene
scene.add(cube);
console.log("Cube created and added to scene");

// Add a directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1).normalize();
scene.add(light);
console.log("Directional light added to scene");

// Position the camera
camera.position.z = 5;
console.log("Camera positioned");

// Ensure OrbitControls is loaded before use
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an option for smoother control
controls.dampingFactor = 0.25; // damping factor for smoothing
controls.enableZoom = true; // enable zooming
console.log("OrbitControls set up");

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    console.log("Window resized");
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
console.log("Animation started");
