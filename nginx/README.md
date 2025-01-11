To set up an additional EC2 instance with Nginx for reverse proxying to your frontend server and configure it to be accessible via lucky1225.blog, follow these steps:

Step 1: Launch a New EC2 Instance
Launch a new EC2 instance:
Choose an appropriate instance type (e.g., t2.micro for a small setup).
Select an AMI, preferably Ubuntu or Amazon Linux.
Assign a security group allowing HTTP (port 80) and SSH (port 22) traffic.
Update the instance:

sudo apt update && sudo apt upgrade -y    # For Ubuntu
sudo yum update -y                        # For Amazon Linux


Step 2: Install Nginx
Install Nginx:

sudo apt install nginx -y    # For Ubuntu
sudo yum install nginx -y    # For Amazon Linux


Start and enable Nginx:

sudo systemctl start nginx
sudo systemctl enable nginx


Step 3: Configure Nginx as a Reverse Proxy
Edit the Nginx configuration: Open the Nginx configuration file:

sudo nano /etc/nginx/sites-available/default    # For Ubuntu
sudo nano /etc/nginx/nginx.conf                 # For Amazon Linux or global config


Add the following reverse proxy configuration:

server {
    listen 80;
    server_name lucky1225.blog;

    location / {
        proxy_pass http://<FRONTEND_SERVER_IP_OR_DOMAIN>;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
Replace <FRONTEND_SERVER_IP_OR_DOMAIN> with the public IP or domain of your frontend server.

Test the configuration:

sudo nginx -t

Reload Nginx to apply changes:

sudo systemctl reload nginx


Step 4: Configure DNS for lucky1225.blog
Set up a DNS A record:

Go to your domain registrar's DNS management console.
Create an A record:
Name: lucky1225.blog
Type: A
Value: Public IP of your new Nginx EC2 instance.
Allow some time for DNS propagation (could take a few minutes to a few hours).

Step 5: Verify Setup
Access http://lucky1225.blog from your browser.
Ensure it redirects to your frontend server correctly.


Optional: Secure with HTTPS
Install Certbot for SSL:

sudo apt install certbot python3-certbot-nginx -y    # For Ubuntu
sudo yum install certbot python3-certbot-nginx -y    # For Amazon Linux

Obtain an SSL certificate:

sudo certbot --nginx -d lucky1225.blog

Auto-renew SSL certificate:

sudo crontab -e
Add the following line to renew the certificate automatically:

bash
Copy code
0 0 * * * /usr/bin/certbot renew --quiet




=================

To make your site accessible via HTTPS using Nginx with a domain lucky1225.blog, follow these steps to set up and secure your reverse proxy with an SSL certificate:

Step 1: Install Certbot for SSL on Your Nginx Server
Update package lists and install Certbot:
For Ubuntu:

sudo apt update
sudo apt install certbot python3-certbot-nginx -y

For Amazon Linux:

sudo yum update -y
sudo amazon-linux-extras enable epel
sudo yum install certbot python3-certbot-nginx -y

Step 2: Obtain and Install an SSL Certificate
Run Certbot to configure SSL for Nginx:

sudo certbot --nginx -d lucky1225.blog

Certbot will:
Automatically fetch an SSL certificate.
Configure Nginx to use the certificate.
Update the Nginx configuration to redirect HTTP to HTTPS.


Follow the prompts:
Certbot will ask for an email for renewal notifications.
Agree to the terms and choose to redirect HTTP to HTTPS if prompted.

Step 3: Test SSL Configuration
Test Nginx configuration:

sudo nginx -t

Reload Nginx to apply the changes:

sudo systemctl reload nginx

Access your site at https://lucky1225.blog to verify the SSL setup.

Step 4: Auto-Renew SSL Certificate
Configure automatic renewal: Certbot automatically sets up a cron job for renewal. You can check the existing cron job:

sudo systemctl status certbot.timer

Manually test renewal:

sudo certbot renew --dry-run

Step 5: Ensure Firewall Rules Allow HTTPS
Update security group rules:
Ensure the security group associated with your EC2 instance allows inbound traffic on port 443 (HTTPS) in addition to port 80 (HTTP).
Optional: Redirect All HTTP Traffic to HTTPS Manually
If Certbot didn't automatically set up the redirection:

Edit the Nginx configuration: Open the Nginx configuration:

sudo nano /etc/nginx/sites-available/default    # For Ubuntu
sudo nano /etc/nginx/nginx.conf                 # For Amazon Linux or if you're using a global config
Add the following redirect:

nginx
Copy code
server {
    listen 80;
    server_name lucky1225.blog;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name lucky1225.blog;

    ssl_certificate /etc/letsencrypt/live/lucky1225.blog/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lucky1225.blog/privkey.pem;

    location / {
        proxy_pass http://<FRONTEND_SERVER_IP_OR_DOMAIN>;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
Reload Nginx:

sudo systemctl reload nginx
This ensures that all traffic to http://lucky1225.blog is redirected to https://lucky1225.blog, providing a secure browsing experience for your users.