const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Contract : readTweets() unit tests", function () {
  it("Should return an array containing the non deleted tweets", async function () {
    const EPITwitter = await ethers.getContractFactory("Twitter");
    const twitter = await EPITwitter.deploy();
    await twitter.deployed();

    expect(await twitter.readTweets()).to.instanceOf(Array);
  });

  it("Should return the size of the array of non deleted tweets", async function () {
    const EPITwitter = await ethers.getContractFactory("Twitter");
    const twitter = await EPITwitter.deploy();
    await twitter.deployed();
    expect(await twitter.readTweets().length).to.not.equal(0);
  });
});


describe("Contract : createTweet(string memory _tweetText, bool _isDeleted) unit tests", function () {
  it("Should return an array containing the non deleted tweets", async function () {
    const EPITwitter = await ethers.getContractFactory("Twitter");
    const accounts = await ethers.getSigners();
    const twitter = await EPITwitter.deploy();
    await twitter.deployed();

    expect(await twitter.createTweet("adding tweet unit case", false)).to.emit(accounts[0],twitter.tweetId);
  });

});
