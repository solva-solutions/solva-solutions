## Node Snapshot
CryptoCrew provides daily node-snapshots for the chains we validate. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!  
dchain version: `v0.12.0`
| DOWNLOAD | date | chain id | size | height | checksum |
| -------- | ---- | -------- | ---- | ------ | -------- |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/dchaintestnet/test-theodoric-2_6508070.tar.lz4)** | Fri Jul 03 2026 21:04:23 UTC | `test-theodoric-2` | 9.0G | 6508070 | `c20a1947d26d716f32f858cd4d5f12977876664e1f955a504d0c19e55caefc2d` |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/dchaintestnet/test-theodoric-2_6482726.tar.lz4)** | Thu Jul 02 2026 21:04:30 UTC | `test-theodoric-2` | 8.9G | 6482726 | `c35971a422e555322710440e0cee022ec4f0b32333a47fa3caa870e5de59a593` |

---

## Download instructions
Download snapshot manually:
```sh
sudo apt install wget lz4
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/dchaintestnet/test-theodoric-2_6508070.tar.lz4"
cd $HOME/.dchain
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data wasm
wget $URL
wget $URL.sha256
echo $(cat $(basename $URL.sha256)) $(basename $URL) | sha256sum --check
lz4 -d $(basename $URL) | tar xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```

### Or single-stream
No double disk-space needed, but slower and not possible to check checksum:
```sh
sudo apt install wget lz4
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/dchaintestnet/test-theodoric-2_6508070.tar.lz4"
cd $HOME/.dchain
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data wasm
wget -O - $URL | lz4 -d | tar -xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```

### Optional: Download `wasm` folder only
In some cases you can statesync a wasm chain, but the wasm-folder will not be included in the statesync snapshot. Use our wasm-only snapshot for these cases
```sh
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/dchaintestnet/test-theodoric-2_wasm.tar.lz4"
cd $HOME/.dchain
rm -rf wasm
wget -O - $URL | lz4 -d | tar -xvf -
```



## Using the download script

The download script fully automates the download and extraction process, while ensuring that your validator state is preserved. To use it, simply run the following command:
```sh
curl -sSL https://dl-eu1.ccvalidators.com/SNAPSHOTS/dchaintestnet/download_snapshot.sh | bash
```
---

After downloading and extracting the snapshot, start the daemon: `sudo systemctl start dchain`

