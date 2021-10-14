'use strict'

import * as THREE from 'three'
import { v4 as uuidv4 } from 'uuid'

const dbox = (scene, x, y, z) => {
  const dboxr = []
  const id = uuidv4()
  for (let i = 0; i < 8; i++) {
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } )
    const cube = new THREE.Mesh( geometry, material )
    cube.name = `dbox_${i}_${id}`
    switch(i) {
      case 0: cube.position.set(0 + x, 0 + y, 0 + z)
      break;
      case 1: cube.position.set(0 + x, 0 + y, 1.1 + z)
      break;
      case 2: cube.position.set(1.1 + x, 0 + y, 0 + z)
      break;
      case 3: cube.position.set(1.1 + x, 0 + y, 1.1 + z)
      break;
      case 4: cube.position.set(0 + x, 1.1 + y, 0 + z)
      break;
      case 5: cube.position.set(0 + x, 1.1 + y, 1.1 + z)
      break;
      case 6: cube.position.set(1.1 + x, 1.1 + y, 0 + z)
      break;
      case 7: cube.position.set(1.1 + x, 1.1 + y, 1.1 + z)
      break;
    }
    dboxr.push(cube)
    scene.add(dboxr[i]);
  }
  return dboxr
}

export default dbox
