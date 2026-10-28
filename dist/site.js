const themeToggle = document.querySelector('.theme-toggle');
let currentTheme = 'light';
try { currentTheme = localStorage.getItem('portfolio-template-theme') === 'dark' ? 'dark' : 'light'; } catch {}
function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#111214' : '#f5f5f6';
}
applyTheme(currentTheme);
themeToggle.addEventListener('click', () => {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  try { localStorage.setItem('portfolio-template-theme', currentTheme); } catch {}
});

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  nav.classList.remove('is-open');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu(); toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
const filters = document.querySelectorAll('[data-filter]');
const projects = [...document.querySelectorAll('[data-platform]')];
filters.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  let shown = 0;
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  projects.forEach(project => {
    const visible = filter === 'all' || project.dataset.platform.split(' ').includes(filter);
    project.hidden = !visible;
    if (visible) shown++;
  });
  document.querySelector('#project-count').textContent = shown;
  document.querySelector('#project-count-label').textContent = shown === 1 ? 'product family' : 'product families';
  document.querySelector('#filter-announcement').textContent = `${shown} ${shown === 1 ? 'product family' : 'product families'} shown.`;
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const productData = {
  "frame": {
    "title": "Frame",
    "platform": "Camera & video · iPhone + Mac",
    "description": "A sample camera product connecting a phone and a desktop. Use this featured card to tell the story of your flagship project.",
    "capabilities": [
      "Describe the problem your product solves",
      "Explain your role and contribution",
      "Share a useful outcome or design decision"
    ],
    "images": [
      [
        "frame-desktop.svg",
        "Fictional Frame desktop interface"
      ],
      [
        "frame-screen.svg",
        "Fictional Frame interface"
      ]
    ],
    "links": [
      [
        "Project website",
        "https://example.com/projects/frame"
      ]
    ]
  },
  "pocket": {
    "title": "Pocket",
    "platform": "Personal tools · iPhone + Mac",
    "description": "A sample personal organizer with a calm, focused interface. Replace this description with the decisions behind your own product.",
    "capabilities": [
      "Keep important information together",
      "Find what matters with simple navigation",
      "Describe the details that make it yours"
    ],
    "images": [
      [
        "pocket-screen.svg",
        "Fictional Pocket interface"
      ]
    ],
    "links": [
      [
        "Project website",
        "https://example.com/projects/pocket"
      ]
    ]
  },
  "bridge": {
    "title": "Bridge",
    "platform": "File transfer · Android + iPhone",
    "description": "A sample file-sharing experience for nearby devices. Show how your work makes a complicated task feel straightforward.",
    "capabilities": [
      "Connect two devices with a clear flow",
      "Show progress and useful feedback",
      "Explain the solution in everyday language"
    ],
    "images": [
      [
        "bridge-screen.svg",
        "Fictional Bridge interface"
      ]
    ],
    "links": [
      [
        "Project website",
        "https://example.com/projects/bridge"
      ]
    ]
  },
  "mirror": {
    "title": "Mirror",
    "platform": "Connected devices · Android + iOS",
    "description": "A sample connected-device project. This card is a place for an idea that helps people work together across screens.",
    "capabilities": [
      "Explore a connected-device workflow",
      "Keep the important controls in reach",
      "Document your approach to reliability"
    ],
    "images": [
      [
        "mirror-screen.svg",
        "Fictional Mirror interface"
      ]
    ],
    "links": [
      [
        "Project website",
        "https://example.com/projects/mirror"
      ]
    ]
  },
  "tempo": {
    "title": "Tempo",
    "platform": "Music & community · Android + iOS",
    "description": "A sample listening experience with a considered library and a simple player. Share a product that brings people a little closer.",
    "capabilities": [
      "Browse a curated collection",
      "Save favorites for another day",
      "Make everyday interactions easy to use"
    ],
    "images": [
      [
        "tempo-screen.svg",
        "Fictional Tempo interface"
      ]
    ],
    "links": [
      [
        "Project website",
        "https://example.com/projects/tempo"
      ]
    ]
  },
  "circuit": {
    "title": "Circuit",
    "platform": "Creative tools · Android",
    "description": "A sample workspace for hands-on projects. Use the detail view to explain a workflow, a technical challenge, or something you learned.",
    "capabilities": [
      "Start with a small creative idea",
      "Organize a project into clear steps",
      "Capture notes and revisit earlier work"
    ],
    "images": [
      [
        "circuit-screen.svg",
        "Fictional Circuit interface"
      ]
    ],
    "links": [
      [
        "Project website",
        "https://example.com/projects/circuit"
      ]
    ]
  },
  "quickscan": {
    "title": "Quickscan",
    "platform": "Everyday utilities · Android",
    "description": "A sample utility that removes an everyday frustration. Highlight a small product whose value comes from doing one thing well.",
    "capabilities": [
      "Make a repetitive task easier",
      "Keep the interface focused",
      "Give users a clear next step"
    ],
    "images": [
      [
        "quickscan-screen.svg",
        "Fictional Quickscan interface"
      ]
    ],
    "links": [
      [
        "Project website",
        "https://example.com/projects/quickscan"
      ]
    ]
  }
};
const productDialog = document.querySelector('#product-dialog');
let previousOverflow = '';
let productTrigger;
document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
  const product = productData[button.dataset.product];
  if (!product) return;
  productTrigger = button;
  document.querySelector('#product-title').textContent = product.title;
  document.querySelector('#product-platform').textContent = product.platform;
  document.querySelector('#product-description').textContent = product.description;
  const gallery = document.querySelector('#product-gallery');
  gallery.replaceChildren(...product.images.map(([file, alt]) => {
    const image = document.createElement('img');
    image.src = `assets/apps/${file}`; image.alt = alt;
    return image;
  }));
  const capabilities = document.querySelector('#product-capabilities');
  capabilities.replaceChildren(...product.capabilities.map(text => {
    const item = document.createElement('li'); item.textContent = text; return item;
  }));
  const links = document.querySelector('#product-store-links');
  links.replaceChildren(...product.links.map(([label, url]) => {
    const link = document.createElement('a');
    link.textContent = `${label} ↗`; link.href = url;
    link.target = '_blank'; link.rel = 'noopener noreferrer';
    return link;
  }));
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  productDialog.showModal();
}));
document.querySelector('.modal-close').addEventListener('click', () => productDialog.close());
productDialog.addEventListener('click', event => {
  if (event.target === productDialog) productDialog.close();
});
productDialog.addEventListener('close', () => {
  document.body.style.overflow = previousOverflow;
  productTrigger?.focus({ preventScroll: true });
});
