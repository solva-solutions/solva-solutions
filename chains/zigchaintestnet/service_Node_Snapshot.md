## ZIGChain Testnet Snapshots, provided by Solva
Solva provides node snapshots for selected chains, updated daily. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | checksum |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | -------- |
| **[DOWNLOAD](https://dl-eu2.solva.solutions/SNAPSHOTS/zigchaintestnet/zig-test-2_8269059_v5.1.0_20261017T0917Z.tar.lz4)** | Sat Oct 17 2026 09:17:00 UTC | `zig-test-2` | 428M | 8269059 | `v5.1.0` | `goleveldb` | `9a346d45597930885b21392e05979b4cad95bf2ccca04cc584c4325023c10a2a` |
| **[DOWNLOAD](https://dl-eu2.solva.solutions/SNAPSHOTS/zigchaintestnet/zig-test-2_8253549_v5.1.0_20261016T0907Z.tar.lz4)** | Fri Oct 16 2026 09:07:00 UTC | `zig-test-2` | 439M | 8253549 | `v5.1.0` | `goleveldb` | `ab2b316457e0f1e0d684d5dd9cbaa8f741725cc438b417f934dcb80d0ad9f7bc` |

---

## Download instructions

### Download & verify
Downloads the snapshot and verifies its SHA-256 checksum before touching your node, then stops the node, extracts the snapshot while keeping your `priv_validator_state.json` and starts the node again. Needs free disk space for the archive plus the extracted data.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/zigchaintestnet/zig-test-2_8269059_v5.1.0_20261017T0917Z.tar.lz4"
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
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/zigchaintestnet/zig-test-2_8269059_v5.1.0_20261017T0917Z.tar.lz4"
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
curl -sSL https://dl-eu2.solva.solutions/SNAPSHOTS/zigchaintestnet/download_snapshot.sh | bash
sudo systemctl start zigchaind
```

### Optional: wasm folder only
In some cases you can statesync a wasm chain, but the wasm folder isn't part of the statesync snapshot. Use the wasm-only snapshot for these cases.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/zigchaintestnet/zig-test-2_wasm.tar.lz4"
cd $HOME/.zigchain
sudo systemctl stop zigchaind
rm -rf ./wasm
wget -O - "$URL" | lz4 -dc | tar -xf -
sudo systemctl start zigchaind
```
