let headerRender=(function () {
   let $headerBox=$('.headerBox'),
       $navMenu=$headerBox. find('.navMenu'),
       $navBox=$('.navBox');

   let navFold=function navFold() {
       if($navBox.css('display')==='none'){
           $navBox.css('display','block');
       }else {
           $navBox.css('display','none')
       }

   }

    return {
        init:function () {
           $navMenu.tap(navFold)|| $navMenu.on('click',navFold)
        }
    }
})()
headerRender.init();

let bannerRender=(function () {
    let $bannerBox=$('.bannerBox'),
        $wrapper=$bannerBox.find('.swiper-wrapper');

    let queryData=function queryData() {
        return new Promise(resolve => {
            $.ajax({
                url:'banner.json',
                dataType:'json',
                success:resolve
            })
        })
    }

    let bindHtml=function bindHtml(res) {
        let HTML=``;
        res.forEach((item)=>{
            let {img,desc}=item;
            HTML+=` <div class="swiper-slide">
                <img src='${img}' alt="">
                <p>${desc}</p>
            </div>`

        })
        $wrapper.html(HTML);
    }

    let swiperInit=function swiperInit() {
        let swiper=new Swiper('.bannerBox',{
            loop:true,
            autoplay:3000,
            autoplayDisableOnInteraction: false,
            pagination:'.swiper-pagination',
            paginationType:'fraction'
      })
    }
    return {
        init:function () {
         let promise=queryData();
         promise.then(bindHtml).then(swiperInit)
        }
    }
})()
bannerRender.init();

let  messageRender=(function messageRender() {
    let $messageBox=$('.messageBox'),
        $wrapper=$messageBox.find('.swiper-wrapper');

    let queryData=function queryData() {
        return new Promise(resolve => {
            $.ajax({
                url:'aside.json',
                dataType: 'json',
                success: resolve
            })
        })
    }

    let bindHtml=function bindHtml(res) {
        let HTML=``;
        res.forEach(item=>{
            let {title}=item;
            HTML+=`<div class="swiper-slide">
                   <a href="#" >${title}</a>
               </div>`
        })
        $wrapper.html(HTML);
        $messageBox.css('display','block')
    }
    let swiperInit=function swiperInit() {
        let swiper=new Swiper('.messageCon',{
            loop:true,
            autoplay:3000,
            direction:'vertical'
        })
    }

    return {
        init:function () {
            let promise=queryData();
            promise.then(bindHtml).then(swiperInit);
        }
    }
})()
messageRender.init()


let newsRender=(function () {
    let $newsBox=$('.newsBox'),
        $container=$newsBox.find('.container')

    let queryData=function queryData() {
        return new Promise(resolve => {
            $.ajax({
                url:'news.json',
                dataType:'json',
                success:resolve
            })
        })
    }

    let bindHtml=function bindHtml(res) {
        res=res[0].news;
        let HTML=``;
        res.forEach(item=>{
        let {title,src,comment,imgList}=item;
            console.log(src);
            if(!src){
            HTML+=`<li class="newsitem imgBox">
                <h3>${title}</h3>
                <div>
                    <img src="${imgList[0]}" alt="" class="pic">
                    <img src="${imgList[1]}" alt="" class="pic">
                    <img src="${imgList[2]}" alt="" class="pic">
                </div>
                <span >${comment}</span>
                <i class="icon-comment"></i>
            </li>`
          return;
        }
        HTML+=` <li class="newsitem">
                <img src="${src}" alt="" class="pic">
                <h3>${title}</h3>
                <span>${comment}</span>
                <i class="icon-comment"></i>
            </li>`
        })
        $container.html(HTML);
        $newsBox.css('display','block');
    }

    let scrollInit=function scrollInit() {
        let scroll=new IScroll('.newsBox',{
            mouseWheel: true,
            scrollbars: true
        })
    }
    return {
        init:function () {
            let promise=queryData();
            promise.then(bindHtml).then(scrollInit);
        }
    }
})()
newsRender.init()
