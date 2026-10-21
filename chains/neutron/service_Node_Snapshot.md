## Neutron Snapshots, provided by Solva
Solva provides node snapshots for selected chains, updated daily. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | checksum |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | -------- |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/neutron/neutron-1_61956763_v11.3.0-21-gf1d5578d_20261021T1414Z.tar.lz4)** | Wed Oct 21 2026 14:14:00 UTC | `neutron-1` | 18G | 61956763 | `v11.3.0-21-gf1d5578d` | `goleveldb` | `0c62c1b948af5622204ac480b810959e7febac09d8c628c18d257579d5564378` |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/neutron/neutron-1_61944353_v11.3.0-21-gf1d5578d_20261020T1414Z.tar.lz4)** | Tue Oct 20 2026 14:14:00 UTC | `neutron-1` | 17G | 61944353 | `v11.3.0-21-gf1d5578d` | `goleveldb` | `8f264c4a7acdb62ebe57a60d9e33d4ac3647193b5d2f832104fdc9cd82649a5f` |

---

## Download instructions

### Download & verify
Downloads the snapshot and verifies its SHA-256 checksum before touching your node, then stops the node, extracts the snapshot while keeping your `priv_validator_state.json` and starts the node again. Needs free disk space for the archive plus the extracted data.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/neutron/neutron-1_61956763_v11.3.0-21-gf1d5578d_20261021T1414Z.tar.lz4"
cd $HOME/.neutrond
wget -O snapshot.tar.lz4 "$URL"
wget -O snapshot.tar.lz4.sha256 "$URL.sha256"
if echo "$(cat snapshot.tar.lz4.sha256)  snapshot.tar.lz4" | sha256sum --check; then
  sudo systemctl stop neutrond
  cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
  rm -rf ./data ./wasm
  lz4 -dc snapshot.tar.lz4 | tar -xf -
  mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
  rm -f snapshot.tar.lz4 snapshot.tar.lz4.sha256
  sudo systemctl start neutrond
else
  echo "Checksum mismatch: snapshot not extracted, your node was not touched"
  rm -f snapshot.tar.lz4 snapshot.tar.lz4.sha256
fi
```

### Streaming
Downloads and extracts in a single pass while keeping your `priv_validator_state.json`, so no extra disk space is needed, but the checksum can't be verified.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/neutron/neutron-1_61956763_v11.3.0-21-gf1d5578d_20261021T1414Z.tar.lz4"
cd $HOME/.neutrond
sudo systemctl stop neutrond
cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf ./data ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
sudo systemctl start neutrond
```

### Download script
Runs the download & verify steps for `$HOME/.neutrond`, keeps your validator state and removes the downloaded archive afterwards. Requires `wget` and `lz4`. Review the script before piping it into bash.
```sh
sudo systemctl stop neutrond
curl -sSL https://dl-eu1.solva.solutions/SNAPSHOTS/neutron/download_snapshot.sh | bash
sudo systemctl start neutrond
```

### Optional: wasm folder only
In some cases you can statesync a wasm chain, but the wasm folder isn't part of the statesync snapshot. Use the wasm-only snapshot for these cases.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/neutron/neutron-1_wasm.tar.lz4"
cd $HOME/.neutrond
sudo systemctl stop neutrond
rm -rf ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
sudo systemctl start neutrond
```
