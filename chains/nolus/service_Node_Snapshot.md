## Nolus Snapshots, provided by Solva
Solva provides node snapshots for selected chains, updated daily. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | checksum |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | -------- |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/nolus/pirin-1_28347520_v0.8.6_20261104T0157Z.tar.lz4)** | Wed Nov 04 2026 01:57:00 UTC | `pirin-1` | 480M | 28347520 | `v0.8.6` | `goleveldb` | `8859dfe2d3bf4e00d4e3257041940d1316795e15d167b22996db950ddc52f7b3` |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/nolus/pirin-1_28304266_v0.8.6_20261103T0157Z.tar.lz4)** | Tue Nov 03 2026 01:57:00 UTC | `pirin-1` | 481M | 28304266 | `v0.8.6` | `goleveldb` | `8d72fd318bd2bb7e723a58ee8a407c28d45e9c2120dfc83b0fd8d78759e9fc80` |

---

## Download instructions

### Download & verify
Downloads the snapshot and verifies its SHA-256 checksum before touching your node, then stops the node, extracts the snapshot while keeping your `priv_validator_state.json` and starts the node again. Needs free disk space for the archive plus the extracted data.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/nolus/pirin-1_28347520_v0.8.6_20261104T0157Z.tar.lz4"
cd $HOME/.nolus
wget -O snapshot.tar.lz4 "$URL"
wget -O snapshot.tar.lz4.sha256 "$URL.sha256"
if echo "$(cat snapshot.tar.lz4.sha256)  snapshot.tar.lz4" | sha256sum --check; then
  sudo systemctl stop nolusd
  cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
  rm -rf ./data ./wasm
  lz4 -dc snapshot.tar.lz4 | tar -xf -
  mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
  rm -f snapshot.tar.lz4 snapshot.tar.lz4.sha256
  sudo systemctl start nolusd
else
  echo "Checksum mismatch: snapshot not extracted, your node was not touched"
  rm -f snapshot.tar.lz4 snapshot.tar.lz4.sha256
fi
```

### Streaming
Downloads and extracts in a single pass while keeping your `priv_validator_state.json`, so no extra disk space is needed, but the checksum can't be verified.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/nolus/pirin-1_28347520_v0.8.6_20261104T0157Z.tar.lz4"
cd $HOME/.nolus
sudo systemctl stop nolusd
cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf ./data ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
sudo systemctl start nolusd
```

### Download script
Runs the download & verify steps for `$HOME/.nolus`, keeps your validator state and removes the downloaded archive afterwards. Requires `wget` and `lz4`. Review the script before piping it into bash.
```sh
sudo systemctl stop nolusd
curl -sSL https://dl-eu1.solva.solutions/SNAPSHOTS/nolus/download_snapshot.sh | bash
sudo systemctl start nolusd
```

### Optional: wasm folder only
In some cases you can statesync a wasm chain, but the wasm folder isn't part of the statesync snapshot. Use the wasm-only snapshot for these cases.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/nolus/pirin-1_wasm.tar.lz4"
cd $HOME/.nolus
sudo systemctl stop nolusd
rm -rf ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
sudo systemctl start nolusd
```
