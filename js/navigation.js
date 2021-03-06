var imgpath = adminURL + "upload/readFile";
var uploadURL = adminURL + "upload";
// if (isproduction) {
//   adminURL = "http://www.wohlig.co.in/demo/index.php/";
// } else {
//   adminURL = "http://localhost/demo/index.php/";
// }

var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http, $state) {
    var navigation = [{
        name: "Matches",
        classis: "active",
        anchor: "matches",
        isadmin: true,
        isoperator: true
    }, {
        name: "Team",
        classis: "active",
        anchor: "team",
        isadmin: true,
        isoperator: true
    }, {
        name: "User",
        classis: "active",
        anchor: "user",
        isadmin: true,
        isoperator: false
    }, {
        name: "Notification",
        classis: "active",
        anchor: "notification",
        isadmin: true,
        isoperator: false
    }];

    function isAdmin(callback1, callback2) {
        var accessLevel = $.jStorage.get("userAccess");
        if (accessLevel == "admin") {
            if (callback1) {
                callback1();
            }
        } else if (accessLevel == "operator") {
            if (callback2) {
                callback2();
            }

        }
        return accessLevel == "admin";
    }

    return {
        getnav: function() {
            var newNav;
            if (isAdmin()) {
                newNav = _.filter(navigation, "isadmin");
            } else {
                newNav = _.filter(navigation, "isoperator");
            }
            return newNav;
        },
        getAccessLevel: isAdmin,
        nonAdminLeave: function() {
            if (!isAdmin()) {
                $state.go("login");
            }
        },
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },

        getAllTeam: function(callback) {
            $http({
                url: adminURL + 'team/find',
                method: 'POST',
                data: {}
            }).success(callback);
        },

        teamCreateSubmit: function(formData, callback) {
            console.log('form data: ', formData);
            $http({
                url: adminURL + 'team/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                }
            }).success(callback);
        },
        //
        // insertData: function(notificationArr, callback) {
        //   $http({
        //     url: adminURL + 'notificationtext/insertData',
        //     method: 'POST',
        //     withCredentials: true,
        //     data: notificationArr
        //   }).sucess(callback);
        // },

        deleteTeamData: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminURL + 'team/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        getOneTeam: function(id, callback) {
            $http({
                url: adminURL + 'team/findone',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        editTeamSubmit: function(formData, callback) {
            console.log(formData);
            $http({
                url: adminURL + 'team/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "name": formData.name
                }
            }).success(callback);
        },

        getAllNotification: function(callback) {
            $http({
                url: adminURL + 'notificationtext/findLimited',
                method: 'POST',
                data: {
                    "search": "",
                    "pagesize": 5000,
                    "pagenumber": 1,
                }
            }).success(callback);
        },

        notificationCreateSubmit: function(formData, callback) {
            console.log('form data: ', formData);
            $http({
                url: adminURL + 'notificationtext/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "title": formData.title,
                }
            }).success(callback);
        },

        insertData: function(notificationArr, callback) {
            $http({
                url: adminURL + 'notificationtext/insertData',
                method: 'POST',
                withCredentials: true,
                data: notificationArr
            }).sucess(callback);
        },

        deleteNotificationData: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminURL + 'notificationtext/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        getOneNotification: function(id, callback) {
            $http({
                url: adminURL + 'notificationtext/findone',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        editNotificationSubmit: function(formData, callback) {
            console.log(formData);
            $http({
                url: adminURL + 'notificationtext/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "title": formData.title
                }
            }).success(callback);
        },


        getAllAdminUsers: function(callback) {
            $http({
                url: adminURL + 'adminuser/findLimited',
                method: 'POST',
                data: {
                    "search": "",
                    "pagesize": 500,
                    "pagenumber": 1,
                }
            }).success(callback);
        },

        deleteAdminUsersData: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminURL + 'adminuser/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        adminuserCreateSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminURL + 'adminuser/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "email": formData.email,
                    "password": formData.password,
                    "status": formData.status,
                    "accesslevel": formData.accesslevel,
                }
            }).success(callback);
        },

        getOneAdminUser: function(id, callback) {
            $http({
                url: adminURL + 'adminuser/findone',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        editAdminUserSubmit: function(formData, callback) {
            console.log(formData);
            $http({
                url: adminURL + 'adminuser/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "email": formData.email,
                    "password": formData.password,
                    "status": formData.status,
                    "accesslevel": formData.accesslevel,
                }
            }).success(callback);
        },

        getAllUsers: function(callback) {
            $http({
                url: adminURL + 'user/findLimited',
                method: 'POST',
                data: {
                    "search": "",
                    "pagesize": 5000,
                    "pagenumber": 1,
                }
            }).success(callback);
        },

        deleteUsersData: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminURL + 'user/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        userCreateSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminURL + 'user/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "mobile": formData.mobile,
                    "password": formData.password,
                    "status": formData.status,
                    "expiry": formData.expiry,
                }
            }).success(callback);
        },
        getOneUser: function(id, callback) {
            $http({
                url: adminURL + 'user/findone',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        editUserSubmit: function(formData, callback) {
            console.log(formData);
            $http({
                url: adminURL + 'user/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "name": formData.name,
                    "mobile": formData.mobile,
                    "password": formData.password,
                    "expiry": formData.expiry,
                }
            }).success(callback);
        },
        getAllMatches: function(callback) {
            $http({
                url: adminURL + 'match/findLimitedForBackend',
                method: 'POST',
                data: {
                    "search": "",
                    "pagesize": 500,
                    "pagenumber": 1,
                }
            }).success(callback);
        },

        deleteMatchesData: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminURL + 'match/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        matchesCreateSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminURL + 'match/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "cupName": formData.cupName,
                    "status": formData.status,
                    "team1": formData.team1,
                    "team2": formData.team2,
                    "firstBat": formData.batFirst,
                    "overs": formData.overs,
                    "newOvers": formData.overs,
                    "startTime": formData.startTime,
                }
            }).success(callback);
        },
        getOneMatch: function(form, callback) {
            console.log(form);
            io.socket.get(adminURL + "match/findOneForBackend", form, function(resData) {
                callback(resData);
            });
            // $http({
            //   url: adminURL + 'match/findOneForBackend',
            //   method: 'POST',
            //   withCredentials: true,
            //   data: {
            //     "_id": id
            //   }
            // }).success(callback);
        },

        editMatchSubmit: function(formData, callback) {
            console.log(formData);
            $http({
                url: adminURL + 'match/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "cupName": formData.cupName,
                    "status": formData.status,
                    "team1": formData.team1,
                    "team2": formData.team2,
                    "firstBat": formData.batFirst,
                    "overs": formData.overs,
                    "newOvers": formData.overs,
                    "startTime": formData.startTime,
                }
            }).success(callback);
        },
        editMatchTeamSubmit: function(formData, callback) {
            console.log(formData);
            $http({
                url: adminURL + 'match/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "team1Wicket": formData.team1Wicket,
                    "team1score": formData.team1score,
                    "team1Overs": formData.team1Overs,
                    "team2Wicket": formData.team2Wicket,
                    "team2score": formData.team2score,
                    "team2Overs": formData.team2Overs,
                    "newOvers": formData.newOvers,
                    "comment": formData.comment,
                    "status": formData.status,
                    "rate1": formData.rate1,
                    "rate2": formData.rate2,
                }
            }).success(callback);
        },
        // editMatchTeam2Submit: function(formData, callback) {
        //   console.log(formData);
        //   $http({
        //     url: adminURL + 'match/save',
        //     method: 'POST',
        //     withCredentials: true,
        //     data: {
        //       "_id": formData._id,
        //       "team2Wicket": formData.team2Wicket,
        //       "team2score": formData.team2score,
        //       "team2Overs": formData.team2Overs,
        //       "comment": formData.comment,
        //       "status": formData.status,
        //     }
        //   }).success(callback);
        // },
        getOneSession: function(id, callback) {
            $http({
                url: adminURL + 'session/findOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
    };
});
