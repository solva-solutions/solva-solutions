## Cosmos Hub Archive Snapshots, provided by Solva
Solva provides full archive snapshots for selected chains, updated every 2 weeks. These snapshots include the full block history from the genesis block on, tx_data is included.
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | snapshot type |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | ------------- |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/archive/cosmoshub/cosmoshub-4_33570368_archive_v28.3.0_20261025T0945Z.tar.lz4)** | Sun Oct 25 2026 09:45:00 UTC | `cosmoshub-4` | 19T | 33570368 | `v28.3.0` | `goleveldb` | `archive` |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/archive/cosmoshub/cosmoshub-4_33404937.tar.lz4)** | Fri Oct 16 2026 14:33:27 UTC | `cosmoshub-4` | 19T | 33404937 |  | `goleveldb` | `archive` |

---

## Download instructions

### Streaming
Downloads and extracts in a single pass while keeping your `priv_validator_state.json`, so no extra disk space is needed, but the checksum can't be verified. Recommended for archive snapshots.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/archive/cosmoshub/cosmoshub-4_33570368_archive_v28.3.0_20261025T0945Z.tar.lz4"
cd $HOME/.gaia
sudo systemctl stop gaiad
cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf ./data ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
sudo systemctl start gaiad
```

### Optional: wasm folder only
In some cases you can statesync a wasm chain, but the wasm folder isn't part of the statesync snapshot. Use the wasm-only snapshot for these cases.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/archive/cosmoshub/cosmoshub-4_wasm.tar.lz4"
cd $HOME/.gaia
sudo systemctl stop gaiad
rm -rf ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
sudo systemctl start gaiad
```
