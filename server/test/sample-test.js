
const {expect} = require("chai");
const {ethers} = require("hardhat");
const {address} = require('hardhat/internal/core/config/config-validation')

describe("EPITwitter Contract : unit tests",  function() {
  let EPITwitter;
  let twitter;
  let owner;

  beforeEach(async function() {
    EPITwitter = await ethers.getContractFactory("Twitter");
    [owner, addr1, addr2] = await ethers.getSigners();
    twitter = await EPITwitter.deploy();
    await twitter.deployed()
  });

  describe("UT 1: Create tweet", function() {
    it("should emit createTweet event", async function() {
      let tweet = {
        'tweetText': 'Unit test New Tweet',
        'isDeleted': false
      };
      const TWEET_ID = await twitter.readTweets();
      console.debug(TWEET_ID)
      await expect(await twitter.createTweet(tweet.tweetText, tweet.isDeleted)).to.emit(twitter, 'CreateTweet').withArgs(owner.address,TWEET_ID+1);
    })
  });

  describe("UT 2: Get all Tweets", function() {
    it("should return the correct number of total tweets", async function() {
      const tweetsFromChain = await twitter.readTweets();
      expect(tweetsFromChain.length).to.greaterThanOrEqual(0);
    })
  })

  describe("UT 3: Update tweet", function() {
    it("should emit updateTweet event", async function() {
      let tweet = {
        'tweetText': 'New Tweet',
        'isDeleted': false
      };
      const TWEET_ID = twitter.readTweets();
      await expect(await twitter.updateTweet(TWEET_ID,tweet.tweetText)).to.emit(twitter, 'UpdateTweet').withArgs(TWEET_ID,tweetText);
    })
  });


  describe("UT 4: Delete Tweet", function() {
    it("should emit delete tweet event", async function() {
      let tweet = {
        'tweetText': 'New Tweet for Delete unit test',
        'isDeleted': false
      };
      twitter.createTweet(tweet.tweetText, tweet.isDeleted)
      const TWEET_ID = twitter.readTweets();
      const TWEET_DELETED = true;
      await expect(twitter.connect(addr1).deleteTweet(TWEET_ID)).to.emit(twitter, 'DeleteTweet').withArgs(TWEET_ID, TWEET_DELETED);
    })
  })
});