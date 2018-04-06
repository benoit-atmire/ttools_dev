var W2P_ICON = 'https://benoit-atmire.github.io/ttools/img/w2p.png';
var GIT_ICON = 'https://benoit-atmire.github.io/ttools/img/gitlab.png';
var CLOCK_ICON = 'https://benoit-atmire.github.io/ttools/img/clock.png';
var HOURGLASS_ICON = 'https://benoit-atmire.github.io/ttools/img/hourglass.png';
var CLOCK_ICON_WHITE = 'https://benoit-atmire.github.io/ttools/img/clock_white.png';
var HOURGLASS_ICON_WHITE = 'https://benoit-atmire.github.io/ttools/img/hourglass_white.png';

var Promise = TrelloPowerUp.Promise;

TrelloPowerUp.initialize({
  'card-buttons': function(t, options){
    return [{
      icon: W2P_ICON,
      text: 'Add W2P link',
      callback: function(t){
              return t.popup({
                title: "W2P Link",
                url: 'views/w2p.html'
              });
            }
    },
    {
          icon: GIT_ICON,
          text: 'Add Git link',
          callback: function(t){
                  return t.popup({
                    title: "Git Link",
                    url: 'views/gitlab.html'
                  });
                }
        }];
  },
  'card-badges': function(t, options) {
    return getAllBadges(t);
  },
  'card-detail-badges': function(t, options) {
    return getAllBadges(t);
  }
});

/*
function getW2PBadge(t){
    return t.get('card', 'shared', 'w2plink')
                .then(function (value){

                    if (value && value != "") {

                        return {
                            icon: W2P_ICON,
                            text: 'W2P',
                            url: value,
                            title: 'Task / Project'
                        };
                    }

                    else return null;
                })
    ;
}

function getGitBadge(t){
    return t.get('card', 'shared', 'gitlablink')
                .then(function (value){

                    if (value && value != "") {

                        return {
                            icon: GIT_ICON,
                            text: 'Git',
                            url: value,
                            title: 'Branch / Commit'
                        };
                    }

                    else return null;
                })
    ;
}

function getTimeBadge(t) {
     return t.card('all')
        .then(function (card){
            var today = new Date();
            var creation = new Date(1000*parseInt(card.id.substring(0,8),16));
            var daysSinceCreation = Math.round(Math.abs((today.getTime() - creation.getTime())/(24*60*60*1000)));

            return {
                icon: CLOCK_ICON,
                text: daysSinceCreation + " day(s)",
                color: daysSinceCreation < 4 ? null : 'red',
                title: 'Open for (days)'
            };

        })

}

function getInactiveBadge(t){
     return t.card('all')
        .then(function (card){
            var today = new Date();
            var lastUpdate = new Date(card.dateLastActivity);
            var daysSinceUpdate = Math.round(Math.abs((today.getTime() - lastUpdate.getTime())/(24*60*60*1000)));

            return {
                icon: HOURGLASS_ICON,
                text: daysSinceUpdate + " day(s)",
                title: 'Inactive since (days)'
            };

        })
}

*/
function getAllBadges(t) {
    /*var badges = [];

    if (getW2PBadge(t)) badges.push(getW2PBadge(t));
    console.log(badges);
    if (getGitBadge(t)) badges.push(getGitBadge(t));
    console.log(badges);
    badges.push(getTimeBadge(t));
    console.log(badges);
    badges.push(getInactiveBadge(t));
    console.log(badges);

    return badges;
*/
   return Promise.all([t.card('all'), t.getAll()])
        .then(function (values) {
            console.log(values);
            var card = values[0];
            var data = values[1];
            console.log(JSON.stringify(card));
            console.log(JSON.stringify(data));
            var today = new Date();
            var creation = new Date(1000*parseInt(card.id.substring(0,8),16));
            var lastUpdate = new Date(card.dateLastActivity);
            var daysSinceCreation = Math.round(Math.abs((today.getTime() - creation.getTime())/(24*60*60*1000)));
            var daysSinceUpdate = Math.round(Math.abs((today.getTime() - lastUpdate.getTime())/(24*60*60*1000)));

            var w2plink = data.card.shared.w2plink;
            var gitlablink = data.card.shared.gitlablink;

            var badges = [{
                  icon: daysSinceCreation < 15 ? CLOCK_ICON : CLOCK_ICON_WHITE,
                  text: daysSinceCreation + " day" + (daysSinceCreation < 15 ? "" : "s"),
                  color: daysSinceCreation < 15 ? null : 'red',
                  title: 'Open for'
                },
                {
                  icon: daysSinceUpdate < 7 ? HOURGLASS_ICON : HOURGLASS_ICON_WHITE,
                  text: daysSinceUpdate + " day" + (daysSinceUpdate < 7 ? "" : "s"),
                  color: daysSinceUpdate < 7 ? null : 'red',
                  title: 'Inactive for'
                }
            ];

            if (w2plink && w2plink != "") {
                badges.push({
                    icon: W2P_ICON,
                    text: 'W2P',
                    url: w2plink,
                    title: 'Task / Project'
                });
            }

            if (gitlablink && gitlablink != "") {
                badges.push({
                    icon: GIT_ICON,
                    text: 'Git',
                    url: gitlablink,
                    title: 'Branch / Commit'
                });
            }
            console.log(badges);
            return badges;

        })


   /*return t.card('all')
           .then(function (card) {
             var today = new Date();
             var creation = new Date(1000*parseInt(card.id.substring(0,8),16));
             var lastUpdate = new Date(card.dateLastActivity);
             var daysSinceCreation = Math.round(Math.abs((today.getTime() - creation.getTime())/(24*60*60*1000)));
             var daysSinceUpdate = Math.round(Math.abs((today.getTime() - lastUpdate.getTime())/(24*60*60*1000)));

             var badges = [{
                      icon: daysSinceCreation < 15 ? CLOCK_ICON : CLOCK_ICON_WHITE,
                      text: daysSinceCreation + " day" + (daysSinceCreation < 15 ? "" : "s"),
                      color: daysSinceCreation < 15 ? null : 'red',
                      title: 'Open for'
                    },
                    {
                      icon: daysSinceUpdate < 7 ? HOURGLASS_ICON : HOURGLASS_ICON_WHITE,
                      text: daysSinceUpdate + " day" + (daysSinceUpdate < 7 ? "" : "s"),
                      color: daysSinceUpdate < 7 ? null : 'red',
                      title: 'Inactive for'
                    }
             ];

             /*badges.push(t.get('card', 'shared', 'w2plink')
                .then(function (value){

                    if (value && value != "") {

                        return {
                            icon: W2P_ICON,
                            text: 'W2P',
                            url: value,
                            title: 'Task / Project'
                        };
                    }

                    else return null;
                })
             );

              badges.push(t.get('card', 'shared', 'gitlablink')
                 .then(function (value){

                     if (value && value != "") {

                         return {
                             icon: GIT_ICON,
                             text: 'Git',
                             url: value,
                             title: 'Branch / Commit'
                         };
                     }

                     else return null;
                 })
              );*/


             //return badges;
           //});
}