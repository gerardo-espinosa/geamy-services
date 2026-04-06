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
async function handleSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const name = form.querySelector('#name') ? form.querySelector('#name').value : form.elements['name'].value;
  const email = form.querySelector('#email') ? form.querySelector('#email').value : form.elements['email'].value;
  const message = form.querySelector('#message') ? form.querySelector('#message').value : form.elements['message'].value;

  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      alert('Thank you! Your message has been sent successfully.');
      form.reset();
    } else {
      alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
    }
  } catch (err) {
    alert('Sorry, there was an error sending your message. Please try again or contact us directly.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
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
