## dchain Snapshots, provided by Solva
Solva provides node snapshots for selected chains, updated daily. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!
Browse all snapshots at [snapshots.solva.solutions](https://snapshots.solva.solutions).

| DOWNLOAD | date | chain id | size | height | version | database | checksum |
| -------- | ---- | -------- | ---- | ------ | ------- | -------- | -------- |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/dchain/dchain-1_465257_v1.0.0-rc.4_20261121T1741Z.tar.lz4)** | Sat Nov 21 2026 17:41:00 UTC | `dchain-1` | 6.9M | 465257 | `v1.0.0-rc.4` | `goleveldb` | `73dbaae8978f67d823fee7f88f6086048dac13a5ab4d54359a0009b00f0f01e0` |
| **[DOWNLOAD](https://dl-eu1.solva.solutions/SNAPSHOTS/dchain/dchain-1_439593_v1.0.0-rc.4_20261120T1736Z.tar.lz4)** | Fri Nov 20 2026 17:36:00 UTC | `dchain-1` | 11M | 439593 | `v1.0.0-rc.4` | `goleveldb` | `0abed92d1c6b403cb6288b929a9047674e9ea639c17c9657f2e0b52c298221b3` |

---

## Download instructions

### Download & verify
Downloads the snapshot and verifies its SHA-256 checksum before touching your node, then stops the node, extracts the snapshot while keeping your `priv_validator_state.json` and starts the node again. Needs free disk space for the archive plus the extracted data.
```sh
sudo apt install -y wget lz4
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/dchain/dchain-1_465257_v1.0.0-rc.4_20261121T1741Z.tar.lz4"
cd $HOME/.dchain
wget -O snapshot.tar.lz4 "$URL"
wget -O snapshot.tar.lz4.sha256 "$URL.sha256"
if echo "$(cat snapshot.tar.lz4.sha256)  snapshot.tar.lz4" | sha256sum --check; then
  sudo systemctl stop dchain
  cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
  rm -rf ./data
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
URL="https://dl-eu1.solva.solutions/SNAPSHOTS/dchain/dchain-1_465257_v1.0.0-rc.4_20261121T1741Z.tar.lz4"
cd $HOME/.dchain
sudo systemctl stop dchain
cp ./data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf ./data
wget -O - "$URL" | lz4 -dc | tar -xf -
mv -f ./priv_validator_state.json.tmp ./data/priv_validator_state.json
sudo systemctl start dchain
```

### Download script
Runs the download & verify steps for `$HOME/.dchain`, keeps your validator state and removes the downloaded archive afterwards. Requires `wget` and `lz4`. Review the script before piping it into bash.
```sh
sudo systemctl stop dchain
curl -sSL https://dl-eu1.solva.solutions/SNAPSHOTS/dchain/download_snapshot.sh | bash
sudo systemctl start dchain
```
