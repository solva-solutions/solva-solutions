## Full Archive Snapshot
CryptoCrew provides full Archive Snapshots for selected chains. These snapshots include the full block history from the genesis block on, tx_data is included.  
persistenceCore version: `v16.0.1`
| DOWNLOAD | date | chain id | size | height | snapshot type |
| -------- | ---- | -------- | ---- | ------ | ------------- |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/persistence/core-1_27658631.tar.lz4)** | Tue Jun 02 2026 19:26:49 UTC | `core-1` | 1.5T | 27658631 | `archive` |
---

## Download instructions
Download & extract snapshot:
```sh
sudo apt install wget lz4
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/persistence/core-1_27658631.tar.lz4"
cd $HOME/.persistenceCore
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data wasm
wget -O - $URL | lz4 -d | tar -xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```

---

After downloading and extracting the snapshot, start the daemon: `sudo systemctl start persistenceCore`

