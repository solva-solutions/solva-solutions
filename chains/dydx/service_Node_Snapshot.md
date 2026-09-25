## Node Snapshot
Solva provides daily node-snapshots for the chains we validate. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!  
dydxprotocold version: `v9.7.0`
| DOWNLOAD | date | chain id | size | height | checksum |
| -------- | ---- | -------- | ---- | ------ | -------- |
| **[DOWNLOAD](https://dl-tyo.ccvalidators.com/SNAPSHOTS/dydx/dydx-mainnet-1_106861951.tar.lz4)** | Fri Sep 25 2026 13:30:24 UTC | `dydx-mainnet-1` | 97G | 106861951 | `53af24b8d00656f05833a249a0e5a39cd7a22f16dd40257134d60ec74685d2a0` |
| **[DOWNLOAD](https://dl-tyo.ccvalidators.com/SNAPSHOTS/dydx/dydx-mainnet-1_106729018.tar.lz4)** | Thu Sep 24 2026 13:33:20 UTC | `dydx-mainnet-1` | 97G | 106729018 | `a5233e19c6a577dd694f38e4ff54df127f9e194d0472a77df9885f140fc2e75e` |

---

## Download instructions
Download snapshot manually:
```sh
sudo apt install wget lz4
URL="https://dl-tyo.ccvalidators.com/SNAPSHOTS/dydx/dydx-mainnet-1_106861951.tar.lz4"
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
URL="https://dl-tyo.ccvalidators.com/SNAPSHOTS/dydx/dydx-mainnet-1_106861951.tar.lz4"
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

