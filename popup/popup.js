let tab = null

document.addEventListener('DOMContentLoaded', (event) => {
  console.log("started")  
  chrome.tabs.getSelected(null, function (_tab) {
    tab = _tab
    const tabId = tab.id;
    chrome.tabs.sendMessage(tab.id, {msg: 'alive', tabId: tab.id},async function (res) {
      if(res){
        console.log(res)
        if(res.starttime !== "00:00"){
          document.getElementById("start").disabled = true
          document.getElementById("co").innerText="("+res.count+")"
        }
        else{
          document.getElementById("start").disabled = false
          document.getElementById("co").innerText="(0)"
        }  
        document.getElementById("alive").innerText=res.alive
        document.getElementById('starttime').innerText = res.starttime
      }else{
        document.getElementById("co").innerText="(0)"
        document.getElementById("alive").innerText="(0)"
      }
      return true;
    })
  });

  const starttime = document.getElementById('start');
  const stoptime = document.getElementById('Ending');
  const download = document.getElementById('download');
  const closee = document.getElementById('closee');
  const reset = document.getElementById('reset');

  closee.addEventListener('click', function () {
    window.close();
  });

  document.getElementById("body").addEventListener("mouseenter", ()=>{
  
  chrome.tabs.sendMessage(tab.id, {msg: 'alive', tabId: tab.id}, function (res) {
    if(res){
      console.log(res)
      if(res.starttime !== "00:00"){
        document.getElementById("start").disabled = true
        document.getElementById("co").innerText="("+res.count+")"
      }
      else{
        document.getElementById("start").disabled = false
        document.getElementById("co").innerText="(0)"
      }  
      document.getElementById("alive").innerText=res.alive
      document.getElementById('starttime').innerText = res.starttime
    }else{
      document.getElementById("co").innerText="(0)"
      document.getElementById("alive").innerText="(0)"
    }
    return true;
    })
  });
  
  reset.addEventListener('click',()=>{
    chrome.storage.sync.set({'stime':"00:00"})
    document.getElementById('starttime').innerText = "00:00"
    document.getElementById("start").disabled = false
    chrome.storage.sync.get('stime',(result)=>{
      chrome.tabs.sendMessage(tab.id, {msg: 'reset', 'z': result.strTime, tabId: tab.id}, function (res) {
        return true
      })
    });
  })

  starttime.addEventListener('click', ()=>{
    date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes(); 
    var strTime =""
    if (hours < 10)
      strTime = '0'
    strTime +=  hours + ':' 
    if( minutes < 10)
      strTime +='0' 
    strTime += minutes
    document.getElementById('starttime').innerText = strTime;
    document.getElementById("start").disabled = true
    document.getElementById("Ending").disabled = false
    chrome.tabs.sendMessage(tab.id, {msg: 'startmonitor', tabId: tab.id}, function (res) {
      return true;
    })
    return true;
  })

  stoptime.addEventListener('click', ()=>{
  if (document.getElementById('starttime').innerText != "00:00" ){
    date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var strTime =""
    if (hours < 10)
      strTime = '0'
    strTime +=  hours + ':' 
    if( minutes < 10)
      strTime +='0' 
    strTime += minutes 
    chrome.tabs.sendMessage(tab.id, {msg: 'stopmonitor', 'z': strTime, tabId: tab.id}, function (res) {
      return true;
    })
    document.getElementById("start").disabled = false
    document.getElementById("Ending").disabled = true
    document.getElementById('starttime').innerText = "00:00"
    document.getElementById("co").innerText="(0)"
    chrome.storage.sync.set({'stime': "00:00"});
    return true;
    }
  })

  download.addEventListener('click',()=>{
    chrome.tabs.sendMessage(tab.id, {msg: 'download', tabId: tab.id}, function (res) {
      return true;
    })
  })
});

