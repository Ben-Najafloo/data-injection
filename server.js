const express = require('express');
const fs = require('fs').promises; // Using promises-based fs module
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Endpoint to update event-info
app.post('/update_event', async (req, res) => {
    try {
        // Read the current data.json file
        const filePath = path.join(__dirname, 'data.json');
        let data = await fs.readFile(filePath, { encoding: 'utf8' });
        data = JSON.parse(data);

        // Update event-info with form data
        data['event-info'] = [{
            Eventname: req.body.eventName,
            Year: req.body.eventYear,
            Startdate: req.body.startDate,
            Finishdate: req.body.finishDate,
            Firstsponsor: req.body.firstSponsor,
            Secondsponsor: req.body.secondSponsor,
            Thirdsponsor: req.body.thirdSponsor
        }];

        // Write updated data back to data.json
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        // Respond with success message
        res.status(200).json({ message: 'Event info updated successfully' });
    } catch (err) {
        console.error('Error updating event info:', err);
        res.status(500).json({ message: 'Failed to update event info' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
