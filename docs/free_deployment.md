# Free Deployment Guide (Local Tunneling)

Since this project requires significant resources (RAM/CPU) that are not available on standard free tier clouds (like Render/Heroku), the best free option is to **host it on your own computer** and "tunnel" it to the internet so others can access it.

## Option 1: Serveo (Easiest - No Install)
Serveo allows you to expose your local server using just SSH.

1.  **Start your App Locally**:
    ```powershell
    docker-compose -f docker-compose.app.yml up -d
    ```
2.  **Expose Frontend (Port 5173)**:
    Open a terminal and run:
    ```powershell
    ssh -R 80:localhost:5173 serveo.net
    ```
    *   It will give you a URL like `https://abcde.serveo.net`.
    *   Share this URL with anyone!

3.  **Expose API Gateway (Port 8080)** (Optional - if frontend calls API directly):
    If your frontend needs to reach the backend directly via public URL, you need a second tunnel:
    ```powershell
    ssh -R 80:localhost:8080 serveo.net
    ```

## Option 2: Ngrok (More Stable)
Ngrok is a standard tool for this. You need to sign up for a free account.

1.  **Install Ngrok**: [Download here](https://ngrok.com/download)
2.  **Authenticate**: Run the command shown in your Ngrok dashboard.
3.  **Start Tunnel**:
    ```powershell
    ngrok http 5173
    ```
    *   Copy the `https://...` URL provided.

## Important Note regarding API Calls
Your Frontend is configured to talk to the Backend.
- If running in Docker (Option 2), Frontend talks to Backend via **Docker Network** (internal names like `http://api-gateway:8080`). This **WORKS PERFECTLY** with tunneling because the browser just loads the UI, and the UI talks to the backend *inside* your machine (via proxy) or via relative paths.
- If you have hardcoded `http://localhost:8080` in your React code, it might fail for external users. **Ensure your API calls use relative paths (e.g., `/api/v1/...`) or the public API URL.**
