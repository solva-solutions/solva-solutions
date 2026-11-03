## Cosmos Hub Snapshots, provided by Solva
Solva provides node snapshots for selected chains, updated every 12 hours. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | checksum |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | -------- |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/cosmoshub/cosmoshub-4_33705615_pebbledb_v29.0.1_20261103T0848Z.tar.lz4)** | Tue Nov 03 2026 08:48:00 UTC | `cosmoshub-4` | 11G | 33705615 | `v29.0.1` | `pebbledb` | `1002231908c17ef2d8fde8e61d9b3835b658366a32c06b5e2d7e84b148bba289` |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/cosmoshub/cosmoshub-4_33698110_pebbledb_v29.0.1_20261102T2052Z.tar.lz4)** | Mon Nov 02 2026 20:52:00 UTC | `cosmoshub-4` | 11G | 33698110 | `v29.0.1` | `pebbledb` | `0bc65f4b016015c607132fa7b8eaefa4d2f1514dba3d4cc8b6a37fef6a4269a3` |

---

## Download instructions

> This snapshot uses the `pebbledb` database backend. Your node has to run with the same backend: `db_backend = "pebbledb"` in `config/config.toml` and `app-db-backend = "pebbledb"` in `config/app.toml`.

### Download & verify
Downloads the snapshot and verifies its SHA-256 checksum before touching your node, then stops the node, extracts the snapshot while keeping your `priv_validator_state.json` and starts the node again. Needs free disk space for the archive plus the extracted data.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/cosmoshub/cosmoshub-4_33705615_pebbledb_v29.0.1_20261103T0848Z.tar.lz4"
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
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/cosmoshub/cosmoshub-4_33705615_pebbledb_v29.0.1_20261103T0848Z.tar.lz4"
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
