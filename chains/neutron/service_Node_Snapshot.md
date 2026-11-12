## Neutron Snapshots, provided by Solva
Solva provides node snapshots for selected chains, updated daily. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | checksum |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | -------- |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/neutron/neutron-1_62230901_v11.3.0-21-gf1d5578d_20261112T1606Z.tar.lz4)** | Thu Nov 12 2026 16:06:00 UTC | `neutron-1` | 15G | 62230901 | `v11.3.0-21-gf1d5578d` | `goleveldb` | `fc071d624db9b426addaeea475e0cd7d58fe70cdeff114b58d3c09031fbcbbec` |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/neutron/neutron-1_62218146_v11.3.0-21-gf1d5578d_20261111T1519Z.tar.lz4)** | Wed Nov 11 2026 15:19:00 UTC | `neutron-1` | 15G | 62218146 | `v11.3.0-21-gf1d5578d` | `goleveldb` | `fda94693f04a8c026ffb81be6ce2f227a285864ca45104c05993c3fa62ec29ac` |

---

## Download instructions

### Download & verify
Downloads the snapshot and verifies its SHA-256 checksum before touching your node, then stops the node, extracts the snapshot while keeping your `priv_validator_state.json` and starts the node again. Needs free disk space for the archive plus the extracted data.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/neutron/neutron-1_62230901_v11.3.0-21-gf1d5578d_20261112T1606Z.tar.lz4"
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
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/neutron/neutron-1_62230901_v11.3.0-21-gf1d5578d_20261112T1606Z.tar.lz4"
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
