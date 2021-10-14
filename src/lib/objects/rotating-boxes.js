'use strict'

import * as THREE from 'three'

const RotatingBoxes = (scene) => {
  const boxes = []
  for (let i = 0; i < 2; i++) {
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } )
    const cube = new THREE.Mesh( geometry, material )
    cube.name = 'cube_' + i
    cube.position.set(i*3 + 5, 0, 0)
    boxes.push(cube)
    scene.add( boxes[i] );
  }

  return boxes
}

export default RotatingBoxes
