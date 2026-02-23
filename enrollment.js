document.addEventListener('DOMContentLoaded', function() {
    
    const enrollmentForm = document.getElementById('enrollmentForm');
    const campusSelect = document.getElementById('campus');
    const gradeLevelSelect = document.getElementById('gradeLevel');
    const birthDateInput = document.getElementById('birthDate');
    const ageInput = document.getElementById('age');
    const successMessage = document.getElementById('successMessage');
    const referenceNumber = document.getElementById('referenceNumber');
    
    // Multi-step variables
    let currentStep = 1;
    const totalSteps = 5;
    
    // ============================================
    // CAMPUS PROGRAMS DATA
    // ============================================
   
    const campusPrograms = {
        talisay: {
            name: "Talisay City Campus (Main)",
            programs: [
                { group: "Pre-Elementary", options: [
                    { value: "nursery", label: "Nursery" },
                    { value: "kindergarten", label: "Kindergarten" },
                    { value: "preparatory", label: "Preparatory" }
                ]},
                { group: "Elementary", options: [
                    { value: "grade1", label: "Grade 1" },
                    { value: "grade2", label: "Grade 2" },
                    { value: "grade3", label: "Grade 3" },
                    { value: "grade4", label: "Grade 4" },
                    { value: "grade5", label: "Grade 5" },
                    { value: "grade6", label: "Grade 6" }
                ]},
                { group: "Junior High School", options: [
                    { value: "grade7", label: "Grade 7" },
                    { value: "grade8", label: "Grade 8" },
                    { value: "grade9", label: "Grade 9" },
                    { value: "grade10", label: "Grade 10" }
                ]},
                { group: "Senior High School", options: [
                    { value: "grade11", label: "Grade 11" },
                    { value: "grade12", label: "Grade 12" }
                ]},
                { group: "College", options: [
                    { value: "bsnursing1", label: "BS Nursing - 1st Year" },
                    { value: "bsnursing2", label: "BS Nursing - 2nd Year" },
                    { value: "bsnursing3", label: "BS Nursing - 3rd Year" },
                    { value: "bsnursing4", label: "BS Nursing - 4th Year" }
                ]}
            ]
        },
        carcar: {
            name: "Carcar City Campus",
            programs: [
                { group: "Pre-Elementary", options: [
                    { value: "nursery", label: "Nursery" },
                    { value: "kindergarten", label: "Kindergarten" },
                    { value: "preparatory", label: "Preparatory" }
                ]},
                { group: "Elementary", options: [
                    { value: "grade1", label: "Grade 1" },
                    { value: "grade2", label: "Grade 2" },
                    { value: "grade3", label: "Grade 3" },
                    { value: "grade4", label: "Grade 4" },
                    { value: "grade5", label: "Grade 5" },
                    { value: "grade6", label: "Grade 6" }
                ]},
                { group: "Junior High School", options: [
                    { value: "grade7", label: "Grade 7" },
                    { value: "grade8", label: "Grade 8" },
                    { value: "grade9", label: "Grade 9" },
                    { value: "grade10", label: "Grade 10" }
                ]},
                { group: "Senior High School", options: [
                    { value: "grade11", label: "Grade 11" },
                    { value: "grade12", label: "Grade 12" }
                ]},
                { group: "College", options: [
                    { value: "bscrim1", label: "BS Criminology - 1st Year" },
                    { value: "bscrim2", label: "BS Criminology - 2nd Year" },
                    { value: "bscrim3", label: "BS Criminology - 3rd Year" },
                    { value: "bscrim4", label: "BS Criminology - 4th Year" }
                ]}
            ]
        },
        bohol: {
            name: "Tagbilaran, Bohol Campus",
            programs: [
                { group: "Pre-Elementary", options: [
                    { value: "nursery", label: "Nursery" },
                    { value: "kindergarten", label: "Kindergarten" },
                    { value: "preparatory", label: "Preparatory" }
                ]},
                { group: "Elementary", options: [
                    { value: "grade1", label: "Grade 1" },
                    { value: "grade2", label: "Grade 2" },
                    { value: "grade3", label: "Grade 3" },
                    { value: "grade4", label: "Grade 4" },
                    { value: "grade5", label: "Grade 5" },
                    { value: "grade6", label: "Grade 6" }
                ]},
                { group: "Junior High School", options: [
                    { value: "grade7", label: "Grade 7" },
                    { value: "grade8", label: "Grade 8" },
                    { value: "grade9", label: "Grade 9" },
                    { value: "grade10", label: "Grade 10" }
                ]},
                { group: "Senior High School", options: [
                    { value: "grade11", label: "Grade 11" },
                    { value: "grade12", label: "Grade 12" }
                ]}
            ]
        }
    };
    
  // ============================================
// DYNAMIC GRADE LEVEL UPDATE
// ============================================

function updateGradeLevels() {
    const selectedCampus = campusSelect.value;
    
    // Clear current options
    gradeLevelSelect.innerHTML = '<option value=""></option>';
    
    if (!selectedCampus) {
        gradeLevelSelect.disabled = true;
        return;
    }
    
    // Enable grade level dropdown
    gradeLevelSelect.disabled = false;
    
    // Get programs for selected campus
    const programs = campusPrograms[selectedCampus].programs;
    
    // Populate grade levels
    programs.forEach(programGroup => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = programGroup.group;
        
        programGroup.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.label;
            optgroup.appendChild(optionElement);
        });
        
        gradeLevelSelect.appendChild(optgroup);
    });
}

