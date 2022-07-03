const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Contract : readTweets() unit tests", function () {
//   it("Should return an array containing the non deleted tweets", async function () {
//     const EPITwitter = await ethers.getContractFactory("Twitter");
//     const twitter = await EPITwitter.deploy();
//     await twitter.deployed();
//
//     expect(await twitter.readTweets()).to.instanceOf(Array);
//   });
//
//   it("Should return the size of the array of non deleted tweets", async function () {
//     const EPITwitter = await ethers.getContractFactory("Twitter");
//     const twitter = await EPITwitter.deploy();
//     await twitter.deployed();
//     expect(await twitter.readTweets().length).to.gte(0);
//   });
// });
//
//
// describe("Contract : createTweet(string memory _tweetText, bool _isDeleted) unit tests", function () {
//   it("Tweet creation : Should return the user account name and the tweeterId", async function () {
//     const EPITwitter = await ethers.getContractFactory("Twitter");
//     const accounts = await ethers.getSigners();
//     const twitter = await EPITwitter.deploy();
//     await twitter.deployed();
//
//     expect(await twitter.createTweet("adding tweet unit case", false)).to.emit(accounts[0],twitter.tweetId);
//   });
//
// });
//
//
// describe("Contract : deleteTweet(uint _tweetId) unit tests", function () {
//   it("Tweet deletion : Should return tweetId and true boolean value", async function () {
//     const EPITwitter = await ethers.getContractFactory("Twitter");
//     const twitter = await EPITwitter.deploy();
//     await twitter.deployed();
//
//     expect(await twitter.deleteTweet(1)).to.emit(twitter.tweetId,true);
//   });
//
// });

describe("Contract : sequence unit tests", function () {
  it("Tweet creation : Should return the user account name and the tweeterId", async function () {
    const EPITwitter = await ethers.getContractFactory("Twitter");
    const accounts = await ethers.getSigners();
    const twitter = await EPITwitter.deploy();
    await twitter.deployed();

    expect(await twitter.createTweet("adding tweet unit case", false)).to.emit(accounts[0], twitter.tweetId);
  });

  it("Tweet listing : Should return an array containing the non deleted tweets", async function () {
    const EPITwitter = await ethers.getContractFactory("Twitter");
    const twitter = await EPITwitter.deploy();
    await twitter.deployed();

    expect(await twitter.readTweets()).to.instanceOf(Array);
  });

  it("Tweet listing : Should return the size of the array of non deleted tweets", async function () {
    const EPITwitter = await ethers.getContractFactory("Twitter");
    const twitter = await EPITwitter.deploy();
    await twitter.deployed();
    expect(await twitter.readTweets().length).to.not.equal(0);
  });

  it("Tweet deletion : Should return tweetId and true boolean value", async function () {
    const EPITwitter = await ethers.getContractFactory("Twitter");
    const twitter = await EPITwitter.deploy();
    const accounts = await ethers.getSigners();
    await twitter.deployed();
    twitter.signer = accounts[0];
    expect(await twitter.deleteTweet(0)).to.emit(twitter.tweetId, true);
  });
});
