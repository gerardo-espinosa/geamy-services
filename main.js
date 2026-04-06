// Geamy Services LLC - Main JS

// Mobile menu toggle
function toggleMenu() {
  const links = document.getElementById('navLinks');
  links.classList.toggle('open');
}

// Close menu on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// Contact form handler
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const name = form.querySelector('#name') ? form.querySelector('#name').value : form.elements['name'].value;
  const email = form.querySelector('#email') ? form.querySelector('#email').value : form.elements['email'].value;
  const message = form.querySelector('#message') ? form.querySelector('#message').value : form.elements['message'].value;

  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Sending...';

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#16a34a';
      form.reset();
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 3000);
    } else {
      alert('Sorry, there was an error sending your message. Please try again or email us directly.');
    }
  } catch (err) {
    alert('Sorry, there was an error sending your message. Please try again or email us directly.');
  } finally {
    btn.disabled = false;
    if (btn.textContent === 'Sending...') btn.textContent = originalText;
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .term-card, .about-inner, .contact-inner').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
