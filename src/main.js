import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.9, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry( 10,3,16,100 )
const material = new THREE.MeshStandardMaterial({ color: '#ff9d1d' });
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)



const pointLight = new THREE.PointLight(0xffffff, 1000)
pointLight.position.set(-10,5,20)

const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(pointLight);



// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(400).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


const CenterPlanetTexture = new THREE.TextureLoader().load('CenterPlanet.jpg');
const NormalTexture = new THREE.TextureLoader().load('NormalTexture.jpg');

const CenterPlanet = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshBasicMaterial ( {
    map: CenterPlanetTexture,
    normalMap: NormalTexture
  } )
);

const Planet1 = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32),
  new THREE.MeshBasicMaterial ( {
    map: CenterPlanetTexture,
    color: new THREE.Color('Violet')
  } )
)

const Planet2 = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshBasicMaterial ( {
    map: CenterPlanetTexture,
    color: new THREE.Color('cyan')
  } )
)

const Planet3 = new THREE.Mesh(
  new THREE.SphereGeometry(16, 32, 32),
  new THREE.MeshBasicMaterial ( {
    map: CenterPlanetTexture,
    color: new THREE.Color('yellow')
  } )
)

const Planet4 = new THREE.Mesh(
  new THREE.SphereGeometry(50, 32, 32),
  new THREE.MeshBasicMaterial({
    map: CenterPlanetTexture,
    color: new THREE.Color('orange')
  })
)


const color5 = new THREE.Color(0/255, 55/255, 1005/255);
const Planet5 = new THREE.Mesh(
  new THREE.SphereGeometry(50, 32, 32),
  new THREE.MeshBasicMaterial({
    map: CenterPlanetTexture,
    color: new THREE.Color(color5)
  })
)

const Planet6 = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: CenterPlanetTexture,
    color: new THREE.Color('black')
  })
)

const color7 = new THREE.Color(130/255, 40/255, 450/255);
const Planet7 = new THREE.Mesh(
  new THREE.SphereGeometry(45, 32, 32),
  new THREE.MeshBasicMaterial({
    map: CenterPlanetTexture,
    color: new THREE.Color(color7)
  })
)




scene.add(CenterPlanet, Planet1, Planet2, Planet3, Planet4, Planet5, Planet6, Planet7);

Planet1.position.y = 15;
Planet1.position.x = -25;
Planet1.position.z = 60;

Planet2.position.y = -30;
Planet2.position.x = 30;
Planet2.position.z = 90;

Planet3.position.y = -30;
Planet3.position.x = -50;
Planet3.position.z = 130;

Planet4.position.y = 150;
Planet4.position.x = 200;
Planet4.position.z = -200;

Planet5.position.y = -300;
Planet5.position.x = -200;
Planet5.position.z = -600;

Planet6.position.y = 40;
Planet6.position.x = -70;
Planet6.position.z = 100;

Planet7.position.y = 400;
Planet7.position.x = -300;
Planet7.position.z = -500;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  CenterPlanet.rotation.x += 0.01;
  CenterPlanet.rotation.y += 0.0075;
  CenterPlanet.rotation.z += 0.05;

  Planet1.rotation.x += 0.02;
  Planet1.rotation.y += 0.02;
  Planet1.rotation.x += 0.02;

  Planet2.rotation.x += 0.01;
  Planet2.rotation.y += 0.01;
  Planet2.rotation.x += 0.01;

  Planet3.rotation.x += 0.009;
  Planet3.rotation.y += 0.009;
  Planet3.rotation.x += 0.009;


  Planet4.rotation.x += 0.006;
  Planet4.rotation.y += 0.006;
  Planet4.rotation.x += 0.006;


  Planet5.rotation.x += 0.002;
  Planet5.rotation.y += 0.002;
  Planet5.rotation.x += 0.002;


  Planet6.rotation.x += 0.02;
  Planet6.rotation.y += 0.02;
  Planet6.rotation.x += 0.02;


  Planet7.rotation.x += 0.002;
  Planet7.rotation.y += 0.002;
  Planet7.rotation.x += 0.002;

  camera.position.x = t * 0;
  camera.position.y = t * 0;
  camera.position.z = 30 + t * -0.03;
}

document.body.onscroll = moveCamera



function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.5;

  controls.update();


  renderer.render( scene, camera );
}

animate()