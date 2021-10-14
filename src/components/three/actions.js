'use strict'

import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const Actions = (props) => {
  useEffect(async () => {
    
  }, [])
  useFrame(state => {
    state.camera.position.x += 0.01
  })
  return (
    <></>
  )
}

export default Actions
