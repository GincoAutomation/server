# TODO's

- starting a debug session on 0.0.0.0 is a possible security risk if the server is publicaly reachable: https://nodejs.org/en/docs/guides/debugging-getting-started/#security-implications

# Ideas
- if necessary, use [mongoose](https://mongoosejs.com/) instead of using mongodb directly

## database:
check and investigate database on raspberrypi!
- mongodb server > 3.2 doesn't run on 32 raspbian OS
- upgrade OS to 64 bit system (not officially / fully supported yet) https://andyfelong.com/2019/01/mongodb-3-2-64-bit-running-on-raspberry-pi-3-with-caveats/
- use lower 
- check if mongodb mobile can be used instead: https://medium.com/@mattalord/embedded-mongodb-4-0-on-raspberry-pi-e50fd1d65e43
- maybe use other database: e.g. mySQL, SQLite ...