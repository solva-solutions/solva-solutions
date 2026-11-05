## Cosmos Hub Snapshots, provided by Solva
Solva provides node snapshots for selected chains, updated every 12 hours. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | checksum |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | -------- |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/cosmoshub/cosmoshub-4_33744401_pebbledb_v29.0.1_20261105T2237Z.tar.lz4)** | Thu Nov 05 2026 22:37:00 UTC | `cosmoshub-4` | 11G | 33744401 | `v29.0.1` | `pebbledb` | `b1d886eada82adcf1c2036933d89ce111c2c76521d930664873af9b004763857` |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/cosmoshub/cosmoshub-4_33734658_pebbledb_v29.0.1_20261105T0704Z.tar.lz4)** | Thu Nov 05 2026 07:04:00 UTC | `cosmoshub-4` | 16G | 33734658 | `v29.0.1` | `pebbledb` | `6865632c0191274f5e4e3475aa7f305d5e7dbf2c4c5f6cb85377d4db157dadfb` |

---

## Download instructions

> This snapshot uses the `pebbledb` database backend. Your node has to run with the same backend: `db_backend = "pebbledb"` in `config/config.toml` and `app-db-backend = "pebbledb"` in `config/app.toml`.

### Download & verify
Downloads the snapshot and verifies its SHA-256 checksum before touching your node, then stops the node, extracts the snapshot while keeping your `priv_validator_state.json` and starts the node again. Needs free disk space for the archive plus the extracted data.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/cosmoshub/cosmoshub-4_33744401_pebbledb_v29.0.1_20261105T2237Z.tar.lz4"
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
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/cosmoshub/cosmoshub-4_33744401_pebbledb_v29.0.1_20261105T2237Z.tar.lz4"
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
