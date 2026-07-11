## Node Snapshot
Solva provides daily node-snapshots for the chains we validate. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!  
dydxprotocold version: `v9.6.4`
| DOWNLOAD | date | chain id | size | height | checksum |
| -------- | ---- | -------- | ---- | ------ | -------- |
| **[DOWNLOAD](https://dl-tyo.ccvalidators.com/SNAPSHOTS/dydx/dydx-mainnet-1_97398182.tar.lz4)** | Sat Jul 11 2026 13:16:22 UTC | `dydx-mainnet-1` | 40G | 97398182 | `e5174b128bd1469a6bd0d80b43e88e0d83fedf9e7b531b077d4e93df240997e7` |
| **[DOWNLOAD](https://dl-tyo.ccvalidators.com/SNAPSHOTS/dydx/dydx-mainnet-1_97305495.tar.lz4)** | Fri Jul 10 2026 13:16:26 UTC | `dydx-mainnet-1` | 40G | 97305495 | `8ccbbef636faab0939d252e3691dde9a9d5048218bc0fe7eb3faa3b8187718e3` |

---

## Download instructions
Download snapshot manually:
```sh
sudo apt install wget lz4
URL="https://dl-tyo.ccvalidators.com/SNAPSHOTS/dydx/dydx-mainnet-1_97398182.tar.lz4"
cd $HOME/.dydxprotocol
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data
wget $URL
wget $URL.sha256
echo $(cat $(basename $URL.sha256)) $(basename $URL) | sha256sum --check
lz4 -d $(basename $URL) | tar xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```

### Or single-stream
No double disk-space needed, but slower and not possible to check checksum:
```sh
sudo apt install wget lz4
URL="https://dl-tyo.ccvalidators.com/SNAPSHOTS/dydx/dydx-mainnet-1_97398182.tar.lz4"
cd $HOME/.dydxprotocol
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data
wget -O - $URL | lz4 -d | tar -xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```





## Using the download script

The download script fully automates the download and extraction process, while ensuring that your validator state is preserved. To use it, simply run the following command:
```sh
curl -sSL https://dl-tyo.ccvalidators.com/SNAPSHOTS/dydx/download_snapshot.sh | bash
```
---

After downloading and extracting the snapshot, start the daemon: `sudo systemctl start dydxprotocold`

