'use strict'

import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'
import { PerspectiveCamera } from 'three'

// Extend will make OribitControls available as a JSX element called orbitControls
extend({ OrbitControls })

const Controls = (props) => {
  const controls = useRef()
  const perspectiveCamera = new PerspectiveCamera()
  const {
    camera,
    gl: { domElement }
  } = useThree()

  // useFrame(state => {
  //   controls.current.update()
  //   camera.position.x += 0.01
  //   camera.position.z += 0.01
  // })

  return (
    <>
      <perspectiveCamera ref={controls} position={[0, 5, 10]} />
      <OrbitControls camera={controls.current} />
    </>
  )
}

export default Controls
