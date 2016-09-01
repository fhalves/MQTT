//Usando o Corretor pública HiveMQ , com um cliente aleatório Id
 

 var client = new Messaging.Client("broker.mqttdashboard.com", 8000, "myclientid_" + parseInt(Math.random() * 100, 10));


 //Quando a conexão websocket/MQTT fica desligada, é acionada por qualquer motivo
 client.onConnectionLost = function (responseObject) {
     alert("connection lost: " + responseObject.errorMessage);
 };

 //É chamado sempre que receber uma mensagem de suas assinaturas
 client.onMessageArrived = function (message) {
     //Fazer alguma coisa com a mensagem automática que recebeu
     $('#messages').append('<span>Tópico: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>');
 };

 //Opções para a conexão
 var options = {
     timeout: 3,
     //Sucesso na conexão
     onSuccess: function () {
         alert("Conectado com sucesso");
            $("#messages").append("<h1> Conectado </h1>");
     },
     //Falha na conexão
     onFailure: function (message) {
         alert("Falha na conexão: " + message.errorMessage);
         $("#messages").append("<h1> Falha na conexão </h1>");
     }
 };

 //Cria um novo objeto Messaging.Message e encaminha para o Broker HiveMQ MQTT
 var publish = function (payload, topic, qos) {
     //Envia mensagem
     var message = new Messaging.Message(payload);
     message.destinationName = topic;
     message.qos = qos;
     client.send(message);
 }
