// import logo from './logo.svg';
import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { isClickableInput } from '@testing-library/user-event/dist/utils';

function App() {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
  });
  const geometry = new THREE.TorusGeometry(10, 3, 26, 100)
  const material = new THREE.MeshStandardMaterial({ color: 0xDAA52 });
  const torus = new THREE.Mesh(geometry, material)
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);
  scene.add(torus)

  const SASTexture = new THREE.TextureLoader().load("SAS.jpg");

  // box geometry
  const SAS = new THREE.Mesh( 
  new THREE.BoxGeometry(6, 6, 6),
  new THREE.MeshBasicMaterial({ map: SASTexture })
  );
  scene.add(SAS)

  //moon
  const moonTexture = new THREE.TextureLoader().load("moonimage.jpg");

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial( {
      map: moonTexture,
    })
  )
  // moon.addEventListener( 'click',function(){moonScale()}, false)
  scene.add(moon)
  //light options
  const ambientLight = new THREE.AmbientLight(0xffffff);
  const pointLight = new THREE.PointLight(0xffffff)
  const lightHelper = new THREE.PointLightHelper(pointLight)

  //create Orbit Control object
  const controls = new OrbitControls(camera, renderer.domElement);
  pointLight.position.set(20, 20, 20)

  //call to scene
  scene.add(pointLight, ambientLight)
  scene.add(lightHelper)

  //call render w arguments
  renderer.render(scene, camera);

  //animation function to rerender for movement of torus
  function animate() {
    requestAnimationFrame(animate);

    torus.rotation.x += 0.02;
    torus.rotation.y += 0.008;
    torus.rotation.z += 0.02;
    controls.update();


    // Loop through all stars and reset their position if they have gone out of bounds
    scene.children.forEach(child => {
      if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
        if (child.position.x > 50) {
          child.position.x = -50;
        }
        if (child.position.y > 50) {
          child.position.y = -50;
        }
        if (child.position.z > 50) {
          child.position.z = -50;
        }
      }
    });
    // Loop through all stars and update their position
    scene.children.forEach(child => {
      if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
        child.position.x += 0.1;
        child.position.y += 0.1;
        child.position.z += 0.1;
      }
    });
    renderer.render(scene, camera)
  }

  //function to create random stars throughout scene space
  function addstar() {
    const geometry = new THREE.SphereGeometry(0.25, 14, 14)
    const material = new THREE.MeshStandardMaterial({ color: 0xDAA520 });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y, z);
    scene.add(star)
  }

  Array(300).fill().forEach(addstar);
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
