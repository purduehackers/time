/**
 * @jest-environment jsdom
 */

import {render, screen} from '@testing-library/react'
import { Clock } from './clock-test-component'
import React from 'react'
import { LightningTime } from '../../src'
import { format } from 'date-fns'

describe('react clock', () => {
  it('renders a react clock', () => {
    render(<Clock />)
    expect(screen.getByTestId('lightning string')).toBeDefined()
    expect(screen.getByTestId('formatted normal time')).toBeDefined()
    expect(screen.getByTestId('bolt color')).toBeDefined()
    expect(screen.getByTestId('zap color')).toBeDefined()
    expect(screen.getByTestId('spark color')).toBeDefined()
  })
  it('renders the correct lightning time', () => {
    render(<Clock />)
    const now = new Date()
    const lt = new LightningTime()
    const { lightningString, colors } = lt.convertToLightning(now)
    const formattedNowString = format(now, 'h:mm a')

    // this will occasionally fail if the test is run right before a new spark
    // TODO: find a less flaky way to test this
    expect(screen.getByTestId('lightning string').innerHTML).toEqual(lightningString)
    expect(screen.getByTestId('formatted normal time').innerHTML).toEqual(formattedNowString)
    expect(screen.getByTestId('bolt color').innerHTML).toEqual(colors.boltColor)
    expect(screen.getByTestId('zap color').innerHTML).toEqual(colors.zapColor)
    expect(screen.getByTestId('spark color').innerHTML).toEqual(colors.sparkColor)
  })
})