## Full Archive Snapshot
CryptoCrew provides full Archive Snapshots for selected chains. These snapshots include the full block history from the genesis block on, tx_data is included.  
zigchaind version: `v4.1.0`
| DOWNLOAD | date | chain id | size | height | snapshot type |
| -------- | ---- | -------- | ---- | ------ | ------------- |
| **[DOWNLOAD](https://dl-eu2.ccvalidators.com/SNAPSHOTS/archive/zigchain/zigchain-1_10294890.tar.lz4)** | Thu Jul 09 2026 15:53:13 UTC | `zigchain-1` | 655G | 10294890 | `archive` |
| **[DOWNLOAD](https://dl-eu2.ccvalidators.com/SNAPSHOTS/archive/zigchain/zigchain-1_10104201.tar.lz4)** | Thu Jul 02 2026 15:39:38 UTC | `zigchain-1` | 638G | 10104201 | `archive` |
---

## Download instructions
Download & extract snapshot:
```sh
sudo apt install wget lz4
URL="https://dl-eu2.ccvalidators.com/SNAPSHOTS/archive/zigchain/zigchain-1_10294890.tar.lz4"
cd $HOME/.zigchain
cp data/priv_validator_state.json ./priv_validator_state.json.tmp
rm -rf data wasm
wget -O - $URL | lz4 -d | tar -xvf -
rm data/priv_validator_state.json
mv ./priv_validator_state.json.tmp data/priv_validator_state.json
```

---

After downloading and extracting the snapshot, start the daemon: `sudo systemctl start zigchaind`

