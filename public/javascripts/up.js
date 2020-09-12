//上傳檔案
function upload(){
    if(!$.cookie('account') || $.cookie('account') == "null"){
        alert("請先登入會員！");
        location.href='/public/login.html';
        return;
    }
    var u_file = document.getElementById('u_file');

    // if(!/.(gif|jpg|jpeg|png|GIF|JPG|JPEG|PNG)$/.test(img.value)){
    //     alert('圖片類型不正確！');
    //     return;
    // }
    
    var formData = new FormData();
    for(var i=0;i<u_file.files.length;i++){
        formData.append('file',u_file.files[i]);
}

    var url = "/upload?account="+$.cookie('account');
    $.ajax({
        url:url,
        type:"POST",
        data:formData,
        processData:false,
        contentType:false,
        success: function(res){
            if(res.status==0){
                alert("上傳成功！");
                history.go(0);
            }
        },
        error: function(err){
            console.log(err);
        }
    });

}

//取得檔案列表
function getFilelist(){
    if(!$.cookie('account') || $.cookie('account') == "null"){
        alert("請先登入會員！");
        location.href='/public/login.html';
        return;
    }
    var url = "/upload?account="+$.cookie('account');
    $.get(url,function(res){
        if(res.status==0){
            res.data.forEach(function(file){
                var filelist =`
            <tr>
            <td>${file.filename}</td>
            <td>${file.size}</td>
            <td>${file.path}</td>
            <td>${file.encoding}</td>
            <td>${file.mimetype}</td>
            <td><button id="delBtn" onclick="onDelete('${file._id}','${file.filename}')">刪除</button></td>
            </tr>`;
            $('#filelist').append(filelist);
            })
            
        }
    })
}

getFilelist();

//刪除檔案
function onDelete(_id,filename){
    if(!$.cookie('userID') || $.cookie('userID') == "null"){
        alert("請先登入會員！");
        location.href='/public/login.html';
        return;
    }

    if(!confirm("確定要刪除嗎？")){
        return;
    }else{
        $.ajax({
            url:"/upload/",
            type:"DELETE",
            data:{"_id":_id,"filename":filename},
            success:function(res){
                if(res.status==0){
                    alert("刪除成功！");
                    history.go(0);
                }
            },
            error:function(err){
                console.log(err);
            }
        });
    }
}

//上傳使用者相片
function uploadPhoto(){
    if(!$.cookie('account') || $.cookie('account') == "null"){
        alert("請先登入會員！");
        location.href='/public/login.html';
        return;
    }
    var u_file = document.getElementById('photo');

    if(!/.(gif|jpg|jpeg|png|GIF|JPG|JPEG|PNG)$/.test(u_file.value)){
        alert('圖片類型不正確！');
        return;
    }

    var formData = new FormData();
    formData.append('file',u_file.files[0]);
    formData.append('account',$.cookie('account'));

    $.ajax({
        url:"/upload/photo",
        type:"PATCH",
        data:formData,
        processData:false,
        contentType:false,
        success: function(res){
            if(res.status==0){
                alert("上傳成功！");
                var f_filename = String(u_file.files[0].name);
                var src = "./upload/"+f_filename;
                $('#userPhoto').attr('src',src);
                
            }
        },
        error: function(err){
            console.log(err);
        }
    });

}

