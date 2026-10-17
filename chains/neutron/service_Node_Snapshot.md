## Neutron Snapshots, provided by Solva
Solva provides node snapshots for selected chains, updated daily. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | checksum |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | -------- |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/neutron/neutron-1_61907779_v11.3.0-21-gf1d5578d_20261017T1414Z.tar.lz4)** | Sat Oct 17 2026 14:14:00 UTC | `neutron-1` | 15G | 61907779 | `v11.3.0-21-gf1d5578d` | `goleveldb` | `cf9af7edc0fa1b80f0e8407f17bf5abdb294ba69f266727ef14115767dc14a2f` |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/neutron/neutron-1_61895659_v11.3.0-21-gf1d5578d_20261016T1414Z.tar.lz4)** | Fri Oct 16 2026 14:14:00 UTC | `neutron-1` | 14G | 61895659 | `v11.3.0-21-gf1d5578d` | `goleveldb` | `92fb6b76025d0f2fb5e96cbe6e953fa1cf223925f15e206c720aad8f608445dc` |

---

## Download instructions

### Download & verify
Downloads the snapshot and verifies its SHA-256 checksum before touching your node, then stops the node, extracts the snapshot while keeping your `priv_validator_state.json` and starts the node again. Needs free disk space for the archive plus the extracted data.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/neutron/neutron-1_61907779_v11.3.0-21-gf1d5578d_20261017T1414Z.tar.lz4"
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
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/neutron/neutron-1_61907779_v11.3.0-21-gf1d5578d_20261017T1414Z.tar.lz4"
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
