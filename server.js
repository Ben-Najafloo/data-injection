const express = require('express');
const fs = require('fs').promises;
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
        const filePath = path.join(__dirname, 'data.json');
        let data = await fs.readFile(filePath, 'utf8');
        data = JSON.parse(data);

        // Log incoming request data
        console.log('Update event info request body:', req.body);

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

        res.status(200).json({ message: 'Event info updated successfully' });
    } catch (err) {
        console.error('Error updating event info:', err);
        res.status(500).json({ message: 'Failed to update event info' });
    }
});

// Endpoint to add new timing entry
app.post('/add_timing', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'data.json');
        let data = await fs.readFile(filePath, 'utf8');
        data = JSON.parse(data);

        // Log incoming request data
        console.log('Add timing entry request body:', req.body);

        // Generate a new id for the timing entry
        const newId = data.Timing.length ? data.Timing[data.Timing.length - 1].id + 1 : 1;

        // Add new timing entry with form data
        data.Timing.push({
            id: newId,
            Lastname: req.body.lastName,
            Firstname: req.body.firstName,
            Sex: req.body.gender,
            Birthdate: req.body.birthday,
            Country: req.body.country,
            UCIID: req.body.uciId,
            Team: req.body.teamName,
            Year: req.body.year,
            "Team ID": req.body.teamId,
            "Team Cat.": req.body.teamCategory,
            "Team Country": req.body.teamCountry,
            "Team Continent": req.body.teamContinent
        });

        // Write updated data back to data.json
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        res.status(200).json({ message: 'Timing entry added successfully' });
    } catch (err) {
        console.error('Error adding timing entry:', err);
        res.status(500).json({ message: 'Failed to add timing entry' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
