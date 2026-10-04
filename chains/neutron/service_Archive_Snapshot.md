## Full Archive Snapshot
Solva provides full Archive Snapshots for selected chains. These snapshots include the full block history from the genesis block on, tx_data is included.  
neutrond version: `v11.3.0-21-gf1d5578d`
| DOWNLOAD | date | chain id | size | height | snapshot type |
| -------- | ---- | -------- | ---- | ------ | ------------- |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/neutron/neutron-1_61715195.tar.lz4)** | Sun Oct 04 2026 00:37:01 UTC | `neutron-1` | 19T | 61715195 | `archive` |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/neutron/neutron-1_61635573.tar.lz4)** | Sun Sep 27 2026 00:24:32 UTC | `neutron-1` | 19T | 61635573 | `archive` |
---

## Download instructions
Download & extract snapshot:
```sh
sudo apt install wget lz4
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/archive/neutron/neutron-1_61715195.tar.lz4"
cd $HOME/.neutrond
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data wasm
wget -O - $URL | lz4 -d | tar -xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```

---

After downloading and extracting the snapshot, start the daemon: `sudo systemctl start neutrond`

