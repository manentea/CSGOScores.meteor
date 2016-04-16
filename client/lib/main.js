import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';

import './main.html';

News = new Mongo.Collection('news');
Upcoming = new Mongo.Collection('upcoming');
Scores = new Mongo.Collection('scores');

Template.news.onCreated(function newsOnCreated() {
  var newsHandle = Meteor.subscribe('newsSearch');

});

Template.news.helpers({
  news: function(){
    return News.find();
  }
});

Template.news.events({
  'click a'(event, instance) {

  }
});

Template.scores.onCreated(function scoresOnCreated() {
  var newsHandle = Meteor.subscribe('resultSearch');
});

Template.scores.helpers({
  scores: function(){
    return Scores.find();
  }
});

Template.scores.events({

});

Template.upcoming.onCreated(function upcomingOnCreated() {
  var upcomingHandle = Meteor.subscribe('upcomingSearch');
});

Template.upcoming.helpers({
  upcoming: function() {
    return Upcoming.find();
  }
});

Template.upcoming.events({

});

Template.tabs.onCreated(function tabsOnCreated() {

});

Template.tabs.helpers({
  tabs:[
    { id: 'news' , src: "/images/news.png"},
    { id: 'calendar', src: "/images/calendar.png"},
    { id: 'crown', src: "/images/crown.png"},
  ]
});

Template.tabs.events({
  'click #news'(event, instance) {
    event.preventDefault();
    $("#upcoming").toggle(false);
    $("#matches").toggle(false);
    $("#newsList").toggle(true);
  },
  'click #calendar'(event, instance) {
    $("#upcoming").toggle(true);
    $("#matches").toggle(false);
    $("#newsList").toggle(false);
  },
  'click #crown'(event, instance) {
    $("#upcoming").toggle(false);
    $("#matches").toggle(true);
    $("#newsList").toggle(false);
  },
});