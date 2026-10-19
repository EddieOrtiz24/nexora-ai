import { useState } from 'react'

const features = [
  { icon: '✳', title: 'Ideas que cobran vida', text: 'De una primera chispa a un proyecto completo, en una conversación.' },
  { icon: '⌘', title: 'Tu espacio de trabajo', text: 'Organiza proyectos, archivos y conversaciones en un solo lugar.' },
  { icon: '↗', title: 'Menos tareas, más impacto', text: 'Automatiza lo repetitivo y reserva tu energía para lo importante.' },
]

const plans = [
  { name: 'Esencial', price: '0', description: 'Para explorar nuevas ideas.', items: ['Asistente personal', '3 proyectos activos', 'Historial de 7 días'] },
  { name: 'Creador', price: '18', description: 'Para quienes hacen que las cosas pasen.', items: ['Todo lo de Esencial', 'Proyectos ilimitados', 'Modelos avanzados', 'Historial completo'], featured: true },
  { name: 'Equipo', price: '42', description: 'Para crear mejor, juntos.', items: ['Todo lo de Creador', 'Espacios compartidos', 'Controles de equipo', 'Soporte prioritario'] },
]

const questions = [
  { question: '¿Qué es NEXORA AI?', answer: 'NEXORA AI es un espacio de trabajo creativo con inteligencia artificial que te ayuda a pensar, escribir y construir, desde una única plataforma.' },
  { question: '¿Necesito experiencia técnica?', answer: 'Para nada. Puedes empezar con lenguaje natural y adaptar NEXORA a tu manera de trabajar, tengas el perfil que tengas.' },
  { question: '¿Puedo cambiar de plan más adelante?', answer: 'Sí. Puedes cambiar o cancelar tu plan en cualquier momento desde la configuración de tu cuenta.' },
  { question: '¿Mis proyectos son privados?', answer: 'Tus proyectos son tuyos. Tú decides qué compartir y con quién cuando trabajas en un espacio de equipo.' },
]

