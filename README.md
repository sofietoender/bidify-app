# Auction Website - Semester Project 2

This project is built as part of the **Noroff Front-end Development Semester Project 2**. The goal is to create an auction website where users can bid on items and list their own items for auction.

## Project Description

An auction website where users can add items to be bid on and bid on items listed by other users. When a new user joins the website, they receive 1000 credits, which they can use to place bids. Non-registered users can search through the listings, but only registered users can make bids.

### Key Features:

- **Register**: Users with a `stud.noroff.no` email can register.
- **Login/Logout**: Registered users can log in and out.
- **User Profile**: Users can update their avatar and view their total credit.
- **Create Listings**: Registered users can create a listing with a title, deadline date, media gallery, and description.
- **Place Bids**: Registered users can place bids on listings created by others.
- **View Bids**: Registered users can view bids made on a listing.
- **Search Listings**: Unregistered users can search through listings.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Recommended: latest LTS version)
- [npm](https://www.npmjs.com/)

## Getting Started

### 1. Clone the Repository

```sh
git clone <repository-url>
```

````

### 2. Install Dependencies

```sh
npm install
```

### 3. Create an `.env` File

Create a file named `.env` in the root of your project and add the following line (replace `your-api-key` with your actual API key):

```env
VITE_API_KEY=your-api-key
```

You can generate your own API key here: [Noroff API Key Documentation](https://docs.noroff.dev/docs/v2/auth/api-key).

### 4. Start the Development Server

```sh
npm run dev
```

### 5. Build for Production

```sh
npm run build
```

## Resources

| Resource             | URL                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| **Gantt Chart**      | (https://github.com/users/sofietoender/projects/5/views/4)                                                |
| **Design Prototype** | (https://www.figma.com/proto/c4t6f70p66UKaoreHDeKOd/Semester-project-2?node-id=0-1&t=cJ1irrTGJMH0TL3m-1)  |
| **Style Guide**      | (https://www.figma.com/design/c4t6f70p66UKaoreHDeKOd/Semester-project-2?node-id=0-1&t=cJ1irrTGJMH0TL3m-1) |
| **Kanban Board**     | (https://github.com/users/sofietoender/projects/5/views/1)                                                |
| **Repository**       | (https://github.com/sofietoender/bidify-app.git)                                                          |
| **Hosted Demo**      | (https://bidify-sofie.netlify.app/)                                                                       |


````