// ✅ ONE event listener for campus change
campusSelect.addEventListener('change', function() {
    updateGradeLevels();
    
    // Force grade level label to float when campus is selected
    if (this.value) {
        const gradeLevelContainer = gradeLevelSelect.closest('.floating-input');
        const gradeLevelLabel = gradeLevelContainer ? gradeLevelContainer.querySelector('label') : null;
        
        if (gradeLevelLabel) {
            gradeLevelLabel.style.top = '0';
            gradeLevelLabel.style.left = '0.8rem';
            gradeLevelLabel.style.fontSize = '0.75rem';
            gradeLevelLabel.style.color = 'var(--primary-red)';
            gradeLevelLabel.style.fontWeight = '600';
        }
        
        // Focus on grade level to prompt user
        setTimeout(() => {
            gradeLevelSelect.focus();
        }, 200);
    }
});

// ✅ ONE disabled initialization (ONLY ONE TIME)
gradeLevelSelect.disabled = true;

// ✅ Make grade level label float when option is selected
gradeLevelSelect.addEventListener('change', function() {
    const container = this.closest('.floating-input');
    const label = container ? container.querySelector('label') : null;
    
    if (this.value && label) {
        label.style.top = '0';
        label.style.left = '0.8rem';
        label.style.fontSize = '0.75rem';
        label.style.color = 'var(--primary-red)';
        label.style.fontWeight = '600';
    }
});

    
    // ============================================
    // AUTO-CALCULATE AGE
    // ============================================
    
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


	// ============================================
	// INPUT VALIDATIONS & RESTRICTIONS
	// ============================================

	// ✅ NO MIDDLE NAME CHECKBOX
	const noMiddleNameCheckbox = document.getElementById('noMiddleName');
	const middleNameInput = document.getElementById('middleName');

	if (noMiddleNameCheckbox && middleNameInput) {
    	noMiddleNameCheckbox.addEventListener('change', function() {
       	 if (this.checked) {
            middleNameInput.value = 'N/A';
            middleNameInput.disabled = true;
            middleNameInput.style.backgroundColor = 'var(--off-white)';
       	 } else {
            middleNameInput.value = '';
            middleNameInput.disabled = false;
            middleNameInput.style.backgroundColor = 'var(--white)';
       	 }
    	});
	}

	// ✅ CONTACT NUMBER - ONLY NUMBERS, MAX 11 DIGITS
	const contactNumberInput = document.getElementById('contactNumber');

	if (contactNumberInput) {
   	 contactNumberInput.addEventListener('input', function(e) {
        // Remove any non-digit characters
        let value = this.value.replace(/\D/g, '');
        
        // Limit to 11 digits
        if (value.length > 11) {
            value = value.slice(0, 11);
        	}
        
        	this.value = value;
   		 });
    
   	 // Prevent non-numeric input on keypress
    	contactNumberInput.addEventListener('keypress', function(e) {
        const char = String.fromCharCode(e.which);
        if (!/[0-9]/.test(char)) {
            e.preventDefault();
      	  }
    	});
	}

	// ✅ PARENT CONTACT NUMBERS - Same validation
	const fatherContactInput = document.getElementById('fatherContact');
	const motherContactInput = document.getElementById('motherContact');
	const guardianContactInput = document.getElementById('guardianContact');

	[fatherContactInput, motherContactInput, guardianContactInput].forEach(input => {
   	 if (input) {
       	 input.addEventListener('input', function(e) {
          	  let value = this.value.replace(/\D/g, '');
           	 if (value.length > 11) {
           	     value = value.slice(0, 11);
           	 }
           	 this.value = value;
       		 });
        
       	 input.addEventListener('keypress', function(e) {
            const char = String.fromCharCode(e.which);
            if (!/[0-9]/.test(char)) {
                e.preventDefault();
            }
       	 });
        
       	 // Add pattern and maxlength attributes
       	 input.setAttribute('pattern', '[0-9]{11}');
       	 input.setAttribute('maxlength', '11');
    }
	});

	// ✅ EMAIL VALIDATION - Real-time feedback
	const emailInput = document.getElementById('email');

	if (emailInput) {
   	 emailInput.addEventListener('blur', function() {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
        
        if (this.value && !emailRegex.test(this.value)) {
            this.setCustomValidity('Please enter a valid email address');
            this.reportValidity();
        } else {
            this.setCustomValidity('');
        }
    });
    
    emailInput.addEventListener('input', function() {
        this.setCustomValidity('');
    });
}

