$(function() {
    addLi();
    $(".top input").on("keyup", function(e) { //为输入框绑定键盘抬起监听事件
        if (e.keyCode === 13) { //当按下回车时将输入内容存储到localStorage的数组中
            var content = $(this).val();
            setLocal(content);
            addLi();
            $(this).val("");
        }
    });

    function getLocal() {
        var toDoList = JSON.parse(localStorage.getItem("toDoList")); //从localStorage中获取数据,将字符串转化为数组对象
        if (toDoList != null) {
            return toDoList; //如果原先有数据返回原先数组
        } else {
            return []; //如果原先没有数据返回空数组
        }
    }

    function setLocal(data) { //为toDoList添加新值,先获取toDoList
        var toDoarr = getLocal();
        toDoarr.push({ title: data, done: false }); //向数组中添加对象
        //把添加后的数组添加给localStorage
        addToLocal(toDoarr);
    }

    function addLi() {
        $(".doing ul,.finished ul").empty();
        var toDoListArr = getLocal(); //获取本地存储的数组对象
        var doing = 0;
        var finished = 0;
        $.each(toDoListArr, function(i, ele) {
            var li = $('<li>' +
                '<input type="checkbox" name="" id="do" />' +
                '<span class="inner">' + ele.title + '</span>' +
                '<p index=' + i + '></p>' +
                '</li>')
            if (ele.done) {
                $(".finished ul").prepend($('<li>' +
                    '<input type="checkbox" name="" id="do" checked/>' +
                    '<span class="inner">' + ele.title + '</span>' +
                    '<p index=' + i + '></p>' +
                    '</li>'));
                finished++;
            } else {
                $(".doing ul").prepend(li);
                doing++;
            }
            $(".dot-f").text(finished);
            $(".dot-d").text(doing);
        })
    }
    $(".doing ul").on("click", "p", function() {
        var index = $(this).attr("index");
        var toDoListArr = getLocal();
        toDoListArr.splice(index, 1);
        addToLocal(toDoListArr);
        addLi();
    });
    $(".doing,.finished").on("click", "#do", function() {
        var toDoarr = getLocal();
        var index = $(this).siblings("p").attr("index");
        toDoarr[index].done = $(this).prop('checked');
        addToLocal(toDoarr);
        addLi();
    });

    function addToLocal(data) {
        localStorage.setItem("toDoList", JSON.stringify(data));
    }
    $("ul").on("dblclick", "span", function(e) {
        e.stopPropagation();
        var content = $(this).html();
        $(this).html("<input type='text'value=" + content + ">");

        $("ul").on("blur", "input", function() {
            $(this).parent().html($(this).val());
        });
        $("ul").on("keyup", "input", function(e) {
            if (e.keyCode === 13) {
                $(this).parent().html($(this).val());
            }
        })
    })
})