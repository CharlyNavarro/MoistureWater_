#include <DHT.h>
#include <WiFi.h>

#include <WebServer.h>
#include <HTTPClient.h>

#define DHTPIN 4
#define DHTTYPE DHT11

const char *ssid = "ManuelJotillo";
const char *psw = "12345678";


WiFiServer server(80);//No se si sea necesaria


DHT dht(DHTPIN, DHTTYPE);
volatile int Contador;
int PinSensor = 2;

void pulso() {
  Contador++;
}



long calcularFrecuencia() {
  long cantidad;
  noInterrupts(); // Deshabilita interrupciones mientras se lee Contador
  cantidad = Contador * 2; // Multiplica por 2 para obtener pulsos por segundo
  Contador = 0; // Reinicia Contador
  interrupts(); // Habilita interrupciones nuevamente

  // Calcula el caudal en litros por minuto
  float Caudal = cantidad / 7.5;
  return Caudal;
}




void setup() {
 


WiFi.begin(ssid, psw);
 // Serial.begin(115200);
  Serial.println();
  Serial.println("Configurando punto de acceso...");
  
  WiFi.softAP(ssid, psw);

  IPAddress myIP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(myIP);
   Serial.print( WiFi.SSID().c_str());                   //Imprime en el pto. serie el nombre de la red WiFi de conexión
  Serial.print( WiFi.localIP().toString().c_str());

  
  server.begin();
  
  Serial.println("HTTP server started");\

   Serial.begin(115200);
  dht.begin();
  pinMode(PinSensor, INPUT);
  attachInterrupt(digitalPinToInterrupt(PinSensor), pulso, RISING);
}

void loop() {
  delay(1000);

  

  if(WiFi.status() ==WL_CONNECTED){
HTTPClient http;

http.begin("http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943/");
http.addHeader("Content/type", "text/plain");

   





  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);

  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Error obteniendo los datos del sensor DHT11");
    return;
  }

  float hif = dht.computeHeatIndex(f, h);
  float hic = dht.computeHeatIndex(t, h, false);

  Serial.print("Humedad: ");
  Serial.print(h); // es la humedad
  Serial.print(" %\t");
  Serial.print("Temperatura: ");
  Serial.print(t);// es la temperatura
  Serial.print(" *C ");
  Serial.print(f);
  Serial.print(" *F\t");
  Serial.print("Índice de calor: ");
  Serial.print(hic);
  Serial.print(" *C ");
  Serial.print(hif);
  Serial.println(" *F");

  float Caudal = calcularFrecuencia();

  Serial.print("Litros por minuto: ");
  Serial.println(Caudal); //Imprime el caudal
int httpResponseCode = http.POST(String(h));

if(httpResponseCode>0){
String response = http.getString();

Serial.println(httpResponseCode);

Serial.println(response);


}else{

  Serial.print("Error mandando el POST: ");
  Serial.println(httpResponseCode);
}



http.end();
}else{
Serial.println("Error en el wifi");
}

delay(1000);



}
