import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'
import { InfoBox } from '.'

describe('InfoBox', () => {
    it('Should display loading label and trigger close on click', () => {

        const closeEvent = jest.fn()

        render(<InfoBox 
            onCloseClick={closeEvent}
        />)

        expect(screen.getByText('Weather Icon Set')).toBeInTheDocument()

        const closeBtn = screen.getByRole('button')
        fireEvent.click(closeBtn)

        expect(closeEvent).toBeCalled()
        
    })
})