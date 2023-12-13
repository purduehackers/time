/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import { Clock } from './clock-test-component'
import React from 'react'
import { LightningTime } from '../../src'
import { format } from 'date-fns'

function getDesiredValues() {
  const now = new Date()
  const lt = new LightningTime()
  const { lightningString, colors } = lt.convertToLightning(now)
  const formattedNowString = format(now, 'h:mm a')

  return {
    lightningString,
    formattedNowString,
    colors
  }
}

describe('react clock', () => {
  it('renders a react clock', () => {
    render(<Clock />)
    expect(screen.getByTestId('lightning string')).toBeDefined()
    expect(screen.getByTestId('formatted normal time')).toBeDefined()
    expect(screen.getByTestId('bolt color')).toBeDefined()
    expect(screen.getByTestId('zap color')).toBeDefined()
    expect(screen.getByTestId('spark color')).toBeDefined()
  })
  it('renders the correct lightning time string', () => {
    render(<Clock />)
    const { lightningString } = getDesiredValues()

    expect(screen.getByTestId('lightning string').innerHTML).toEqual(lightningString)
  })
  it('renders the correct formatted normal time', () => {
    render(<Clock />)
    const { formattedNowString } = getDesiredValues()

    expect(screen.getByTestId('formatted normal time').innerHTML).toEqual(formattedNowString)
  })
  it('renders the correct colors', () => {
    render(<Clock />)
    const { colors } = getDesiredValues()

    expect(screen.getByTestId('bolt color').innerHTML).toEqual(colors.boltColor)
    expect(screen.getByTestId('zap color').innerHTML).toEqual(colors.zapColor)
    expect(screen.getByTestId('spark color').innerHTML).toEqual(colors.sparkColor)
  })
})