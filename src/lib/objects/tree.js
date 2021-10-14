'use strict'

import * as THREE from 'three'
import { v4 as uuidv4 } from 'uuid'

const tree = (scene, x, y, z) => {
  const id = uuidv4()
  const treeTrunk = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 8, 44, 32),
    new THREE.MeshBasicMaterial({ color: 0x725c42 })
  )
  treeTrunk.position.set(x, y, z)
  treeTrunk.name = `tree_trunk_${id}`
  
  const treeHead = new THREE.Mesh(
    new THREE.SphereGeometry(5, 32, 16),
    new THREE.MeshBasicMaterial({ color: 0x66aa66})
  )
  treeHead.position.set(x, y + 8, z)
  treeHead.name = `tree_head_${id}`

  scene.add(treeTrunk)
  scene.add(treeHead)

  return id
}

export default tree
