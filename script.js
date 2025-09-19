// ---- Three.js Block ----
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: document.getElementById("block-canvas"),
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Create materials from blockFaces
const loader = new THREE.TextureLoader();
function createMaterials(faces) {
  return faces.map((face) => {
    if (face.startsWith("color:")) {
      const color = face.replace("color:", "");
      return new THREE.MeshStandardMaterial({ color });
    } else {
      return new THREE.MeshStandardMaterial({ map: loader.load(face) });
    }
  });
}

const geometry = new THREE.BoxGeometry(2, 2, 2);
const cube = new THREE.Mesh(geometry, createMaterials(blockFaces));
scene.add(cube);

// Lighting
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

camera.position.z = 5;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

// ---- Particles.js Background ----
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    size: { value: 3 },
    color: { value: "#ffffff" },
    line_linked: { enable: true, color: "#3498db" },
  },
});

// Handle resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
