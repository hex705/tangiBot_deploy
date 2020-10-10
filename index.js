const Discord = require("discord.js");
const config = require("./config.json");

// test bot channels and roles

  // //Channel IDs
  // const Welcome_to_tangible = '764341587010256916';
  // const Whats_your_section = '764341636997185536';
  //
  // // roles
  // const Tuesday9 = '764325487362572309';
  // const Thursday3 = '764325571894968322';
  // const Thursday6 = '764325539166814219';
  //
  // const Community = '764344293656625153';
  // const Maker     = '764563271797571650';


// live roles
//Channel IDs
const Welcome_to_tangible = '757719742068031598';
const Whats_your_section = '764337974505898004';

// roles
const Tuesday9 = '759138756112023574';
const Thursday3 = '759139122828541985';
const Thursday6 = '759139214188085299';

const Community = '764344811439390760';
const Maker     = '764611244677922858';

const timer = 15000;

const prefix = "!";
const sectionPrefix = "my section";

const bot = new Discord.Client({
  partials: ['MESSAGE', 'REACTION']
});

bot.on('ready', () => {
  console.log("Logged in as " + bot.user.tag);
});

bot.on('guildMemberAdd', member => {
  member.send("Welcome to the tangible server, " + member.user.username +"! Read the <#" + Welcome_to_tangible + "> channel to begin. Please note that you will not be able to create channels or @your_section until you have read and responded at the <#" + Welcome_to_tangible + "> channel.");
  console.log(member.user.username + " has joined the server!");
  message.member.roles.add(Maker);
});

bot.on('message', async (message) =>
{
      if (message.author.bot) return;  // is this a bot exit

      //  https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js

      if (message.channel.id == Welcome_to_tangible){//3
        //console.log('User sent a message in the welcome-makers channel');

        if (message.content.toLowerCase().startsWith("i agree")){
          //  bot.channels.cache.get(archiveChannel).send(message.content);
          //console.log("Message sent to what-the-heck-is-new-media?");
          newUSER('New Median', message);
          //console.log(message.guild.roles);
        }
        else{//2
          if(message.author.bot) return;
          else{//1
            message.reply("Read the instructions again. You must respond exactly as indicated.").then(sentMessage => {sentMessage.delete({timeout : timer})});
            message.delete({timeout : timer});
          } // 1
        }//2
      }//3


      if (message.channel.id == Whats_your_section){
        //console.log('User sent a message in the welcome-makers channel');
        let whichOne = message.content.toLowerCase();

        if ( whichOne == "tue9" || whichOne == "thu3" || whichOne == "thu6"){
          console.log("Section Message ok");
           newSection(whichOne, message);
          //console.log(message.guild.roles);
        }
        else{
          if(message.author.bot) return;
          else{
            message.reply("Read the instructions again. You must respond exactly as indicated.").then(sentMessage => {sentMessage.delete({timeout : timer})});
            message.delete({timeout : timer});
          }
        }
      } // end whats your section

});    //end on message

function newUSER(roleName, message){
  console.log("newUSER_fxn_ arrival!");
  message.channel.send("By agreeing to the rules of engagement you have leveled up to **tangible_Community** member -- and with it, channel creation rights.  Please us this super-power wisely. \n\n Do NOT delete channels. \n\n One more step, visit <#" + Whats_your_section + "> to gain *@your_section* rights").then(sentMessage => {sentMessage.delete({timeout : timer*2})});
  message.delete({timeout : timer});
  message.member.roles.add(Community);
//  console.log("New Median " + message.author.username + " added to the party");
  message.member.send(message.author.username +  ", you have successfully leveled up to **tangible_Community** member.  \n\nYou can now create channels in this server -- please do so with care and consideration! \n\nPlease visit <#" + Whats_your_section + "> to learn how to earn *@your_section* messaging rights. ");
}

function newSection(theSection, message){
  var roleToAdd;
  var sectionRoles = [Tuesday9,Thursday3,Thursday6];


  console.log("newSection -- arrival " + theSection);
  switch ( theSection ) {
    case "tue9":
      roleToAdd = 0;
      console.log("Tue9 " + roleToAdd);
    break;
    case "thu3":
      roleToAdd = 1;
      console.log("Thu3 " + roleToAdd);
    break;
    case "thu6":
      roleToAdd = 2;
      console.log("Thu6 " + roleToAdd);
    break;
  } // end swtich

  if (message.member.roles.cache.find(r => r.name === "Tue9")) { // check if an alt section was assigned
    console.log("remove tuesday section");
    message.member.roles.remove(sectionRoles[0]);// remove that section if found
  }
  if (message.member.roles.cache.find(r => r.name === 'Thu3')){ // check if an alt section was assigned
    console.log("remove tuesday section");
    message.member.roles.remove(sectionRoles[1]);// remove that section if found
  }
  if (message.member.roles.cache.find(r => r.name === 'Thu6')){ // check if an alt section was assigned
    console.log("remove tuesday section");
    message.member.roles.remove(sectionRoles[2]);// remove that section if found
  }

  message.member.roles.add(sectionRoles[roleToAdd]);// add the one you want


  console.log(message.author.username + " added to " + theSection);
  message.channel.send("You have been added to your course section -- you can now *@your_section* if needed -- you will find section peers organized together in the Member List.  If you want channel creation powers and have not visited  <#" + Welcome_to_tangible+ ">, do so now.").then(sentMessage => {sentMessage.delete({timeout : timer})});
  message.delete(); // 2 seconds ?  //message.delete({timeout : timer*4});
  message.member.send(message.author.username + " You have been added to your section and can now *@your_section* if needed.  Please avoid being spammy.");
}

bot.login(config.BOT_TOKEN);
