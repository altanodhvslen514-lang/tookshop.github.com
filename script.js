// WarTeza E-commerce Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSearch();
    initCart();
    initWishlist();
    initMegaMenu();
    initProductInteractions();
    initNewsletter();
    initSmoothScroll();
    initLazyLoading();
});

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Search suggestions (mock data)
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 2) {
                showSearchSuggestions(query);
            } else {
                hideSearchSuggestions();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        // In a real application, this would redirect to search results
        console.log('Searching for:', query);
        // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        
        // For demo purposes, show an alert
        showNotification(`Searching for "${query}"...`, 'info');
    }
}

function showSearchSuggestions(query) {
    // Mock search suggestions
    const suggestions = [
        'Nike Air Max',
        'Denim Jacket',
        'Vintage T-Shirt',
        'Leather Boots',
        'Summer Dress',
        'Casual Sneakers'
    ].filter(item => item.toLowerCase().includes(query));
    
    // Create suggestions dropdown (simplified for demo)
    console.log('Suggestions:', suggestions);
}

function hideSearchSuggestions() {
    // Hide suggestions dropdown
}

// Cart functionality
function initCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    
    if (cartIcon && cartCount) {
        // Load cart from localStorage
        let cart = JSON.parse(localStorage.getItem('warterza-cart') || '[]');
        updateCartCount(cart.length);
        
        // Add click event to cart icon
        cartIcon.addEventListener('click', showCart);
    }
}

function addToCart(productId, productName, productPrice, productImage) {
    let cart = JSON.parse(localStorage.getItem('warterza-cart') || '[]');
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    localStorage.setItem('warterza-cart', JSON.stringify(cart));
    updateCartCount(cart.length);
    showNotification(`${productName} added to cart!`, 'success');
    
    // Animate cart icon
    animateCartIcon();
}

function updateCartCount(count) {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
}

function showCart() {
    // In a real application, this would show a cart sidebar or redirect to cart page
    const cart = JSON.parse(localStorage.getItem('warterza-cart') || '[]');
    
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'info');
    } else {
        showNotification(`You have ${cart.length} item(s) in your cart`, 'info');
        // window.location.href = '/cart';
    }
}

function animateCartIcon() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartIcon.style.transform = 'scale(1)';
        }, 200);
    }
}

// Wishlist functionality
function initWishlist() {
    const wishlistItems = document.querySelectorAll('.wishlist-btn');
    
    wishlistItems.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(this);
        });
    });
}

function toggleWishlist(btn) {
    const productCard = btn.closest('.product-card');
    const productImage = productCard.querySelector('.product-image');
    const productName = productCard.querySelector('.product-name').textContent;
    
    // Toggle heart icon
    const heartIcon = btn.querySelector('i');
    const isWishlisted = heartIcon.classList.contains('fas');
    
    if (isWishlisted) {
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        btn.style.color = '';
        showNotification(`${productName} removed from wishlist`, 'info');
    } else {
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        btn.style.color = '#e74c3c';
        showNotification(`${productName} added to wishlist!`, 'success');
        
        // Animate heart
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
    }
}

// Mega menu functionality
function initMegaMenu() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        const megaMenu = item.querySelector('.mega-menu');
        
        if (megaMenu) {
            item.addEventListener('mouseenter', function() {
                megaMenu.style.opacity = '1';
                megaMenu.style.visibility = 'visible';
                megaMenu.style.transform = 'translateY(0)';
            });
            
            item.addEventListener('mouseleave', function() {
                megaMenu.style.opacity = '0';
                megaMenu.style.visibility = 'hidden';
                megaMenu.style.transform = 'translateY(-10px)';
            });
        }
    });
}

// Product interactions
function initProductInteractions() {
    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.btn-product');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.productId || Math.random().toString(36);
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('.product-image').src;
            
            addToCart(productId, productName, productPrice, productImage);
        });
    });
    
    // Quick view buttons
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            showQuickView(productCard);
        });
    });
    
    // Product card clicks
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only navigate if not clicking on buttons
            if (!e.target.closest('button')) {
                const productId = this.dataset.productId || Math.random().toString(36);
                // In a real app, navigate to product page
                console.log('Navigate to product:', productId);
                // window.location.href = `/product/${productId}`;
            }
        });
    });
}

function showQuickView(productCard) {
    const productName = productCard.querySelector('.product-name').textContent;
    const productBrand = productCard.querySelector('.product-brand').textContent;
    const productPrice = productCard.querySelector('.current-price').textContent;
    const productImage = productCard.querySelector('.product-image').src;
    
    // Create quick view modal (simplified)
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${productBrand} - ${productName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <img src="${productImage}" alt="${productName}" style="width: 200px; height: 250px; object-fit: cover;">
                <div class="modal-info">
                    <p class="modal-price">${productPrice}</p>
                    <button class="btn-primary" onclick="addToCart('${Math.random()}', '${productName}', '${productPrice}', '${productImage}')">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 24px;
        border-radius: 8px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.remove();
        }
    });
}

// Newsletter functionality
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.email-input');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // In a real app, this would send the email to your backend
                console.log('Newsletter subscription:', email);
                showNotification('Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 16px 24px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Scroll to top functionality
window.addEventListener('scroll', throttle(function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const showButton = scrollTop > 300;
    
    let scrollButton = document.querySelector('.scroll-to-top');
    if (!scrollButton && showButton) {
        scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background: #000;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        `;
        
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollButton);
        
        // Animate in
        setTimeout(() => {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        }, 100);
    } else if (scrollButton && !showButton) {
        scrollButton.style.opacity = '0';
        scrollButton.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (scrollButton.parentNode) {
                scrollButton.remove();
            }
        }, 300);
    }
}, 100));

// Initialize scroll to top on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add any additional initialization here
    console.log('WarTeza website loaded successfully!');
});
