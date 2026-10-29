## ZIGChain Testnet Archive Snapshots, provided by Solva
Solva provides full archive snapshots for selected chains, updated weekly. These snapshots include the full block history from the genesis block on, tx_data is included.
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | snapshot type |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | ------------- |
| **[DOWNLOAD](https://dl-eu2.solva.solutions/SNAPSHOTS/archive/zigchaintestnet/zig-test-2_8459389_archive_v6.0.0_20261029T1755Z.tar.lz4)** | Thu Oct 29 2026 17:55:00 UTC | `zig-test-2` | 1.6T | 8459389 | `v6.0.0` | `goleveldb` | `archive` |
| **[DOWNLOAD](https://dl-eu2.solva.solutions/SNAPSHOTS/archive/zigchaintestnet/zig-test-2_8351608_archive_v5.1.0_20261022T1755Z.tar.lz4)** | Thu Oct 22 2026 17:55:00 UTC | `zig-test-2` | 1.6T | 8351608 | `v5.1.0` | `goleveldb` | `archive` |

---

## Download instructions

### Streaming
Downloads and extracts in a single pass while keeping your `priv_validator_state.json`, so no extra disk space is needed, but the checksum can't be verified. Recommended for archive snapshots.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/archive/zigchaintestnet/zig-test-2_8459389_archive_v6.0.0_20261029T1755Z.tar.lz4"
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
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/archive/zigchaintestnet/zig-test-2_wasm.tar.lz4"
cd $HOME/.zigchain
sudo systemctl stop zigchaind
rm -rf ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
sudo systemctl start zigchaind
```
