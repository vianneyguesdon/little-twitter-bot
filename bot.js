const moment = require('moment');

const Twit = require('twit');

var T = new Twit({
  consumer_key:         'TldWCR5ur4YjhGf1QzDu4AsjF',
  consumer_secret:      'gIMuYlcMnqCI4VKm3c5ntBvtkjIfNpihlV8NrmytB5SuDubhRy',
  access_token:         '1116719266936627201-6k9gC7LA9XGbMqkiBuMlSxlgWoG9Ir',
  access_token_secret:  'wQUeG3XvUN0t9OVL2g0tXOuY0cbZ7KDlfM3YlaGsM9JkW',
  // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  // strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

// Trouver la date du jour -1
const date = moment().subtract(1, 'days').format("YYYY-MM-DD");
console.log("date -1", date)

// On set l'interval de recherche à 1 par jour
setInterval(search, 1000*60*15)

// const tweets = []
// console.log ('tweets', tweets)

// Search on Twitter
function search() {

  topAccounts = [
    '@TuurDemeester', 
    '@CryptoHustle', 
    '@alistairmilne',
    '@CryptoCobain',
    '@aantonop',
    '@AngeloBTC',
    '@WhalePanda',
    '#bitcoin',
    'bitcoin',
    'crypto',

  ]
  const randomFromTopAccounts = topAccounts[Math.floor(Math.random()*topAccounts.length)]
  console.log("randomFromTopAccounts : ", randomFromTopAccounts)

  const params = { 
    q: randomFromTopAccounts, 
    count: 1,
    result_type: "mixed",
    until: date,
    tweet_mode: "extended",
  }
  T.get('search/tweets', params, function(err, data, response) {
    var tweets = data.statuses

    if (tweets[0] === undefined) {
      console.log("object is undefined")
      return 
    }

    console.log("full object", tweets[0]);
    console.log("full_text :", tweets[0].full_text)
    console.log("retweet_count :", tweets[0].retweet_count)

    // for (var i = 0; i < tweets.length; i++) {
    //   console.log("text: ", tweets[i].text)
    //   tweets.push(tweets[i])
    // }

    console.log("number of retweets", tweets[0].retweet_count)
    console.log("trucated ?", tweets[0].trucated)
    
      if (tweets[0].retweet_count > 50 && tweets[0].trucated === undefined ) {
        console.log("more that 100 rewteets + Not truncated !")
        tweetNow(tweets[0].full_text)
      } else {
        console.log("not enough retweets, or content trucated")
      }
  })
}

// console.log ('tweets', tweets)

// if data.statuses[i].entities.user_mentions

// // Setting up a user stream
// var stream = T.stream('user');

// // Anytime someon follows me
// stream.on('follow', followed);

// function followed(eventMsg) {
//   console.log('follow event')
//   var name = eventMsg.source.name;
//   var screenName = eventMsg.source.screen_name;
//   tweetNow('@' + screenName + 'do you like rainbows ?')
// }


// Post on Twitter
function tweetNow(txt) {
  var tweet = { 
    status: txt
  }
  T.post('statuses/update', tweet, function(err, data, response) {
    if (err !== null) {
      console.log("something went wrong!", err)
    }
    console.log("data",data)
    console.log("I just tweeted")
  })
}