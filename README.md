# Backend server for Home Automation

## Getting started with raspberry Pi
Online [Documentation](https://www.raspberrypi.org/help/).

### Installation
Upgrade to latest version
```
sudo apt-get update
sudo apt-get dist-upgrade
```
Install Node and n (Node version manager)
```
git clone https://github.com/tj/n.git && cd n && sudo make install && cd ..
sudo n lts
```

Create and add ssh key to github account: [see help](https://help.github.com/articles/connecting-to-github-with-ssh/).
(Warning: create an ssh key without passphrase, however this is a possible security risk)

Clone server repository on raspberry pi
```
mkdir ~/HomeAutomation && cd ~/HomeAutomation
git clone git@github.com:RoetsNv/server.git
```

Install visual studio code
```
wget https://packagecloud.io/headmelted/codebuilds/gpgkey -O - | sudo apt-key add -
curl -L https://code.headmelted.com/installers/apt.sh | sudo bash
```

#### connect to raspberry-pi
##### Over ssh
- Get raspberry's ip address (see below)
- Add public ssh key to raspberry: `ssh-copy-id -i ~/.ssh/id_rsa pi@192.168.1.52`
- login to raspberry: `ssh pi@raspberrypi.local` or `ssh pi@192.168.1.21`
##### Remote desktop 
- download [VNC viewer](https://www.realvnc.com/download/viewer/)
- Connect via ip address

#### Useful commands
See [common linux commands](https://www.raspberrypi.org/documentation/linux/usage/commands.md)
```
hostname -I     # get IP address
df -h           # check available disk space
ps -aux         # show all running processes
top             # activity monitor
echo $?         # check exit code of last command
```
MDNS is on by default. find pi with `ping raspberrypi.local`

## Getting started
start server
- `npm run start` start the server
- `npm run watch` autorestarts the server on every change