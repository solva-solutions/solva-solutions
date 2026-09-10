## Full Archive Snapshot
CryptoCrew provides full Archive Snapshots for selected chains. These snapshots include the full block history from the genesis block on, tx_data is included.  
zigchaind version: `v5.0.0-patch-1`
| DOWNLOAD | date | chain id | size | height | snapshot type |
| -------- | ---- | -------- | ---- | ------ | ------------- |
| **[DOWNLOAD](https://dl-eu2.ccvalidators.com/SNAPSHOTS/archive/zigchaintestnet/zig-test-2_7704574.tar.lz4)** | Thu Sep 10 2026 22:01:50 UTC | `zig-test-2` | 1.5T | 7704574 | `archive` |
| **[DOWNLOAD](https://dl-eu2.ccvalidators.com/SNAPSHOTS/archive/zigchaintestnet/zig-test-2_7597807.tar.lz4)** | Thu Sep 03 2026 22:06:07 UTC | `zig-test-2` | 1.5T | 7597807 | `archive` |
---

## Download instructions
Download & extract snapshot:
```sh
sudo apt install wget lz4
URL="https://dl-eu2.ccvalidators.com/SNAPSHOTS/archive/zigchaintestnet/zig-test-2_7704574.tar.lz4"
cd $HOME/.zigchain
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data wasm
wget -O - $URL | lz4 -d | tar -xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```

---

After downloading and extracting the snapshot, start the daemon: `sudo systemctl start zigchaind`

