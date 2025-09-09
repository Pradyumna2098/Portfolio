// Enhanced Timeline Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize timeline tabs with debug logging
    initEnhancedTimelineTabs();
});

function initEnhancedTimelineTabs() {
    const timelineTabs = document.querySelectorAll('.timeline-tab');
    const timelines = document.querySelectorAll('.timeline');
    
    console.log('Timeline tabs found:', timelineTabs.length);
    console.log('Timeline containers found:', timelines.length);
    
    timelineTabs.forEach((tab, index) => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = this.getAttribute('data-target');
            console.log('Tab clicked:', target);
            
            // Remove active class from all tabs and timelines
            timelineTabs.forEach(t => {
                t.classList.remove('active');
                console.log('Removed active from tab:', t.getAttribute('data-target'));
            });
            
            timelines.forEach(t => {
                t.classList.remove('active');
                console.log('Removed active from timeline:', t.id);
            });
            
            // Add active class to clicked tab and corresponding timeline
            this.classList.add('active');
            const targetTimeline = document.getElementById(`${target}-timeline`);
            
            if (targetTimeline) {
                targetTimeline.classList.add('active');
                console.log('Activated timeline:', targetTimeline.id);
                
                // Force display with style attribute as backup
                targetTimeline.style.display = 'block';
                
                // Hide other timelines
                timelines.forEach(t => {
                    if (t.id !== `${target}-timeline`) {
                        t.style.display = 'none';
                    }
                });
            } else {
                console.error('Timeline not found:', `${target}-timeline`);
            }
        });
        
        console.log('Added listener to tab:', tab.getAttribute('data-target'));
    });
    
    // Ensure initial state is correct
    const activeTab = document.querySelector('.timeline-tab.active');
    if (activeTab) {
        const target = activeTab.getAttribute('data-target');
        const activeTimeline = document.getElementById(`${target}-timeline`);
        if (activeTimeline) {
            activeTimeline.classList.add('active');
            activeTimeline.style.display = 'block';
        }
    }
}
