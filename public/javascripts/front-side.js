checkLogin();
getUserData();
getGoods("food");
getPvpData();
getCourseData();

function checkLogin(){
    if (!$.cookie('account') || $.cookie('account') == "null") {
        alert("請先登入會員");
        location.href = '../index.html';
        return;
    }
}

//取得user資料
function getUserData(){
    
    $.post('/user',{ 'account': $.cookie('account')},function(res){
        if(res.status==0){
            var username = $('#username').text(res.data.username);
            var score = $('#score').text(res.data.score);
            var money = $('#money').text(res.data.money);
            $('#money_txt').text(res.data.money);

            var a = res.data.goal[0].list
            var b = JSON.parse(a)
            for(var i =0;i<b.length;i++){
                $('#week_').append(`<td>${b[i].week}</td>`)
                $('#hour_').append(`<td>${b[i].hour}小時</td>`)
            }
        }
    })
}

//取得商品資料
function getGoods(type){
   
    $.post('/shop',{'type':type},function(res){
        if(res.status==0){
            var i=1;
            res.data.forEach(function(img){
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
function getPvpData(){
    var url = "/pvp?account="+$.cookie('account');
    $.get(url,function(res){
        if(res.status==0){
            var rate = (res.data.winning/(res.data.winning+res.data.fail))*100;
            $('#winning').text('勝利 '+res.data.winning);
            $('#fail').text('失敗 '+res.data.fail);
            $('#rate').text('勝率 '+rate+'%');
        }
    })
}

//儲存每日目標資料
function saveGoalData(){
    var week = document.getElementsByName('week');
    var hour = document.getElementsByName('hour');
    var goal = new Array();
    for(var i =0;i<week.length;i++){
        if(week[i].checked){
            var goal_ ={week:week[i].value,
                hour:hour[i].value};
            goal.push(goal_); 
        }
    }

    var url = "/user/goal?account="+$.cookie('account');

    $.ajax({
        url:url,
        type:"PATCH",
        data:{list:JSON.stringify(goal)},
        //traditional:true,
        //processData:false,
        //contentType:"json/application",
        //dataType: "json",
        success: function(res){
            if(res.status==0){
                alert("設定成功！");
                $('#login').css('display','none');
                $('#fade').css('display','none');
                $('#week_').empty();
                $('#hour_').empty();
                getUserData();
            }
        },
        error: function(err){
            console.log(err);
        }
    });
}

//取得課程資料
function getCourseData(){
    var coursetype = "APP Inventor";
    var url = "/course?coursetype="+coursetype;
    $.get(url,function(res){
        if(res.status==0){
            res.data.forEach(function(course){
                if(course.price == 0){
                var course_item = `
                <div class="left-item">
                    <div class="left-video">
                        <div class="left-img1"><img src="image/video2.png" alt="video2"></div>
                        <div class="left-txt">${course.coursetype}<br>${course.coursechapter}</div>
                    </div>
                    <div class="left-ppt">
                        <div class="left-img2"><img src="image/ppt1.png" alt="ppt1"></div>
                        <div class="left-txt">${course.coursetype}<br>${course.coursechapter}</div>
                    </div>
                </div>`

                $('#course_list').append(course_item);
                }else{
                    var course_item = `
                    <div class="left-item">
                    <div class="left-video">
                        <div class="left-img1"><img src="image/video2.png" alt="video3"></div>
                        <div class="left-txt">${course.coursetype}<br>${course.coursechapter}<br><img src="image/money.png" alt="money"> ${course.price}</div>
                    </div>
                    <div class="left-ppt">
                        <div class="left-img2"><img src="image/ppt3.png" alt="ppt3"></div>
                        <div class="left-txt">${course.coursetype}<br>${course.coursechapter}<br><img src="image/money.png" alt="money"> ${course.price}</div>
                    </div>
                </div>`
                
                $('#course_list').append(course_item);
                }
            })
        }
    })
}

//取得試題資料
function getTestData(){
    var url = "/test";
    $.get(url,function(res){
        if(res.status==0){
            res.data.forEach(function(test){
                var test = `<div class="test">
                <span class="question">題目 : ${test.題目}</span><br>
                <input type="radio" name="${test.序號}" value="A">[A] ${test.選項A}<br>
                <input type="radio" name="${test.序號}" value="B">[B] ${test.選項B}<br>
                <input type="radio" name="${test.序號}" value="C">[C] ${test.選項C}<br>
                <input type="radio" name="${test.序號}" value="D">[D] ${test.選項D}<br>
            </div>`;
            $('.right').append(test);
            })
        }
    })
}

function handAns(){
    var checked = $('input[type=radio]:checked');
    for(var i=0;i<checked.length;i++){
        console.log(checked[i].value)
    }
 
}