// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Twitter {

    event CreateTweet(address recipient, uint tweetId);
    event DeleteTweet(uint tweetId, bool isDeleted);
    event UpdateTweet(uint tweetId, string tweetText);

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


    /**
    * @dev Method to delete a tweet
    * @param _tweetId The id of the tweet to be deleted
     */
    function deleteTweet(uint _tweetId) external {
        require(tweetToOwner[_tweetId] == msg.sender, "You are not the owner");
        tweets[_tweetId].isDeleted = true;
        emit DeleteTweet(_tweetId, true);
    }
   
    /**
    * @dev Method to update a tweet
    * @param _tweetId The id of the tweet to be updated
    * @param _tweetText The new text of the tweet
     */
    function updateTweet(uint _tweetId, string memory _tweetText) external {
        require(tweetToOwner[_tweetId] == msg.sender, "You are not the owner");
        tweets[_tweetId].tweetText = _tweetText;
        emit UpdateTweet(_tweetId, _tweetText);
    }

    /**
    * @dev Method to get all the Tweets
    * @return The array of Tweets
    */
    function readTweets() external view returns (Tweet[] memory) {
        Tweet[] memory temporary = new Tweet[](tweets.length);
        uint counter = 0;
        for(uint i=0; i<tweets.length; i++) {
            if(tweets[i].isDeleted == false) {
                temporary[counter] = tweets[i];
                counter++;
            }
        }

        Tweet[] memory result = new Tweet[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }

 
}