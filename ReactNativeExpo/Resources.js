//Use our own localization component instead of i18n, because i18n will change users localization setting---Jiandong
resources={
culture:'en',
getString:function(index){
   if(this.culture==='fr')return this.data[index].French;
   else return this.data[index].English;
},
data:[
    {English:"Create Password",French:"Créer un mot de passe"},
    {English:"Password",French:"Mot de passe"},
    {English:"Confirm Password",French:"Confirmez le mot de passe"},
    {English:"The answer is:",French:"La réponse est:"},
    {English:"Create",French:"Créer"},
    {English:"Login",French:"S'identifier"},
    {English:"Start Survey",French:"Commencer l'enquête"},
    {English:"Settings",French:"Paramètres"},
    {English:"Result",French:"Résultat"},
    {English:"About the Survey",French:"A propos de l'enquête"},
    {English:"Term & Condition",French:"Terme et condition"},
    {English:"Contact us",French:"Contactez nous"},
    {English:"Warning",French:"Attention"},
    {English:"You must provide matched password and secrity question and answer !",French:"Vous devez fournir un mot de passe, une question de sécurité et une réponse correspondants!"},
    {English:"Ok",French:"D'accord"},
]
};