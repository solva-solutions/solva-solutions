## Osmosis Archive Snapshots, provided by Solva
Solva provides full archive snapshots for selected chains, updated every 2 weeks. These snapshots include the full block history from the genesis block on, tx_data is included.
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | snapshot type |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | ------------- |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/archive/osmosis/osmosis-1_74957706_archive_v32.0.0_20261113T0430Z.tar.lz4)** | Fri Nov 13 2026 04:30:00 UTC | `osmosis-1` | 24T | 74957706 | `v32.0.0` | `goleveldb` | `archive` |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/archive/osmosis/osmosis-1_73918625_archive_v32.0.0_20261102T2315Z.tar.lz4)** | Mon Nov 02 2026 23:15:00 UTC | `osmosis-1` | 24T | 73918625 | `v32.0.0` | `goleveldb` | `archive` |

---

## Download instructions

### Streaming
Downloads and extracts in a single pass while keeping your `priv_validator_state.json`, so no extra disk space is needed, but the checksum can't be verified. Recommended for archive snapshots.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/archive/osmosis/osmosis-1_74957706_archive_v32.0.0_20261113T0430Z.tar.lz4"
cd $HOME/.osmosisd
sudo systemctl stop osmosisd
cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf ./data ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
sudo systemctl start osmosisd
```

### Optional: wasm folder only
In some cases you can statesync a wasm chain, but the wasm folder isn't part of the statesync snapshot. Use the wasm-only snapshot for these cases.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/archive/osmosis/osmosis-1_wasm.tar.lz4"
cd $HOME/.osmosisd
sudo systemctl stop osmosisd
rm -rf ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
sudo systemctl start osmosisd
```
