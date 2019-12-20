//Use our own localization component instead of i18n, because i18n will change users localization setting---Jiandong
resources={
culture:'en',
getString:function(key){
    return this.data[this.culture][key];
},
data: {
        en: {
            "create_password":"Create Password",
            "password" : "Password",
            "confirm_password":"Confirm Password",
            "btn_create" : "Create",
        },
        fr: {
            "create_password":"Créer un mot de passe",
            "password" : "Mot de passe",
            "confirm_password":"Confirmez le mot de passe",
            "btn_create" : "Créer",
        }
    }
    // {English:"Create Password",French:"Créer un mot de passe"},   //0
    // {English:"Password",French:"Mot de passe"},
    // {English:"Confirm Password",French:"Confirmez le mot de passe"},

    // {English:"The answer is:",French:"La réponse est:"},
    // {English:"Create",French:"Créer"},
    // {English:"Login",French:"S'identifier"},
    // {English:"Start Survey",French:"Commencer l'enquête"},    //6
    // {English:"Settings",French:"Paramètres"},
    // {English:"Result",French:"Résultat"},
    // {English:"About the Survey",French:"A propos de l'enquête"},
    // {English:"Term & Condition",French:"Terme et condition"},
    // {English:"Contact us",French:"Contactez nous"},   //11
    // {English:"Warning",French:"Attention"},
    // {English:"You must provide matched password and secrity question and answer !",French:"Vous devez fournir un mot de passe, une question de sécurité et une réponse correspondants!"},
    // {English:"Ok",French:"D'accord"},
    // {English:"Term and condition",French:"Avis"},  //15
    // {English:"When you continue use this app, that means you automatically agree on this Term and condition.",French:"Lorsque vous continuez à utiliser cette application, cela signifie que vous acceptez automatiquement ces conditions générales."}, //16
};