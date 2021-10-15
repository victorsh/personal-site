'use strict'

import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

import { useSelector, useDispatch, Provider, ReactReduxContext } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'

const textProps = {
  fontSize: 3.9,
  font: 'https://fonts.gstatic.com/s/modak/v5/EJRYQgs1XtIEskMA-hI.woff'
}

const TextExample = (props) => {
  const rstate = useSelector(rstate => rstate)

  return (
    <Text depthText={false} {...textProps}>{rstate.main.extext || 'Hello!'}</Text>
  )
}

export default TextExample
