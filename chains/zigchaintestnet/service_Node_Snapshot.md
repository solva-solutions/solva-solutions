## Node Snapshot
CryptoCrew provides daily node-snapshots for the chains we validate. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!  
zigchaind version: `v4.0.0`
| DOWNLOAD | date | chain id | size | height | checksum |
| -------- | ---- | -------- | ---- | ------ | -------- |
| **[DOWNLOAD](https://dl-eu2.ccvalidators.com/SNAPSHOTS/zigchaintestnet/zig-test-2_6409372.tar.lz4)** | Thu Jun 18 2026 15:34:16 UTC | `zig-test-2` | 2.1G | 6409372 | `35fabe9b13c647428c458b0f32293025dfb2cb42310f92440177217c48b8a9ac` |
| **[DOWNLOAD](https://dl-eu2.ccvalidators.com/SNAPSHOTS/zigchaintestnet/zig-test-2_6394064.tar.lz4)** | Wed Jun 17 2026 15:42:59 UTC | `zig-test-2` | 2.1G | 6394064 | `47775ea14a4b69e84ef5ec755d8e857a193a44359ac254931143997cd6646487` |

---

## Download instructions
Download snapshot manually:
```sh
sudo apt install wget lz4
URL="https://dl-eu2.ccvalidators.com/SNAPSHOTS/zigchaintestnet/zig-test-2_6409372.tar.lz4"
cd $HOME/.zigchain
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
URL="https://dl-eu2.ccvalidators.com/SNAPSHOTS/zigchaintestnet/zig-test-2_6409372.tar.lz4"
cd $HOME/.zigchain
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data wasm
wget -O - $URL | lz4 -d | tar -xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```

### Optional: Download `wasm` folder only
In some cases you can statesync a wasm chain, but the wasm-folder will not be included in the statesync snapshot. Use our wasm-only snapshot for these cases
```sh
URL="https://dl-eu2.ccvalidators.com/SNAPSHOTS/zigchaintestnet/zig-test-2_wasm.tar.lz4"
cd $HOME/.zigchain
rm -rf wasm
wget -O - $URL | lz4 -d | tar -xvf -
```



## Using the download script

The download script fully automates the download and extraction process, while ensuring that your validator state is preserved. To use it, simply run the following command:
```sh
curl -sSL https://dl-eu2.ccvalidators.com/SNAPSHOTS/zigchaintestnet/download_snapshot.sh | bash
```
---

After downloading and extracting the snapshot, start the daemon: `sudo systemctl start zigchaind`

