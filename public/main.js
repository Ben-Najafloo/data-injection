document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('event-form');
    const timingForm = document.getElementById('timing-form');

    if (eventForm) {
        eventForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            console.log('Event form data:', data); // Add this line

            try {
                const response = await fetch('/update_event', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                console.log('Server response:', result); // Add this line
                alert(result.message);
            } catch (error) {
                console.error('Error updating event info:', error);
                alert('Failed to update event info');
            }
        });
    }

    if (timingForm) {
        timingForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());

            console.log('Timing form data:', data); // Add this line

            try {
                const response = await fetch('/add_timing', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                console.log('Server response:', result); // Add this line
                alert(result.message);
            } catch (error) {
                console.error('Error adding timing entry:', error);
                alert('Failed to add timing entry');
            }
        });
    }
});
