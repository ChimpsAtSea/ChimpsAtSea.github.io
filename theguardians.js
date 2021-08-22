
let getJSON = function(url, callback) {
 
    return new Promise((resolve, reject) => {
        
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      const status = xhr.status;
      if (status === 200) {
        resolve(xhr.response);
      } else {
        const err = new Error(xhr.response.message)
        err.description = xhr.response.documentation_url;
        err.number = status;
        reject(err);
      }
    };
    xhr.send();
        
    })
};

async function mandrill_latest()
{
  try {
    
    let json = await getJSON('https://api.github.com/repos/ChimpsAtSea/Blam-Creation-Suite/releases');
	json = json[0];
	
    const name = "Mandrill";
    const version = json.name.replace('mandrill-', '');
    const download_url = json.assets[0].browser_download_url;
    
    const result = { name, version, download_url };
    
    window.localStorage.last_mandrill = JSON.stringify(result);
    
    return result;
    
  } catch (err)
  {
    if(window.localStorage.last_mandrill)
    {
      console.log(err);
      return JSON.parse(window.localStorage.last_mandrill)
    }
    else console.error(err);
  }
}

async function aotus_latest()
{
  try {
    let json = await getJSON('https://api.github.com/repos/ChimpsAtSea/Blam-Creation-Suite/releases');
	json = json[0];
    
    const name = "Aotus";
    const version = json.name.replace('aotus-', '');
    const download_url = json.assets[0].browser_download_url;
    
    const result = { name, version, download_url };
    
    window.localStorage.last_aotus = JSON.stringify(result);
    
    return result;
    
  } catch (err)
  {
    if(window.localStorage.last_aotus)
    {
      console.log(err);
      return JSON.parse(window.localStorage.last_aotus)
    }
    else console.error(err);
  }
}

async function setup_mandrill_latest()
{
	var mandrill_info = await mandrill_latest();
	var mandrill_btn = document.getElementById("mandrill-btn");
	var mandrill_text = `Download ${mandrill_info.name} ${mandrill_info.version}`;
	
	mandrill_btn.innerHTML = mandrill_text;
	mandrill_btn.href = mandrill_info.download_url;
}

async function setup_aotus_latest()
{
	var aotus_info = await aotus_latest();
	var aotus_btn = document.getElementById("aotus-btn");
	var aotus_text = `Download ${aotus_info.name} ${aotus_info.version}`;
	
	aotus_btn.innerHTML = aotus_text;
	aotus_btn.href = aotus_info.download_url;
}

setup_mandrill_latest().then(console.log).catch(console.error)
//setup_aotus_latest().then(console.log).catch(console.error)
