## Neutron Archive Snapshots, provided by Solva
Solva provides full archive snapshots for selected chains, updated every 2 weeks. These snapshots include the full block history from the genesis block on, tx_data is included.
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | snapshot type |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | ------------- |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/archive/neutron/neutron-1_62054020_archive_v11.3.0-21-gf1d5578d_20261029T1000Z.tar.lz4)** | Thu Oct 29 2026 10:00:00 UTC | `neutron-1` | 19T | 62054020 | `v11.3.0-21-gf1d5578d` | `goleveldb` | `archive` |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/archive/neutron/neutron-1_61832321.tar.lz4)** | Tue Oct 13 2026 11:49:12 UTC | `neutron-1` | 19T | 61832321 |  | `goleveldb` | `archive` |

---

## Download instructions

### Streaming
Downloads and extracts in a single pass while keeping your `priv_validator_state.json`, so no extra disk space is needed, but the checksum can't be verified. Recommended for archive snapshots.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/archive/neutron/neutron-1_62054020_archive_v11.3.0-21-gf1d5578d_20261029T1000Z.tar.lz4"
cd $HOME/.neutrond
sudo systemctl stop neutrond
cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf ./data ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
sudo systemctl start neutrond
```

### Optional: wasm folder only
In some cases you can statesync a wasm chain, but the wasm folder isn't part of the statesync snapshot. Use the wasm-only snapshot for these cases.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/archive/neutron/neutron-1_wasm.tar.lz4"
cd $HOME/.neutrond
sudo systemctl stop neutrond
rm -rf ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
sudo systemctl start neutrond
```
