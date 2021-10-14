'use strict'

import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const Card = (props) => {
  const card = useRef()
  useEffect(async () => {
    await props.appState({...props.rstate.main, status: 'card-object'})
    console.log(props.rstate.main)
  }, [])

  let fc = 0
  useFrame(state => {
    if (fc === 60) {
      console.log(props.rstate.main)
    }
    // card.current.rotation.x = clock.getElapsedTime()
    fc++
  })
  return (
    <>
      <mesh position={[0, 0, 5]}onPointerEnter={(e) => console.log('in')} onPointerLeave={(e) => console.log('out')} ref={card}>
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
