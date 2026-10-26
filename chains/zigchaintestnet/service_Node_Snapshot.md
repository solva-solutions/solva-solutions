## ZIGChain Testnet Snapshots, provided by Solva
Solva provides node snapshots for selected chains, updated daily. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | checksum |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | -------- |
| **[DOWNLOAD](https://dl-eu2.solva.solutions/SNAPSHOTS/zigchaintestnet/zig-test-2_8407566_v5.1.0_20261026T0907Z.tar.lz4)** | Mon Oct 26 2026 09:07:00 UTC | `zig-test-2` | 444M | 8407566 | `v5.1.0` | `goleveldb` | `c19db95a8b65e795ffdc5955cb7939d8ece9965193ee0240f4e302629facad27` |
| **[DOWNLOAD](https://dl-eu2.solva.solutions/SNAPSHOTS/zigchaintestnet/zig-test-2_8392160_v5.1.0_20261025T0907Z.tar.lz4)** | Sun Oct 25 2026 09:07:00 UTC | `zig-test-2` | 434M | 8392160 | `v5.1.0` | `goleveldb` | `dac3991a13a59937266ba216d71fd5d3d07545045218d53f292940365933cbd5` |

---

## Download instructions

### Download & verify
Downloads the snapshot and verifies its SHA-256 checksum before touching your node, then stops the node, extracts the snapshot while keeping your `priv_validator_state.json` and starts the node again. Needs free disk space for the archive plus the extracted data.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/zigchaintestnet/zig-test-2_8407566_v5.1.0_20261026T0907Z.tar.lz4"
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
URL="https://dl-eu2.solva.solutions/SNAPSHOTS/zigchaintestnet/zig-test-2_8407566_v5.1.0_20261026T0907Z.tar.lz4"
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
