## Node Snapshot
Solva provides daily node-snapshots for the chains we validate. These snapshots are designed to be minimum-size and can be used to quickly sync your own node!  
gaiad version: `v28.3.0`
| DOWNLOAD | date | chain id | size | height | database | checksum |
| -------- | ---- | -------- | ---- | ------ | -------- | -------- |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/cosmoshub/cosmoshub-4_33359515_pebbledb.tar.lz4)** | Sun Oct 11 2026 12:07:26 UTC | `cosmoshub-4` | 23G | 33359515 | `pebbledb` | `891d20a52edcb1ef48c8e489b68342f6dedfc144b9743ee4741de6b5d95b641a` |
| **[DOWNLOAD](https://dl-eu1.ccvalidators.com/SNAPSHOTS/cosmoshub/cosmoshub-4_33351920_pebbledb.tar.lz4)** | Sun Oct 11 2026 00:00:20 UTC | `cosmoshub-4` | 21G | 33351920 | `pebbledb` | `b1db255d46724c49039112d861c277363ff8962ef1c946342a05a554bc81d3a4` |

---

## Download instructions
Download snapshot manually:
```sh
sudo apt install wget lz4
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/cosmoshub/cosmoshub-4_33359515_pebbledb.tar.lz4"
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
URL="https://dl-eu1.ccvalidators.com/SNAPSHOTS/cosmoshub/cosmoshub-4_33359515_pebbledb.tar.lz4"
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