function Brand() {
  return <a className="brand" href="#inicio" aria-label="NEXORA AI, inicio"><span className="brand-mark" aria-hidden="true">N</span><span>NEXORA<span className="brand-ai"> AI</span></span></a>
}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function App() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0)

  return (
    <>
      <header className="site-header">
        <nav className="nav-shell" aria-label="Navegación principal">
          <Brand />
          <div className="nav-links"><a href="#funcionalidades">Funcionalidades</a><a href="#precios">Precios</a><a href="#faq">FAQ</a></div>
          <a className="button button-small" href="#precios">Empezar gratis <Arrow /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> UNA NUEVA FORMA DE CREAR</p>
            <h1 id="hero-title">Haz espacio<br />para lo <span className="gradient-text">extraordinario.</span></h1>
            <p className="hero-description">La inteligencia artificial que convierte tus grandes ideas en tu próximo gran proyecto.</p>
            <div className="hero-actions"><a className="button" href="#precios">Empieza gratis <Arrow /></a><a className="text-link" href="#funcionalidades">Descubre NEXORA <span aria-hidden="true">↓</span></a></div>
            <div className="social-proof"><div className="avatar-stack" aria-hidden="true"><span>AM</span><span>JL</span><span>SK</span><span>+</span></div><p><strong>12.000+</strong> mentes creativas ya están aquí</p></div>
          </div>
          <div className="hero-visual" aria-label="Vista previa del espacio de trabajo NEXORA" role="img">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="visual-glow" />
            <div className="ai-core"><span>N</span><i /></div>
            <div className="float-card card-prompt"><span className="card-icon">✳</span><div><small>UNA IDEA PARA HOY</small><strong>¿Y si lo hacemos posible?</strong></div><span className="card-arrow">↗</span></div>
            <div className="float-card card-note"><span className="note-line" /><span className="note-line short" /><span className="note-line" /><span className="note-tag">NUEVA PERSPECTIVA</span></div>
            <div className="visual-caption"><span className="status-dot" /> TU PRÓXIMA IDEA EMPIEZA AQUÍ</div>
            <span className="sparkle sparkle-one">✳</span><span className="sparkle sparkle-two">✦</span><span className="sparkle sparkle-three">·</span>
          </div>
          <div className="hero-bottom"><span>PIENSA SIN LÍMITES</span><span className="hero-bottom-line" /><span>01 — 04</span></div>
        </section>

        <section className="features section-wrap section-block" id="funcionalidades" aria-labelledby="features-title">
          <div className="section-heading"><div><p className="eyebrow">TODO LO QUE IMAGINAS, EN UN SOLO LUGAR</p><h2 id="features-title">Una idea brillante<br />merece <span className="gradient-text">grandes herramientas.</span></h2></div><p className="section-intro">Menos fricción entre lo que imaginas y lo que puedes hacer. NEXORA te acompaña en cada paso.</p></div>
          <div className="feature-grid">{features.map((feature, index) => <article className="feature-card" key={feature.title}><div className="feature-top"><span className="feature-icon" aria-hidden="true">{feature.icon}</span><span className="feature-number">0{index + 1}</span></div><h3>{feature.title}</h3><p>{feature.text}</p><a href="#precios" aria-label={`Descubre ${feature.title}`}>Descubrir <Arrow /></a></article>)}</div>
        </section>

        <section className="benefits section-wrap section-block" aria-labelledby="benefits-title">
          <div className="benefit-art" aria-hidden="true"><div className="benefit-orbit" /><div className="benefit-orbit second" /><div className="benefit-center">N<span>✳</span></div><span className="benefit-label label-one">IMAGINA</span><span className="benefit-label label-two">CREA</span><span className="benefit-label label-three">AVANZA</span></div>
          <div className="benefit-copy"><p className="eyebrow">TU POTENCIAL, SIN INTERMEDIARIOS</p><h2 id="benefits-title">Tu mejor trabajo<br />empieza con <span className="gradient-text">más tiempo.</span></h2><p className="section-intro">Recupera el espacio mental para pensar en grande. NEXORA se ocupa del resto, sin interrumpir tu ritmo.</p><ul className="benefit-list"><li><span>✓</span> Un copiloto que entiende tu contexto</li><li><span>✓</span> Resultados que suenan a ti</li><li><span>✓</span> Tus ideas, siempre en movimiento</li></ul><a className="text-link" href="#precios">Encuentra tu plan <Arrow /></a></div>
        </section>

        <section className="pricing section-wrap section-block" id="precios" aria-labelledby="pricing-title">
          <div className="center-heading"><p className="eyebrow">SENCILLO, COMO DEBERÍA SER</p><h2 id="pricing-title">Elige tu próximo <span className="gradient-text">capítulo.</span></h2><p>Empieza gratis. Crece cuando estés listo.</p></div>
          <div className="pricing-grid">{plans.map((plan) => <article className={`price-card${plan.featured ? ' featured' : ''}`} key={plan.name}>{plan.featured && <span className="popular-tag">EL FAVORITO DE LOS CREADORES</span>}<h3>{plan.name}</h3><p className="plan-description">{plan.description}</p><p className="price"><span>€</span>{plan.price}<small> / mes</small></p><a className={plan.featured ? 'button' : 'button button-outline'} href="#faq">Elegir {plan.name} <Arrow /></a><ul>{plan.items.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul></article>)}</div>
        </section>

        <section className="faq section-wrap section-block" id="faq" aria-labelledby="faq-title">
          <div className="faq-heading"><p className="eyebrow">¿TE QUEDA ALGUNA DUDA?</p><h2 id="faq-title">Buenas preguntas.<br /><span className="gradient-text">Respuestas claras.</span></h2><p>¿Tienes otra pregunta? <a href="mailto:hola@nexora.ai">Hablemos <Arrow /></a></p></div>
          <div className="faq-list">{questions.map((item, index) => { const isOpen = openQuestion === index; const panelId = `faq-answer-${index}`; return <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.question}><h3><button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenQuestion(isOpen ? null : index)}><span>{item.question}</span><span className="faq-toggle" aria-hidden="true">{isOpen ? '−' : '+'}</span></button></h3>{isOpen && <div className="faq-answer" id={panelId}><p>{item.answer}</p></div>}</article> })}</div>
        </section>

        <section className="cta-section section-wrap" aria-labelledby="cta-title"><div className="cta-glow" /><p className="eyebrow">EL FUTURO TIENE TU NOMBRE</p><h2 id="cta-title">¿Qué vas a crear<br />con <span className="gradient-text">todo ese tiempo?</span></h2><a className="button" href="#precios">Tu primera idea empieza aquí <Arrow /></a><span className="cta-spark" aria-hidden="true">✳</span></section>
      </main>

      <footer className="site-footer section-wrap"><div className="footer-main"><div className="footer-brand"><Brand /><p>Un poco de inteligencia.<br />Mucho más de imaginación.</p></div><div className="footer-links"><div><span>EXPLORA</span><a href="#funcionalidades">Funcionalidades</a><a href="#precios">Precios</a><a href="#faq">Preguntas frecuentes</a></div><div><span>ENCUÉNTRANOS</span><a href="mailto:hola@nexora.ai">Contacto</a><a href="#inicio">Instagram ↗</a><a href="#inicio">LinkedIn ↗</a></div></div></div><div className="footer-bottom"><span>© 2025 NEXORA AI. Hecho para imaginar.</span><div><a href="#inicio">Privacidad</a><a href="#inicio">Términos</a><span>Diseñado para lo que viene <span className="footer-star">✳</span></span></div></div></footer>
    </>
  )
}

export default App
