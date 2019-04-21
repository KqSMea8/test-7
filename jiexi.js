function getAllGoodsinfoByPage(page){
    page = page || 1;
    $.post(url+'/GIFTCARD/goodsinfo/getAllGoodsinfoByPage.do',{page:page},function(data){
        if(data.status=='OK'){
            console.log(JSON.stringify(data))
        }
    });
}
getAllGoodsinfoByPage()