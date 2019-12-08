window.addEventListener("load", function() {

    class Tab {
        //页面加载获取到的元素都是现有的,对于点击加号后添加上的li与section没有获取到没有绑定到事件
        constructor(out) {
            this.outer = document.querySelector(out);

            this.add = document.querySelector(".top-r").querySelector("span");
            this.ul = this.outer.querySelector("ul");
            this.content = document.querySelector(".tab-bottom");
            this.getEle();
            // this.init();
        }
        init() {
            this.add.onclick = this.addTab.bind(this.add, this);
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].index = i;
                this.lis[i].onclick = this.troggleTab.bind(this.lis[i], this);
                this.removes[i].onclick = this.removeTab.bind(this.removes[i], this);
                this.spans[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab;
            }
        }
        getEle() {
            this.spans = this.ul.querySelectorAll("span");
            this.lis = this.outer.querySelectorAll("li");
            this.sections = this.outer.querySelectorAll("section");
            this.removes = this.outer.querySelectorAll("p");
            this.init();
        }
        troggleTab(that) {
            that.removeClass();
            this.className = "current-top";
            that.sections[this.index].className = "show";
        }
        removeClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = "";
                this.sections[i].className = "";
            }
        }
        addTab(that) { //参数
            that.removeClass();
            var li = '<li class="current-top">' +
                '<span>新标题 </span><p > <em> X </em></p ></li>';
            var section = '<section class="show">内容</section>';
            that.ul.insertAdjacentHTML("beforeend", li);
            that.content.insertAdjacentHTML("beforeend", section);
            that.getEle();
        }
        removeTab(that,e) {
            e.stopPropagation();

            var index = this.parentNode.index;
            that.lis[index].remove();
            that.sections[index].remove();
            that.getEle();
            if (that.outer.querySelector(".current-top")) {
                return;
            }
            index--;
            that.lis[index] && that.lis[index].click();
        }
        editTab() {
            window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty();
            var content = this.innerHTML;
            var input = "<input type='text' value=" + content + ">";
            this.innerHTML = input;
            var inp = this.querySelector("input");
            inp.select();
            inp.addEventListener("blur", function() {
                this.parentNode.innerHTML = inp.value;
            });
            inp.addEventListener("keyup", function(e) {
                if (e.keyCode === 13) {
                    this.parentNode.innerHTML = inp.value;
                }
            })
        }
    }
    new Tab(".outer")
})