# Light Decentralized Twitter
### Authors ✍️
- Sergio Morales (https://github.com/sergioKmoralesV)
- Isaac Gonzales (https://github.com/Isaacgv)
- Anthony Siampiringue (https://github.com/Anthony-Si)

## Getting started 🏁
### Install dependencies
To start the application make sure you are using the version `> 16` of `node.
To install all the dependencies, please run the command:
```
npm install
```
### Verify my Twitter contract config
Please, verify that your **Smart Contract Address** is well configured in `./src/config.js`.
If the information is incorrect, you won't be able to effectuate any operations.

### Running the application
To run the application, run the command:
```
npm start
```
## Using Smart Contracts 📑
### Create a MetaMask wallet.
For our testing purposes, we are using the plugin of **MetaMask** that you can find here: https://metamask.io/
Make sure that you create your account in `ETH`, since our contracts are running on Ethereum.
### Connect to the network
To connect to the network where your SmartContract is running, please follow the instructions in this page: https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC

Here we show you our configuration for our testing Blockchain: </br>
![example of readme](./public/readme/configuration-network.png)

The fields should be filled as follows:
- **Network name:** As you prefer to call the network
- **New RPC URL:** This link corresponds to your Alchemy App link
- **Chain ID:** This corresponds to your main network used (in this case we use 4 for Rinkeby but it has announced that will be deprecated soon)
- **Currency Symbol:** In any case, we use ETH

🚨 **IMPORTANT INFORMATION:** DON'T FORGET THAT YOUR NETWORK SHOULD BE THE SAME USED TO DEPLOY YOUR CONTRACT 🚨
### Important remarks 👀
- You can only edit 📝 and delete 🗑 **your own** contracts
- We are using a web application (the application is not adapted for mobile users)
- We are not saving users' information 👍 (only wallets addresses) for the purpose of tracking which posts are you able to edit/delete or not.
- There is **no real time ⏰ update** if you do a tweet from other browser, laptop. Therefore, if you want to see the new changes from these options, please **refresh** the window.
- ⚠️ Don't forget to use **test nets**. We don't make responsible for the usage of this application with no-test nets ETH wallets.