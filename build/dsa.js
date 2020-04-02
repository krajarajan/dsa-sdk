/*!
 * 
 *   dsa-sdk v1.0.9
 *   https://github.com/instadapp/dsa-sdk
 * 
 *   Copyright (c) INSTADAPP LABS LLC 
 * 
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 * 
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.DSA=t():e.DSA=t()}(this,(function(){return function(e){var t={};function n(a){if(t[a])return t[a].exports;var s=t[a]={i:a,l:!1,exports:{}};return e[a].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(a,s,function(t){return e[t]}.bind(null,s));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const a=n(1),{address:s,ABI:i,tokens:r}=n(2);e.exports=class{constructor(){this.user={id:0,account:s.genesis,version:0,origin:s.genesis},this.spells=[],this.ABI=i,this.address=s,this.tokens=r,this.helpers=new a}getUser(){return this.user}setUser(e){e.id&&(this.user.id=e.id),e.account&&(this.user.account=e.account),e.verion&&(this.user.verion=e.verion),e.origin&&(this.user.origin=e.origin)}async build(e){var t=web3.currentProvider.selectedAddress;e||(e={}),e.owner||(e.owner=t),e.version||(e.version=1),e.origin||(e.origin=s.genesis),!e.origin&&this.user.origin&&(e.origin=this.user.origin);var n=await new web3.eth.Contract(i.core.index,s.core.index);return await n.methods.build(e.owner,e.version,e.origin).send({from:t}).on("error",e=>e).on("transactionHash",e=>e)}async count(){var e=new web3.eth.Contract(i.core.list,s.core.list);return await e.methods.accounts().call().then(e=>e).catch(e=>e)}async getAccounts(e){e||(e=web3.currentProvider.selectedAddress);var t=new web3.eth.Contract(i.resolvers.core,s.resolvers.core);return await t.methods.getOwnerDetails(e).call({from:s.genesis}).then(e=>{for(var t=e.IDs.length,n=[],a=0;a<t;a++)n.push({id:e.IDs[a],account:e.accounts[a],version:e.versions[a]});return n}).catch(e=>e)}async getAuthorities(e){e||(e=this.user.id);var t=new web3.eth.Contract(i.resolvers.core,s.resolvers.core);return await t.methods.getIDOwners(e).call({from:s.genesis}).then(e=>e).catch(e=>e)}getInterface(e,t){const n=i.connectors[e];for(let e=0;e<n.length;e++)if(n[e].name==t)return n[e];return console.error(`${t} is invalid method.`)}getTarget(e){const t=s.connectors[e];return t||console.error(`${e} is invalid connector.`)}encodeMethod(e){const t=e.connector,n=e.method,a=e.args,s=this.getInterface(t,n);return web3.eth.abi.encodeFunctionCall(s,a)}new(){this.spells=[]}add(e){this.spells.push(e)}async cast(){const e=this.spells;let t=[],n=[];for(let a=0;a<e.length;a++)t.push(this.getTarget(e[a].connector)),n.push(this.encodeMethod(e[a]));var a=web3.currentProvider.selectedAddress,s=await new web3.eth.Contract(i.core.account,this.user.account);return await s.methods.cast(t,n,this.user.origin).send({from:a}).on("error",e=>e).on("transactionHash",e=>(this.spells=[],e))}}},function(e,t){e.exports=class{cleanAddress(e){return e.slice(0,4)+"..."+e.slice(-4)}cleanTxn(e){return e.slice(0,6)+"..."+e.slice(-6)}cleanDecimal(e,t){var n=100;return t&&(n=10**t),(0,Math.floor)(+e*n)/n}cleanNumber(e){return 1e6<e?`${cleanDecimal(e/1e6).toLocaleString()} M`:1e4<e?`${cleanDecimal(e/1e3).toLocaleString()} K`:e?cleanDecimal(e).toLocaleString():"0.00"}bigNumInString(e){var t,n=Math.pow;1>Math.abs(e)?(t=parseInt(e.toString().split("e-")[1]))&&(e*=n(10,t-1),e="0."+Array(t).join("0")+e.toString().substring(2)):20<(t=parseInt(e.toString().split("+")[1]))&&(e/=n(10,t-=20),e+=Array(t+1).join("0"));return e}}},function(e,t,n){e.exports.address={genesis:"0x0000000000000000000000000000000000000000",core:{index:"0x2971AdFa57b20E5a416aE5a708A8655A9c74f723",list:"0x4c8a1BEb8a87765788946D6B19C6C6355194AbEb"},connectors:{basic:"0x9370236a085A99Aa359f4bD2f0424b8c3bf25C99",auth:"0x627cd0DbD5eE33F8456Aa8143aCd68a13d641588",compound:""},resolvers:{core:"0xD6fB4fd8b595d0A1dE727C35fe6F1D4aE5B60F51"}},e.exports.ABI={core:{index:n(3),list:n(4),account:n(5)},resolvers:{core:n(6)},connectors:{basic:n(7),auth:n(8),compound:n(9)}},e.exports.tokens={eth:{symbol:"ETH",name:"Ethereum",address:"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",decimals:18},dai:{symbol:"DAI",name:"DAI Stable",address:"0x6B175474E89094C44Da98b954EedeAC495271d0F",decimals:18},usdc:{symbol:"USDC",name:"USD Coin",address:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",decimals:6},sai:{symbol:"SAI",name:"SAI Stable",address:"0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",decimals:18},mkr:{symbol:"MKR",name:"MakerDAO",address:"0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",decimals:18},zrx:{symbol:"ZRX",name:"0x Protocol",address:"0xe41d2489571d322189246dafa5ebde1f4699f498",decimals:18},rep:{symbol:"REP",name:"Augur",address:"0x1985365e9f78359a9b6ad760e32412f4a445e862",decimals:18},tusd:{symbol:"TUSD",name:"TrueUSD",address:"0x8dd5fbCe2F6a956C3022bA3663759011Dd51e73E",decimals:18},bat:{symbol:"BAT",name:"Basic Att.",address:"0x0d8775f648430679a709e98d2b0cb6250d2887ef",decimals:18},knc:{symbol:"KNC",name:"Kyber Network",address:"0xdd974d5c2e2928dea5f71b9825b8b646686bd200",decimals:18},wbtc:{symbol:"WBTC",name:"Wrapped BTC",address:"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",decimals:8}}},function(e){e.exports=JSON.parse('[{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"origin","type":"address"}],"name":"LogAccountCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_newAccount","type":"address"},{"indexed":true,"internalType":"address","name":"_connectors","type":"address"},{"indexed":true,"internalType":"address","name":"_check","type":"address"}],"name":"LogNewAccount","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"accountVersion","type":"uint256"},{"indexed":true,"internalType":"address","name":"check","type":"address"}],"name":"LogNewCheck","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"master","type":"address"}],"name":"LogNewMaster","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"master","type":"address"}],"name":"LogUpdateMaster","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"account","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newAccount","type":"address"},{"internalType":"address","name":"_connectors","type":"address"},{"internalType":"address","name":"_check","type":"address"}],"name":"addNewAccount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"accountVersion","type":"uint256"},{"internalType":"address","name":"_origin","type":"address"}],"name":"build","outputs":[{"internalType":"address","name":"_account","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"accountVersion","type":"uint256"},{"internalType":"address[]","name":"_targets","type":"address[]"},{"internalType":"bytes[]","name":"_datas","type":"bytes[]"},{"internalType":"address","name":"_origin","type":"address"}],"name":"buildWithCast","outputs":[{"internalType":"address","name":"_account","type":"address"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"accountVersion","type":"uint256"},{"internalType":"address","name":"_newCheck","type":"address"}],"name":"changeCheck","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newMaster","type":"address"}],"name":"changeMaster","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"check","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"connectors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"version","type":"uint256"},{"internalType":"address","name":"query","type":"address"}],"name":"isClone","outputs":[{"internalType":"bool","name":"result","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"list","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"master","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_master","type":"address"},{"internalType":"address","name":"_list","type":"address"},{"internalType":"address","name":"_account","type":"address"},{"internalType":"address","name":"_connectors","type":"address"}],"name":"setBasics","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateMaster","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"versionCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')},function(e){e.exports=JSON.parse('[{"inputs":[{"internalType":"uint64","name":"","type":"uint64"}],"name":"accountAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"accountID","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"","type":"uint64"}],"name":"accountLink","outputs":[{"internalType":"address","name":"first","type":"address"},{"internalType":"address","name":"last","type":"address"},{"internalType":"uint64","name":"count","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"","type":"uint64"},{"internalType":"address","name":"","type":"address"}],"name":"accountList","outputs":[{"internalType":"address","name":"prev","type":"address"},{"internalType":"address","name":"next","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accounts","outputs":[{"internalType":"uint64","name":"","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"addAuth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"instaIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"}],"name":"removeAuth","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userLink","outputs":[{"internalType":"uint64","name":"first","type":"uint64"},{"internalType":"uint64","name":"last","type":"uint64"},{"internalType":"uint64","name":"count","type":"uint64"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint64","name":"","type":"uint64"}],"name":"userList","outputs":[{"internalType":"uint64","name":"prev","type":"uint64"},{"internalType":"uint64","name":"next","type":"uint64"}],"stateMutability":"view","type":"function"}]')},function(e){e.exports=JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"origin","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"LogCast","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"LogDisable","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"}],"name":"LogEnable","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"_shield","type":"bool"}],"name":"LogSwitchShield","type":"event"},{"inputs":[{"internalType":"address[]","name":"_targets","type":"address[]"},{"internalType":"bytes[]","name":"_datas","type":"bytes[]"},{"internalType":"address","name":"_origin","type":"address"}],"name":"cast","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"disable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"enable","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"instaIndex","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"isAuth","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"shield","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_shield","type":"bool"}],"name":"switchShield","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]')},function(e){e.exports=JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"connectors","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint64","name":"id","type":"uint64"}],"name":"getAccount","outputs":[{"internalType":"address","name":"account","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getAccountOwners","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"}],"name":"getAccountVersions","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEnabledConnectores","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getID","outputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"}],"name":"getIDOwners","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getOwnerAccounts","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getOwnerDetails","outputs":[{"components":[{"internalType":"uint64[]","name":"IDs","type":"uint64[]"},{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"versions","type":"uint256[]"}],"name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"getOwnerIDs","outputs":[{"internalType":"uint64[]","name":"","type":"uint64[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStaticConnectores","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"index","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"list","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')},function(e){e.exports=JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"erc20","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"getId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"setId","type":"uint256"}],"name":"LogDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"erc20","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmt","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"getId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"setId","type":"uint256"}],"name":"LogWithdraw","type":"event"},{"inputs":[],"name":"connectorID","outputs":[{"internalType":"uint256","name":"_type","type":"uint256"},{"internalType":"uint256","name":"_id","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"uint256","name":"tokenAmt","type":"uint256"},{"internalType":"uint256","name":"getId","type":"uint256"},{"internalType":"uint256","name":"setId","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getEthAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getEventAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getMemoryAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"erc20","type":"address"},{"internalType":"uint256","name":"tokenAmt","type":"uint256"},{"internalType":"address payable","name":"to","type":"address"},{"internalType":"uint256","name":"getId","type":"uint256"},{"internalType":"uint256","name":"setId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"}]')},function(e){e.exports=JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_msgSender","type":"address"},{"indexed":true,"internalType":"address","name":"_auth","type":"address"}],"name":"LogAddAuth","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_msgSender","type":"address"},{"indexed":true,"internalType":"address","name":"_auth","type":"address"}],"name":"LogRemoveAuth","type":"event"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"addModule","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"connectorID","outputs":[{"internalType":"uint256","name":"_type","type":"uint256"},{"internalType":"uint256","name":"_id","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"getEventAddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"removeModule","outputs":[],"stateMutability":"payable","type":"function"}]')},function(e){e.exports=JSON.parse('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"cToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"getId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"setId","type":"uint256"}],"name":"LogBorrow","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"cToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"getId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"setId","type":"uint256"}],"name":"LogDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"cToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"cTokenAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"getId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"setId","type":"uint256"}],"name":"LogDepositCToken","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"address","name":"tokenToPay","type":"address"},{"indexed":true,"internalType":"address","name":"tokenInReturn","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"getId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"setId","type":"uint256"}],"name":"LogLiquidate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"cToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"getId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"setId","type":"uint256"}],"name":"LogPayback","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"borrower","type":"address"},{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"cToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"getId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"setId","type":"uint256"}],"name":"LogPaybackBehalf","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"cToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"getId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"setId","type":"uint256"}],"name":"LogWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"address","name":"cToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"cTokenAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"getId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"setId","type":"uint256"}],"name":"LogWithdrawCToken","type":"event"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"uint256","name":"getId","type":"uint256"},{"internalType":"uint256","name":"setId","type":"uint256"}],"name":"borrow","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"connectorID","outputs":[{"internalType":"uint256","name":"_type","type":"uint256"},{"internalType":"uint256","name":"_id","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"uint256","name":"getId","type":"uint256"},{"internalType":"uint256","name":"setId","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"uint256","name":"getId","type":"uint256"},{"internalType":"uint256","name":"setId","type":"uint256"}],"name":"depositCToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"address","name":"tokenToPay","type":"address"},{"internalType":"address","name":"tokenInReturn","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"uint256","name":"getId","type":"uint256"},{"internalType":"uint256","name":"setId","type":"uint256"}],"name":"liquidate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"uint256","name":"getId","type":"uint256"},{"internalType":"uint256","name":"setId","type":"uint256"}],"name":"payback","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"borrower","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"uint256","name":"getId","type":"uint256"},{"internalType":"uint256","name":"setId","type":"uint256"}],"name":"paybackBehalf","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"uint256","name":"getId","type":"uint256"},{"internalType":"uint256","name":"setId","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"cTokenAmt","type":"uint256"},{"internalType":"uint256","name":"getId","type":"uint256"},{"internalType":"uint256","name":"setId","type":"uint256"}],"name":"withdrawCToken","outputs":[],"stateMutability":"payable","type":"function"}]')}])}));