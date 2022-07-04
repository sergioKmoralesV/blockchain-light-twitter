# Light Decentralized Twitter - Server side
This section is dedicated to the server side. The server contains the contracts (in .sol extension) that will be deployed in Alchemy as API accessible in the given Ethereum test network (eg Rinkeby).  
In the following sections, you'll find the needed actions to make the API running and tests the functionalities.

## Installing the dependencies 
```shell
npm install
```


## Etherscan verification
To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Rinkeby.
In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. 
Enter your Etherscan API key, your Rinkeby node URL (from Alchemy), and the private key of the account which will send the deployment transaction. 
With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network rinkeby scripts/deploy.js
```

## Deploying the contract
```shell
node scripts/deploy.js
npx hardhat run scripts/deploy.js --network rinkeby
```


## Unit testing
We can then run the unit tests with the following command line in order to check the line coverage.
```shell
npx hardhat test
npx hardhat coverage
```