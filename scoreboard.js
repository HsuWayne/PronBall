//好球
let s = 0;
//壞球
let b = 0;
//跑壘者
let runner = [];
//跑壘者壘包
let runnerBase = [];
//回到本壘人數
let runnerToHome = 0;
//出局數
let out = 0;
//打擊結果
let result = "";
//目前投手
let pit = [];
//已換下投手
let pited = [];
//目前打序
let bat = [];
//目前打者
let atBat = [];
//主隊分數
let homePoint = 0;
let homePointList = [];
//客隊分數
let awayPoint = 0;
let awayPointList = [];
//for迴圈變數
let i;
//最後半局On
let lastHalfCheck = 0;
//雙殺打On
let doublePlay = 0;
//高飛犧牲打On
let sacrificeFly = 0;
//目前局數
let inningCount = 1;
//半局計數
let halfInningCount = 1;
//需打半局數
let halfInning;
//名單登錄
let homePit = [];
let awayPit = [];
let homeBatterNum;
let homeBat = [];
let awayBatterNum;
let awayBat = [];
//投手順序
let homePitList = [];
let awayPitList = [];
//打線順序
let homeBatList = [];
let awayBatList = [];
//結束遊戲
let gameEnd = new bootstrap.Modal(document.getElementById('gameEnd'));

