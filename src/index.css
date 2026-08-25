@import "tailwindcss";

@theme {
  /* Brand palette — brightened for better contrast and a polished look */
  --color-brand-navy: #070b14;        /* Richer, slightly lifted background base */
  --color-brand-navy-light: #111c33;  /* Lighter card base so boxes pop out clearly */
  --color-brand-slate: #283548;       /* Defined border color for clean separation */
  --color-brand-offwhite: #f8f7f4;
  --color-brand-gold: #f59e0b;
  --color-brand-gold-dark: #b45309;
  --color-brand-emergency: #e11d48;

  /* Typography scale */
  --font-size-hero: 3.5rem;       
  --font-size-section: 2.25rem;   
  --font-size-subheading: 1.5rem; 
  --font-size-card: 1.25rem;      

  /* Radius + spacing tokens */
  --radius-card: 14px;
  --radius-button: 10px;
}

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    scroll-behavior: smooth;
    background-color: var(--color-brand-navy);
    color: var(--color-brand-offwhite);
  }
  h1, h2, h3,
  .font-display {
    font-family: 'Fraunces', 'Plus Jakarta Sans', serif;
    font-optical-sizing: auto;
    letter-spacing: -0.01em;
  }
}

.font-urdu {
  font-family: 'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'Urdu Typesetting', serif;
  line-height: 1.8;
}

/* Shared button base */
.btn {
  height: 46px;
  padding: 0 22px;
  border-radius: var(--radius-button);
  font-size: 15px;
  font-weight: 600;
  transition: all 220ms ease;
}
.btn-primary {
  background-color: var(--color-brand-gold);
  color: var(--color-brand-navy);
}
.btn-primary:hover {
  background-color: var(--color-brand-gold-dark);
  transform: translateY(-1px);
}
.btn-secondary {
  background-color: transparent;
  border: 1px solid var(--color-brand-slate);
  color: var(--color-brand-offwhite);
}
.btn-secondary:hover {
  border-color: var(--color-brand-gold);
}

/* Shared card base — upgraded with a soft glass glow and lighter tone */
.card {
  border-radius: var(--radius-card);
  padding: 28px;
  background-color: var(--color-brand-navy-light);
  border: 1px solid var(--color-brand-slate);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.4);
  transition: transform 250ms ease, box-shadow 250ms ease, border-color 250ms ease;
}
.card:hover {
  transform: translateY(-3px);
  border-color: rgba(245, 158, 11, 0.4); /* subtle gold accent on hover */
  box-shadow: 0 15px 35px -10px rgba(245, 158, 11, 0.12);
}

/* --- Keep all your existing keyframe animations below --- */
