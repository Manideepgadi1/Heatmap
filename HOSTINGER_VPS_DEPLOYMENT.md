# Hostinger VPS Deployment Guide

## Prerequisites
- Hostinger VPS with SSH access
- Your VPS IP address
- Root or sudo access

## Step 1: Connect to Your VPS via SSH

### Option A: Using PuTTY (Windows)
1. Download PuTTY from: https://www.putty.org/
2. Open PuTTY
3. Enter your VPS IP address
4. Click "Open"
5. Login with your credentials

### Option B: Using Windows Terminal/PowerShell
```powershell
ssh root@YOUR_VPS_IP
```

## Step 2: Initial Server Setup

Once connected to your VPS, run these commands:

```bash
# Update system packages
apt update && apt upgrade -y

# Install required software
apt install -y python3 python3-pip python3-venv nginx git curl

# Install Node.js (for frontend build)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify installations
python3 --version
node --version
npm --version
```

## Step 3: Clone Your Repository

```bash
# Navigate to home directory
cd /home

# Clone your repository
git clone https://github.com/bhargav-12ab/heatmap-dashboard.git
cd heatmap-dashboard
```

## Step 4: Setup Backend (FastAPI)

```bash
# Navigate to backend directory
cd /home/heatmap-dashboard/backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Install uvicorn production server
pip install uvicorn[standard] gunicorn

# Test backend (optional)
# uvicorn main:app --host 0.0.0.0 --port 8000
```

## Step 5: Setup Backend as System Service

Create a systemd service file:

```bash
nano /etc/systemd/system/heatmap-backend.service
```

Add this content:

```ini
[Unit]
Description=Heatmap Dashboard Backend
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/home/heatmap-dashboard/backend
Environment="PATH=/home/heatmap-dashboard/backend/venv/bin"
ExecStart=/home/heatmap-dashboard/backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Save (Ctrl+O, Enter, Ctrl+X)

Enable and start the service:

```bash
# Reload systemd
systemctl daemon-reload

# Enable service to start on boot
systemctl enable heatmap-backend

# Start the service
systemctl start heatmap-backend

# Check status
systemctl status heatmap-backend
```

## Step 6: Build Frontend

```bash
# Navigate to frontend directory
cd /home/heatmap-dashboard/frontend

# Install dependencies
npm install

# Build for production
npm run build

# The build will be in the 'dist' folder
```

## Step 7: Configure Nginx

Create Nginx configuration:

```bash
nano /etc/nginx/sites-available/heatmap-dashboard
```

Add this content (replace YOUR_DOMAIN with your actual domain or VPS IP):

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN;  # or your VPS IP

    # Frontend
    location / {
        root /home/heatmap-dashboard/frontend/dist;
        try_files $uri $uri/ /index.html;
        index index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Save and enable the site:

```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/heatmap-dashboard /etc/nginx/sites-enabled/

# Remove default site (optional)
rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx

# Enable Nginx to start on boot
systemctl enable nginx
```

## Step 8: Update Frontend API URL

You need to update the frontend to use `/api` prefix:

```bash
nano /home/heatmap-dashboard/frontend/src/services/api.js
```

Change the baseURL to:
```javascript
baseURL: '/api',
```

Then rebuild:
```bash
cd /home/heatmap-dashboard/frontend
npm run build
```

## Step 9: Configure Firewall

```bash
# Allow HTTP
ufw allow 80/tcp

# Allow HTTPS (for future SSL)
ufw allow 443/tcp

# Allow SSH (important!)
ufw allow 22/tcp

# Enable firewall
ufw --force enable

# Check status
ufw status
```

## Step 10: Test Your Application

Open your browser and visit:
- **http://YOUR_VPS_IP** (or your domain)

You should see your heatmap dashboard!

## Step 11: Setup SSL Certificate (Optional but Recommended)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
certbot --nginx -d your-domain.com

# Auto-renewal is set up automatically
```

## Maintenance Commands

### View Backend Logs
```bash
journalctl -u heatmap-backend -f
```

### Restart Backend
```bash
systemctl restart heatmap-backend
```

### Restart Nginx
```bash
systemctl restart nginx
```

### Update Application
```bash
cd /home/heatmap-dashboard
git pull origin main

# Rebuild backend (if changes)
cd backend
source venv/bin/activate
pip install -r requirements.txt
systemctl restart heatmap-backend

# Rebuild frontend (if changes)
cd ../frontend
npm install
npm run build
systemctl restart nginx
```

## Troubleshooting

### Check if backend is running
```bash
curl http://localhost:8000/indices
```

### Check Nginx error logs
```bash
tail -f /var/log/nginx/error.log
```

### Check backend logs
```bash
journalctl -u heatmap-backend -n 50
```

### Check if ports are listening
```bash
netstat -tlnp | grep -E ':(80|8000)'
```

## Security Recommendations

1. **Change default SSH port** (edit /etc/ssh/sshd_config)
2. **Disable root login** via SSH
3. **Create a non-root user** for deployments
4. **Setup fail2ban** for intrusion prevention
5. **Keep system updated** regularly
6. **Use strong passwords**
7. **Enable automatic security updates**

## Support

If you encounter issues:
1. Check logs (backend and nginx)
2. Verify services are running: `systemctl status heatmap-backend nginx`
3. Check firewall: `ufw status`
4. Verify Python environment: `source venv/bin/activate && which python`

---

**Your application will be accessible at:**
- Frontend: http://YOUR_VPS_IP
- Backend API: http://YOUR_VPS_IP/api/

Replace YOUR_VPS_IP with your actual VPS IP address or domain name.
