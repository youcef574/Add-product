// Add Product JavaScript - YouZinElegancia
document.addEventListener('DOMContentLoaded', function() {
    
    // Language Translations
    const translations = {
        fr: {
            dashboard: "Tableau de bord",
            products: "Produits",
            orders: "Commandes",
            account_settings: "Paramètres du compte",
            logout: "Déconnexion",
            add_product: "Ajouter un Produit",
            add_product_subtitle: "Créez un nouveau produit pour votre boutique",
            product_details: "Détails du Produit",
            product_name: "Nom du Produit",
            sku: "SKU",
            price: "Prix",
            currency: "Devise",
            category: "Catégorie",
            select_category: "Sélectionner une catégorie",
            description: "Description",
            inventory: "Inventaire",
            quantity: "Quantité",
            status: "Statut",
            active: "Actif",
            inactive: "Inactif",
            draft: "Brouillon",
            featured: "Produit Vedette",
            mark_as_featured: "Marquer comme produit vedette",
            media: "Médias",
            product_images: "Images du Produit",
            max_5_images: "Maximum 5 images",
            physical_properties: "Propriétés Physiques",
            weight: "Poids (kg)",
            width: "Largeur (cm)",
            height: "Hauteur (cm)",
            depth: "Profondeur (cm)",
            seo: "SEO",
            seo_title: "Titre SEO",
            seo_title_help: "Recommandé: 50-60 caractères",
            seo_description: "Description SEO",
            seo_description_help: "Recommandé: 150-160 caractères",
            cancel: "Annuler",
            processing: "Traitement en cours...",
            error_required: "Ce champ est obligatoire",
            error_number: "Veuillez entrer un nombre valide",
            error_email: "Veuillez entrer un email valide",
            success_product_added: "Produit ajouté avec succès!",
            error_max_images: "Maximum 5 images autorisées",
            confirm_remove_image: "Êtes-vous sûr de vouloir supprimer cette image?",
            placeholder_description: "Entrez la description du produit..."
        },
        en: {
            dashboard: "Dashboard",
            products: "Products",
            orders: "Orders",
            account_settings: "Account Settings",
            logout: "Logout",
            add_product: "Add Product",
            add_product_subtitle: "Create a new product for your store",
            product_details: "Product Details",
            product_name: "Product Name",
            sku: "SKU",
            price: "Price",
            currency: "Currency",
            category: "Category",
            select_category: "Select a category",
            description: "Description",
            inventory: "Inventory",
            quantity: "Quantity",
            status: "Status",
            active: "Active",
            inactive: "Inactive",
            draft: "Draft",
            featured: "Featured Product",
            mark_as_featured: "Mark as featured product",
            media: "Media",
            product_images: "Product Images",
            max_5_images: "Maximum 5 images",
            physical_properties: "Physical Properties",
            weight: "Weight (kg)",
            width: "Width (cm)",
            height: "Height (cm)",
            depth: "Depth (cm)",
            seo: "SEO",
            seo_title: "SEO Title",
            seo_title_help: "Recommended: 50-60 characters",
            seo_description: "SEO Description",
            seo_description_help: "Recommended: 150-160 characters",
            cancel: "Cancel",
            processing: "Processing...",
            error_required: "This field is required",
            error_number: "Please enter a valid number",
            error_email: "Please enter a valid email",
            success_product_added: "Product added successfully!",
            error_max_images: "Maximum 5 images allowed",
            confirm_remove_image: "Are you sure you want to remove this image?",
            placeholder_description: "Enter product description..."
        }
    };

    // Current language
    let currentLanguage = 'fr';
    
    // Form submission flag
    let isSubmitting = false;
    
    // Image files array
    let imageFiles = [];

    // Initialize the application
    function init() {
        setupEventListeners();
        setupRichTextEditor();
        setupImageUpload();
        setupFormValidation();
        updateLanguage();
        setupMobileMenu();
        setupUserDropdown();
        setupFloatingLabels();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Language switcher
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', function() {
                currentLanguage = this.value;
                updateLanguage();
            });
        }

        // Form submission
        const form = document.getElementById('addProductForm');
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
        }

        // Cancel button
        const cancelBtn = document.querySelector('.btn-secondary');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                if (confirm(translations[currentLanguage].confirm_cancel || 'Are you sure you want to cancel?')) {
                    window.history.back();
                }
            });
        }

        // Window resize
        window.addEventListener('resize', handleResize);
    }

    // Setup mobile menu
    function setupMobileMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', function() {
                mobileMenu.classList.toggle('hidden');
                mobileMenu.classList.toggle('show');
            });
        }
    }

    // Setup user dropdown
    function setupUserDropdown() {
        const userDropdown = document.getElementById('userDropdown');
        const userMenu = document.getElementById('userMenu');
        
        if (userDropdown && userMenu) {
            userDropdown.addEventListener('click', function(e) {
                e.stopPropagation();
                userMenu.classList.toggle('hidden');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', function() {
                userMenu.classList.add('hidden');
            });
        }
    }

    // Setup floating labels
    function setupFloatingLabels() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('.form-input');
            const label = group.querySelector('.form-label');
            
            if (input && label && input.type !== 'file' && input.type !== 'checkbox') {
                group.classList.add('floating-label');
                
                input.addEventListener('focus', function() {
                    group.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    group.classList.remove('focused');
                    if (this.value) {
                        group.classList.add('filled');
                    } else {
                        group.classList.remove('filled');
                    }
                });
            }
        });
    }

    // Setup rich text editor
    function setupRichTextEditor() {
        const editor = document.getElementById('richTextEditor');
        const toolbarButtons = document.querySelectorAll('.toolbar-btn');
        
        if (editor) {
            // Set placeholder
            editor.setAttribute('data-placeholder', translations[currentLanguage].placeholder_description);
            
            // Setup toolbar buttons
            toolbarButtons.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const command = this.getAttribute('data-command');
                    
                    if (command) {
                        document.execCommand(command, false, null);
                        editor.focus();
                        
                        // Update button state
                        updateToolbarButtonState();
                    }
                });
            });

            // Update toolbar button states
            editor.addEventListener('keyup', updateToolbarButtonState);
            editor.addEventListener('mouseup', updateToolbarButtonState);
        }
    }

    // Update toolbar button state
    function updateToolbarButtonState() {
        const toolbarButtons = document.querySelectorAll('.toolbar-btn');
        
        toolbarButtons.forEach(btn => {
            const command = btn.getAttribute('data-command');
            if (command) {
                if (document.queryCommandState(command)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            }
        });
    }

    // Setup image upload
    function setupImageUpload() {
        const imageInput = document.getElementById('images');
        const imagePreview = document.getElementById('imagePreview');
        
        if (imageInput && imagePreview) {
            imageInput.addEventListener('change', function(e) {
                const files = Array.from(e.target.files);
                
                // Check file limit
                if (imageFiles.length + files.length > 5) {
                    showNotification(translations[currentLanguage].error_max_images, 'error');
                    return;
                }

                files.forEach(file => {
                    if (file.type.startsWith('image/')) {
                        imageFiles.push(file);
                        createImagePreview(file);
                    }
                });
                
                // Reset input
                imageInput.value = '';
            });
        }
    }

    // Create image preview
    function createImagePreview(file) {
        const imagePreview = document.getElementById('imagePreview');
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const previewDiv = document.createElement('div');
            previewDiv.className = 'image-preview';
            
            previewDiv.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="remove-btn" onclick="removeImage(${imageFiles.length - 1})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            imagePreview.appendChild(previewDiv);
        };
        
        reader.readAsDataURL(file);
    }

    // Remove image (global function)
    window.removeImage = function(index) {
        if (confirm(translations[currentLanguage].confirm_remove_image)) {
            imageFiles.splice(index, 1);
            updateImagePreview();
        }
    };

    // Update image preview
    function updateImagePreview() {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = '';
        
        imageFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewDiv = document.createElement('div');
                previewDiv.className = 'image-preview';
                
                previewDiv.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button type="button" class="remove-btn" onclick="removeImage(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                imagePreview.appendChild(previewDiv);
            };
            reader.readAsDataURL(file);
        });
    }

    // Setup form validation
    function setupFormValidation() {
        const form = document.getElementById('addProductForm');
        const inputs = form.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }

    // Validate field
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = translations[currentLanguage].error_required;
        }

        // Number field validation
        if (field.type === 'number' && value && isNaN(value)) {
            isValid = false;
            errorMessage = translations[currentLanguage].error_number;
        }

        // Email field validation
        if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = translations[currentLanguage].error_email;
        }

        // Show error if invalid
        if (!isValid) {
            showFieldError(field, errorMessage);
        } else {
            showFieldSuccess(field);
        }

        return isValid;
    }

    // Show field error
    function showFieldError(field, message) {
        field.classList.add('error');
        field.classList.remove('success');
        
        let errorDiv = field.parentNode.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            field.parentNode.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
    }

    // Show field success
    function showFieldSuccess(field) {
        field.classList.add('success');
        field.classList.remove('error');
        clearFieldError(field);
    }

    // Clear field error
    function clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.classList.remove('show');
        }
    }

    // Validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Handle form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        if (isSubmitting) {
            return;
        }

        // Validate all fields
        const form = e.target;
        const inputs = form.querySelectorAll('.form-input[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            showNotification('Please fix the errors before submitting', 'error');
            return;
        }

        // Collect rich text content
        const richTextEditor = document.getElementById('richTextEditor');
        const descriptionInput = document.getElementById('description');
        if (richTextEditor && descriptionInput) {
            descriptionInput.value = richTextEditor.innerHTML;
        }

        // Show loading state
        showLoading(true);
        isSubmitting = true;

        // Simulate form submission (replace with actual AJAX call)
        setTimeout(() => {
            // Here you would normally send the data to your server
            console.log('Form data:', new FormData(form));
            console.log('Images:', imageFiles);
            
            showLoading(false);
            isSubmitting = false;
            showNotification(translations[currentLanguage].success_product_added, 'success');
            
            // Reset form after successful submission
            // form.reset();
            // imageFiles = [];
            // updateImagePreview();
        }, 2000);
    }

    // Show loading overlay
    function showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        const submitBtn = document.getElementById('submitBtn');
        
        if (show) {
            overlay.classList.remove('hidden');
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ${translations[currentLanguage].processing}
            `;
        } else {
            overlay.classList.add('hidden');
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <span data-translate="add_product">${translations[currentLanguage].add_product}</span>
            `;
        }
    }

    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${
            type === 'error' ? 'bg-red-500' : 
            type === 'success' ? 'bg-green-500' : 'bg-blue-500'
        }`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // Update language
    function updateLanguage() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[currentLanguage][key]) {
                element.textContent = translations[currentLanguage][key];
            }
        });

        // Update document title
        document.title = `${translations[currentLanguage].add_product} - YouZinElegancia`;
        
        // Update document language
        document.documentElement.lang = currentLanguage;
        
        // Update rich text editor placeholder
        const richTextEditor = document.getElementById('richTextEditor');
        if (richTextEditor) {
            richTextEditor.setAttribute('data-placeholder', translations[currentLanguage].placeholder_description);
        }
    }

    // Handle window resize
    function handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth >= 1024) {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
            }
        }
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

    // Initialize the application
    init();

    // Export functions for external use
    window.YouZinElegancia = {
        updateLanguage,
        showNotification,
        validateField,
        removeImage: window.removeImage
    };
});

// Additional utility functions

// Format currency
function formatCurrency(amount, currency = 'EUR') {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Generate SKU
function generateSKU(productName, category) {
    const namePrefix = productName.substring(0, 3).toUpperCase();
    const categoryPrefix = category.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-4);
    return `${namePrefix}-${categoryPrefix}-${timestamp}`;
}

// Auto-generate SKU when product name and category are filled
document.addEventListener('DOMContentLoaded', function() {
    const productNameInput = document.getElementById('product_name');
    const categorySelect = document.getElementById('category');
    const skuInput = document.getElementById('sku');
    
    function autoGenerateSKU() {
        if (productNameInput.value && categorySelect.value && !skuInput.value) {
            skuInput.value = generateSKU(productNameInput.value, categorySelect.value);
        }
    }
    
    if (productNameInput && categorySelect && skuInput) {
        productNameInput.addEventListener('blur', autoGenerateSKU);
        categorySelect.addEventListener('change', autoGenerateSKU);
    }
});