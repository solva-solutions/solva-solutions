## Full Archive Snapshot
CryptoCrew provides full Archive Snapshots for selected chains. These snapshots include the full block history from the genesis block on, tx_data is included.  
agd version: `v0.36.0-u23.1`
| DOWNLOAD | date | chain id | size | height | snapshot type |
| -------- | ---- | -------- | ---- | ------ | ------------- |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/agoric/agoric-3_27260179.tar.lz4)** | Thu Sep 10 2026 05:07:57 UTC | `agoric-3` | 6.0T | 27260179 | `archive` |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/agoric/agoric-3_27151150.tar.lz4)** | Thu Sep 03 2026 04:03:26 UTC | `agoric-3` | 6.0T | 27151150 | `archive` |
---

## Download instructions
Download & extract snapshot:
```sh
sudo apt install wget lz4
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/agoric/agoric-3_27260179.tar.lz4"
cd $HOME/.agoric
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data
wget -O - $URL | lz4 -d | tar -xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```

---

After downloading and extracting the snapshot, start the daemon: `sudo systemctl start agd`

