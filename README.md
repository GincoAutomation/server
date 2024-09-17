# Backend server for Home Automation
# dit is eigenlijk compleet nutteloos
## Setup development computer
- Install [Git](https://git-scm.com/downloads). On Windows, make sure you also install the git bash tool and set line-endings to LF (unix style).
- Optionally install any [Git client](https://git-scm.com/downloads/guis) you like, SourceTree is recommended.
- Install [Visual Studio code](https://code.visualstudio.com/) (or your favorite code editor). On Windows, set the default shell to git bash: open command tool (ctrl + shift + p), type Terminal: Select Default Shell, and choose Git Bash
- Install a Node version manager and [Node](https://nodejs.org/en/):
    - Mac `brew install n`
    - Linux `sudo apt-get install n`
    - Windows: Install [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows). If your user name on windows contains spaces, open the 'settings.txt' file in AppData\Roaming\nvm and change the root path into a windows location without spaces: `cmd /c for %A in ("C:\Users\My Name With Spaces\AppData\Roaming\nvm") do @echo %~sA`
    - Install node: `n latest` for mac and linux, `nvm install latest && nvm use [version]`
- Install [MongoDb](https://www.mongodb.com/download-center/community)
    - Mac `brew install mongodb`
    - Linux: see [info](https://docs.mongodb.com/v3.2/administration/install-on-linux/)
    - Windows: download and install the .msi installer. Add mongodb to your Path: Open Control Panel > System and Security > System > Advanced System Settings > Environment variables > Edit Path and add a new line: 'C:\Program Files\MongoDB\Server\4.0\bin'
    - [Mongo db Compass](https://docs.mongodb.com/compass/current/install/) is a graphical user interface on the raw database to easily view and query the database directly.
Windows specific
- (Install [Cygwin](https://cygwin.com/install.html) which is a large collection of GNU and Open Source Unix tools, build for windows. Download the installer, move it to c:\temp, run it, in the package overview search for rsync and install the tools. Add another Environment variable to your Path: 'C:\cygwin64\bin';)
- Install [rsync in Git bash](https://blog.tiger-workshop.com/add-rsync-to-git-bash-for-windows/)
- Install windows build tools: `npm install --global windows-build-tools`
- To make raspberry pi hostname discoverable on windows, install [bonjour service](https://support.apple.com/kb/DL999?locale=en_US).

Check if you already have an ssh key, otherwise create one and add it to your github account: [see help](https://help.github.com/articles/connecting-to-github-with-ssh/).
(Warning: On linux and windows, create an ssh key without passphrase, because it can be pain to setup ssh-agent correctly, however this is less secure)

Checkout repo's and install dependancies
```
mkdir ~/HomeAutomation && cd ~/HomeAutomation
git clone git@github.com:RoetsNv/server.git
cd server
mkdir -p ./data/db
npm install

cd ..
git clone git@github.com:RoetsNv/ui.git
cd ui
npm install
```

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
sudo n latest
```

Clone server and ui repository on raspberry pi
```
mkdir ~/HomeAutomation && cd ~/HomeAutomation
git clone https://github.com/RoetsNv/ui.git
cd ui && npm install && cd ..
git clone https://github.com/RoetsNv/server.git
cd server && npm install
```

Install mongodb.a
Latest version that is available on 32 bit systems is Mongodb 3.0.14. [Install instructions](https://andyfelong.com/2017/08/mongodb-3-0-14-for-raspbian-stretch/)
```
mkdir -p ./data/db
```

#### For development on Raspberry pi
Create ssh key on raspberry pi and add to github account: [see help](https://help.github.com/articles/connecting-to-github-with-ssh/).
(Warning: create an ssh key without passphrase, however this is less secure)

Install visual studio code
```
wget https://packagecloud.io/headmelted/codebuilds/gpgkey -O - | sudo apt-key add -
curl -L https://code.headmelted.com/installers/apt.sh | sudo bash
```

### connect to raspberry-pi
##### Find Raspberry pi's IP:
- mDNS on raspberry pi is on by default (need Bonjour service to resolve hostname). Find pi with `ping raspberrypi.local`
- Find raspberry in router
- On raspberry pi execute `hostname -I `
##### Over ssh
- Add your public ssh key to raspberry pi: `ssh-copy-id -i ~/.ssh/id_rsa pi@raspberrypi.local`
- login to raspberry: `ssh pi@raspberrypi.local` or `ssh pi@192.168.1.21`
##### Remote desktop 
- download [VNC viewer](https://www.realvnc.com/download/viewer/)
- Connect via ip address

## Start server development
Available scripts on current machine:
- `npm install` install the dependencies
- `npm run start` start the server on current machine
- `npm run debug` start the server on current machine in debug mode
- `npm run watch` autorestarts the server on every change of source code
- `npm run start-db` starts the database
- `npm run buildUi` pulls the latest changes in the ui repo, and create a production build that will be served by this server

To remotely develop code on your pc, but still run server on raspberry pi:
- `npm run sync` will sync the current code on your pc to the raspberry pi
- `npm run remote -- [cmd]` will run any of the above commands on the raspberry pi rather than on your local machine. 

So recommend development flow:
- checkout this repository on your local machine and edit the code with your favorite code editor.
- power up raspberry pi and make sure it is connected to your local network.
- `npm run remote -- watch` to start the server on the raspberry pi in watch mode
- run `npm run sync` everytime you want to sync your updated source code on your local machine to the raspberry pi. the already running watcher will automatically restart the server after every sync.

## Debug server
### using VSCode:
#### local server:
- In the debug tab of VSCode select the 'Debug server' launch configuration and press 'Start Debugging' (Green arrow)

#### server on raspberry pi:
- `npm run sync` : sync your local code to the raspberry pi
- `npm run remote -- debug`: start the remote server in debug mode
- In the debug tab of VSCode select the 'Debug remote server' launch configuration and press 'Start Debugging'

### using Chrome dev tools:
- Open dedicated Dev tools for node.js: click node icon in top left bar of chrome dev tools
- 'Add Connection': "raspberrypi.local:9229"
- start the server (remotely) in debug mode: `npm run debug` or `npm run remote -- debug` 
- Chrome dev tools will automatically connect

## Extra info
### Useful resources
- [Express](https://expressjs.com/) Fast, unopinionated, minimalist web server framework.
- [Mongo DB NodeJs Tutorials](http://mongodb.github.io/node-mongodb-native/3.1/quick-start/quick-start/)
- [Mongo DB NodeJs API](http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html)

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
