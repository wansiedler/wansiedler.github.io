async function main(){const n="Donation",o=path.join(__dirname,"artifacts","contracts",`${n}.sol`,`${n}.json`),i=path.join(__dirname,`${n}ABI.json`),t=require(o).abi;fs.writeFileSync(i,JSON.stringify(t,null,2)),console.log(`ABI exported to ${i}`)}const fs=require("fs"),path=require("path");main()["catch"](n=>{console.error(n),process.exit(1)});