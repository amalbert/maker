#adafruit mcp9808
Here are the schemes to interface adafruit mcp9808 high sensivity temperature sensor

## With an arduino leonardo
![arduino leonardo](/mcp9808/arduino-mcp9808_bb.png)

## With an esp8266
![esp8266](/mcp9808/esp8266-mcp9808_bb.png)

## Here is the code (upload with arduino IDE)
Started with adafruit mcp9808 sample
```

#include <Wire.h>
#include "Adafruit_MCP9808.h"

// Create the MCP9808 temperature sensor object
Adafruit_MCP9808 tempsensor = Adafruit_MCP9808();
const int ledPin =  16;

void setup() {
  Serial.begin(9600);
  Serial.println("MCP9808 demo");
  pinMode(ledPin, OUTPUT);
  // Make sure the sensor is found, you can also pass in a different i2c
  // address with tempsensor.begin(0x19) for example
  if (!tempsensor.begin()) {
    Serial.println("Couldn't find MCP9808!");
    while (1);
  }
}

void loop() {
  digitalWrite(ledPin, HIGH);
  Serial.println("wake up MCP9808.... "); // wake up MSP9808 - power consumption ~200 mikro Ampere

  tempsensor.shutdown_wake(0);   // Don't remove this line! required before reading temp

  // Read and print out the temperature, then convert to *F
  float c = tempsensor.readTempC();
  float f = c * 9.0 / 5.0 + 32;
  Serial.print("Temp: "); Serial.print(c); Serial.print("*C\t"); 
  Serial.print(f); Serial.println("*F");
  delay(250);
  
  Serial.println("Shutdown MCP9808.... ");
  tempsensor.shutdown_wake(1); // shutdown MSP9808 - power consumption ~0.1 mikro Ampere
  digitalWrite(ledPin, LOW);
  delay(2000);
}
```