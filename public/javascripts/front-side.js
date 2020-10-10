checkLogin();
getUserData();
getGoods("food");
getPvpData();
getCourseData();
var study = 0;
function checkLogin() {
    if (!$.cookie('account') || $.cookie('account') == "null") {
        alert("請先登入會員");
        location.href = '../index.html';
        return;
    }
}

//取得user資料
function getUserData() {

    $.post('/user', { 'account': $.cookie('account') }, function (res) {
        if (res.status == 0) {
            var username = $('#username').text(res.data.username);
            var score = $('#score').text(res.data.score);
            var money = $('#money').text(res.data.money);
            $('#money_txt').text(res.data.money);

            var a = res.data.goal[0].list
            var b = JSON.parse(a)
            for (var i = 0; i < b.length; i++) {
                $('#week_').append(`<td>${b[i].week}</td>`)
                $('#hour_').append(`<td>${b[i].hour}小時</td>`)
            }

            study = res.data.study;
        }
    })
}

//取得商品資料
function getGoods(type) {

    $.post('/shop', { 'type': type }, function (res) {
        if (res.status == 0) {
            var i = 1;
            res.data.forEach(function (img) {
                var goods_item = `
            <div class="goods-item">
                <div class="goods-img"><img src="../image/shop/food/food_${i}.png" alt="food1"></div>
                <div class="goods-button"><button>${img.price}</button></div>
            </div>`

                $('#goods_').append(goods_item);
                i++;
            });
        }
    });
}

//取得戰績資料
function getPvpData() {
    var url = "/pvp?account=" + $.cookie('account');
    $.get(url, function (res) {
        if (res.status == 0) {
            var rate = (res.data.winning / (res.data.winning + res.data.fail)) * 100;
            $('#winning').text('勝利 ' + res.data.winning);
            $('#fail').text('失敗 ' + res.data.fail);
            $('#rate').text('勝率 ' + rate + '%');
        }
    })
}

