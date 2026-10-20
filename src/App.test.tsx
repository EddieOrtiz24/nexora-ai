import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

const firstQuestion = '¿Qué es NEXORA AI?'
const secondQuestion = '¿Necesito experiencia técnica?'

describe('FAQ', () => {
  it('renderiza las preguntas y muestra la primera respuesta inicialmente', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /Buenas preguntas\.Respuestas claras\./ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: firstQuestion })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/espacio de trabajo creativo con inteligencia artificial/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: secondQuestion })).toHaveAttribute('aria-expanded', 'false')
  })

  it('abre una pregunta y permite cerrarla', async () => {
    const user = userEvent.setup()
    render(<App />)

    const questionButton = screen.getByRole('button', { name: secondQuestion })
    await user.click(questionButton)

    expect(questionButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/Puedes empezar con lenguaje natural/)).toBeInTheDocument()

    await user.click(questionButton)

    expect(questionButton).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText(/Puedes empezar con lenguaje natural/)).not.toBeInTheDocument()
  })

  it('al cambiar de pregunta cierra la anterior y abre la seleccionada', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: secondQuestion }))

    expect(screen.getByRole('button', { name: firstQuestion })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('button', { name: secondQuestion })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.queryByText(/espacio de trabajo creativo con inteligencia artificial/)).not.toBeInTheDocument()
    expect(screen.getByText(/Puedes empezar con lenguaje natural/)).toBeInTheDocument()
  })

  it('permite abrir y cerrar preguntas con teclado', async () => {
    const user = userEvent.setup()
    render(<App />)

    const questionButton = screen.getByRole('button', { name: secondQuestion })
    questionButton.focus()
    await user.keyboard('{Enter}')
    expect(questionButton).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard(' ')
    expect(questionButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('asocia cada control mediante aria-controls con un panel existente', () => {
    render(<App />)

    const faq = screen.getByRole('region', { name: /Buenas preguntas\.Respuestas claras/ })
    const buttons = within(faq).getAllByRole('button')

    for (const button of buttons) {
      const panelId = button.getAttribute('aria-controls')
      expect(panelId).toBeTruthy()
      expect(document.getElementById(panelId!)).toBeInTheDocument()
    }
  })
})
