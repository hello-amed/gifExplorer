---

# gifExplorer

gifExplorer is a web application that allows users to explore, search, and save their favorite GIFs. It uses the Giphy API to fetch trending and search results.

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running the following command in your terminal:

```sh
npm install
```

## Adding the API Key

The Giphy API key is required for the application to fetch GIFs.

1. Get your API key from the [Giphy Developers Portal](https://developers.giphy.com/).
2. Copy the `.env.local.template` file and rename it to `.env.local`.
3. Replace `KEY_HERE` in the `.env.local` file with your Giphy API key:

```template
VITE_GIPHY_API_KEY=YOUR_API_KEY
```

## Running the Application

To start the development server, run the following command in your terminal:

```sh
npm run dev
```

Enjoy exploring GIFs with gifExplorer!

---

Make sure to replace `YOUR_API_KEY` with the actual API key you obtained from the Giphy Developers Portal.
