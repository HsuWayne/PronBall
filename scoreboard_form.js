function playerListSubmit() {
    $('#scoreboard_form').hide();
}

$(document).ready(function () {
    // playerListSubmit(); //暫時隱藏
    //啟用工具提示
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    //球員名單登錄
    $('#homeBatterNum').on('change', function () {
        $("#homeBatterAdd").html("");
        let homeBatterNum = parseInt($(this).val());
        for (i = 0; i < homeBatterNum; i++) {
            let addBatter = `<label class="form-label">${i+1}棒</label><div class="col-4"><input type="number" min="0" max="99" step="1" class="form-control"
                id="homeBatterSerialNum${i+1}" required></div><div class="col-8"><input type="text" class="form-control" id="homeBatter${i+1}" required></div>`;
            $("#homeBatterAdd").append(addBatter);
        }
    });
    $('#awayBatterNum').on('change', function () {
        $("#awayBatterAdd").html("");
        let awayBatterNum = parseInt($(this).val());
        for (i = 0; i < awayBatterNum; i++) {
            let addBatter = `<label class="form-label">${i+1}棒</label><div class="col-4"><input type="number" min="0" max="99" step="1" class="form-control"
                id="awayBatterSerialNum${i+1}" required></div><div class="col-8"><input type="text" class="form-control" id="awayBatter${i+1}" required></div>`;
            $("#awayBatterAdd").append(addBatter);
        }
    });

    // //計分板運作
    // $("#scoreboard_form_submit").click(function () {
    //     // 顯示計分板右側投手資訊
    //     let homePitcher_side = $("#homePitcher").val();
    //     let homePitcherNum_side = $("#homePitcherSerialNum").val();
    //     $("#home_pitcher").html("(" + homePitcherNum_side + ")" + homePitcher_side);
    //     let awayPitcher_side = $("#awayPitcher").val();
    //     let awayPitcherNum_side = $("#awayPitcherSerialNum").val();
    //     $("#away_pitcher").html("(" + awayPitcherNum_side + ")" + awayPitcher_side);
    //     // 顯示計分板右側打者資訊
    //     let homeBatterNum_side = parseInt($('#homeBatterNum').val());
    //     for (i = 0; i < homeBatterNum_side; i++) {
    //         let homeBatterNo_side = `#homeBatter${i+1}`;
    //         let homeBatter_side = $(homeBatterNo_side).val();
    //         let homeBatterNumNo_side = `#homeBatterSerialNum${i+1}`;
    //         let homeBatterNum_side = $(homeBatterNumNo_side).val();
    //         $("#home_batter").append("(" + homeBatterNum_side + ")" + homeBatter_side + "<br>");
    //     }
    //     let awayBatterNum_side = parseInt($('#awayBatterNum').val());
    //     for (i = 0; i < awayBatterNum_side; i++) {
    //         let awayBatterNo_side = `#awayBatter${i+1}`;
    //         let awayBatter_side = $(awayBatterNo_side).val();
    //         let awayBatterNumNo_side = `#awayBatterSerialNum${i+1}`;
    //         let awayBatterNum_side = $(awayBatterNumNo_side).val();
    //         $("#away_batter").append("(" + awayBatterNum_side + ")" + awayBatter_side + "<br>");
    //     }
    // });


})