require('dotenv').config(); // Load environment variables
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data')

// Read the API key from the .env file
const imgbbApiKey = process.env.imgbb_api;

// Path to the image (favicon.png)
const imagePath = path.join(__dirname, 'public', 'images', 'favicon.png');



// Function to upload image
const uploadImage = async () => {
    try {
        // Read the image file
        const image = fs.readFileSync(imagePath);

        // Set up the form data for Imgbb API
        const formData = new FormData();
        formData.append('image', image, 'favicon.png');

        // Send POST request to Imgbb
        const response = await axios.post('https://api.imgbb.com/1/upload?key=' + imgbbApiKey, formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });
        const imgUrl = response.data.data.url;
        // Log the response from Imgbb
        console.log('Image uploaded successfully:', imgUrl);
    } catch (error) {
        console.error('Error uploading image:', error.message);
    }
};

// Run the upload function
uploadImage();