//計分板按鍵
//好球
$(".strike_area").click(function () {
    s++;
    pit[0].Pitcher.strike++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    if (s == 1) {
        $("#strike_one").addClass("scoreboard_ballStrikeOn");
    } else if (s == 2) {
        $("#strike_two").addClass("scoreboard_ballStrikeOn");
    } else if (s == 3) {
        pit[0].Pitcher.k++;
        pit[0].Pitcher.o++;
        atBat[0].Batter.so++;
        $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
        result = "so";
        game(result);
    }
});
//界外
$(".foul_area").click(function () {
    pit[0].Pitcher.strike++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    if (s == 0) {
        $("#strike_one").addClass("scoreboard_ballStrikeOn");
        s++;
    } else if (s == 1) {
        $("#strike_two").addClass("scoreboard_ballStrikeOn");
        s++;
    }
});
//壞球
$(".ball_area").click(function () {
    b++;
    pit[0].Pitcher.ball++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    if (b == 1) {
        $("#ball_one").addClass("scoreboard_ballBallOn");
    } else if (b == 2) {
        $("#ball_two").addClass("scoreboard_ballBallOn");
    } else if (b == 3) {
        $("#ball_three").addClass("scoreboard_ballBallOn");
    } else if (b == 4) {
        pit[0].Pitcher.bbPit++;
        atBat[0].Batter.bb++;
        $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
        result = "bb";
        game(result);
    }
});
//安打
$("#single_area").click(function () {
    atBat[0].Batter.single++;
    pit[0].Pitcher.h++;
    pit[0].Pitcher.strike++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    doublePlay = 0;
    $("#doublePlay_btn").removeClass("btn-primary");
    $("#doublePlay_btn").addClass("btn-outline-primary");
    $("#doublePlay_btn").html("雙殺打");
    sacrificeFly = 0;
    $("#sacrificeFly_btn").removeClass("btn-primary");
    $("#sacrificeFly_btn").addClass("btn-outline-primary");
    $("#sacrificeFly_btn").html("高飛犧牲打");
    result = "1";
    game(result);
});
$("#single_btn").click(function () {
    $("#single_area").click();
    $("#hitBtnClose").click();
});
$("#flyArea_single_btn_1").click(function () {
    $("#single_area").click();
    $("#fly_area_close_1").click();
});
$("#flyArea_single_btn_2").click(function () {
    $("#single_area").click();
    $("#fly_area_close_2").click();
});
$("#double_area").click(function () {
    atBat[0].Batter.double++;
    pit[0].Pitcher.h++;
    pit[0].Pitcher.strike++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    doublePlay = 0;
    $("#doublePlay_btn").removeClass("btn-primary");
    $("#doublePlay_btn").addClass("btn-outline-primary");
    $("#doublePlay_btn").html("雙殺打");
    result = "2";
    game(result);
});
$("#double_btn").click(function () {
    $("#double_area").click();
    $("#hitBtnClose").click();
});
$("#triple_area").click(function () {
    atBat[0].Batter.triple++;
    pit[0].Pitcher.h++;
    pit[0].Pitcher.strike++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    doublePlay = 0;
    $("#doublePlay_btn").removeClass("btn-primary");
    $("#doublePlay_btn").addClass("btn-outline-primary");
    $("#doublePlay_btn").html("雙殺打");
    result = "3";
    game(result);
});
$("#triple_btn").click(function () {
    $("#triple_area").click();
    $("#hitBtnClose").click();
});
$("#homerun_area").click(function () {
    atBat[0].Batter.homerun++;
    pit[0].Pitcher.h++;
    pit[0].Pitcher.hr++;
    pit[0].Pitcher.strike++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    doublePlay = 0;
    $("#doublePlay_btn").removeClass("btn-primary");
    $("#doublePlay_btn").addClass("btn-outline-primary");
    $("#doublePlay_btn").html("雙殺打");
    sacrificeFly = 0;
    $("#sacrificeFly_btn").removeClass("btn-primary");
    $("#sacrificeFly_btn").addClass("btn-outline-primary");
    $("#sacrificeFly_btn").html("高飛犧牲打");
    result = "4";
    game(result);
});
$("#homerun_btn").click(function () {
    $("#homerun_area").click();
    $("#hitBtnClose").click();
});
//滾地球
$("#ground_area_1").click(function () {
    pit[0].Pitcher.o++;
    pit[0].Pitcher.strike++;
    pit[0].Pitcher.goPit++;
    atBat[0].Batter.go++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    sacrificeFly = 0;
    $("#sacrificeFly_btn").removeClass("btn-primary");
    $("#sacrificeFly_btn").addClass("btn-outline-primary");
    $("#sacrificeFly_btn").html("高飛犧牲打");
    result = "go";
    game(result);
});
$("#ground_area_2").click(function () {
    pit[0].Pitcher.o++;
    pit[0].Pitcher.strike++;
    pit[0].Pitcher.goPit++;
    atBat[0].Batter.go++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    sacrificeFly = 0;
    $("#sacrificeFly_btn").removeClass("btn-primary");
    $("#sacrificeFly_btn").addClass("btn-outline-primary");
    $("#sacrificeFly_btn").html("高飛犧牲打");
    result = "go";
    game(result);
});
$("#ground_out_btn").click(function () {
    $("#ground_area_1").click();
});
//飛球
let newFlyOutBtn = new bootstrap.Modal(document.getElementById('newFlyOutBtn'));
$("#fly_out_btn").click(function () {
    if ($("#ruleSelect").val() == 2) {
        newFlyOutBtn.show();
    } else {
        if (doublePlay == 1) {
            return $("#single_area").click();
        }
        pit[0].Pitcher.o++;
        pit[0].Pitcher.strike++;
        pit[0].Pitcher.aoPit++;
        atBat[0].Batter.ao++;
        $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
        result = "ao";
        game(result);
    }
});
$(".flyArea_fly_out_btn").click(function () {
    $("#fly_area_close_1").click();
    $("#fly_area_close_2").click();
    $("#newFlyOutBtnClose").click();
    if (doublePlay == 1) {
        return $("#single_area").click();
    }
    pit[0].Pitcher.o++;
    pit[0].Pitcher.strike++;
    pit[0].Pitcher.aoPit++;
    atBat[0].Batter.ao++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    result = "ao";
    game(result);
});
$(".flyArea_power_fly_out_btn_1").click(function () {
    $("#fly_area_close_1").click();
    $("#newFlyOutBtnClose").click();
    if (runnerBase[0] == 3 && out <= 1) {
        runner[0][1].Pitcher.er++;
        if (runner[0][1].name != pit[0].name) {
            pit[0].Pitcher.ira++;
        }
        runner[0][0].Batter.runs++;
        atBat[0].Batter.rbi++;
        atBat[0].Batter.sf++;
        runnerBase.shift();
        runner.shift();
        if (halfInningCount % 2 == 1) {
            awayPoint++;
            awayPointList[inningCount - 1]++;
            $("#away_score").html("客：" + awayPoint);
        } else {
            homePoint++;
            homePointList[inningCount - 1]++;
            $("#home_score").html("主：" + homePoint);
        }
        if (lastHalfCheck == 1) {
            if (homePoint > awayPoint) {
                gameEndAlert();
            }
        }
        for (i = 1; i <= 3; i++) {
            $(`#base_${i}`).html("");
        }
        runnerBase.forEach(function (element, index) {
            $(`#base_${element}`).html(runner[index][0].serialNum);
        });
    }
    pit[0].Pitcher.o++;
    pit[0].Pitcher.strike++;
    pit[0].Pitcher.aoPit++;
    atBat[0].Batter.ao++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    result = "ao";
    game(result);
});
$(".flyArea_power_fly_out_btn_2").click(function () {
    $("#fly_area_close_2").click();
    $("#newFlyOutBtnClose").click();
    if (out <= 1) {
        if (runnerBase[0] == 3) {
            if (runnerBase[1] == 2) {
                runnerBase[1]++;
            }
            runner[0][1].Pitcher.er++;
            if (runner[0][1].name != pit[0].name) {
                pit[0].Pitcher.ira++;
            }
            runner[0][0].Batter.runs++;
            atBat[0].Batter.rbi++;
            atBat[0].Batter.sf++;
            runnerBase.shift();
            runner.shift();
            if (halfInningCount % 2 == 1) {
                awayPoint++;
                awayPointList[inningCount - 1]++;
                $("#away_score").html("客：" + awayPoint);
            } else {
                homePoint++;
                homePointList[inningCount - 1]++;
                $("#home_score").html("主：" + homePoint);
            }
            if (lastHalfCheck == 1) {
                if (homePoint > awayPoint) {
                    gameEndAlert();
                }
            }
        } else if (runnerBase[0] == 2) {
            runnerBase[0]++;
        }
        for (i = 1; i <= 3; i++) {
            $(`#base_${i}`).html("");
        }
        runnerBase.forEach(function (element, index) {
            $(`#base_${element}`).html(runner[index][0].serialNum);
        });
    }
    pit[0].Pitcher.o++;
    pit[0].Pitcher.strike++;
    pit[0].Pitcher.aoPit++;
    atBat[0].Batter.ao++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    result = "ao";
    game(result);
});
//打者
$("#batter_area").click(function () {
    $("#at_bat_info").html(`<tr><th scope="row">${atBat[0].serialNum}</th><td>${atBat[0].name}</td><td>${atBat[0].Batter.ab()}</td><td>${atBat[0].Batter.runs}</td><td>${atBat[0].Batter.h()}</td><td>${atBat[0].Batter.homerun}</td><td>${atBat[0].Batter.rbi}</td><td>${atBat[0].Batter.bb}</td><td>${atBat[0].Batter.so}</td></tr>`);
    if (runnerBase[0] == 3 && out <= 1) {
        $("#sacrificeFly_btn").removeClass("disabled");
    } else {
        $("#sacrificeFly_btn").addClass("disabled");
    }
});
//投手
$("#pitcher_area").click(function () {
    $("#at_pit_info").html(`<tr><th scope="row">${pit[0].serialNum}</th><td>${pit[0].name}</td><td>${pit[0].Pitcher.ip()}</td><td>${pit[0].Pitcher.h}</td><td>${pit[0].Pitcher.hr}</td><td>${pit[0].Pitcher.er}</td><td>${pit[0].Pitcher.bbPit}</td><td>${pit[0].Pitcher.k}</td><td>${pit[0].Pitcher.pitchNum()}(${pit[0].Pitcher.strike}:${pit[0].Pitcher.ball})</td></tr>`);
    if (runner.length > 0 && out <= 1) {
        $("#doublePlay_btn").removeClass("disabled");
    } else {
        $("#doublePlay_btn").addClass("disabled");
    }
});
//開啟雙殺打
$("#doublePlay_btn").click(function () {
    if (doublePlay == 0) {
        doublePlay = 1;
        $("#doublePlay_btn").removeClass("btn-outline-primary");
        $("#doublePlay_btn").addClass("btn-primary");
        $("#doublePlay_btn").html("雙殺打 已開啟");
    } else {
        doublePlay = 0;
        $("#doublePlay_btn").removeClass("btn-primary");
        $("#doublePlay_btn").addClass("btn-outline-primary");
        $("#doublePlay_btn").html("雙殺打");
    }
    $("#pitcherInfoClose").click();
});
//開啟高飛犧牲打
$("#sacrificeFly_btn").click(function () {
    if (sacrificeFly == 0) {
        sacrificeFly = 1;
        $("#sacrificeFly_btn").removeClass("btn-outline-primary");
        $("#sacrificeFly_btn").addClass("btn-primary");
        $("#sacrificeFly_btn").html("高飛犧牲打 已開啟");
    } else {
        sacrificeFly = 0;
        $("#sacrificeFly_btn").removeClass("btn-primary");
        $("#sacrificeFly_btn").addClass("btn-outline-primary");
        $("#sacrificeFly_btn").html("高飛犧牲打");
    }
    $("#batterInfoClose").click();
});
//計分板按鍵

