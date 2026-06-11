## Full Archive Snapshot
CryptoCrew provides full Archive Snapshots for selected chains. These snapshots include the full block history from the genesis block on, tx_data is included.  
agd version: `v0.35.0-u22.1`
| DOWNLOAD | date | chain id | size | height | snapshot type |
| -------- | ---- | -------- | ---- | ------ | ------------- |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/agoric/agoric-3_25849541.tar.lz4)** | Thu Jun 11 2026 03:42:01 UTC | `agoric-3` | 5.9T | 25849541 | `archive` |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/agoric/agoric-3_25740031.tar.lz4)** | Thu Jun 04 2026 03:46:02 UTC | `agoric-3` | 5.9T | 25740031 | `archive` |
---

## Download instructions
Download & extract snapshot:
```sh
sudo apt install wget lz4
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/agoric/agoric-3_25849541.tar.lz4"
cd $HOME/.agoric
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data
wget -O - $URL | lz4 -d | tar -xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```

---

After downloading and extracting the snapshot, start the daemon: `sudo systemctl start agd`

