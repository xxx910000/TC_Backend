//登入
function login() {
    var _account = $('#account').val();
    var _password = $('#password').val();

    if (!_account || !_password) {
        alert('請輸入帳號密碼!');
    }
    else {
        $.post("/user/login",
            { 'account': _account, 'password': _password }, function (res) {
                if (res.status == 1) {
                    alert(res.msg);
                }
                else {
                    $.cookie('userName', res.data.username);
                    $.cookie('account', res.data.account);
                    alert('登入成功!');
                    location.href = '../index after.html';
                }
            });
    }
}
//註冊
function register() {
    var _account = $('#account_register').val();
    var _password = $('#password_register').val();
    var _confirmpsd = $('#confirmpsd_register').val();
    var _name = $('#username_register').val();


    if (!_account || !_password || !_confirmpsd || !_name) {
        alert('請輸入未填欄位!');
    }
    else if (_password != _confirmpsd) {
        alert('確認密碼不相同!');
    }
    else {
        $.post("/user/register", {
            'account': _account, 'password': _password,'name': _name, 
        }, function (res) {
            if (res.status == 0) {
                alert('註冊成功!');
                location.href = '../index.html';
            }
            if (res.status == 1) {
                alert(res.msg);
                var _account = $('#account_register').val('');
                var _password = $('#password_register').val('');
                var _confirmpsd = $('#confirmpsd_register').val('');
            }
        });
    }
}

//登出功能
function logout() {
    $.removeCookie("account");
    $.removeCookie("userName");
    location.href = '../index.html';
}

//忘記密碼
function forgetpsw() {
    var _account = $('#account_forget').val();
    var _password = $('#password_forget').val();
    var _confirmpsd = $('#confirmpsd_forget').val();
    if (!_account || !_password) {
        alert('請輸入帳號密碼!');
    }
    else if (_password != _confirmpsd) {
        alert('確認密碼不相同!');
    }
    else {
        $.post("/user/forgetpsw",
            { 'account': _account, 'password': _password }, function (res) {
                if (res.status == 1) {
                    alert(res.msg);
                }
                else {
                    alert('更改成功!');
                    location.href = '../index.html';
                }
            });
    }
}

