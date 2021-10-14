'use strict'

import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

// Extend will make OribitControls available as a JSX element called orbitControls
extend({ OrbitControls })

const Controls = (props) => {
  const controls = useRef()
  const {
    camera,
    gl: { domElement }
  } = useThree()

  const CameraControls = () => {
    camera.position.set(-10, 0, -10)
    return (
      <orbitControls
        ref={controls}
        args={[camera, domElement]}
        enableZoom={true}
        maxAzimuthAngle={-Math.PI / 2}
        minAzimuthAngle={Math.PI / 2}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
      />
    )
  }

  let frameCount = 0
  useFrame(state => {
    controls.current.update()
    if (frameCount === 0) {
      console.log(state)
    }
    // camera.position.x += 0.01
    // camera.position.z += 0.01
    frameCount++
  })

  return (
    <CameraControls />
  )
}

export default Controls
