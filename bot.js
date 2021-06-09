const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const proxyChain = require('proxy-chain');
const os = require('os');
const uniqueFilename = require('unique-filename');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
const del = require('del');

global.username = ''
global.password = ''
global.discordlogin = ''
global.chan = 

const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: '' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
      },
      visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  )

puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({blockTrackers: true}))

async function extraction(s){
    var a = []
    const currentdir = __dirname.concat('/trash')
    var randomTmpfile = uniqueFilename(currentdir)
    fs.mkdir(randomTmpfile, function(err) {
        if (err) {
            console.log(err)
          } else {
            console.log(randomTmpfile)
      }
    })

    var htmlpath =  randomTmpfile.concat('/answer.html')
    var sspath =  randomTmpfile.concat('/ss.png')
    const pagenew = await browser.newPage()
    await pagenew.setDefaultNavigationTimeout(30000)
    try{
    
        await pagenew.setRequestInterception(true);
            pagenew.on('request', (req) => {
                    if(req.resourceType() == 'image'){
                        req.abort();
                    }
                    else {
                        req.continue();
                    }
                });
            await pagenew.goto(s, {
        waitUntil: 'networkidle2'
    })

    //checking if question has been answered.
      if (await pagenew.evaluate("$('.hangTight').is(':visible')")){
        //var msg1 = message.author.send("The question has not been answered yet.");  
        await pagenew.close()
        return a[0]='h';              

      }
      //checking if question has been answered.
      var stepscheck = await pagenew.evaluate("$('.steps-header').length");
      if (s.includes('questions-and-answers') && stepscheck > 0){
          //var msg1 = message.author.send("The question has not been answered yet.");  
          await pagenew.close()
          return a[0]='h';              
      }       


      if (s.includes('questions-and-answers') && stepscheck < 1) {
        var element = await pagenew.$('.question-body-text');
        if (element == null){
          //var msg1 = message.author.send("The question has not been answered yet.")
          await pagenew.close()
          return a[0]='h';}
           
          element_property = await element.getProperty("innerHTML")
              var inner_html = await element_property.jsonValue()
              var element2 = await pagenew.$('.answer-given-body')
              element_property2 = await element2.getProperty("innerHTML")
              var inner_html2 = await element_property2.jsonValue()
              const regex = /[\"]+[\/]+[\/]/g
              let m
              while ((m = regex.exec(inner_html)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                
                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    inner_html = inner_html.replace(match, '"http://');
                });}
                let n;

                while ((n = regex.exec(inner_html2)) !== null) {
                 // This is necessary to avoid infinite loops with zero-width matches
                 if (n.index === regex.lastIndex) {
                 regex.lastIndex++;
                 }
    
                    // The result can be accessed through the `m`-variable.
                 n.forEach((match, groupIndex) => {
                    inner_html2 = inner_html2.replace(match, '"http://');
                     });}
                
                     const part1 = '<!DOCTYPE html><html> <div class="main"> </h2><button class="accordion active"><b>Question:</b></button> <html> <head></head> <body>'
                     const part2 = inner_html
                     const part3 = '</body> </html> </h2><button class="accordion active"><b>Answer:</b></button> <html> <head></head> <body>'
                     const part4 = inner_html2
                     const part5 = '</body> </html>'
                     const part6 = ' <script> var acc = document.getElementsByClassName("accordion"); var i; for (i = 0; i < acc.length; i++) { acc[i].addEventListener("click", function () { this.nextElementSibling.classList.toggle("collapse") this.nextElementSibling.classList.toggle("expand") }); } </script></body><head><meta name="viewport" content="width=device-width, initial-scale=1"><style> .accordion { background-color: #fc2403; color: #00000; cursor: pointer; padding: 15px; width: 100%; border: solid black 1px; text-align: left; font-size: 15px; height:auto; overflow:hidden; filter: brightness(100%); transition:filter 0.15s; } .accordion:hover { filter: brightness(125%); border: solid black; } .panel { background-color: white; height:auto; opacity: 1; padding: 0 18px; max-height:500em; border-style: groove; transition: max-height 0.5s ease; overflow:hidden; } .panel.colapse { max-height:0em; border-style: none; } .panel.expand{ max-height:500em; border-style: groove; } .answer { height:auto; max-height:500em; transition: max-height 0.5s ease; } .hidden { display: none!important;} .answer.colapse { max-height:0em; } .answer.expand{ max-height:500em; } .question { padding: 0 18px; border: groove; overflow:hidden; } .main { background-color: white; } </style></head>'
       
                     var finalhtml = part1 + part2 + part3 + part4 + part5 + part6
                     fs.writeFile(htmlpath, finalhtml, function(err) {
                         if (err) return console.log(err);
       
                     })
                     pagenew.close()
                     a[0] = 't'
                     a[1] = htmlpath
                     return a;
                    }
                     else{
                        const element = await pagenew.$('.question')
              var inner_html = ""
              if (element != null){
                element_property = await element.getProperty("innerHTML")
                inner_html = await element_property.jsonValue();
             }

              var part7 = " "
              var i
              const numberofli = await pagenew.evaluate("$('.answer').length")
              for (i=0; i<numberofli; i++){
                const result = await pagenew.evaluate(i => {
                  var elem = $('.answer')
                  return elem[i].outerHTML;
                }, i)
                part7 = part7 + `<button class="accordion active"><b>Step ${i+1}</b></button> <div class="panel colapse expand"> ${result} </div> `;

              }

              const part1 = ' <!DOCTYPE html><html> <div class="main"> <h2>Question: </h2> <div class="question">'
              const part2 = inner_html
              const part3 = '</div><h2>Answer : </h2>'
              const part5 = ` <script>
                  var acc = document.getElementsByClassName("accordion");
                  var i;
                  for (i = 0; i < acc.length; i++) {
                      acc[i].addEventListener("click", function () {
                          //panel.style.height = "0";
                          //this.nextElementSibling.innerHTML =JSON.stringify(this.nextElementSibling.className);
                          this.nextElementSibling.classList.toggle('collapse')
                          this.nextElementSibling.classList.toggle('expand')
                          //alert(this.nextElementSibling)

                      });
                  }
              </script></body><head><meta name="viewport" content="width=device-width, initial-scale=1"><style> .accordion { background-color: #fc2403; color: #00000; cursor: pointer; padding: 15px; width: 100%; border: solid black 1px; text-align: left; font-size: 15px; height:auto; overflow:hidden; filter: brightness(100%); transition:filter 0.15s; } .accordion:hover { filter: brightness(125%); border: solid black; } .panel { background-color: white; height:auto; opacity: 1; padding: 0 18px; max-height:500em; border-style: groove; transition: max-height 0.5s ease; overflow:hidden; } .panel.colapse { max-height:0em; border-style: none; } .panel.expand{ max-height:500em; border-style: groove; } .answer { height:auto; max-height:500em; transition: max-height 0.5s ease; } .answer.colapse { max-height:0em; } .answer.expand{ max-height:500em; } .question { padding: 0 18px; border: groove; overflow:hidden; } .main { background-color: white; } </style></head>`

              var finalhtml = part1 + part2 + part3 + part7 + part5
              fs.writeFile(htmlpath, finalhtml, function(err) {
                  if (err) return console.log(err);

              })
              pagenew.close()
              a[0] = 't'
              a[1] = htmlpath
              return a;}//end of else

}catch(error) {
        console.error(error)
        await pagenew.close()
        return a[0] = 'f';
    }


}



