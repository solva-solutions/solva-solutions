## ZIGChain Testnet Archive Snapshots, provided by Solva
Solva provides full archive snapshots for selected chains, updated weekly. These snapshots include the full block history from the genesis block on, tx_data is included.
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | snapshot type |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | ------------- |
| **[DOWNLOAD](https://dl-eu2.solva.solutions/SNAPSHOTS/archive/zigchaintestnet/zig-test-2_8243796_archive_v5.1.0_20261015T1755Z.tar.lz4)** | Thu Oct 15 2026 17:55:00 UTC | `zig-test-2` | 1.6T | 8243796 | `v5.1.0` | `goleveldb` | `archive` |
| **[DOWNLOAD](https://dl-eu2.solva.solutions/SNAPSHOTS/archive/zigchaintestnet/zig-test-2_8135990.tar.lz4)** | Thu Oct 08 2026 22:08:20 UTC | `zig-test-2` | 1.6T | 8135990 |  | `goleveldb` | `archive` |

---

## Download instructions

### Streaming
Downloads and extracts in a single pass while keeping your `priv_validator_state.json`, so no extra disk space is needed, but the checksum can't be verified. Recommended for archive snapshots.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/archive/zigchaintestnet/zig-test-2_8243796_archive_v5.1.0_20261015T1755Z.tar.lz4"
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
