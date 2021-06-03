student = [];
attendees = []
dead = []
dict = new Object();
var time
var starttime = "00:00"
var stoptime = 0,hh,mm,ss
var batman
flag = 0
n=0
venom=0
sl=0
voot = 0
let senderRes1 = function () {
}
first = 0

window.onload = ()=>{
  window.addEventListener('mousemove',hello)
  window.addEventListener("mousedown",second)
  window.addEventListener('beforeunload', function (e) { 
    if(venom === 1){
      alert("hi")
      e.preventDefault(); 
      e.returnValue = '';
      clearTimeout(batman)
      saveTextFile(1)
    }
  });
}

function hello(){
  try {
    if(first === 0){
      if(document.getElementsByClassName("QkY02").length !== 1 ){
        setTimeout(function(){
          alert("Welcome to google meet, you are using Google Meet Attendance Monitor");
          if(document.getElementsByClassName('NzPR9b').length !==0){
            document.getElementsByClassName('NzPR9b')[0].children[2].style.display="none"
            document.getElementsByClassName('NzPR9b')[0].children[0].click()
          }
          setTimeout(function(){
            try {
              window.removeEventListener('mousemove',hello)
            } catch (error) {
            }
          },1000);
        }, 1000);
        first = 1
      }
    }
  } catch (error) {
    first = 0
    hello() 
  }
}

function second(){
  setTimeout(()=>{
    if(document.getElementsByClassName("CRFCdf").length !== 0 && first === 1 && venom === 1 ){
      alert("I think you missed collecting attendence.\nClick on ok button, with in a minute file will be automatically downloaded")
      clearTimeout(batman)
      saveTextFile(1)
    }
  },1000)
}

window.onkeydown = function( event ) {
  if ( event.keyCode == 27 ) {
    alert("dont press esc") 
    setTimeout(function(){  
      document.getElementsByClassName('NzPR9b')[0].children[0].click()
    }, 500);
  }
};

chrome.runtime.onMessage.addListener(
  async function (message, sender, sendResponse) {
    senderRes1 = sendResponse;
    const {msg, z, tabId} = message;
    if (msg === 'startmonitor') {
      time = 30000*2
      rtime = ""
      date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes(); 
      if (hours < 10)
        rtime = '0'
      rtime +=  hours + ':' 
      if( minutes < 10)
        rtime +='0' 
      rtime +=minutes
      starttime = rtime 
      fun()  
    }else if(msg === 'reset'){
      time = 0
      clearTimeout(batman)
      document.getElementsByClassName('s2gQvd')[0].scrollBy(0,-10000)
      starttime = 0
      dead = []
      venom = 0
    } else if( msg === 'download') {
      fun1()
    } else if( msg === "stopmonitor"){
      try {
        if(venom == 1){
          time = 0
          stoptime = z
          dead = []
          clearTimeout(batman)
          save()
        }
      } catch (error) {
      }
    } else if( msg === 'alive'){
      senderRes1({count:student.length, alive: document.getElementsByClassName('rua5Nb')[0].innerText,starttime:starttime})
    }
});

function fun1(){
  rtime = ""
  date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes(); 
  if (hours < 10)
    rtime = '0'
  rtime +=  hours + ':' 
  if( minutes < 10)
    rtime +='0' 
  rtime +=minutes 
  const ele = document.getElementsByClassName('s2gQvd')[0]
  if (venom == 0) {
    if (sl == 1) {
      x = document.getElementsByClassName('GvcuGe')[0].childElementCount
      for (i = 0; i < x; i++) {
        attendee = document.getElementsByClassName('GvcuGe')[0].children[i].children[0].children[1].children[0].children[0].innerText
        attendees.push(attendee);
      }
      t = attendees
      var utemp = Array.from(new Set(t))
      for (i = 0; i < utemp.length; i++) {
        student[n] = utemp[i]
        n += 1
      }
      saveTextFile(0)
    } else {
      alert("Collecting attendence")
      sl = 1
      setTimeout(fun1(), 5000)
    }
  }
  else {
    saveTextFile(0)
  }
}

