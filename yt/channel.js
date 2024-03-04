window.onload = function() {
    let chid = location.search.split('?')[1].split('&')[0];
    let chname = '';
    try{chname = location.search.split('&name=')[1].split('&')[0];}catch(ex){}
    byId('channelname').innerHTML = decodeURI(chname);

  getChannel(chid);


}

async function getChannel(id) {
    
    var videos = await (new Invidious().get().channelVideos(id, {
    }, vdinstance)) 

    if(byId('channelname').innerHTML.length<1) {
        var chname =  await (new Invidious().get().channel(id, {
        }, vdinstance)) 
        byId('channelname').innerHTML = chname.author;
    }

    console.log(videos, typeof videos);
    
    if(videos) {
       // console.log(videos);
       if(!Boolean(videos[0])) {videos = videos.videos}
        //if(typeof videos != 'array') { = videos[0]}
       // console.log(videos);

        let nvids = 100;

        if(Boolean(videos.length)) {nvids=videos.length}

        

        for (let i = nvids-1; i > -1; i--) {
            //console.log(i);
            //let nvids = videos.length;
            try {
                let cl = 255/nvids;
            let rg = Math.min((255-(i*cl)), ((i*cl)-0));
            //console.log(rg);
            //let vdthumb = '';
            //try{vdthumb = as1[i].videoThumbnails[5].url;}catch(ex){}
            let emj = '👁️';
            let hrf = '';
            try{ hrf = `${videos[i].videoId}`;}catch(ex){}
            if(location.search.indexOf('&audio')>-1) {hrf += '&audio'; emj = '🎧'}
            let ttl = false;
            if(videos[i].title) {ttl = videos[i].title}
            else{nvids++}
            if(ttl) {
                byId('results').innerHTML=`<br><a style="color:rgb(${255-(i*cl)},${rg*2},${i*cl})" class='resultlink' target='_blank' href='../watch${protoMap[location.protocol]}?v=${hrf}'>${emj} ${ttl} ↗</a><br>` + byId('results').innerHTML
            }
            } catch (ex) {
                console.log(ex);
            }
            
        }
    }
}



let gmap = {true: 'Video', false: 'Audio'}
let vdinstances = [
    'vid.puffyan.us', //good
    'yt.artemislena.eu', //good
    'invidious.esmailelbob.xyz', //good
    'invidious.lunar.icu', //good
    'invidious.projectsegfau.lt', //good
    'inv.bp.projectsegfau.lt', //good
    'y.com.sb', //good
];
let vdinstance = vdinstances[Math.floor(Math.random() * vdinstances.length)];
//let vdinstance = 'invidious.projectsegfau.lt'
function byId(p){return document.getElementById(p)}