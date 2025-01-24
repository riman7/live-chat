# Live Chat App

This is a real-time chat application built using **Node.js**, **Express.js**, **Socket.IO**, and **jQuery**. The main objective of this project was to focus on backend development and Socket.IO integration. For the frontend, AI tools such as ChatGPT and DeepSeek were used to speed up the design and implementation process.

---

## Features

- **Real-Time Messaging**: Instant communication using WebSocket technology.
- **User Status Tracking**:
  - Displays whether users are online or offline.
  - Updates dynamically as users connect or disconnect.
- **Friend List**: Shows a dynamic list of friends with profile pictures and statuses.
- **Persistent Chat History**: Loads chat history for selected users from the server.
- **Auto-Scroll**: Automatically scrolls to the latest message in the chat window.

---

## Tools and Technologies

### Backend:
- **Node.js**: Runtime environment for server-side JavaScript.
- **Express.js**: Framework for backend routing and logic.
   - Middlewares: body-parser, multer (used for uploading files.), express session, dotenv
- **Socket.IO**: WebSocket library for real-time data transfer.
- **EJS**: Templating engine for rendering dynamic HTML pages.
- **MongoDB** (or your preferred database): Used to store user and chat data.

### Frontend:
- **jQuery**: For AJAX requests and DOM manipulation.
- **CSS**: Custom styles for UI components.

---

## Acknowledgments

Since the primary focus of this project was backend development and WebSocket integration, AI tools were utilized to streamline frontend development.  
Special thanks to:
- **ChatGPT** for providing frontend code suggestions and guidance.
- **DeepSeek** for offering additional insights and improvements.

---

## Installation and Setup

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```
2. Install dependencies:

```bash
npm install
```
3. Configure environment variables:
- Create a .env file in the root directory.
- Add the following variables:

```makefile
PORT=3000
DATABASE_URL=your-database-connection-string
```
Replace your-database-connection-string with your actual database connection string.
Run the server:

```bash
npm start
```

The application will run at http://localhost:3000.

5. Use the app:
- Open the app in your browser.
- register
- Log in with a valid user account and select a friend to start chatting in real time.

---

## Future Improvements
Responsive Design: Improve the UI for mobile and tablet devices.
- Authentication: Add secure login and registration features.
- Typing Indicators: Show when the other user is typing.
- Media Sharing: Enable users to send images and documents.
- Push Notifications: Notify users of new messages in real time.

---

## License
This project is open-source and available under the MIT License.