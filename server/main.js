import { Meteor } from 'meteor/meteor';

cheerio = Meteor.npmRequire('cheerio');

Meteor.startup(() => {

});

Meteor.publish('newsSearch', function(){
  var self = this;
  try{

    var response = HTTP.get('http://www.hltv.org/news.rss.php');
    var $ = cheerio.load(response.content, {xmlMode: true});
    var items = $('item');
    var newsItems = [];
    items.each(function(i){
      var item = {};
      item.title = $(this).find('title').text().trim();
      item.href = $(this).find('link').text().trim();

      var thisDate = new Date($(this).children().last().text().trim());
      item.date = thisDate;
      self.added('news', i, item);
    });

    self.ready();

  }catch(e){
    console.log(e);
  }
});

Meteor.publish('upcomingSearch', function(){
  var self = this;
  try{
    var response = HTTP.get("http://www.hltv.org/hltv.rss.php");
    var $ = cheerio.load(response.content, {xmlMode: true});

    var items = $('item');
    var newsItems = [];
    items.each(function(i){
      var item = {};
      item.title = $(this).find('title').text().trim();
      item.href = $(this).find('link').text().trim();

      var thisDate = new Date($(this).children().last().text().trim());
      item.date = thisDate;
      self.added('upcoming', i, item);
    });

    self.ready();
  }catch(e){
    console.log(e);
  }
});

Meteor.publish('resultSearch', function(){
  var self = this;
  try {
    var response = HTTP.get('http://www.hltv.org/results/');
    var $ = cheerio.load(response.content);
    var team1 = [];
    var team2 = [];
    var times = [];
    var scores = [];
    var links = [];
    $('div.matchTeam1Cell').each(function(){
      team1.push($(this).text().trim().replace(/\s+/, ' '));
    });

    $('div.matchTeam2Cell').each(function(){
      team2.push($(this).text().trim().replace(/\s+/, ' '));
    });

    $('div.matchTimeCell').each(function(){
      times.push($(this).text().trim().replace(/\s+/, ' '));
    });

    $('div.matchScoreCell').each(function(){
      scores.push($(this).text().trim().replace(/\s+/, ' '));
    });

    $('div.matchActionCell').each(function(){
      links.push('http://www.hltv.org' + $(this).children().first().attr('href'));
    });

    for(var i = 0; i < team1.length; i++){
      var item = {};
      item.team1 = team1[i];
      item.team2 = team2[i];
      item.time = times[i];
      var high,
          low;
      var scoreArr = scores[i].split('-');
      if(parseInt(scoreArr[0].trim()) > parseInt(scoreArr[1].trim())){
        high = parseInt(scoreArr[0].trim());
        low = parseInt(scoreArr[1].trim());
        item.winner = team1[i];
        item.loser = team2[i];
      }else{
        high = parseInt(scoreArr[1].trim());
        low = parseInt(scoreArr[0].trim());
        item.winner = team2[i];
        item.loser = team1[i];
      }
      item.high = high;
      item.low = low;
      item.href = links[i];

      self.added('scores', i, item);
    }


      self.ready();
  }catch(e) {

  }
});