// ✅ NAME FIELDS - Only letters and spaces
const nameFields = [
    document.getElementById('lastName'),
    document.getElementById('firstName'),
    document.getElementById('middleName')
];

nameFields.forEach(input => {
    if (input) {
        input.addEventListener('keypress', function(e) {
            const char = String.fromCharCode(e.which);
            // Allow letters, spaces, hyphens, and apostrophes
            if (!/[a-zA-Z\s\-']/.test(char)) {
                e.preventDefault();
            }
        });
    }
});

// ============================================
// CUSTOM MODERN CALENDAR
// ============================================

let currentCalendarDate = new Date();
let selectedDate = null;
let activeInput = null;

const calendarOverlay = document.getElementById('calendarOverlay');
const calendarDays = document.getElementById('calendarDays');
const calendarCurrentMonth = document.getElementById('calendarCurrentMonth');
const calendarPrevMonth = document.getElementById('calendarPrevMonth');
const calendarNextMonth = document.getElementById('calendarNextMonth');
const calendarToday = document.getElementById('calendarToday');
const calendarClear = document.getElementById('calendarClear');
const calendarClose = document.getElementById('calendarClose');

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Open calendar when clicking date input
if (birthDateInput) {
    birthDateInput.addEventListener('click', function(e) {
        e.preventDefault();
        activeInput = this;
        
        // Set current date to input value if exists
        if (this.value) {
            currentCalendarDate = new Date(this.value + 'T00:00:00');
            selectedDate = new Date(this.value + 'T00:00:00');
        } else {
            currentCalendarDate = new Date();
            selectedDate = null;
        }
        
        renderCalendar();
        calendarOverlay.classList.add('active');
    });
}

// Render calendar
function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    // Update header
    calendarCurrentMonth.textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayIndex = firstDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDayDate = prevLastDay.getDate();
    
    // Clear calendar
    calendarDays.innerHTML = '';
    
    // Previous month days
    for (let i = firstDayIndex; i > 0; i--) {
        const day = createDayElement(prevLastDayDate - i + 1, 'other-month', year, month - 1);
        calendarDays.appendChild(day);
    }
    
    // Current month days
    const today = new Date();
    const maxDate = new Date(); // Today
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 100);
    
    for (let i = 1; i <= lastDayDate; i++) {
        const currentDate = new Date(year, month, i);
        let classes = '';
        
        // Check if today
        if (
            i === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            classes += 'today ';
        }
        
        // Check if selected
        if (selectedDate &&
            i === selectedDate.getDate() &&
            month === selectedDate.getMonth() &&
            year === selectedDate.getFullYear()
        ) {
            classes += 'selected ';
        }
        
        // Check if disabled (future dates or too old)
        if (currentDate > maxDate || currentDate < minDate) {
            classes += 'disabled ';
        }
        
        const day = createDayElement(i, classes.trim(), year, month);
        calendarDays.appendChild(day);
    }
    
    // Next month days
    const remainingDays = 42 - (firstDayIndex + lastDayDate); // 6 weeks = 42 days
    for (let i = 1; i <= remainingDays; i++) {
        const day = createDayElement(i, 'other-month', year, month + 1);
        calendarDays.appendChild(day);
    }
}