class Pitcher {
    constructor() {
        this.strike = 0;
        this.ball = 0;
        this.er = 0;
        this.ira = 0;
        this.k = 0;
        this.o = 0;
        this.goPit = 0;
        this.aoPit = 0;
        this.bbPit = 0;
        this.dpPit = 0;
        this.h = 0;
        this.hr = 0;
    }
    //投球局數
    ip() {
        return (parseInt(this.o / 3) + (this.o % 3 / 10));
    }
    //總投球數
    pitchNum() {
        return (this.strike + this.ball);
    }

}

class Batter {
    constructor() {
        this.single = 0;
        this.double = 0;
        this.triple = 0;
        this.homerun = 0;
        this.rbi = 0;
        this.runs = 0;
        this.bb = 0;
        this.so = 0;
        this.go = 0;
        this.ao = 0;
        this.dp = 0;
        this.sf = 0;
    }
    //總安打數
    h() {
        return (this.single + this.double + this.triple + this.homerun);
    }
    //打數
    ab() {
        return (this.h() + this.so + this.go + this.ao - this.sf);
    }
    //打席
    pa() {
        return (this.ab() + this.bb + this.sf);
    }
}

class Player {
    constructor(serialNum, name) {
        this.serialNum = serialNum;
        this.name = name;
        this.Pitcher = new Pitcher();
        this.Batter = new Batter();
    }
}

