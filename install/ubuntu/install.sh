#!/bin/sh

# Check for valid Ubuntu release parameter

case `echo "${1,,}"` in
    "bionic"|"xenial")
    targetRelease=$1
    ;;
    *)
    targetRelease="focal"
    ;;
esac

echo ::
echo :: Install release set to $targetRelease
echo ::

# Install CURL and add required NodeJS source to package repo
echo ::
echo :: Install CURL
echo ::

apt install -y curl

echo ::
echo :: Add NodeJS source to package repo
echo ::

curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -

# Add MongoDB source to package repo

echo ::
echo :: Add MongoDB source to package repo
echo ::

wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $targetRelease/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Install required packages
echo ::
echo :: Install Homebrewery requirements
echo ::

apt update
apt satisfy -y git nodejs npm mongodb-org

# Clone Homebrewery repo
echo ::
echo :: Get Homebrewery files
echo ::

cd /usr/local/
git clone https://github.com/naturalcrit/homebrewery.git

# Install Homebrewery
echo ::
echo :: Install Homebrewery
echo ::

cd homebrewery
npm install
npm audit fix
npm run postinstall

# Create Homebrewery service
echo ::
echo :: Create Homebrewery service
echo ::

ln -s /usr/local/homebrewery/install/ubuntu/etc/systemd/system/homebrewery.service /etc/systemd/system/homebrewery.service
systemctl daemon-reload

echo ::
echo :: Set Homebrewery to start automatically
echo ::

systemctl enable homebrewery

# Start Homebrewery
echo ::
echo :: Start Homebrewery
echo ::

systemctl start homebrewery