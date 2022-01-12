import * as THREE from 'three'

const initLights = (scene) => {
  const amblight = new THREE.AmbientLight(0x404040, 1)
  scene.add(amblight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.y = 5
  scene.add(directionalLight)

  // const spotlight = new THREE.SpotLight(0xffffff)
  // spotlight.position.set(5, 5, 5)
  // scene.add(spotlight)

  // const pointlight = new THREE.PointLight(0xff0000, 1, 1)
  // pointlight.position.set(-5, -5, -5)
  // scene.add(pointlight)
}

export default initLights