function clearBallCount() {
    $("#strike_one").removeClass("scoreboard_ballStrikeOn");
    $("#strike_two").removeClass("scoreboard_ballStrikeOn");
    $("#ball_one").removeClass("scoreboard_ballBallOn");
    $("#ball_two").removeClass("scoreboard_ballBallOn");
    $("#ball_three").removeClass("scoreboard_ballBallOn");
}

function displayResult() {
    $("#scoreboard_result_inning").html("");
    $("#scoreboard_result_inning").append('<th scope="col">#</th>');
    for (i = 1; i <= inningCount; i++) {
        $("#scoreboard_result_inning").append(`<th scope="col">${i}</th>`);
    }
    $("#scoreboard_result_inning").append('<th class="table-active" scope="col">R</th><th class="table-active" scope="col">H</th>');
    $("#scoreboard_result_away").html("");
    $("#scoreboard_result_away").append('<th scope="row">AWAY</th>');
    awayPointList.forEach(function (element) {
        $("#scoreboard_result_away").append(`<td>${element}</td>`);
    });
    let batterHitsTotal = 0;
    awayBatList.forEach(function (element) {
        batterHitsTotal += element.Batter.h();
    });
    $("#scoreboard_result_away").append(`<td>${awayPoint}</td><td>${batterHitsTotal}</td>`);
    $("#scoreboard_result_home").html("");
    $("#scoreboard_result_home").append('<th scope="row">HOME</th>');
    batterHitsTotal = 0;
    homePointList.forEach(function (element) {
        $("#scoreboard_result_home").append(`<td>${element}</td>`);
    });
    homeBatList.forEach(function (element) {
        batterHitsTotal += element.Batter.h();
    });
    $("#scoreboard_result_home").append(`<td>${homePoint}</td><td>${batterHitsTotal}</td>`);
}

function displayPitcher() {
    $("#home_pitcher_result").html("");
    $("#away_pitcher_result").html("");
    homePitList.push(homePit[0]);
    awayPitList.push(awayPit[0]);
    let pitcherData;
    homePitList.forEach(function (element) {
        pitcherData = `<tr><th scope="row">${element.serialNum}</th><td>${element.name}</td><td>${element.Pitcher.ip()}</td><td>${element.Pitcher.h}</td><td>${element.Pitcher.hr}</td><td>${element.Pitcher.er}</td><td>${element.Pitcher.bbPit}</td><td>${element.Pitcher.k}</td><td>${element.Pitcher.pitchNum()}(${element.Pitcher.strike}:${element.Pitcher.ball})</td></tr>`;
        $("#home_pitcher_result").append(pitcherData);
    });
    awayPitList.forEach(function (element) {
        pitcherData = `<tr><th scope="row">${element.serialNum}</th><td>${element.name}</td><td>${element.Pitcher.ip()}</td><td>${element.Pitcher.h}</td><td>${element.Pitcher.hr}</td><td>${element.Pitcher.er}</td><td>${element.Pitcher.bbPit}</td><td>${element.Pitcher.k}</td><td>${element.Pitcher.pitchNum()}(${element.Pitcher.strike}:${element.Pitcher.ball})</td></tr>`;
        $("#away_pitcher_result").append(pitcherData);
    });
}

