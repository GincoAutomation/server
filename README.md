# Backend server for Home Automation

## Setup raspberry Pi
Online [Documentation](https://www.raspberrypi.org/help/).

### Installation
#### Required
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

Clone server and ui repository on raspberry pi
```
mkdir ~/HomeAutomation && cd ~/HomeAutomation
git clone https://github.com/RoetsNv/server.git
git clone https://github.com/RoetsNv/ui.git
```

#### For development on Raspberry pi
Create ssh key on raspberry pi and add to github account: [see help](https://help.github.com/articles/connecting-to-github-with-ssh/).
(Warning: create an ssh key without passphrase, however this is a possible security risk)

Install visual studio code
```
wget https://packagecloud.io/headmelted/codebuilds/gpgkey -O - | sudo apt-key add -
curl -L https://code.headmelted.com/installers/apt.sh | sudo bash
```

### connect to raspberry-pi
##### Find Raspberry pi's IP:
- MDNS on raspberry pi is on by default. Find pi with `ping raspberrypi.local`
- Find raspberry in router
- On raspberry pi execute `hostname -I `
##### Over ssh
- Check if you already have an ssh key otherwise create one: [help](https://help.github.com/articles/connecting-to-github-with-ssh/)
- Add your public ssh key to raspberry pi: `ssh-copy-id -i ~/.ssh/id_rsa pi@raspberrypi.local`
- login to raspberry: `ssh pi@raspberrypi.local` or `ssh pi@192.168.1.21`
##### Remote desktop 
- download [VNC viewer](https://www.realvnc.com/download/viewer/)
- Connect via ip address


## Start server development
Available scripts on current machine:
- `npm run start` start the server on current machine
- `npm run watch` autorestarts the server on every change of source code
- `npm run buildUi` pulls the latest changes in the ui repo, and create a production build that will be served by this server

To remotely develop code on your pc, but still run server on raspberry pi:
- `npm run sync` will sync the current code on your pc to the raspberry pi
- `npm run remote -- [cmd]` will run any of the above commands on the raspberry pi rather than on your local machine. 

So recommend development flow:
- checkout this repository on your local machine and edit the code with your favorite code editor.
- power up raspberry pi and make sure it is connected to your local network.
- `npm run remote -- watch` to start the server on the raspberry pi in watch mode
- run `npm run sync` everytime you want to sync your updated source code on your local machine to the raspberry pi. the already running watcher will automatically restart the server after every sync.


## Extra info
### Useful linux commands
See [common linux commands](https://www.raspberrypi.org/documentation/linux/usage/commands.md)
```
ifconfig        # check connection info
hostname -I     # get IP address
df -h           # check available disk space
ps -aux         # show all running processes
top             # activity monitor
echo $?         # check exit code of last command
```