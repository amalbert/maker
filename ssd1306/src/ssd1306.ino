/*
 ****** ESP_ssd1306_128x64_I2C demo display *********
 *
 * Demo for using ESP_SSD1306 library to communicate
 * a ssd1306 Display with the ESP8266 board
 * through hardware I2C communication
 *
 *********** This code is for the ESP8266***********
 *
 * This is an example for Monochrome OLEDs based on SSD1306 drivers
 *
 * This examples uses the ESP_SSD1306 library which is a copy of the default's Adafruit_SSD1306
 * library with some modifications in order to work in the ESP8266 board.
 * This library works in conjunction with the default's Adafruit_GFX library,  but it's needed
 * to do a little modification in that library in order to work (See README.txt file)
 *
*/

// Import required libraries
#include "ESP_SSD1306.h"    // Modification of Adafruit_SSD1306 for ESP8266 compatibility
#include "Adafruit_GFX.h"   // Needs a little change in original Adafruit library (See README.txt file)
#include <SPI.h>            // For SPI comm (needed for not getting compile error)
#include <Wire.h>           // For I2C comm, but needed for not getting compile error

// Pin definitions
#define OLED_RESET  16  // Pin 15 -RESET digital signal


ESP_SSD1306 display(OLED_RESET); // FOR I2C


void setup(void)
{
  // Start Serial
  Serial.begin(115200);

  // SSD1306 Init
  display.begin(SSD1306_SWITCHCAPVCC);  // Switch OLED
  display.clearDisplay();

  display.setTextSize(2);
  display.setTextColor(WHITE);
  display.setCursor(0,0);
  display.println("TEST");
  display.display();
}

void loop() {

}

