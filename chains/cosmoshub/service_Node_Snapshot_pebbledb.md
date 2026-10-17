## Cosmos Hub Snapshots, provided by Solva
Solva provides node snapshots for selected chains, updated every 12 hours. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | checksum |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | -------- |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/cosmoshub/cosmoshub-4_33449038_pebbledb_v28.3.0_20261017T0931Z.tar.lz4)** | Sat Oct 17 2026 09:31:00 UTC | `cosmoshub-4` | 15G | 33449038 | `v28.3.0` | `pebbledb` | `1d11ce8be54783dbd6cfe5a6be90d7e63d7b6b619cd9aede530047faca9a6df1` |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/cosmoshub/cosmoshub-4_33441324_pebbledb_v28.3.0_20261016T2119Z.tar.lz4)** | Fri Oct 16 2026 21:19:00 UTC | `cosmoshub-4` | 15G | 33441324 | `v28.3.0` | `pebbledb` | `e1153d339cd0b0fce168ce3ad318468cd20ec1497a1c133d8ded64a0068c9273` |

---

## Download instructions

> This snapshot uses the `pebbledb` database backend. Your node has to run with the same backend: `db_backend = "pebbledb"` in `config/config.toml` and `app-db-backend = "pebbledb"` in `config/app.toml`.

### Download & verify
Downloads the snapshot and verifies its SHA-256 checksum before touching your node, then stops the node, extracts the snapshot while keeping your `priv_validator_state.json` and starts the node again. Needs free disk space for the archive plus the extracted data.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/cosmoshub/cosmoshub-4_33449038_pebbledb_v28.3.0_20261017T0931Z.tar.lz4"
cd $HOME/.gaia
wget -O snapshot.tar.lz4 "$URL"
wget -O snapshot.tar.lz4.sha256 "$URL.sha256"
if echo "$(cat snapshot.tar.lz4.sha256)  snapshot.tar.lz4" | sha256sum --check; then
  sudo systemctl stop gaiad
  cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
  rm -rf ./data ./wasm
  lz4 -dc snapshot.tar.lz4 | tar -xf -
  mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
  rm -f snapshot.tar.lz4 snapshot.tar.lz4.sha256
  sudo systemctl start gaiad
else
  echo "Checksum mismatch: snapshot not extracted, your node was not touched"
  rm -f snapshot.tar.lz4 snapshot.tar.lz4.sha256
fi
```

### Streaming
Downloads and extracts in a single pass while keeping your `priv_validator_state.json`, so no extra disk space is needed, but the checksum can't be verified.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/cosmoshub/cosmoshub-4_33449038_pebbledb_v28.3.0_20261017T0931Z.tar.lz4"
cd $HOME/.gaia
sudo systemctl stop gaiad
cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf ./data ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
sudo systemctl start gaiad
```

### Download script
Runs the download & verify steps for `$HOME/.gaia`, keeps your validator state and removes the downloaded archive afterwards. Requires `wget` and `lz4`. Review the script before piping it into bash.
```sh
sudo systemctl stop gaiad
curl -sSL https://dl-eu1.solva.solutions/SNAPSHOTS/cosmoshub/download_snapshot_pebbledb.sh | bash
sudo systemctl start gaiad
```

### Optional: wasm folder only
In some cases you can statesync a wasm chain, but the wasm folder isn't part of the statesync snapshot. Use the wasm-only snapshot for these cases.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/cosmoshub/cosmoshub-4_wasm.tar.lz4"
cd $HOME/.gaia
sudo systemctl stop gaiad
rm -rf ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
sudo systemctl start gaiad
```
