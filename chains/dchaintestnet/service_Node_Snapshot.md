## dChain Testnet Snapshots, provided by Solva
Solva provides node snapshots for selected chains, updated daily. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | checksum |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | -------- |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/dchaintestnet/test-theodoric-3_883657_v1.0.0-rc.3_20261121T2102Z.tar.lz4)** | Sat Nov 21 2026 21:02:00 UTC | `test-theodoric-3` | 3.0G | 883657 | `v1.0.0-rc.3` | `goleveldb` | `ccf8ecb7381997a7133582921ef5ff0305d7c1bc800cadcd74ca83a9b0aa31d3` |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/dchaintestnet/test-theodoric-3_855653_v1.0.0-rc.3_20261120T2102Z.tar.lz4)** | Fri Nov 20 2026 21:02:00 UTC | `test-theodoric-3` | 3.0G | 855653 | `v1.0.0-rc.3` | `goleveldb` | `4a19b4d55ba44270315e0cde442e3c11fd63b5c9eef4ad6b85270adb17d6cd3e` |

---

## Download instructions

### Download & verify
Downloads the snapshot and verifies its SHA-256 checksum before touching your node, then stops the node, extracts the snapshot while keeping your `priv_validator_state.json` and starts the node again. Needs free disk space for the archive plus the extracted data.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/dchaintestnet/test-theodoric-3_883657_v1.0.0-rc.3_20261121T2102Z.tar.lz4"
cd $HOME/.dchain
wget -O snapshot.tar.lz4 "$URL"
wget -O snapshot.tar.lz4.sha256 "$URL.sha256"
if echo "$(cat snapshot.tar.lz4.sha256)  snapshot.tar.lz4" | sha256sum --check; then
  sudo systemctl stop dchain
  cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
  rm -rf ./data ./wasm
  lz4 -dc snapshot.tar.lz4 | tar -xf -
  mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
  rm -f snapshot.tar.lz4 snapshot.tar.lz4.sha256
  sudo systemctl start dchain
else
  echo "Checksum mismatch: snapshot not extracted, your node was not touched"
  rm -f snapshot.tar.lz4 snapshot.tar.lz4.sha256
fi
```

### Streaming
Downloads and extracts in a single pass while keeping your `priv_validator_state.json`, so no extra disk space is needed, but the checksum can't be verified.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/dchaintestnet/test-theodoric-3_883657_v1.0.0-rc.3_20261121T2102Z.tar.lz4"
cd $HOME/.dchain
sudo systemctl stop dchain
cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf ./data ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
sudo systemctl start dchain
```

### Download script
Runs the download & verify steps for `$HOME/.dchain`, keeps your validator state and removes the downloaded archive afterwards. Requires `wget` and `lz4`. Review the script before piping it into bash.
```sh
sudo systemctl stop dchain
curl -sSL https://dl-eu1.solva.solutions/SNAPSHOTS/dchaintestnet/download_snapshot.sh | bash
sudo systemctl start dchain
```

### Optional: wasm folder only
In some cases you can statesync a wasm chain, but the wasm folder isn't part of the statesync snapshot. Use the wasm-only snapshot for these cases.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/dchaintestnet/test-theodoric-3_wasm.tar.lz4"
cd $HOME/.dchain
sudo systemctl stop dchain
rm -rf ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
sudo systemctl start dchain
```
