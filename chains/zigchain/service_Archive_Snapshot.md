## ZIGChain Archive Snapshots, provided by Solva
Solva provides full archive snapshots for selected chains, updated weekly. These snapshots include the full block history from the genesis block on, tx_data is included.
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | snapshot type |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | ------------- |
| **[DOWNLOAD](https://dl-eu2.solva.solutions/SNAPSHOTS/archive/zigchain/zigchain-1_13145680_archive_v5.1.2_20261022T1355Z.tar.lz4)** | Thu Oct 22 2026 13:55:00 UTC | `zigchain-1` | 869G | 13145680 | `v5.1.2` | `goleveldb` | `archive` |
| **[DOWNLOAD](https://dl-eu2.solva.solutions/SNAPSHOTS/archive/zigchain/zigchain-1_12955394_archive_v5.1.2_20261015T1355Z.tar.lz4)** | Thu Oct 15 2026 13:55:00 UTC | `zigchain-1` | 856G | 12955394 | `v5.1.2` | `goleveldb` | `archive` |

---

## Download instructions

### Streaming
Downloads and extracts in a single pass while keeping your `priv_validator_state.json`, so no extra disk space is needed, but the checksum can't be verified. Recommended for archive snapshots.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/archive/zigchain/zigchain-1_13145680_archive_v5.1.2_20261022T1355Z.tar.lz4"
cd $HOME/.zigchain
sudo systemctl stop zigchaind
cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf ./data ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
sudo systemctl start zigchaind
```

### Optional: wasm folder only
In some cases you can statesync a wasm chain, but the wasm folder isn't part of the statesync snapshot. Use the wasm-only snapshot for these cases.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/archive/zigchain/zigchain-1_wasm.tar.lz4"
cd $HOME/.zigchain
sudo systemctl stop zigchaind
rm -rf ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
sudo systemctl start zigchaind
```
