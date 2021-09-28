function playerListSubmit() {
    $('#scoreboard_form').hide();
}

$(document).ready(function () {
    // playerListSubmit(); //暫時隱藏球員登錄
    //啟用工具提示
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    //打者人數改變
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
})