//儲存每日目標資料
function saveGoalData() {
    var week = document.getElementsByName('week');
    var hour = document.getElementsByName('hour');
    var goal = new Array();
    for (var i = 0; i < week.length; i++) {
        if (week[i].checked) {
            var goal_ = {
                week: week[i].value,
                hour: hour[i].value
            };
            goal.push(goal_);
        }
    }

    var url = "/user/goal?account=" + $.cookie('account');

    $.ajax({
        url: url,
        type: "PATCH",
        data: { list: JSON.stringify(goal) },
        //traditional:true,
        //processData:false,
        //contentType:"json/application",
        //dataType: "json",
        success: function (res) {
            if (res.status == 0) {
                alert("設定成功！");
                $('#login').css('display', 'none');
                $('#fade').css('display', 'none');
                $('#week_').empty();
                $('#hour_').empty();
                getUserData();
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

//取得課程資料
function getCourseData() {
    var coursetype = "APP Inventor";
    var url = "/course?coursetype=" + coursetype;
    $.get(url, function (res) {
        if (res.status == 0) {
            res.data.forEach(function (course) {
                if (course.price == 0) {
                    var course_item = `
                <div class="left-item">
                    <div class="left-video">
                        <div class="left-img1"><a href="javascript:void(0)"><img src="image/class2op.png" alt="video2" class="video-item"></a></div>
                        <div class="left-txt">${course.coursetype}<br><span>${course.coursechapter}</span></div>
                    </div>
                    <div class="left-ppt">
                        <div class="left-img2"><img src="image/ppt1.png" alt="ppt1"></div>
                        <div class="left-txt">${course.coursetype}<br>${course.coursechapter}</div>
                    </div>
                </div>`

                    $('#course_list').append(course_item);
                } else {
                    var course_item = `
                    <div class="left-item">
                    <div class="left-video">
                        <div class="left-img1"><a href="javascript:void(0)"><img src="image/class2op.png" alt="video3" class="video-item"></a></div>
                        <div class="left-txt">${course.coursetype}<br><span>${course.coursechapter}</span><br><img src="image/money.png" alt="money"> ${course.price}</div>
                    </div>
                    <div class="left-ppt">
                        <div class="left-img2"><img src="image/ppt3.png" alt="ppt3"></div>
                        <div class="left-txt">${course.coursetype}<br>${course.coursechapter}<br><img src="image/money.png" alt="money"> ${course.price}</div>
                    </div>
                </div>`

                    $('#course_list').append(course_item);
                }
            })

            videoControl();
        }
    })
}

//切換影片控制
function videoControl() {
    var video_item = document.getElementsByClassName("video-item")
    var aud = document.getElementById("myAudio");
    for (var i = 0; i < study; i++) {
        video_item[i].src = "image/class2.png";
    }

    $('.video-item').on("click", function () {
        if ($(this).attr('src') == 'image/class2op.png') {
            alert("請先看完上一章！");
        }
        else {
            //let txt = $(this).parent().parent().next()[0].lastChild;
            aud.src = "video/class" + study + ".mp4"
            
            //console.log(txt.innerHTML.substring(1,2))
        }
    })

    if (aud.getAttribute("src") == "video/class" + study + ".mp4") {
        aud.onended = function () {
            video_item[study].src = "image/class2.png";
            study++;
            saveStudy(study);
        };
    }
}

//取得試題資料
function getTestData() {
    var url = "/test";
    $.get(url, function (res) {
        if (res.status == 0) {
            res.data.forEach(function (test) {
                var test = `<div class="test">
                <span class="question">題目 : ${test.題目}</span><br>
                <input type="radio" name="${test.序號}" value="A"><span>[A] ${test.選項A}</span><br>
                <input type="radio" name="${test.序號}" value="B"><span>[B] ${test.選項B}</span><br>
                <input type="radio" name="${test.序號}" value="C"><span>[C] ${test.選項C}</span><br>
                <input type="radio" name="${test.序號}" value="D"><span>[D] ${test.選項D}</span><br>
            </div>`;
                $('.right').append(test);
            })
            if (location.pathname != "/test.html")
                getRecord();
        }
    })

}

//提交試卷
function handAns() {
    var checked = $('input[type=radio]:checked');
    var record = new Array();
    if ($('input[type=radio]:checked').length < ($('input[type=radio]').length) / 4) {
        alert("有題目未作答！")
        return false;
    }
    $.get("/test", function (res) {
        if (res.status == 0) {
            res.data.forEach(function (test) {
                for (var i = 0; i < checked.length; i++) {
                    if (test.序號 == checked[i].name) {
                        var gain_ = (test.答案 == checked[i].value) ? true : false;
                        var record_ = {
                            序號: checked[i].name,
                            handAns: checked[i].value,
                            答案: test.答案,
                            gain: gain_,
                        };
                        record.push(record_);

                    }
                }
            })
            //var record_ = JSON.stringify(record);
            //console.log(record_)
            var url = "/test?account=" + $.cookie('account');
            $.ajax({
                url: url,
                type: "PUT",
                data: { list: JSON.stringify(record) },
                //traditional:true,
                //processData:false,
                //contentType:"json/application",
                //dataType: "json",
                success: function (res) {
                    if (res.status == 0) {
                        var a = res.data.record[0].list;
                        var b = JSON.parse(a)
                        console.log(b)
                        window.open("test record.html", 'test record', config = 'height=800,width=900');
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        }
    })
}

//取得答題記錄
function getRecord() {

    $.get('/test/record', function (res) {
        if (res.status == 0) {
            var a = res.data[0].record[0].list;
            var b = JSON.parse(a)
            console.log(b)
            var score = 0;
            for (var i = 0; i < b.length; i++) {
                var que = document.getElementsByName(b[i].序號)
                for (var j = 0; j < que.length; j++) {
                    if (b[i].handAns == que[j].value)
                        que[j].checked = true;
                    if (b[i].答案 == que[j].value)
                        que[j].nextSibling.style.background = "green";
                }
                if (b[i].gain) {
                    score += 20;
                    var add = `答對了`;
                    que[0].parentNode.append(add);
                } else {
                    var add = `答錯了`;
                    que[0].parentNode.append(add);
                }

            }
            $('.right').append(`<div>得分為： ${score}</div>`)
        }
    });
}

//儲存影片學習進度
function saveStudy(study){
    let url = "/user/study?account=" + $.cookie('account');
    $.ajax({
        url: url,
        type: "PATCH",
        data: { study: study },

        success: function (res) {
            if (res.status == 0) {
               
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}