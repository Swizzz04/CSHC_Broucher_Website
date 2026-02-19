document.addEventListener('DOMContentLoaded', function() {
    
    const enrollmentForm = document.getElementById('enrollmentForm');
    const birthDateInput = document.getElementById('birthDate');
    const ageInput = document.getElementById('age');
    const successMessage = document.getElementById('successMessage');
    const referenceNumber = document.getElementById('referenceNumber');

    // Auto-calculate age from birth date
    birthDateInput.addEventListener('change', function() {
        const birthDate = new Date(this.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        ageInput.value = age >= 0 ? age : '';
    });

    // Form submission
    enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Generate reference number
        const refNum = 'CSHC-' + Date.now().toString().slice(-8);
        referenceNumber.textContent = refNum;
        
        // Collect form data
        const formData = new FormData(enrollmentForm);
        const data = Object.fromEntries(formData);
        
        // Here you would normally send data to a server
        console.log('Enrollment Data:', data);
        
        // Show success message
        enrollmentForm.style.display = 'none';
        successMessage.classList.add('show');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // In production, you would send this data to your server:
        // fetch('/api/enrollment', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // }).then(response => response.json())
        //   .then(data => { /* handle success */ });
    });

});