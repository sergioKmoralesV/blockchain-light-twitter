// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Twitter {

    event CreateTweet(address recipient, uint tweetId);
    event DeleteTweet(uint tweetId, bool isDeleted);

    struct Tweet {
        uint id;
        address userName;
        string tweetText;
        bool isDeleted;
    }
    mapping(uint256 => address) tweetToOwner;
    mapping(address => uint256) ownerTweetCount;


    Tweet[] private tweets;

    /**
     * @dev Method to be called by our frontend when trying to add a new Tweet
     * @param _tweetText The text of the tweet
     * @param _isDeleted Whether the tweet is deleted or not
     */
    function createTweet(string memory _tweetText, bool _isDeleted) external {
        uint tweetId = tweets.length -1;
        tweets.push(
            Tweet(tweetId, msg.sender, _tweetText, _isDeleted)
            );
        tweetToOwner[tweetId] = msg.sender;
        ownerTweetCount[msg.sender]++;
        emit CreateTweet(msg.sender, tweetId);
    }

    function deleteTweet(uint _tweetId) external {
        require(tweetToOwner[_tweetId] == msg.sender, "You are not the owner");
        tweets[_tweetId].isDeleted = true;
        emit DeleteTweet(_tweetId, true);
    }
   
 
}