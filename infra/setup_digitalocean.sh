#!/bin/bash

# Run this script on your fresh DigitalOcean Droplet (Ubuntu 22.04+)

# 1. Update System
apt-get update && apt-get upgrade -y

# 2. Install Docker & Docker Compose
apt-get install -y docker.io docker-compose
systemctl start docker
systemctl enable docker

# 3. Install Java 17 (for building on server if using simple strategy)
apt-get install -y openjdk-17-jdk

# 4. Clone Repo (You will need to manually provide git credentials or SSH keys after this)
mkdir -p /opt/mayur-hms
# git clone <YOUR_REPO_URL> /opt/mayur-hms

# 5. Firewall Setup (UFW)
ufw allow OpenSSH
ufw allow 80/tcp    # Frontend
ufw allow 8080/tcp  # Gateway
ufw allow 8761/tcp  # Discovery
ufw enable

echo "Setup Complete. Next steps:"
echo "1. Clone your repository into /opt/raksha-hms"
echo "2. Create a .env file if needed"
echo "3. Run: docker-compose -f infra/docker-compose.yml up -d (for DBs)"
echo "4. Run: docker-compose -f docker-compose.app.yml up -d (for Apps)"
