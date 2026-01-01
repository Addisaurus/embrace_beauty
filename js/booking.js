/* ========================================
   EMBRACE BEAUTY - BOOKING MODAL SYSTEM
   Professional Vagaro Widget Integration
   ======================================== */

/**
 * BookingModal - Handles the booking modal overlay
 * Provides lazy loading, accessibility, and smooth animations
 */
class BookingModal {
  constructor() {
    this.modal = null;
    this.isOpen = false;
    this.widgetLoaded = false;
    this.focusableElements = [];
    this.previousActiveElement = null;
    this.init();
  }

  init() {
    this.createModal();
    this.bindEvents();
  }

  createModal() {
    const modalHTML = `
      <div class="booking-modal" id="bookingModal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="bookingModalTitle">
        <div class="booking-modal-backdrop"></div>
        <div class="booking-modal-container">
          <button class="booking-modal-close" aria-label="Close booking modal">&times;</button>
          <div class="booking-modal-header">
            <h2 id="bookingModalTitle">Book Your Appointment</h2>
            <p>Schedule your next visit with Embrace Beauty</p>
          </div>
          <div class="booking-modal-body">
            <div class="vagaro-modal-widget" id="vagaroModalWidget">
              <div class="booking-widget-loading">
                <div class="booking-spinner"></div>
                <p class="booking-loading-text">Loading booking system...</p>
              </div>
            </div>
            <div class="booking-widget-error" id="bookingWidgetError">
              <div class="error-icon">!</div>
              <h3>Unable to Load Booking System</h3>
              <p>We're experiencing technical difficulties. Please try again or contact us directly.</p>
              <div class="error-actions">
                <button class="btn" onclick="location.reload()">Try Again</button>
                <a href="contact.html" class="btn btn-primary">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.modal = document.getElementById('bookingModal');
  }

  bindEvents() {
    // Open triggers - any element with data-booking-modal attribute
    document.querySelectorAll('[data-booking-modal]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    // Close triggers
    this.modal.querySelector('.booking-modal-close').addEventListener('click', () => this.close());
    this.modal.querySelector('.booking-modal-backdrop').addEventListener('click', () => this.close());

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Focus trap
    this.modal.addEventListener('keydown', (e) => this.handleTabKey(e));
  }

  loadWidget() {
    if (this.widgetLoaded) return;

    const container = document.getElementById('vagaroModalWidget');
    const loader = container.querySelector('.booking-widget-loading');

    // Create the Vagaro widget structure
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'vagaro';
    widgetDiv.style.cssText = 'width:100%; padding:0; border:0; margin:0 auto; text-align:center;';

    // Add the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.vagaro.com//resources/WidgetEmbeddedLoader/OZqqCJGpCpCcT3qmV35y6JuPlXiz3avV34mC2PeFJ4mC30m9dSycvCu7gevEhAJDXwOapcUbfY?v=ju4JxA9t11xkKJbkPviYyabIgFpSfzBkyKaGqkWGUzmW#';

    widgetDiv.appendChild(script);
    container.appendChild(widgetDiv);

    this.widgetLoaded = true;

    // Monitor for widget load and hide loader
    this.checkWidgetLoaded(loader);
  }

  checkWidgetLoaded(loader) {
    let attempts = 0;
    const maxAttempts = 100; // 10 seconds max

    const interval = setInterval(() => {
      attempts++;
      const vagaroFrame = this.modal.querySelector('iframe');

      if (vagaroFrame && vagaroFrame.offsetHeight > 100) {
        loader.classList.add('hidden');
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        // Show error state
        loader.classList.add('hidden');
        document.getElementById('bookingWidgetError').classList.add('visible');
        clearInterval(interval);
      }
    }, 100);
  }

  handleTabKey(e) {
    if (e.key !== 'Tab') return;

    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this.focusableElements = [...this.modal.querySelectorAll(focusableSelectors)].filter(el => !el.disabled);

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }

  open() {
    this.previousActiveElement = document.activeElement;
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    this.isOpen = true;

    // Lazy load the widget on first open
    this.loadWidget();

    // Focus the close button
    setTimeout(() => {
      this.modal.querySelector('.booking-modal-close').focus();
    }, 100);
  }

  close() {
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this.isOpen = false;

    // Restore focus
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }
}

/**
 * BookingWidget - Manages loading states for embedded widgets
 * Used on the dedicated booking page
 */
class BookingWidget {
  constructor(container) {
    this.container = container;
    this.loader = null;
    this.errorElement = null;
    this.init();
  }

  init() {
    this.loader = this.container.querySelector('.booking-widget-loading');
    this.errorElement = this.container.querySelector('.booking-widget-error');
    this.checkWidgetLoaded();
  }

  checkWidgetLoaded() {
    let attempts = 0;
    const maxAttempts = 100;

    const interval = setInterval(() => {
      attempts++;
      const vagaroFrame = this.container.querySelector('iframe');

      if (vagaroFrame && vagaroFrame.offsetHeight > 100) {
        this.hideLoader();
        clearInterval(interval);
      } else if (attempts >= maxAttempts) {
        this.showError();
        clearInterval(interval);
      }
    }, 100);
  }

  hideLoader() {
    if (this.loader) {
      this.loader.classList.add('hidden');
    }
  }

  showError() {
    if (this.loader) {
      this.loader.classList.add('hidden');
    }
    if (this.errorElement) {
      this.errorElement.classList.add('visible');
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the booking modal
  window.bookingModal = new BookingModal();

  // Initialize any embedded widgets on the page
  const embeddedWidgets = document.querySelectorAll('.booking-widget-container');
  embeddedWidgets.forEach(container => {
    new BookingWidget(container);
  });
});
