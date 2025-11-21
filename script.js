// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const checkboxes = document.querySelectorAll('.checkbox');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const encouragementText = document.getElementById('encouragementText');
    const checklistItems = document.querySelectorAll('.checklist-item');
    
    // Encouragement messages based on progress
    const encouragementMessages = [
        "You've got this! Start with the first step.",
        "Great start! Every step counts.",
        "You're making progress! Keep going.",
        "Halfway there! You're doing amazing.",
        "Almost there! Just a few more to go.",
        "Fantastic! Just one more step.",
        "Congratulations! You've completed all safety steps. You're a digital safety pro!"
    ];
    
    // Initialize progress from localStorage or set to 0
    let completedCount = localStorage.getItem('completedCount') ? 
                         parseInt(localStorage.getItem('completedCount')) : 0;
    
    // Set initial state of checkboxes and progress
    updateProgress();
    
    // Add event listeners to checkboxes
    checkboxes.forEach((checkbox, index) => {
        // Set initial state from localStorage
        const isChecked = localStorage.getItem(`checkbox-${index}`) === 'true';
        checkbox.checked = isChecked;
        
        // Update visual state
        if (isChecked) {
            checkbox.closest('.checklist-item').classList.add('checked');
        }
        
        // Add click event
        checkbox.addEventListener('click', function() {
            const checklistItem = this.closest('.checklist-item');
            
            if (this.checked) {
                checklistItem.classList.add('checked');
                completedCount++;
            } else {
                checklistItem.classList.remove('checked');
                completedCount--;
            }
            
            // Save to localStorage
            localStorage.setItem(`checkbox-${index}`, this.checked);
            localStorage.setItem('completedCount', completedCount);
            
            // Update progress
            updateProgress();
        });
    });
    
    // Add click event to checklist labels to show/hide tips
    document.querySelectorAll('.checklist-label').forEach(label => {
        label.addEventListener('click', function() {
            // Only toggle tips if not checking the checkbox
            if (!event.target.matches('input')) {
                const tipContent = this.nextElementSibling;
                tipContent.classList.toggle('active');
            }
        });
    });
    
    // Function to update progress bar and text
    function updateProgress() {
        const totalItems = checkboxes.length;
        const progressPercentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
        
        // Update progress bar width
        progressBar.style.width = `${progressPercentage}%`;
        
        // Update progress text
        progressText.textContent = `${progressPercentage}%`;
        
        // Update encouragement message based on progress
        let messageIndex = Math.floor((completedCount / totalItems) * encouragementMessages.length);
        messageIndex = Math.min(messageIndex, encouragementMessages.length - 1);
        encouragementText.textContent = encouragementMessages[messageIndex];
    }
    
    // Add some interactive effects
    document.querySelectorAll('.checklist-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add animation to progress bar on initial load
    setTimeout(() => {
        progressBar.style.transition = 'width 0.5s ease';
    }, 100);
});