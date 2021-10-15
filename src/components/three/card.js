'use strict'

import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import { useSelector, useDispatch, Provider, ReactReduxContext } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

const Card = (props) => {
  const rstate = useSelector(rstate => rstate)
  const dispatch = useDispatch()
  const { appState } = bindActionCreators(actions, dispatch)

  const card = useRef()
  
  useEffect(async () => {
  }, [])

  let fc = 0
  useFrame(state => {
    if (fc === 60) {
    }
    // card.current.rotation.x = clock.getElapsedTime()
    fc++
  })
  return (
    <>
      <mesh position={[0, 0, 5]} onPointerEnter={(e) => console.log('in')} onPointerLeave={(e) => console.log('out')} ref={card}>
        <planeGeometry args={[10, 15]}/>
        <meshStandardMaterial color='#cccccc' side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[5, 0, 0]} rotation={new THREE.Euler(0, Math.PI / 2, 0)} onPointerEnter={(e) => console.log('in')} onPointerLeave={(e) => console.log('out')} ref={card}>
        <planeGeometry args={[10, 15]}/>
        <meshStandardMaterial color='#cccccc' side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

export default Card
