## Node Snapshot
CryptoCrew provides daily node-snapshots for the chains we validate. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!  
dchain version: `v0.12.0`
| DOWNLOAD | date | chain id | size | height | checksum |
| -------- | ---- | -------- | ---- | ------ | -------- |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/dchaintestnet/test-theodoric-2_9016112.tar.lz4)** | Sat Oct 10 2026 21:05:31 UTC | `test-theodoric-2` | 14G | 9016112 | `7febdf878704326754d9e0d3878d06e113814a609a92b9bff370438ca7133b51` |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/dchaintestnet/test-theodoric-2_8990749.tar.lz4)** | Fri Oct 09 2026 21:05:32 UTC | `test-theodoric-2` | 14G | 8990749 | `ce03f8a66483b2265b015192c3a645a4c87d5388f711c4151fd00c770c0fa8a2` |

---

## Download instructions
Download snapshot manually:
```sh
sudo apt install wget lz4
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/dchaintestnet/test-theodoric-2_9016112.tar.lz4"
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
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/dchaintestnet/test-theodoric-2_9016112.tar.lz4"
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

