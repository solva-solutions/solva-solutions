## Nolus Snapshots, provided by Solva
Solva provides node snapshots for selected chains, updated daily. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | checksum |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | -------- |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/nolus/pirin-1_27659522_v0.8.6_20261018T0156Z.tar.lz4)** | Sun Oct 18 2026 01:56:00 UTC | `pirin-1` | 673M | 27659522 | `v0.8.6` | `goleveldb` | `f318a0b9045354cc223e922202b3b5dc2cc7121eee7170d748fddf419c2bed09` |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/nolus/pirin-1_27620552_v0.8.6_20261017T0156Z.tar.lz4)** | Sat Oct 17 2026 01:56:00 UTC | `pirin-1` | 671M | 27620552 | `v0.8.6` | `goleveldb` | `e9d6368242bc22a4fe1f61ca6e0fea3686b04344824cb8fed5b275d2ad26011a` |

---

## Download instructions

### Download & verify
Downloads the snapshot and verifies its SHA-256 checksum before touching your node, then stops the node, extracts the snapshot while keeping your `priv_validator_state.json` and starts the node again. Needs free disk space for the archive plus the extracted data.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/nolus/pirin-1_27659522_v0.8.6_20261018T0156Z.tar.lz4"
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
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/nolus/pirin-1_27659522_v0.8.6_20261018T0156Z.tar.lz4"
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