async function process() {
  const oldProxyUrl = ''
  const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl)
  console.log(newProxyUrl)

        global.browser = await puppeteer.launch({
        args: [
         `--proxy-server=${newProxyUrl}`,
         '--no-sandbox',
         '--disable-setuid-sandbox',
         '--disable-dev-shm-usage',
         '--disable-accelerated-2d-canvas',
         '--disable-gpu',
         '--window-size=1920x1080',

         ],
        headless: false,
        userDataDir: 'data',
    })

    global.page = await browser.pages();
    
    console.log("Going to Chegg");

    await page[0].goto("https://www.chegg.com/auth?action=login&redirect=https%3A%2F%2Fwww.chegg.com%2F", {
        waitUntil: 'networkidle2'
    })

   
    
    try{console.log("Logging in")

    await page[0].type('#emailForSignIn', username, {
        delay: 100
    })

    await page[0].type('#passwordForSignIn', password, {
        delay: 100
    });}

    catch(err){
      console.log('i aint pritning ');
    }

    try{await page[0].click('[name="login"]');}
    catch(err){console.log('cant login button error');} // Types slower, like a user
    console.log("Ready!")
}






client.on('ready', () => {
    process();
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', message => {

    if (message.channel.id == chan) {
        if (message.content.startsWith(`-c`)) 
    {
        message.delete()
        const s = message.content.replace('-c', '')
        if (!s.includes('https://www.chegg.com/homework-help')) {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#C91019')
                .setTitle('Error')
                .setDescription('No no no! Chegg links only!')
                .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461');
            message.channel.send(message.author.toString(), {
                embed: errorEmbed
            })
        }
        else{
            doodoo(s)
            async function doodoo(s)
            {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor('#C91019')
                .setTitle('Please Wait...')
                .setDescription('We are processing your answer')
                .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461');
            var msg = await message.channel.send(message.author.toString(), {
                embed: errorEmbed
            })

            const ar = await extraction(s)
            console.log(ar)
            if(ar[0] == 't')
            {
                htmlpath = ar[1]
                const processEmbed = new Discord.MessageEmbed()
                .setColor('#21f800')
                .setTitle('Success')
                .setDescription('Request receieved, answer will be sent to your DMs shortly.')
                .setThumbnail('https://images-ext-2.discordapp.net/external/OVUlwF6n8j6wANCkwDzG_Rb2ivqCd9bRF10DC2Z8lS0/https/s5.gifyu.com/images/ezgif.com-optimized7ce94c5d4a783cb.gif');

            msg.edit(processEmbed)


            const processEmbed1 = new Discord.MessageEmbed()
                  
                  .setColor('#21f800')
                  .setTitle("Your Chegg Answer is ready! ")
                  .setDescription("Make sure to download the html file and open in a browser to view the solution.")  
  
                  var msg = message.author.send({
                      embed: processEmbed1
                  });   
                  message.author.send({
                      files: [htmlpath]
                  });        
                  
                  //var answerfol = htmlpath.replace('/answer.html','')
                  //const deletedPaths = await del([answerfol]);

            }
            else if(ar[0] == 'h')
            {
                const errorEmbed = new Discord.MessageEmbed()
                .setColor('#C91019')
                .setTitle('Try another link')
                .setDescription('Question has not been answered yet')
                var msg1 = message.author.send("The question has not been answered yet.");  
                msg.edit(errorEmbed)

            }
            else{
                console.log('Some Error ;(') 
                const errorEmbed = new Discord.MessageEmbed()
                .setColor('#C91019')
                .setTitle('Error')
                .setDescription('Some Error Occurred.')   
                msg.edit(errorEmbed)
        
        
        }
            }
        }   
    }
    }

  });
client.login(discordlogin);
