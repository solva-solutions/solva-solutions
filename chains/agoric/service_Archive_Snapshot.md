## Full Archive Snapshot
CryptoCrew provides full Archive Snapshots for selected chains. These snapshots include the full block history from the genesis block on, tx_data is included.  
agd version: `v0.35.0-u22.1`
| DOWNLOAD | date | chain id | size | height | snapshot type |
| -------- | ---- | -------- | ---- | ------ | ------------- |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/agoric/agoric-3_24979507.tar.lz4)** | Thu Apr 16 2026 03:32:03 UTC | `agoric-3` | 5.8T | 24979507 | `archive` |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/agoric/agoric-3_24870179.tar.lz4)** | Thu Apr 09 2026 03:33:15 UTC | `agoric-3` | 5.8T | 24870179 | `archive` |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/agoric/agoric-3_24760812.tar.lz4)** | Thu Apr 02 2026 03:33:08 UTC | `agoric-3` | 5.8T | 24760812 | `archive` |
---

## Download instructions
Download & extract snapshot:
```sh
sudo apt install wget lz4
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/agoric/agoric-3_24979507.tar.lz4"
cd $HOME/.agoric
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data
wget -O - $URL | lz4 -d | tar -xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```

---

After downloading and extracting the snapshot, start the daemon: `sudo systemctl start agd`

