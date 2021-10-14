'use strict'
import * as THREE from 'three'

const LoadAxis = (scene) => {
  let axis_material, axis_points, axis_name
  for(let i = 0; i < 3; i++) {
    switch (i) {
      case 0: {
        axis_material = new THREE.LineBasicMaterial( { color: 0x0000ff } )
        axis_points = [
          new THREE.Vector3( 0, 0, 0 ),
          new THREE.Vector3( 10, 0, 0 )
        ]
        axis_name = 'xaxis'
      }
      break
      case 1: {
        axis_material = new THREE.LineBasicMaterial( { color: 0x00ff00 } )
        axis_points = [
          new THREE.Vector3( 0, 0, 0 ),
          new THREE.Vector3( 0, 10, 0 )
        ]
        axis_name = 'yaxis'
      }
      break
      case 2: {
        axis_material = new THREE.LineBasicMaterial( { color: 0xff0000 } )
        axis_points = [
          new THREE.Vector3( 0, 0, 0 ),
          new THREE.Vector3( 0, 0, 10 )
        ]
        axis_name = 'zaxis'
      }
      break
    }

    const axis_geometry = new THREE.BufferGeometry().setFromPoints( axis_points );
    const axis = new THREE.Line(axis_geometry, axis_material)
    axis.name = axis_name
    scene.add(axis)
  }
}

export default LoadAxis