// Create day element
function createDayElement(day, classes, year, month) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('calendar-day');
    
    if (classes) {
        const classList = classes.split(' ');
        classList.forEach(cls => dayElement.classList.add(cls));
    }
    
    dayElement.textContent = day;
    
    // Add click event if not disabled
    if (!classes.includes('disabled')) {
        dayElement.addEventListener('click', function() {
            selectDate(year, month, day);
        });
    }
    
    return dayElement;
}

// Select date
function selectDate(year, month, day) {
    selectedDate = new Date(year, month, day);
    
    // Format date as YYYY-MM-DD
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    if (activeInput) {
        activeInput.value = formattedDate;
        
        // Trigger change event to calculate age
        const event = new Event('change', { bubbles: true });
        activeInput.dispatchEvent(event);
    }
    
    // Close calendar
    closeCalendar();
}

// Navigation
if (calendarPrevMonth) {
    calendarPrevMonth.addEventListener('click', function() {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar();
    });
}

if (calendarNextMonth) {
    calendarNextMonth.addEventListener('click', function() {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar();
    });
}

// Today button
if (calendarToday) {
    calendarToday.addEventListener('click', function() {
        const today = new Date();
        selectDate(today.getFullYear(), today.getMonth(), today.getDate());
    });
}

// Clear button
if (calendarClear) {
    calendarClear.addEventListener('click', function() {
        if (activeInput) {
            activeInput.value = '';
            if (ageInput) {
                ageInput.value = '';
            }
        }
        selectedDate = null;
        closeCalendar();
    });
}

// Close button
if (calendarClose) {
    calendarClose.addEventListener('click', closeCalendar);
}

// Close when clicking overlay
if (calendarOverlay) {
    calendarOverlay.addEventListener('click', function(e) {
        if (e.target === calendarOverlay) {
            closeCalendar();
        }
    });
}

// Close calendar function
function closeCalendar() {
    calendarOverlay.classList.remove('active');
    activeInput = null;
}

// Close with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && calendarOverlay.classList.contains('active')) {
        closeCalendar();
    }
});
	
    
    // ============================================
    // FLOATING LABEL FIX FOR SELECT
    // ============================================
    
    // Trigger label float when select changes
    document.querySelectorAll('.floating-input select').forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.setAttribute('data-has-value', 'true');
            } else {
                this.removeAttribute('data-has-value');
            }
        });
    });
    
    // ============================================
    // MULTI-STEP NAVIGATION
    // ============================================
    
    window.nextStep = function() {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                currentStep++;
                updateStep();
            }
        }
    };
    
    window.prevStep = function() {
        if (currentStep > 1) {
            currentStep--;
            updateStep();
        }
    };
    
    function updateStep() {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step
        const activeStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        if (activeStep) {
            activeStep.classList.add('active');
        }
        
        // Update progress bar
        updateProgressBar();
        
        // Update progress steps
        updateProgressSteps();
        
        // If step 5 (review), populate review
        if (currentStep === 5) {
            populateReview();
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function updateProgressBar() {
        const progressFill = document.getElementById('progressFill');
        const percentage = (currentStep / totalSteps) * 100;
        progressFill.style.width = percentage + '%';
    }
    
    function updateProgressSteps() {
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            const stepNumber = index + 1;
            
            step.classList.remove('active', 'completed');
            
            if (stepNumber === currentStep) {
                step.classList.add('active');
            } else if (stepNumber < currentStep) {
                step.classList.add('completed');
            }
        });
    }
    
    // ============================================
    // VALIDATION
    // ============================================
    
