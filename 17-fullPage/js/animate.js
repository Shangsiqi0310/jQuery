function animate(obj, target, callback) { //方法传入参数
    clearInterval(obj.timer);
    obj.timer = setInterval(function() { //定义定时器
        var step = (target - obj.offsetLeft) / 10; //以其距离父亲的left作为起始点
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) { //当到达指定地点的时候清楚定时器,如果有回调函数调用回调函数

            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';

    }, 20);
}