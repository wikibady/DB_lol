window.onload=function(){
    Number.prototype.toPercent = function(){
        return (Math.round(this * 10000)/100).toFixed(2) + '%';
    }
    var btn=document.getElementById('form-button');
    var tbody=document.getElementById('tbody');
    var text_sql=document.getElementById('output-sql');
    btn.onclick=function(){
        var daqu=document.getElementsByName('daqu');
        for(var i in daqu){
            if(daqu[i].checked){
                daqu=daqu[i].value;
                break;
            }
        }
        var id=document.getElementById('id').value;
        var level=document.getElementById('level').value;
        var duanwei=document.getElementById('duanwei').value;
        var name=document.getElementById('name').value;
        
        var str={
            'id':id,
            'level':level,
            'daqu':daqu,
            'duanwei':duanwei,
            'name':name
        };
        var xhr=new XMLHttpRequest();
        var url="./ajax_select?"+"id="+id+"&level="+level+"&duanwei="+duanwei+"&name="+name+"&daqu="+daqu;
        xhr.open("get", url, true);
        //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(str);
        xhr.onreadystatechange=function(){
            if (xhr.readyState != 4) {
            } else {
                console.log(xhr.responseText);

                while (tbody.hasChildNodes()) {
                    tbody.removeChild(tbody.firstChild);
                }
                var json = eval("(" + xhr.responseText + ")");
                //alert(json.people.length)
                if(json.people.length==0){
                    //alert("NOT FIND");
                    tbody.innerHTML="<h1>NOT FIND</h1>"
                }
                text_sql.textContent = json.sql;
                console.log(json.sql)
                for (var i in json.people) {
                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var td3 = document.createElement("td");
                    var td4 = document.createElement("td");
                    var td5 = document.createElement("td");
                    var td6 = document.createElement("td");
                    var td7 = document.createElement("td");
                    var td8 = document.createElement("td");
                    var td9 = document.createElement("td");
                    var td10 = document.createElement("td");
                    td1.textContent = json.people[i].id;
                    td2.innerHTML="<input type=\"text\" value=\""+json.people[i].name+"\">"
                    //td2.textContent = json.people[i].name;
                    td3.innerHTML="<input type=\"text\" value=\""+json.people[i].level+"\">"
                    //td3.textContent = json.people[i].level;
                    td4.innerHTML="<input type=\"text\" value=\""+(function () {
                        switch (parseInt(json.people[i].daqu)){
                            case 1:
                                return "艾欧尼亚";
                            case 2:
                                return "恕瑞玛";
                            case 3:
                                return "无畏先锋";
                            case 5:
                                return "扭曲丛林";
                        }

                        })()+"\">"
                    td5.innerHTML="<input type=\"text\" value=\""+(function () {
                        switch (parseInt(json.people[i].duanwei)){

                            case 1:
                                return "英勇黄铜";
                            case 2:
                                return "不屈白银";
                            case 3:
                                return "荣耀黄金";
                            case 4:
                                return "华贵铂金";
                            case 5:
                                return "璀璨钻石";
                            case 6:
                                return "超凡大师";
                            case 7:
                                return "最强王者";
                        }

                        })()+"\">"
                        td6.innerHTML="<input type=\"text\" value=\""+json.people[i].zongchangci+"\">"
                        //td6.textContent = json.people[i].zongchangci;
                        td7.innerHTML="<input type=\"text\" value=\""+json.people[i].shengchang+"\">"
                        
                        //td7.textContent = json.people[i].shengchang;
                        td8.textContent = (parseInt(json.people[i].shengchang) / parseInt(json.people[i].zongchangci)).toPercent()
                        td9.innerHTML = "<button class=\"update\">更新</button>"
                        td10.innerHTML = "<button class=\"delete\">删除</button>"
                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tr.appendChild(td4);
                        tr.appendChild(td5);
                        tr.appendChild(td6);
                        tr.appendChild(td7);
                        tr.appendChild(td8);
                        tr.appendChild(td9);
                        tr.appendChild(td10);
                        tbody.appendChild(tr);


                    }


                }
            }
    
    }

 var add_btn=document.getElementById("add");
 var add_bg=document.getElementById("add-bg");
 var add_form=document.getElementById("add-form");
 function add_bg_appear(){
    add_bg.style.display="block";
 }
 document.onclick=function(ev){
    var ev=ev||window.ev;
    var target=ev.target;
    if(target.id=="add"){
        add_bg_appear();
        add_form.style.animation="addFormAppear 1s";
    }
    if(target.id=="add-bg"){
        add_form.style.animation="addFormDisplay 1s";
        setTimeout(function(){
            add_bg.style.display="";
        },500);
        
    }
    if(target.id=="add-save"){
        var user_name=document.getElementById("add-name").value;
        var user_levle=document.getElementById("add-level").value;
        var user_zongchangci=document.getElementById("add-zongchangci").value;
        var user_shengchang=document.getElementById("add-shengchang").value;
        var user_duanwei=document.getElementById("add-duanwei").value;
        var user_daqu=document.getElementById("add-daqu").value;
        if(user_name&&user_levle&&user_zongchangci&&user_shengchang&&user_duanwei&&user_daqu){
            alert("成功添加");
            var str={
            'id':0,
            'level':user_levle,
            'daqu':user_daqu,
            'duanwei':user_duanwei,
            'name':user_name,
            'zongchangci':user_zongchangci,
            'shengchang':user_shengchang
        };
        var xhr=new XMLHttpRequest();
        var url="./ajax_add?"+"id="+0+"&level="+user_levle+"&duanwei="+user_duanwei+"&name="+user_name+"&daqu="+user_daqu+"&zongchangci="+user_zongchangci+"&shengchang="+user_shengchang;
        xhr.open("get", url, true);
        //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(str);
        xhr.onreadystatechange=function(){
            if (xhr.readyState != 4) {
            } else {
                console.log(xhr.responseText);
                }
            }
        }
        else{
            alert("err!");
        }
    }
    if(target.className=="delete"){
        var userID=target.parentNode.parentNode.getElementsByTagName("td")[0].textContent;
        var sql=document.getElementById("output-sql").textContent;

        var xhr=new XMLHttpRequest();
        var url="./ajax_delete?"+"id="+userID+"&sql="+sql
        xhr.open("get", url, true);
        //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(str);
        xhr.onreadystatechange=function(){
            if (xhr.readyState != 4) {
            } else {
                //console.log(xhr.responseText);

                while (tbody.hasChildNodes()) {
                    tbody.removeChild(tbody.firstChild);
                }
                var json = eval("(" + xhr.responseText + ")");
                //alert(json.people.length)
                if(json.people.length==0){
                    //alert("NOT FIND");
                    tbody.innerHTML="<h1>NOT FIND</h1>"
                }
                text_sql.textContent = json.sql;
                console.log(json.sql)
                for (var i in json.people) {
                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var td3 = document.createElement("td");
                    var td4 = document.createElement("td");
                    var td5 = document.createElement("td");
                    var td6 = document.createElement("td");
                    var td7 = document.createElement("td");
                    var td8 = document.createElement("td");
                    var td9 = document.createElement("td");
                    var td10 = document.createElement("td");
                    td1.textContent = json.people[i].id;
                    td2.innerHTML="<input type=\"text\" value=\""+json.people[i].name+"\">"
                    //td2.textContent = json.people[i].name;
                    td3.innerHTML="<input type=\"text\" value=\""+json.people[i].level+"\">"
                    //td3.textContent = json.people[i].level;
                    td4.innerHTML="<input type=\"text\" value=\""+(function () {
                        switch (parseInt(json.people[i].daqu)){
                            case 1:
                                return "艾欧尼亚";
                            case 2:
                                return "恕瑞玛";
                            case 3:
                                return "无畏先锋";
                            case 5:
                                return "扭曲丛林";
                        }

                        })()+"\">"
                    td5.innerHTML="<input type=\"text\" value=\""+(function () {
                        switch (parseInt(json.people[i].duanwei)){

                            case 1:
                                return "英勇黄铜";
                            case 2:
                                return "不屈白银";
                            case 3:
                                return "荣耀黄金";
                            case 4:
                                return "华贵铂金";
                            case 5:
                                return "璀璨钻石";
                            case 6:
                                return "超凡大师";
                            case 7:
                                return "最强王者";
                        }

                        })()+"\">"
                        td6.innerHTML="<input type=\"text\" value=\""+json.people[i].zongchangci+"\">"
                        //td6.textContent = json.people[i].zongchangci;
                        td7.innerHTML="<input type=\"text\" value=\""+json.people[i].shengchang+"\">"
                        
                        //td7.textContent = json.people[i].shengchang;
                        td8.textContent = (parseInt(json.people[i].shengchang) / parseInt(json.people[i].zongchangci)).toPercent()
                        td9.innerHTML = "<button class=\"update\">更新</button>"
                        td10.innerHTML = "<button class=\"delete\">删除</button>"
                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tr.appendChild(td4);
                        tr.appendChild(td5);
                        tr.appendChild(td6);
                        tr.appendChild(td7);
                        tr.appendChild(td8);
                        tr.appendChild(td9);
                        tr.appendChild(td10);
                        tbody.appendChild(tr);


                    }


                }
            }
    
        
    }
    if(target.className=="update"){
        var userID=target.parentNode.parentNode.getElementsByTagName("td")[0].textContent;
        var userName=target.parentNode.parentNode.getElementsByTagName("td")[1].firstChild.value;
        var userLevel=target.parentNode.parentNode.getElementsByTagName("td")[2].firstChild.value;
        var userDaqu=target.parentNode.parentNode.getElementsByTagName("td")[3].firstChild.value;
        var userDuanwei=target.parentNode.parentNode.getElementsByTagName("td")[4].firstChild.value;
        var userZongchangci=target.parentNode.parentNode.getElementsByTagName("td")[5].firstChild.value;
        var userShengchang=target.parentNode.parentNode.getElementsByTagName("td")[6].firstChild.value;
        var sql=document.getElementById("output-sql").textContent;
             
        userDuanwei=(function(){
            switch(userDuanwei){
                case "英勇黄铜":
                    return 1;
                    break;
                case "不屈白银":
                    return 2;
                    break;
                case "荣耀黄金":
                    return 3;
                    break;
                case "华贵铂金":
                    return 4;
                    break;
                case "璀璨钻石":
                    return 5;
                    break;
                case "超凡大师":
                    return 6;
                    break;
                case "最强王者":
                    return 7;
                    break;
            }
        })()
        userDaqu=(function(){
            switch(userDaqu){
                case "艾欧尼亚":
                    return 1;
                    break;
                case "恕瑞玛":
                    return 2;
                    break;
                case "无畏先锋":
                    return 3;
                    break;
                case "扭曲丛林":
                    return 5;
                    break;
            }
        })()
        var xhr=new XMLHttpRequest();
        var url="./ajax_update?"+"id="+userID+"&name="+userName+"&level="+userLevel+"&daqu="+userDaqu+"&duanwei="+userDuanwei+"&zongchangci="+userZongchangci+"&shengchang="+userShengchang+"&sql="+sql
        xhr.open("get", url, true);
        //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(null);
        xhr.onreadystatechange=function(){
            if (xhr.readyState != 4) {
            } else {
                //console.log(xhr.responseText);

                while (tbody.hasChildNodes()) {
                    tbody.removeChild(tbody.firstChild);
                }
                var json = eval("(" + xhr.responseText + ")");
                //alert(json.people.length)
                if(json.people.length==0){
                    //alert("NOT FIND");
                    tbody.innerHTML="<h1>NOT FIND</h1>"
                }
                text_sql.textContent = json.sql;
                console.log(json.sql)
                for (var i in json.people) {
                    var tr = document.createElement("tr");
                    var td1 = document.createElement("td");
                    var td2 = document.createElement("td");
                    var td3 = document.createElement("td");
                    var td4 = document.createElement("td");
                    var td5 = document.createElement("td");
                    var td6 = document.createElement("td");
                    var td7 = document.createElement("td");
                    var td8 = document.createElement("td");
                    var td9 = document.createElement("td");
                    var td10 = document.createElement("td");
                    td1.textContent = json.people[i].id;
                    td2.innerHTML="<input type=\"text\" value=\""+json.people[i].name+"\">"
                    //td2.textContent = json.people[i].name;
                    td3.innerHTML="<input type=\"text\" value=\""+json.people[i].level+"\">"
                    //td3.textContent = json.people[i].level;
                    td4.innerHTML="<input type=\"text\" value=\""+(function () {
                        switch (parseInt(json.people[i].daqu)){
                            case 1:
                                return "艾欧尼亚";
                            case 2:
                                return "恕瑞玛";
                            case 3:
                                return "无畏先锋";
                            case 5:
                                return "扭曲丛林";
                        }

                        })()+"\">"
                    td5.innerHTML="<input type=\"text\" value=\""+(function () {
                        switch (parseInt(json.people[i].duanwei)){

                            case 1:
                                return "英勇黄铜";
                            case 2:
                                return "不屈白银";
                            case 3:
                                return "荣耀黄金";
                            case 4:
                                return "华贵铂金";
                            case 5:
                                return "璀璨钻石";
                            case 6:
                                return "超凡大师";
                            case 7:
                                return "最强王者";
                        }

                        })()+"\">"
                        td6.innerHTML="<input type=\"text\" value=\""+json.people[i].zongchangci+"\">"
                        //td6.textContent = json.people[i].zongchangci;
                        td7.innerHTML="<input type=\"text\" value=\""+json.people[i].shengchang+"\">"
                        
                        //td7.textContent = json.people[i].shengchang;
                        td8.textContent = (parseInt(json.people[i].shengchang) / parseInt(json.people[i].zongchangci)).toPercent()
                        td9.innerHTML = "<button class=\"update\">更新</button>"
                        td10.innerHTML = "<button class=\"delete\">删除</button>"
                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tr.appendChild(td4);
                        tr.appendChild(td5);
                        tr.appendChild(td6);
                        tr.appendChild(td7);
                        tr.appendChild(td8);
                        tr.appendChild(td9);
                        tr.appendChild(td10);
                        tbody.appendChild(tr);


                    }


                }
            }
    

    }

 }
}