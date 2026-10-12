## Node Snapshot
Solva provides daily node-snapshots for the chains we validate. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!  
gaiad version: `v28.3.0`
| DOWNLOAD | date | chain id | size | height | database | checksum |
| -------- | ---- | -------- | ---- | ------ | -------- | -------- |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/cosmoshub/cosmoshub-4_33379330_pebbledb.tar.lz4)** | Mon Oct 12 2026 19:28:35 UTC | `cosmoshub-4` | 16G | 33379330 | `pebbledb` | `3f488594d8120bff8da5cd254c1d7099921f64e5c832ca1475b69dd102e1f78c` |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/cosmoshub/cosmoshub-4_33374686_pebbledb.tar.lz4)** | Mon Oct 12 2026 12:28:31 UTC | `cosmoshub-4` | 28G | 33374686 | `pebbledb` | `b34292c358f90312d6408d572bc9defe8f89c83585c4e14abc2fc9f0367c311a` |

---

## Download instructions
Download snapshot manually:
```sh
sudo apt install wget lz4
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/cosmoshub/cosmoshub-4_33379330_pebbledb.tar.lz4"
cd $HOME/.gaia
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
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/cosmoshub/cosmoshub-4_33379330_pebbledb.tar.lz4"
cd $HOME/.gaia
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data wasm
wget -O - $URL | lz4 -d | tar -xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```

### Optional: Download `wasm` folder only
In some cases you can statesync a wasm chain, but the wasm-folder will not be included in the statesync snapshot. Use our wasm-only snapshot for these cases
```sh
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/cosmoshub/cosmoshub-4_wasm.tar.lz4"
cd $HOME/.gaia
rm -rf wasm
wget -O - $URL | lz4 -d | tar -xvf -
```



## Using the download script

The download script fully automates the download and extraction process, while ensuring that your validator state is preserved. To use it, simply run the following command:
```sh
curl -sSL https://dl-eu1.ccvalidators.com/SNAPSHOTS/cosmoshub/download_snapshot.sh | bash
```
---

After downloading and extracting the snapshot, start the daemon: `sudo systemctl start gaiad`