function fun(){
  rtime = ""
  temp = []
  date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if (hours < 10)
    rtime = '0'
  rtime +=  hours + ':' 
  if( minutes < 10)
    rtime +='0' 
  rtime += minutes 
  const ele = document.getElementsByClassName('s2gQvd')[0]
  //scrooll tesesa
  x = document.getElementsByClassName('GvcuGe')[0].childElementCount
  for (i = 0; i < x; i++) {
    attendee = document.getElementsByClassName('GvcuGe')[0].children[i].children[0].children[1].children[0].children[0].innerText
    attendees.push(attendee);
  }
  //lkjdflkd
  temp = attendees
  senderRes1({ count: student.length, alive: temp.length })
  var utemp = Array.from(new Set(temp))
  b = new Set(utemp)
  c = new Set(student)
  dead = Array.from(new Set([...c].filter(x => !b.has(x))))
  for (i = 0; i < utemp.length; i++) {
    if (!dict[utemp[i]]) {
      student[n] = utemp[i]
      n += 1
      dict[utemp[i]] = [1, 1, [rtime]];
    } else {
      if (dict[utemp[i]][1] == 0) {
        dict[utemp[i]][2].push(rtime)
        dict[utemp[i]][1] = 1
      }
      dict[utemp[i]][0] += 1
    }
  }
  if (venom != 0)
    for (i = 0; i < dead.length; i++) {
      if (dict[dead[i]][1] == 1) {
        dict[dead[i]][1] = 0
        dict[dead[i]][2].push(' (' + dict[dead[i]][0] + " min)")
        dict[dead[i]][2].push(" [" + rtime + "]   ")
        dict[dead[i]][0] = 0
      }
      voot = 1
    }
  if (venom == 0) {
    alert("Monitoring started sucessfully")
    attendees = []
    student = []
    dict = {}
    n = 0
    venom = 1
  }
  //console.log(time)
  attendees = []
  batman = setTimeout(function () {
    fun()
    flag += 1
  }, time);
}

function saveTextFile(o) {
  rtime = ""
  date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes(); 
  if (hours < 10)
    rtime = '0'
  rtime +=  hours + ':' 
  if( minutes < 10)
    rtime +='0' 
  rtime +=minutes 
  function twoDigits(v) {
      return ('0' + Number(v)).slice(-2)
  }
  let studentsorted  = student.sort();
  let gen = studentsorted
  if(o == 1){
    gen = []
    for(i=0;i<studentsorted.length;i++){
      if(dict[studentsorted[i]][1] == 1){
        dict[studentsorted[i]][2].push(" ("+dict[studentsorted[i]][0]+" min)") 
        dict[studentsorted[i]][2].push(" ["+rtime+"]")
      }
      gen[i]=studentsorted[i]+'\t \t'+dict[studentsorted[i]][2].join(' ')
    }
  }
  let today = new Date(), d = today.getDate(), m = today.getMonth() + 1, y = today.getFullYear()
  let cdate = y + '-' + twoDigits(m) + '-' + twoDigits(d),
      ctime = today.getHours() + ':' + twoDigits(today.getMinutes())
  let header =
      `Attendance for : Class List on ${cdate} Start Monitored at ${starttime} Total members attended : ${studentsorted.length}\n\nNote:- If the participants who are Joined early then monitor time\nthen based on the monitor time attendence is considered\n\n`;
  let txt = gen.join('\n');
  let blob = new Blob([header + txt], {type: 'text/plain;charset=utf-8'})
  let temp_a = document.createElement("a")
  temp_a.download = `Meet attendance -(${cdate} : ${ctime}).csv`
  temp_a.href = window.webkitURL.createObjectURL(blob)
  temp_a.click()
  if( o == 1 ){
    dict = {}
    n=0
    starttime = "00:00"
    venom = 0
  }
  if( sl == 1){
    sl = 0
    attendees = []
    student = []
    n = 0
    venom = 0
    starttime ="00:00"
  }
}

function save(){
  x=starttime.split(':')
  var date1 = new Date(2000, 0, 1,  x[0], x[1]);
  x=stoptime.split(':')
  var date2 = new Date(2000, 0, 1, x[0], x[1]);
  if (date2 < date1) {
      date2.setDate(date2.getDate() + 1);
  }
  var diff = date2 - date1;
  var msec = diff;
  hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  mm = Math.floor(msec / 1000 / 60);
  msec -= mm * 1000 * 60;
  ss = Math.floor(msec / 1000);
  msec -= ss * 1000;
  saveTextFile(1) 
}