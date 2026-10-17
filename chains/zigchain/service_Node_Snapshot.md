## ZIGChain Snapshots, provided by Solva
Solva provides node snapshots for selected chains, updated daily. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | checksum |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | -------- |
| **[DOWNLOAD](https://dl-eu2.solva.solutions/SNAPSHOTS/zigchain/zigchain-1_13010731_v5.1.2_20261017T1446Z.tar.lz4)** | Sat Oct 17 2026 14:46:00 UTC | `zigchain-1` | 2.9G | 13010731 | `v5.1.2` | `goleveldb` | `18b749cafebfa4bda04d01802b94801c840431da6827146516184bc9ee6db03c` |
| **[DOWNLOAD](https://dl-eu2.solva.solutions/SNAPSHOTS/zigchain/zigchain-1_12983578_v5.1.2_20261016T1449Z.tar.lz4)** | Fri Oct 16 2026 14:49:00 UTC | `zigchain-1` | 2.9G | 12983578 | `v5.1.2` | `goleveldb` | `e2deed72f85ffa4197e4bc2c1dd735d95a82c29da507cf13e6a348df29481041` |

---

## Download instructions

### Download & verify
Downloads the snapshot and verifies its SHA-256 checksum before touching your node, then stops the node, extracts the snapshot while keeping your `priv_validator_state.json` and starts the node again. Needs free disk space for the archive plus the extracted data.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/zigchain/zigchain-1_13010731_v5.1.2_20261017T1446Z.tar.lz4"
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
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/zigchain/zigchain-1_13010731_v5.1.2_20261017T1446Z.tar.lz4"
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