function displayBatter() {
    $("#home_batter_result").html("");
    $("#away_batter_result").html("");
    let batterData;
    homeBatList.forEach(function (element) {
        batterData = `<tr><th scope="row">${element.serialNum}</th><td>${element.name}</td><td>${element.Batter.ab()}</td><td>${element.Batter.runs}</td><td>${element.Batter.h()}</td><td>${element.Batter.homerun}</td><td>${element.Batter.rbi}</td><td>${element.Batter.bb}</td><td>${element.Batter.so}</td></tr>`;
        $("#home_batter_result").append(batterData);
    });
    awayBatList.forEach(function (element) {
        batterData = `<tr><th scope="row">${element.serialNum}</th><td>${element.name}</td><td>${element.Batter.ab()}</td><td>${element.Batter.runs}</td><td>${element.Batter.h()}</td><td>${element.Batter.homerun}</td><td>${element.Batter.rbi}</td><td>${element.Batter.bb}</td><td>${element.Batter.so}</td></tr>`;
        $("#away_batter_result").append(batterData);
    });
}

function changePitcherSubmit() {
    pited.push(pit[0]);
    pit.pop();
    let newPit = [new Player($("#newPitcherSerialNum").val(), $("#newPitcher").val())];
    pit.push(newPit[0]);
    $("#at_pit_info").html(`<tr><th scope="row">${pit[0].serialNum}</th><td>${pit[0].name}</td><td>${pit[0].Pitcher.ip()}</td><td>${pit[0].Pitcher.h}</td><td>${pit[0].Pitcher.hr}</td><td>${pit[0].Pitcher.er}</td><td>${pit[0].Pitcher.bbPit}</td><td>${pit[0].Pitcher.k}</td><td>${pit[0].Pitcher.pitchNum()}(${pit[0].Pitcher.strike}:${pit[0].Pitcher.ball})</td></tr>`);
    $("#newPitcherSerialNum").val("");
    $("#newPitcher").val("");
    $("#pitcher_area").html(pit[0].serialNum);
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    if (halfInningCount % 2 == 1) {
        $("#home_pitcher").html("(" + homePit[0].serialNum + ")" + homePit[0].name);
    } else {
        $("#away_pitcher").html("(" + awayPit[0].serialNum + ")" + awayPit[0].name);
    }
}

function gameEndAlert() {
    displayResult();
    displayPitcher();
    displayBatter();
    $("#gameEndLabel").html("比賽結束！最終比數 主 " + homePoint + "：客 " + awayPoint);
    gameEnd.show();
}

//
//
//
//測試用參數
// $("#inning").val("3");
// $("#homePitcherSerialNum").val('8');
// $("#homePitcher").val('徐維紳');
// $('#homeBatterNum').val('3');
// $('#homeBatterSerialNum1').val('1');
// $('#homeBatterSerialNum2').val('2');
// $('#homeBatterSerialNum3').val('4');
// $('#homeBatter1').val("吳兆權");
// $('#homeBatter2').val("吳柏辰");
// $('#homeBatter3').val("周凡凱");
// $("#awayPitcherSerialNum").val('31');
// $("#awayPitcher").val('徐代偉');
// $('#awayBatterNum').val('3');
// $('#awayBatterSerialNum1').val('27');
// $('#awayBatterSerialNum2').val('31');
// $('#awayBatterSerialNum3').val('32');
// $('#awayBatter1').val("謝昀達");
// $('#awayBatter2').val("徐代偉");
// $('#awayBatter3').val("余柏毅");
// let homePitcher_side = $("#homePitcher").val();
// let homePitcherNum_side = $("#homePitcherSerialNum").val();
// $("#home_pitcher").html("(" + homePitcherNum_side + ")" + homePitcher_side);
// let awayPitcher_side = $("#awayPitcher").val();
// let awayPitcherNum_side = $("#awayPitcherSerialNum").val();
// $("#away_pitcher").html("(" + awayPitcherNum_side + ")" + awayPitcher_side);
// let homeBatterNum_side = parseInt($('#homeBatterNum').val());
// for (i = 0; i < homeBatterNum_side; i++) {
//     let homeBatterNo_side = `#homeBatter${i+1}`;
//     let homeBatter_side = $(homeBatterNo_side).val();
//     let homeBatterNumNo_side = `#homeBatterSerialNum${i+1}`;
//     let homeBatterNum_side = $(homeBatterNumNo_side).val();
//     $("#home_batter").append("(" + homeBatterNum_side + ")" + homeBatter_side + "<br>");
// }
// let awayBatterNum_side = parseInt($('#awayBatterNum').val());
// for (i = 0; i < awayBatterNum_side; i++) {
//     let awayBatterNo_side = `#awayBatter${i+1}`;
//     let awayBatter_side = $(awayBatterNo_side).val();
//     let awayBatterNumNo_side = `#awayBatterSerialNum${i+1}`;
//     let awayBatterNum_side = $(awayBatterNumNo_side).val();
//     $("#away_batter").append("(" + awayBatterNum_side + ")" + awayBatter_side + "<br>");
// }
//測試用參數
//
//
//


