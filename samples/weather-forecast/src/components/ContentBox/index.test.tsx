import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import { ContentBox } from '.'

describe('ContentBox', () => {
    it('Should trigger info event on click', () => {

        const infoEvent = jest.fn()

        render(<ContentBox 
            alternateTemperature=""
            temperature=""
            onInfoButtonClick={infoEvent}
        />)

        const closeBtn = screen.getByRole('button')
        fireEvent.click(closeBtn)

        expect(infoEvent).toBeCalled()
        
    })

    it('Should render given data', () => {

        render(<ContentBox 
            alternateTemperature="321° F"
            temperature="123° C"
            date="Today"
            location="Chemnitz"
            time="Daytime"
            onInfoButtonClick={jest.fn()}
        />)

        expect(screen.getByText("321° F")).toBeInTheDocument()
        expect(screen.getByText("123° C")).toBeInTheDocument()
        expect(screen.getByText("Daytime · Chemnitz")).toBeInTheDocument()
        expect(screen.getByText("Today")).toBeInTheDocument()
        
    })
})