## Agoric Archive Snapshots, provided by Solva
Solva provides full archive snapshots for selected chains, updated every 2 weeks. These snapshots include the full block history from the genesis block on, tx_data is included.
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | snapshot type |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | ------------- |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/archive/agoric/agoric-3_28088558_archive_v0.36.0-u23.1_20261102T1030Z.tar.lz4)** | Mon Nov 02 2026 10:30:00 UTC | `agoric-3` | 6.0T | 28088558 | `v0.36.0-u23.1` | `goleveldb` | `archive` |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/archive/agoric/agoric-3_27798717.tar.lz4)** | Thu Oct 15 2026 04:32:13 UTC | `agoric-3` | 6.0T | 27798717 |  | `goleveldb` | `archive` |

---

## Download instructions

### Streaming
Downloads and extracts in a single pass while keeping your `priv_validator_state.json`, so no extra disk space is needed, but the checksum can't be verified. Recommended for archive snapshots.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/archive/agoric/agoric-3_28088558_archive_v0.36.0-u23.1_20261102T1030Z.tar.lz4"
cd $HOME/.agoric
sudo systemctl stop agd
cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf ./data
wget -O - "$URL" | lz4 -dc | tar -xf -
mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
sudo systemctl start agd
```