function game(result) {
    clearBallCount();
    if (atBat.length == 0) {
        atBat = [bat.shift()];
        $("#pitcher_area").html(pit[0].serialNum);
        $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
        $("#batter_status").html("打者：" + atBat[0].name + " AB:" + atBat[0].Batter.ab() + " ,H:" + atBat[0].Batter.h() + " ,BB:" + atBat[0].Batter.bb + " ,SO:" + atBat[0].Batter.so);
        $("#batter_area").html(atBat[0].serialNum);
        $("#base_4").html(atBat[0].serialNum);
    }
    if (result !== "") {
        s = 0;
        b = 0;
        if (result == "so" || result == "ao" || result == "go") {
            if (result == "so") {
                result = "";
            } else if (result == "go") {
                result = "";
                if (doublePlay == 1) {
                    pit[0].Pitcher.dpPit++;
                    pit[0].Pitcher.o++;
                    atBat[0].Batter.dp++;
                    out++;
                    runnerBase.shift();
                    runner.shift();
                    doublePlay = 0;
                    $("#doublePlay_btn").removeClass("btn-primary");
                    $("#doublePlay_btn").addClass("btn-outline-primary");
                    $("#doublePlay_btn").html("雙殺打");
                    for (i = 1; i <= 3; i++) {
                        $(`#base_${i}`).html("");
                    }
                    runnerBase.forEach(function (element, index, array) {
                        array[index]++;
                        $(`#base_${array[index]}`).html(runner[index][0].serialNum);
                    });
                }
            } else if (result == "ao") {
                result = "";
                if (sacrificeFly == 1) {
                    runner[0][1].Pitcher.er++;
                    if (runner[0][1].name != pit[0].name) {
                        pit[0].Pitcher.ira++;
                    }
                    runner[0][0].Batter.runs++;
                    atBat[0].Batter.rbi++;
                    atBat[0].Batter.sf++;
                    runnerBase.shift();
                    runner.shift();
                    sacrificeFly = 0;
                    $("#sacrificeFly_btn").removeClass("btn-primary");
                    $("#sacrificeFly_btn").addClass("btn-outline-primary");
                    $("#sacrificeFly_btn").html("高飛犧牲打");
                    if (halfInningCount % 2 == 1) {
                        awayPoint++;
                        awayPointList[inningCount - 1]++;
                        $("#away_score").html("客：" + awayPoint);
                    } else {
                        homePoint++;
                        homePointList[inningCount - 1]++;
                        $("#home_score").html("主：" + homePoint);
                    }
                    if (lastHalfCheck == 1) {
                        if (homePoint > awayPoint) {
                            gameEndAlert();
                        }
                    }
                    for (i = 1; i <= 3; i++) {
                        $(`#base_${i}`).html("");
                    }
                    runnerBase.forEach(function (element, index) {
                        $(`#base_${element}`).html(runner[index][0].serialNum);
                    });
                }
            }
            out++;
            bat.push(atBat[0]);
            atBat = [bat.shift()];
            $("#batter_status").html("打者：" + atBat[0].name + " AB:" + atBat[0].Batter.ab() + " ,H:" + atBat[0].Batter.h() + " ,BB:" + atBat[0].Batter.bb + " ,SO:" + atBat[0].Batter.so);
            $("#batter_area").html(atBat[0].serialNum);
            $("#base_4").html(atBat[0].serialNum);
        } else {
            bat.push(atBat[0]);
            runner.push([atBat[0], pit[0]]);
            atBat = [bat.shift()];
            $("#batter_status").html("打者：" + atBat[0].name + " AB:" + atBat[0].Batter.ab() + " ,H:" + atBat[0].Batter.h() + " ,BB:" + atBat[0].Batter.bb + " ,SO:" + atBat[0].Batter.so);
            $("#batter_area").html(atBat[0].serialNum);
            $("#base_4").html(atBat[0].serialNum);
            if (result == "bb") {
                runnerBase.push(0);
                runnerBase.reverse();
                for (i = 0; i < runnerBase.length; i++) {
                    if (runnerBase[i] == i) {
                        runnerBase[i] += 1;
                    }
                }
                runnerBase.reverse();
                if (runnerBase[0] == 4) {
                    runner[0][1].Pitcher.er++;
                    if (runner[0][1].name != pit[0].name) {
                        pit[0].Pitcher.ira++;
                    }
                    runner[0][0].Batter.runs++;
                    runner[runner.length - 1][0].Batter.rbi++;
                    runnerBase.shift();
                    runner.shift();
                    if (halfInningCount % 2 == 1) {
                        awayPoint++;
                        awayPointList[inningCount - 1]++;
                        $("#away_score").html("客：" + awayPoint);
                    } else {
                        homePoint++;
                        homePointList[inningCount - 1]++;
                        $("#home_score").html("主：" + homePoint);
                    }
                    if (lastHalfCheck == 1) {
                        if (homePoint > awayPoint) {
                            gameEndAlert();
                        }
                    }
                }
                for (i = 1; i <= 3; i++) {
                    $(`#base_${i}`).html("");
                }
                runnerBase.forEach(function (element, index) {
                    $(`#base_${element}`).html(runner[index][0].serialNum);
                });
                result = "";
            } else {
                let base = parseInt(result);
                if (sacrificeFly == 1) {
                    base--;
                    sacrificeFly = 0;
                    $("#sacrificeFly_btn").removeClass("btn-primary");
                    $("#sacrificeFly_btn").addClass("btn-outline-primary");
                    $("#sacrificeFly_btn").html("高飛犧牲打");
                }
                runnerBase.push(0);
                runnerBase.forEach(function (element, index, array) {
                    array[index] = element + base;
                });
                runnerBase.forEach(function (element, index) {
                    if (element >= 4) {
                        runner[index][1].Pitcher.er++;
                        if (runner[index][1].name != pit[0].name) {
                            pit[0].Pitcher.ira++;
                        }
                        runner[index][0].Batter.runs++;
                        runner[runner.length - 1][0].Batter.rbi++;
                        runnerToHome++;
                        if (halfInningCount % 2 == 1) {
                            awayPoint++;
                            awayPointList[inningCount - 1]++;
                            $("#away_score").html("客：" + awayPoint);
                        } else {
                            homePoint++;
                            homePointList[inningCount - 1]++;
                            $("#home_score").html("主：" + homePoint);
                        }
                    }
                });
                if (lastHalfCheck == 1) {
                    if (homePoint > awayPoint) {
                        gameEndAlert();
                    }
                }
                runnerBase.splice(0, runnerToHome);
                runner.splice(0, runnerToHome);
                runnerToHome = 0;
                for (i = 1; i <= 3; i++) {
                    $(`#base_${i}`).html("");
                }
                runnerBase.forEach(function (element, index) {
                    $(`#base_${element}`).html(runner[index][0].serialNum);
                });
                result = "";
            }
        }
    }

    if (out == 1) {
        $("#one_out").addClass("scoreboard_outOn");
    }
    if (out == 2) {
        $("#one_out").addClass("scoreboard_outOn");
        $("#two_out").addClass("scoreboard_outOn");
    }
    if (out == 3) {
        $("#one_out").removeClass("scoreboard_outOn");
        $("#two_out").removeClass("scoreboard_outOn");
        halfInningCount++;
        bat.unshift(atBat[0]);
        atBat = [];
        runner = [];
        runnerBase = [];
        for (i = 1; i <= 3; i++) {
            $(`#base_${i}`).html("");
        }
        out = 0
        if (lastHalfCheck == 1) {
            if (homePoint < awayPoint) {
                gameEndAlert();
            }
            if (halfInning - halfInningCount == 1) {
                lastHalfCheck = 0;
                homePointList.push("0");
                awayPointList.push("0");
            }
        }
        if (halfInningCount == halfInning) {
            if (homePoint > awayPoint) {
                homePointList[homePointList.length - 1] = "-";
                gameEndAlert();
            } else {
                lastHalfCheck = 1;
                halfInning += 2;
            }
        }
        //上半局
        if (halfInningCount % 2 == 1) {
            inningCount++;
            $("#inningCount").html(inningCount);
            $("#top_half").show();
            $("#bottom_half").hide();
            pit = homePit;
            pited = homePitList;
            bat = awayBat;
            game(result);
        } //下半局
        else {
            $("#top_half").hide();
            $("#bottom_half").show();
            pit = awayPit;
            pited = awayPitList;
            bat = homeBat;
            game(result);
        }
    }
}
//新舊規則切換
$(".flyArea_power_fly_out_btn_1").hide();
$(".flyArea_power_fly_out_btn_2").hide();
// $("#scoreboard_form_submit").click(function () {
//     if ($("#ruleSelect").val() == 2) {
//         $("#ground_area_1").html("滾地出局區<br>犧牲觸擊失敗區");
//         $("#ground_area_2").html("滾地出局區<br>犧牲觸擊成功區");
//         $("#fly_area_1").html("直接一壘安打區<br>強力飛球區<br>(三壘跑者推進)");
//         $("#fly_area_2").html("直接一壘安打區<br>強力飛球區<br>(二三壘跑者推進)");
//         $(".flyArea_power_fly_out_btn_1").show();
//         $(".flyArea_power_fly_out_btn_2").show();
//         $("#sacrificeFly_btn").hide();
//     }
// })

