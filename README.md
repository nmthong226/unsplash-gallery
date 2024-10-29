# IA02 - Unsplash Photo Gallery

## Project Overview
The Unsplash Photo Gallery is a web application designed to showcase beautiful photos sourced from the Unsplash API. This project aims to provide users with an engaging platform to explore, view, and interact with a vast collection of high-quality images. Users can scroll through a visually appealing photo gallery, click on images to view details, and seamlessly load more photos as they explore.

## Features
- **Infinite Scroll**: Automatically loads more photos as users scroll down the gallery.
- **Photo Details**: Users can click on any photo to view additional information about it, including the photographer's name and avatar.
- **Responsive Design**: The layout adapts to different screen sizes, ensuring a great user experience on both mobile and desktop devices.
- **Error Handling**: Displays an error page for invalid routes, ensuring users are always directed to appropriate content.
- **Loading State**: Indicates when photos are being fetched, enhancing the user experience.

## Technologies Used
- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Routing**: React Router
- **Data Fetching**: Axios (or Fetch API)

## Installation
To run the Unsplash Photo Gallery locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd IA02-Unsplash-Photo-Gallery
    ```
2. Install the dependencies:
    ```
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```
4. Open your browser and navigate to http://localhost:5713

## API Usage
The application utilizes the Unsplash API to fetch photos. Ensure you have an API key from Unsplash to access the data. You can sign up for an API key at Unsplash Developers.
    
    .env  
    VITE_UNSPLASH_ACCESS_KEY=YOUR_KEY
    

## Contributing
Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
Special thanks to Unsplash for providing high-quality images.
Thanks to all the contributors and community for their support and feedback.
