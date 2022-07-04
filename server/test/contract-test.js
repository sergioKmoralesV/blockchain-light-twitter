
const {expect} = require("chai");
const {ethers} = require("hardhat");
const {address} = require('hardhat/internal/core/config/config-validation')



describe("UT 0: Contract instance check unit test", function() {
  it("should return the contract's signer", async function() {
    const EPITwitter = await ethers.getContractFactory("Twitter");
    const [owner, addr1, addr2] = await ethers.getSigners();
    const twitter = await EPITwitter.deploy();
    await twitter.deployed();
    await expect(twitter).to.with[Symbol.hasInstance];
  })
});

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
      const TWEETS_LIST = await twitter.readTweets();
      const TWEET_ID = TWEETS_LIST.length;
      await expect(await twitter.createTweet(tweet.tweetText, tweet.isDeleted)).to.emit(twitter, 'CreateTweet').withArgs(owner.address,TWEET_ID);
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
        'tweetText': 'New Tweet for Update unit test',
        'tweetUpdatedText': 'Updated Tweet',
        'isDeleted': false
      };
      await twitter.createTweet(tweet.tweetText, tweet.isDeleted)
      const TWEETS_LIST = await twitter.readTweets();
      const TWEET_ID = TWEETS_LIST.length-1;
      await expect(await twitter.updateTweet(TWEET_ID,tweet.tweetUpdatedText)).to.emit(twitter, 'UpdateTweet').withArgs(TWEET_ID,tweet.tweetUpdatedText);
    })
  });


  describe("UT 4: Delete Tweet", function() {
    it("should emit delete tweet event", async function() {
      let tweet = {
        'tweetText': 'New Tweet for Delete unit test',
        'isDeleted': false
      };
      await twitter.createTweet(tweet.tweetText, tweet.isDeleted)
      const TWEETS_LIST = await twitter.readTweets();
      const TWEET_ID = TWEETS_LIST.length-1;
      const TWEET_DELETED = true;
      await expect(twitter.deleteTweet(TWEET_ID)).to.emit(twitter, 'DeleteTweet').withArgs(TWEET_ID, TWEET_DELETED);
    })
  })
});