//新規則測試
// $("#ruleSelect").val("2");
// $("#ground_area_1").html("滾地出局區<br>犧牲觸擊失敗區");
// $("#ground_area_2").html("滾地出局區<br>犧牲觸擊成功區");
// $("#fly_area_1").html("直接一壘安打區<br>強力飛球區<br>(三壘跑者推進)");
// $("#fly_area_2").html("直接一壘安打區<br>強力飛球區<br>(二三壘跑者推進)");
// $(".flyArea_power_fly_out_btn_1").show();
// $(".flyArea_power_fly_out_btn_2").show();
// $("#sacrificeFly_btn").hide();
//新規則測試


// $(document).ready(function () {
$("#scoreboard_form_submit").click(function () {
    //名單登錄
    homePit = [new Player($("#homePitcherSerialNum").val(), $("#homePitcher").val())];
    awayPit = [new Player($("#awayPitcherSerialNum").val(), $("#awayPitcher").val())];
    homeBatterNum = parseInt($('#homeBatterNum').val());
    homeBat = [];
    for (i = 1; i <= homeBatterNum; i++) {
        homeBat.push(new Player($(`#homeBatterSerialNum${i}`).val(), $(`#homeBatter${i}`).val()));
    }
    awayBatterNum = parseInt($('#awayBatterNum').val());
    awayBat = [];
    for (i = 1; i <= awayBatterNum; i++) {
        awayBat.push(new Player($(`#awayBatterSerialNum${i}`).val(), $(`#awayBatter${i}`).val()));
    }


    // 顯示計分板右側投手資訊
    $("#home_pitcher").html("(" + homePit[0].serialNum + ")" + homePit[0].name);
    $("#away_pitcher").html("(" + awayPit[0].serialNum + ")" + awayPit[0].name);
    // 顯示計分板右側打者資訊
    $("#home_batter").html("");
    $("#away_batter").html("");
    homeBat.forEach(function (element) {
        $("#home_batter").append(`(${element.serialNum})${element.name}<br>`);
    });
    awayBat.forEach(function (element) {
        $("#away_batter").append(`(${element.serialNum})${element.name}<br>`);
    });


    //打線順序
    homeBatList = [...homeBat];
    awayBatList = [...awayBat];

    //比賽開始
    $("#inningCount").html(inningCount);
    $("#top_half").show();
    $("#bottom_half").hide();
    pit = homePit;
    pited = homePitList;
    bat = awayBat;
    halfInning = parseInt($("#inning").val()) * 2;
    for (i = 1; i <= parseInt($("#inning").val()); i++) {
        homePointList.push("0");
        awayPointList.push("0");
    }
    game(result);
})