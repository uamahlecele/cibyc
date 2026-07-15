# CIBYC - Can I Borrow Your Converter

CIBYC is a FullStack web application built for WeThinkCode_'s Content Club. 

It features a Node.js/Express backend that integrates with Canon's Camera Control API (CCAPI) to remotely trigger a camera shutter, stream a live viewfinder feed, and automatically save captured images to a local machine — all over a local Wi-Fi connection.

# Inspiration

The project was inspired by a friend of mine who is a photographer for the content club. After each event when he's taken all of the images he'd always ask me this one question, "**Can I Borrow Your Converter?**", so that he could transfer the images to his PC. The answer was always yes ofcourse, but it sparked a thought. 

There has to be a simpler way of doing this, there has to be a way to automate this and thats how CIBYC - "Can I Borrow Your Converter" was born.

It has been the most challenging yet rewarding project I've built so far.


# Tech Stack

**Frontend**

- HTML, CSS, JavaScript

**Backend**

- Node.js
- Express
- Node fs module — writing images to disk

**Camera API**

- Canon CCAPI v1.1.0 — the camera's built-in HTTP control API
 
