## Node Snapshot
Solva provides daily node-snapshots for the chains we validate. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!  
neutrond version: `v11.2.1`
| DOWNLOAD | date | chain id | size | height | checksum |
| -------- | ---- | -------- | ---- | ------ | -------- |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/neutron/neutron-1_61565783.tar.lz4)** | Wed Sep 16 2026 15:37:06 UTC | `neutron-1` | 14G | 61565783 | `c6bdb53cd87618986da1e39496c65dc7b4ced26ffb1c1b6ead3f812127b2b0c7` |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/neutron/neutron-1_61553424.tar.lz4)** | Tue Sep 15 2026 15:34:20 UTC | `neutron-1` | 13G | 61553424 | `f487396105745598ace2de4710a0cbe419b28571d33aad153deac921b1404c3c` |

---

## Download instructions
Download snapshot manually:
```sh
sudo apt install wget lz4
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/neutron/neutron-1_61565783.tar.lz4"
cd $HOME/.neutrond
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data wasm
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
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/neutron/neutron-1_61565783.tar.lz4"
cd $HOME/.neutrond
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data wasm
wget -O - $URL | lz4 -d | tar -xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```

### Optional: Download `wasm` folder only
In some cases you can statesync a wasm chain, but the wasm-folder will not be included in the statesync snapshot. Use our wasm-only snapshot for these cases
```sh
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/neutron/neutron-1_wasm.tar.lz4"
cd $HOME/.neutrond
rm -rf wasm
wget -O - $URL | lz4 -d | tar -xvf -
```



## Using the download script

The download script fully automates the download and extraction process, while ensuring that your validator state is preserved. To use it, simply run the following command:
```sh
curl -sSL https://dl-eu1.ccvalidators.com/SNAPSHOTS/neutron/download_snapshot.sh | bash
```
---

After downloading and extracting the snapshot, start the daemon: `sudo systemctl start neutrond`

