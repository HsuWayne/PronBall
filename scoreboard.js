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
//客隊分數
let awayPoint = 0;
//for迴圈變數
let i;
//最後半局On
let lastHalfCheck = 0;
//目前局數
let inningCount = 1;
//半局計數
let halfInningCount = 1;
//需打半局數
// let halfInning = parseInt($("#inning").val()) * 2;
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
let gameEndAlert = new bootstrap.Modal(document.getElementById('gameEnd'));

// $("#pitcher_status").html(pit[0].name + "：IP：" + pit[0].Pitcher.ip() + ", H：" + pit[0].Pitcher.h + ", ER：" + pit[0].Pitcher.er + ", BB：" + pit[0].Pitcher.bbPit + ", SO：" + pit[0].Pitcher.k + ", ：球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");

//按鍵
$("#strike_area").click(function () {
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
$("#foul_area").click(function () {
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
$("#ball_area_1").click(function () {
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
$("#ball_area_2").click(function () {
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
$("#single_area").click(function () {
    atBat[0].Batter.single++;
    pit[0].Pitcher.h++;
    pit[0].Pitcher.strike++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    result = "1";
    game(result);
});
$("#double_area").click(function () {
    atBat[0].Batter.double++;
    pit[0].Pitcher.h++;
    pit[0].Pitcher.strike++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    result = "2";
    game(result);
});
$("#triple_area").click(function () {
    atBat[0].Batter.triple++;
    pit[0].Pitcher.h++;
    pit[0].Pitcher.strike++;
    result = "3";
    game(result);
});
$("#homerun_area").click(function () {
    atBat[0].Batter.homerun++;
    pit[0].Pitcher.h++;
    pit[0].Pitcher.hr++;
    pit[0].Pitcher.strike++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    result = "4";
    game(result);
});
$("#ground_area_1").click(function () {
    pit[0].Pitcher.o++;
    pit[0].Pitcher.strike++;
    pit[0].Pitcher.goPit++;
    atBat[0].Batter.go++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    result = "go";
    game(result);
});
$("#ground_area_2").click(function () {
    pit[0].Pitcher.o++;
    pit[0].Pitcher.strike++;
    pit[0].Pitcher.goPit++;
    atBat[0].Batter.go++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    result = "go";
    game(result);
});
$("#fly_area_1").click(function () {
    pit[0].Pitcher.o++;
    pit[0].Pitcher.strike++;
    pit[0].Pitcher.aoPit++;
    atBat[0].Batter.ao++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    result = "ao";
    game(result);
});
$("#fly_area_2").click(function () {
    pit[0].Pitcher.o++;
    pit[0].Pitcher.strike++;
    pit[0].Pitcher.aoPit++;
    atBat[0].Batter.ao++;
    $("#pitcher_status").html("投手：" + pit[0].name + " 球數：" + pit[0].Pitcher.pitchNum() + " (好" + pit[0].Pitcher.strike + "：壞" + pit[0].Pitcher.ball + ")");
    result = "ao";
    game(result);
});
//按鍵

class Pitcher {
    constructor() {
        this.strike = 0;
        this.ball = 0;
        this.er = 0;
        this.k = 0;
        this.o = 0;
        this.goPit = 0;
        this.aoPit = 0;
        this.bbPit = 0;
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
    }
    //總安打數
    h() {
        return (this.single + this.double + this.triple + this.homerun);
    }
    //打數
    ab() {
        return (this.h() + this.so + this.go + +this.ao);
    }
    //打席
    pa() {
        return (this.ab() + this.bb);
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

//
//
//
//測試用參數
$("#inning").val("3");
$("#homePitcherSerialNum").val('8');
$("#homePitcher").val('徐維紳');
$('#homeBatterNum').val('3');
$('#homeBatterSerialNum1').val('1');
$('#homeBatterSerialNum2').val('2');
$('#homeBatterSerialNum3').val('4');
$('#homeBatter1').val("吳兆權");
$('#homeBatter2').val("吳柏辰");
$('#homeBatter3').val("周凡凱");
$("#awayPitcherSerialNum").val('31');
$("#awayPitcher").val('徐代偉');
$('#awayBatterNum').val('3');
$('#awayBatterSerialNum1').val('27');
$('#awayBatterSerialNum2').val('31');
$('#awayBatterSerialNum3').val('32');
$('#awayBatter1').val("謝昀達");
$('#awayBatter2').val("徐代偉");
$('#awayBatter3').val("余柏毅");
let homePitcher_side = $("#homePitcher").val();
let homePitcherNum_side = $("#homePitcherSerialNum").val();
$("#home_pitcher").html("(" + homePitcherNum_side + ")" + homePitcher_side);
let awayPitcher_side = $("#awayPitcher").val();
let awayPitcherNum_side = $("#awayPitcherSerialNum").val();
$("#away_pitcher").html("(" + awayPitcherNum_side + ")" + awayPitcher_side);
let homeBatterNum_side = parseInt($('#homeBatterNum').val());
for (i = 0; i < homeBatterNum_side; i++) {
    let homeBatterNo_side = `#homeBatter${i+1}`;
    let homeBatter_side = $(homeBatterNo_side).val();
    let homeBatterNumNo_side = `#homeBatterSerialNum${i+1}`;
    let homeBatterNum_side = $(homeBatterNumNo_side).val();
    $("#home_batter").append("(" + homeBatterNum_side + ")" + homeBatter_side + "<br>");
}
let awayBatterNum_side = parseInt($('#awayBatterNum').val());
for (i = 0; i < awayBatterNum_side; i++) {
    let awayBatterNo_side = `#awayBatter${i+1}`;
    let awayBatter_side = $(awayBatterNo_side).val();
    let awayBatterNumNo_side = `#awayBatterSerialNum${i+1}`;
    let awayBatterNum_side = $(awayBatterNumNo_side).val();
    $("#away_batter").append("(" + awayBatterNum_side + ")" + awayBatter_side + "<br>");
}

let halfInning = parseInt($("#inning").val()) * 2;
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
            out++;
            bat.push(atBat[0]);
            atBat = [bat.shift()];
            $("#batter_status").html("打者：" + atBat[0].name + " AB:" + atBat[0].Batter.ab() + " ,H:" + atBat[0].Batter.h() + " ,BB:" + atBat[0].Batter.bb + " ,SO:" + atBat[0].Batter.so);
            $("#batter_area").html(atBat[0].serialNum);
            $("#base_4").html(atBat[0].serialNum);
            if (result == "so") {
                result = "";
            } else if (result == "go") {
                result = "";
            } else if (result == "ao") {
                result = "";
            }
        } else {
            bat.push(atBat[0]);
            runner.push(atBat[0]);
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
                    pit[0].Pitcher.er++;
                    runner[0].Batter.runs++;
                    runner[runner.length - 1].Batter.rbi++;
                    runnerBase.shift();
                    runner.shift();
                    if (halfInningCount % 2 == 1) {
                        awayPoint++;
                        $("#away_score").html("客：" + awayPoint);
                    } else {
                        homePoint++;
                        $("#home_score").html("主：" + homePoint);
                    }
                    if (lastHalfCheck == 1) {
                        if (homePoint > awayPoint) {
                            alert("比賽結束！！");
                        }
                    }
                }
                for (i = 1; i <= 3; i++) {
                    $(`#base_${i}`).html("");
                }
                runnerBase.forEach(function (element, index) {
                    $(`#base_${element}`).html(runner[index].serialNum);
                });
                result = "";
            } else {
                let base = parseInt(result);
                runnerBase.push(0);
                runnerBase.forEach(function (element, index, array) {
                    array[index] = element + base;
                });
                runnerBase.forEach(function (element, index) {
                    if (element >= 4) {
                        pit[0].Pitcher.er++;
                        runner[index].Batter.runs++;
                        runner[runner.length - 1].Batter.rbi++;
                        runnerToHome++;
                        if (halfInningCount % 2 == 1) {
                            awayPoint++;
                            $("#away_score").html("客：" + awayPoint);
                        } else {
                            homePoint++;
                            $("#home_score").html("主：" + homePoint);
                        }
                    }
                });
                if (lastHalfCheck == 1) {
                    if (homePoint > awayPoint) {
                        alert("比賽結束！！");
                    }
                }
                runnerBase.splice(0, runnerToHome);
                runner.splice(0, runnerToHome);
                runnerToHome = 0;
                for (i = 1; i <= 3; i++) {
                    $(`#base_${i}`).html("");
                }
                runnerBase.forEach(function (element, index) {
                    $(`#base_${element}`).html(runner[index].serialNum);
                });
                result = "";
            }
        }
    }

    if (out == 1) {
        $("#one_out").addClass("scoreboard_outOn");
    }
    if (out == 2) {
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
                alert("比賽結束！！");
            }
            if (halfInning - halfInningCount == 1) {
                lastHalfCheck = 0;
            }
        }
        if (halfInningCount == halfInning) {
            if (homePoint > awayPoint) {
                alert("比賽結束！！");
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
            point = awayPoint;
            game(result);
        } //下半局
        else {
            $("#top_half").hide();
            $("#bottom_half").show();
            pit = awayPit;
            pited = awayPitList;
            bat = homeBat;
            point = homePoint;
            game(result);
        }
    }
}

$(document).ready(function () {
    // gameEndAlert.show();
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
    //投手順序
    homePitList = [...homePit];
    awayPitList = [...awayPit];
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
    game(result);
})