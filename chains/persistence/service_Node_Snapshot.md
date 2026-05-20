## Node Snapshot
CryptoCrew provides daily node-snapshots for the chains we validate. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!  
persistenceCore version: `v16.0.1`
| DOWNLOAD | date | chain id | size | height | checksum |
| -------- | ---- | -------- | ---- | ------ | -------- |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/persistence/core-1_27464710.tar.lz4)** | Wed May 20 2026 11:44:59 UTC | `core-1` | 268M | 27464710 | `2c8c2eac9be382baf205c90b2d893f5ee068419a9148a93109a77622de5d2604` |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/persistence/core-1_27449984.tar.lz4)** | Tue May 19 2026 11:44:51 UTC | `core-1` | 255M | 27449984 | `564b6281c58396c9e6be1b2f9cf6b54af11848b3ba6b5c4271d21ff6e39b3fdf` |

---

## Download instructions
Download snapshot manually:
```sh
sudo apt install wget lz4
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/persistence/core-1_27464710.tar.lz4"
cd $HOME/.persistenceCore
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
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/persistence/core-1_27464710.tar.lz4"
cd $HOME/.persistenceCore
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data wasm
wget -O - $URL | lz4 -d | tar -xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```

### Optional: Download `wasm` folder only
In some cases you can statesync a wasm chain, but the wasm-folder will not be included in the statesync snapshot. Use our wasm-only snapshot for these cases
```sh
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/persistence/core-1_wasm.tar.lz4"
cd $HOME/.persistenceCore
rm -rf wasm
wget -O - $URL | lz4 -d | tar -xvf -
```



## Using the download script

The download script fully automates the download and extraction process, while ensuring that your validator state is preserved. To use it, simply run the following command:
```sh
curl -sSL https://dl-eu1.ccvalidators.com/SNAPSHOTS/persistence/download_snapshot.sh | bash
```
---

After downloading and extracting the snapshot, start the daemon: `sudo systemctl start persistenceCore`

