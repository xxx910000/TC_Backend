checkLogin();
getUserData();
getGoods("food");

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