function validateCurrentStep() {
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const requiredInputs = currentStepElement.querySelectorAll('input[required], select[required]');
    
    let isValid = true;
    let errorMessage = '';
    
    requiredInputs.forEach(input => {
        // Check if field is empty
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
            
            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
        }
        // ✅ Validate contact number length
        else if (input.id.includes('contact') || input.id.includes('Contact')) {
            if (input.value.length !== 11) {
                isValid = false;
                errorMessage = 'Contact number must be exactly 11 digits';
                input.style.borderColor = 'red';
                
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        }
        // ✅ Validate email format
        else if (input.type === 'email') {
            const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
                input.style.borderColor = 'red';
                
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        }
    });
    
    if (!isValid) {
        alert(errorMessage || 'Please fill in all required fields correctly before proceeding.');
    }
    
    return isValid;
}
    
    // ============================================
    // POPULATE REVIEW SECTION
    // ============================================
    
    function populateReview() {
        // Campus & Program
        const campusName = campusPrograms[campusSelect.value]?.name || campusSelect.value;
        const gradeLevelText = gradeLevelSelect.options[gradeLevelSelect.selectedIndex]?.text || '';
        const studentTypeText = document.getElementById('studentType').options[document.getElementById('studentType').selectedIndex]?.text || '';
        
        document.getElementById('reviewCampus').innerHTML = `
            <p><strong>Campus:</strong> ${campusName}</p>
            <p><strong>Grade Level:</strong> ${gradeLevelText}</p>
            <p><strong>Student Type:</strong> ${studentTypeText}</p>
            <p><strong>School Year:</strong> ${document.getElementById('schoolYear').value}</p>
        `;
        
        // Student Information
        
		document.getElementById('reviewStudent').innerHTML = `
    		<p><strong>Name:</strong> ${document.getElementById('firstName').value} ${document.getElementById('middleName').value} ${document.getElementById('lastName').value}</p>
    		<p><strong>Birth Date:</strong> ${document.getElementById('birthDate').value}</p>
   			<p><strong>Place of Birth:</strong> ${document.getElementById('birthPlace').value}</p>
   			<p><strong>Age:</strong> ${document.getElementById('age').value}</p>
    		<p><strong>Gender:</strong> ${document.getElementById('gender').value}</p>
    		<p><strong>Civil Status:</strong> ${document.getElementById('civilStatus').value}</p>
    		<p><strong>Religion:</strong> ${document.getElementById('religion').value}</p>
    		<p><strong>Nationality:</strong> ${document.getElementById('nationality').value}</p>
    		<p><strong>Address:</strong> ${document.getElementById('address').value}</p>
    		<p><strong>Email:</strong> ${document.getElementById('email').value}</p>
    		<p><strong>Contact:</strong> ${document.getElementById('contactNumber').value}</p>
`	;
        
        // Parent/Guardian
        document.getElementById('reviewParent').innerHTML = `
            <p><strong>Father:</strong> ${document.getElementById('fatherName').value}</p>
            <p><strong>Occupation:</strong> ${document.getElementById('fatherOccupation').value || 'N/A'}</p>
            <p><strong>Contact:</strong> ${document.getElementById('fatherContact').value}</p>
            <hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--light-cream);">
            <p><strong>Mother:</strong> ${document.getElementById('motherName').value}</p>
            <p><strong>Occupation:</strong> ${document.getElementById('motherOccupation').value || 'N/A'}</p>
            <p><strong>Contact:</strong> ${document.getElementById('motherContact').value}</p>
            ${document.getElementById('guardianName').value ? `
                <hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--light-cream);">
                <p><strong>Guardian:</strong> ${document.getElementById('guardianName').value}</p>
                <p><strong>Relation:</strong> ${document.getElementById('guardianRelation').value || 'N/A'}</p>
                <p><strong>Contact:</strong> ${document.getElementById('guardianContact').value || 'N/A'}</p>
            ` : ''}
        `;
        
        // Previous School
        document.getElementById('reviewSchool').innerHTML = `
            <p><strong>Last School:</strong> ${document.getElementById('lastSchool').value}</p>
            <p><strong>Address:</strong> ${document.getElementById('schoolAddress').value || 'N/A'}</p>
            <p><strong>Last Grade:</strong> ${document.getElementById('lastGrade').value || 'N/A'}</p>
            <p><strong>School Year:</strong> ${document.getElementById('lastSchoolYear').value || 'N/A'}</p>
        `;
    }
    
    // ============================================
    // FORM SUBMISSION
    // ============================================
    
    enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if checkboxes are checked
        if (!document.getElementById('termsAccept').checked || !document.getElementById('dataPrivacy').checked) {
            alert('Please accept the terms and conditions to proceed.');
            return;
        }
        
        // Generate reference number
        const refNum = 'CSHC-' + Date.now().toString().slice(-8);
        referenceNumber.textContent = refNum;
        
        // Collect form data
        const formData = new FormData(enrollmentForm);
        const data = Object.fromEntries(formData);
        
        // Add campus name
        if (data.campus && campusPrograms[data.campus]) {
            data.campusName = campusPrograms[data.campus].name;
        }
        
        // Log data (in production, send to server)
        console.log('Enrollment Data:', data);
        
        // Show success message
        enrollmentForm.style.display = 'none';
        document.getElementById('progressContainer').style.display = 'none';
        successMessage.classList.add('show');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // ============================================
    // INITIALIZE
    // ============================================
    
    // Set initial progress
    updateProgressBar();
    updateProgressSteps();
    
});