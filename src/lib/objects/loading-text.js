'use strict'

import * as THREE from 'three'

const loadingText = (scene, camera, fonter) => {
  const text = new THREE.Mesh(
    new THREE.ShapeBufferGeometry(fonter.generateShapes('Loading...', 1)),
    new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide })
  )
  text.name = 'loading'
  text.lookAt(camera.position)
  text.position.set(-1.5, 3, 0)
  scene.add(text)

  return text
}

export default loadingText
