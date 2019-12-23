//Use our own localization component instead of i18n, because i18n will change users localization setting---Jiandong
resources={
culture:'en',
getString:function(key){
    return this.data[this.culture][key];
},
<<<<<<< HEAD
data:[
    {English:"Create Password",French:"Créer un mot de passe"},   //0
    {English:"Password",French:"Mot de passe"},
    {English:"Confirm Password",French:"Confirmez le mot de passe"},
    {English:"The answer is:",French:"La réponse est:"},
    {English:"Create",French:"Créer"},
    {English:"Login",French:"S'identifier"},
    {English:"Start my Survey",French:"Commencer l'enquête"},    //6
    {English:"Settings",French:"Paramètres"},
    {English:"My result",French:"Mon résultat"},
    {English:"About the Survey",French:"A propos de l'enquête"},
    {English:"Term & Condition",French:"Terme et condition"},
    {English:"Contact us",French:"Contactez nous"},   //11
    {English:"Warning",French:"Attention"},
    {English:"You must provide matched password and secrity question and answer !",French:"Vous devez fournir un mot de passe, une question de sécurité et une réponse correspondants!"},
    {English:"Ok",French:"D'accord"},
    {English:"Term and condition",French:"Avis"},  //15
    {English:"When you continue use this app, that means you automatically agree on this Term and condition.",French:"Lorsque vous continuez à utiliser cette application, cela signifie que vous acceptez automatiquement ces conditions générales."}, //16
]
=======
data: {
        en: {
            "create_password":"Create Password",
            "password" : "Password",
            "confirm_password":"Confirm Password",
            "the_answer_is:":"The answer is:",
            "btn_create" : "Create",
            "login":"Login",
            "start_survey":"Start Survey",
            "settings":"Settings",
            "result":"Result",
            "about_the_survey":"About the Survey",
            "term_and_condition":"Term & Condition",
            "contact_us":"Contact us",
            "warning":"Warning",
            "match_password_error":"You must provide matched password and secrity question and answer !",
            "ok":"Ok",
            "term_and condition_content":"When you continue use this app, that means you automatically agree on this Term and condition.",
        },
        fr: {
            "create_password":"Créer un mot de passe",
            "password" : "Mot de passe",
            "confirm_password":"Confirmez le mot de passe",
            "the_answer_is:":"La réponse est:",
            "btn_create" : "Créer",
            "login":"S'identifier",
            "start_survey":"Commencer l'enquête",
            "settings":"Paramètres",
            "result":"Résultat",
            "about_the_survey":"A propos de l'enquête",
            "term_and_condition":"Terme et condition",
            "contact_us":"Contactez nous",
            "warning":"Attention",
            "match_password_error":"Vous devez fournir un mot de passe, une question de sécurité et une réponse correspondants!",
            "ok":"D'accord",
            "term_and condition_content":"Lorsque vous continuez à utiliser cette application, cela signifie que vous acceptez automatiquement ces conditions générales.",
        }
    }
>>>>>>> 4bd45e39ddb14c3673507ca9c0bf6cd124f85d91
};