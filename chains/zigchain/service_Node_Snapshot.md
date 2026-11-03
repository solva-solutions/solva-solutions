## ZIGChain Snapshots, provided by Solva
Solva provides node snapshots for selected chains, updated daily. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | checksum |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | -------- |
| **[DOWNLOAD](https://dl-eu2.solva.solutions/SNAPSHOTS/zigchain/zigchain-1_13472396_v6.0.0_20261103T1445Z.tar.lz4)** | Tue Nov 03 2026 14:45:00 UTC | `zigchain-1` | 2.5G | 13472396 | `v6.0.0` | `goleveldb` | `c8625c550310098cfc178dc8e4656fbffae41a3fd5edc67918b30b6e1ac1e529` |
| **[DOWNLOAD](https://dl-eu2.solva.solutions/SNAPSHOTS/zigchain/zigchain-1_13466800_v6.0.0_20261103T0930Z.tar.lz4)** | Tue Nov 03 2026 09:30:00 UTC | `zigchain-1` | 5.3G | 13466800 | `v6.0.0` | `goleveldb` | `8938efba81e36e51c427d1d4e511dcf1ec7a4443522424be508da5272b302ee6` |

---

## Download instructions

### Download & verify
Downloads the snapshot and verifies its SHA-256 checksum before touching your node, then stops the node, extracts the snapshot while keeping your `priv_validator_state.json` and starts the node again. Needs free disk space for the archive plus the extracted data.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/zigchain/zigchain-1_13472396_v6.0.0_20261103T1445Z.tar.lz4"
cd $HOME/.zigchain
wget -O snapshot.tar.lz4 "$URL"
wget -O snapshot.tar.lz4.sha256 "$URL.sha256"
if echo "$(cat snapshot.tar.lz4.sha256)  snapshot.tar.lz4" | sha256sum --check; then
  sudo systemctl stop zigchaind
  cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
  rm -rf ./data ./wasm
  lz4 -dc snapshot.tar.lz4 | tar -xf -
  mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
  rm -f snapshot.tar.lz4 snapshot.tar.lz4.sha256
  sudo systemctl start zigchaind
else
  echo "Checksum mismatch: snapshot not extracted, your node was not touched"
  rm -f snapshot.tar.lz4 snapshot.tar.lz4.sha256
fi
```

### Streaming
Downloads and extracts in a single pass while keeping your `priv_validator_state.json`, so no extra disk space is needed, but the checksum can't be verified.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/zigchain/zigchain-1_13472396_v6.0.0_20261103T1445Z.tar.lz4"
cd $HOME/.zigchain
sudo systemctl stop zigchaind
cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf ./data ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
sudo systemctl start zigchaind
```

### Download script
Runs the download & verify steps for `$HOME/.zigchain`, keeps your validator state and removes the downloaded archive afterwards. Requires `wget` and `lz4`. Review the script before piping it into bash.
```sh
sudo systemctl stop zigchaind
curl -sSL https://dl-eu2.solva.solutions/SNAPSHOTS/zigchain/download_snapshot.sh | bash
sudo systemctl start zigchaind
```

### Optional: wasm folder only
In some cases you can statesync a wasm chain, but the wasm folder isn't part of the statesync snapshot. Use the wasm-only snapshot for these cases.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/zigchain/zigchain-1_wasm.tar.lz4"
cd $HOME/.zigchain
sudo systemctl stop zigchaind
rm -rf ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
sudo systemctl start zigchaind
```
