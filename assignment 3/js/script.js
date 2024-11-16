// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });

        // Real-time validation
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => {
                if (!input.checkValidity()) {
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });
        });
    });
});

// Geolocation Functions
function initMap(latitude, longitude) {
    const location = { lat: latitude, lng: longitude };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        styles: [
            {
                "featureType": "poi.business",
                "stylers": [{ "visibility": "off" }]
            },
            {
                "featureType": "transit",
                "elementType": "labels.icon",
                "stylers": [{ "visibility": "off" }]
            }
        ]
    });
    
    new google.maps.Marker({
        position: location,
        map: map,
        title: 'Your Location'
    });
}

function getLocation() {
    const status = document.getElementById('status');
    const latlongDisplay = document.getElementById('latlong');
    
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
        return;
    }

    status.textContent = 'Locating...';

    navigator.geolocation.getCurrentPosition(
        // Success callback
        position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            latlongDisplay.innerHTML = `
                <div class="location-details">
                    <strong>Latitude:</strong> ${latitude.toFixed(6)}<br>
                    <strong>Longitude:</strong> ${longitude.toFixed(6)}
                </div>
            `;
            
            status.textContent = 'Location found!';
            
            if (typeof initMap === 'function') {
                initMap(latitude, longitude);
            }
        },
        // Error callback
        error => {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    status.textContent = 'Please allow location access to use this feature.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    status.textContent = 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    status.textContent = 'Location request timed out.';
                    break;
                default:
                    status.textContent = 'An unknown error occurred.';
                    break;
            }
        },
        // Options
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
}

// Initialize location feature if on location page
if (document.getElementById('map')) {
    getLocation();
}

// Accordion accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    const accordionButtons = document.querySelectorAll('.accordion .btn-link');
    
    accordionButtons.forEach(button => {
        button.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                button.click();
            }
        });
        
        // Update ARIA states
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
        });
    });
});

// Mobile touch enhancements
if ('ontouchstart' in window) {
    document.querySelectorAll('.card-header').forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('touchend', function(e) {
            const button = this.querySelector('.btn-link');
            if (button) {
                e.preventDefault();
                button.click();
            }
        });
    });
}

// Navigation active state management
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const filename = currentPath.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        link.querySelector('.sr-only')?.remove();
        
        if (link.getAttribute('href') === filename) {
            link.classList.add('active');
            const srOnly = document.createElement('span');
            srOnly.classList.add('sr-only');
            srOnly.textContent = '(current)';
            link.appendChild(srOnly);
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});