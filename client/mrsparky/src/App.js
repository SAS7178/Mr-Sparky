import './App.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function App() {

//initial scene camera and renderer func
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(95, window.innerWidth / window.innerHeight, 0.5,1000);
  const renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector('#bg'),
  });
  //create torus object
  const geometry = new THREE.TorusGeometry(10, 3, 26, 100)
  const material = new THREE.MeshStandardMaterial({ color: 0xDAA52 });
  const torus = new THREE.Mesh(geometry, material)

//set camera position based on given window
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(60);
  scene.add(torus)

//var to hold texture image
  const SASTexture = new THREE.TextureLoader().load("SAS.jpg");

  // SAS box geometry
  const SAS = new THREE.Mesh( 
  new THREE.BoxGeometry(6, 6, 6),
  new THREE.MeshBasicMaterial({ map: SASTexture }),
  
  );
  scene.add(SAS)

  function spiralPosition(angle, distance, height) {
    const x = distance * Math.sin(angle);
    const y = height * (angle / (2 * Math.PI));
    const z = distance * Math.cos(angle);
    return [x, y, z];
  }
  
  //var to hold moon texture image
  const moonTexture = new THREE.TextureLoader().load("moonimage.jpg");

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial( {
      map: moonTexture,
    })
  )

  scene.add(moon)

  //light options
  const ambientLight = new THREE.AmbientLight(0xffffff);
  const pointLight = new THREE.PointLight(0xffffff)
  const lightHelper = new THREE.PointLightHelper(pointLight)

  //create Orbit Control object for light angle control
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
    const geometry = new THREE.SphereGeometry(0.25, 14, 14);
    const material = new THREE.MeshStandardMaterial({ color: 0xDAA520 });
    const star = new THREE.Mesh(geometry, material);
  
    const angle = THREE.MathUtils.randFloat(0, 2 * Math.PI);
    const distance = THREE.MathUtils.randFloat(30, 50);
    const height = THREE.MathUtils.randFloat(-50, 50);
    const [x, y, z] = spiralPosition(angle, distance, height);
  
    star.position.set(x, y, z);
    scene.add(star);
  }
  

  Array(300).fill().forEach(addstar);
  const spaceTexture = new THREE.TextureLoader().load('pexels.jpg');
  scene.background = spaceTexture
  animate()
  return (
   <canvas>
    
   </canvas>
  );
}

export default App;
