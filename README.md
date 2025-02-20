# AI-Powered Text Processing Interface

## Overview

This project is an AI-powered text processing interface built using React. The application integrates Chrome's AI APIs to provide users with text processing features such as:

- **Language Detection**
- **Summarization**
- **Translation**

## Features

### Core Functionality

- **Language Detection:** The detected language is displayed below the output text.
- **Summarization:** If the output text exceeds 150 characters and is in English, a "Summarize" button appears, allowing users to summarize the text using Chrome's AI Summarizer API.
- **Translation:** Users can translate the output text into different languages using a dropdown menu.

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- Chrome AI API access

### Steps to Run the Project

```sh
# Clone the repository
git clone https://github.com/J9-tops/hng12-stage3-ai-text-processor
cd hng12-stage3-ai-text-processor

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open the application in a chrome browser (usually at `http://localhost:3000`).
