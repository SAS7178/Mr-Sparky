// import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function App() {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
  });
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
  const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
  const torus = new THREE.Mesh( geometry, material)
  renderer.setPixelRatio( window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight );
  camera.position.setZ(30);
  scene.add(torus)
  
  //light options
  const ambientLight = new THREE.AmbientLight(0xffffff);
  const pointLight = new THREE.PointLight(0xffffff)
  const lightHelper = new THREE.PointLightHelper(pointLight)
  
  //create Orbit Control object
  const controls = new OrbitControls(camera, renderer.domElement);
  pointLight.position.set(20,20,20)
  
  //call to scene
  scene.add(pointLight, ambientLight)
  scene.add(lightHelper)
  //call render w arguments
  renderer.render(scene,camera);
  
  //animation function to rerender for movement
  function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;
    controls.update();
    renderer.render(scene,camera)
  }
  function addstar() {
    const geometry = new THREE.SphereGeometry(0.25,24, 24)
    const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
    const star = new THREE.Mesh(geometry, material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    scene.add(star)
  }
  Array(200).fill().forEach(addstar);
  const spaceTexture = new THREE.TextureLoader().load('pexels.jpg');
  scene.background = spaceTexture
  animate()
  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
