// ia.js
const weatherProverbs = [
  "Red sky at night, shepherd's delight.",
  "Rain before seven, fine by eleven.",
  "When dew is on the grass, rain will never come to pass.",
  "Clear moon, frost soon.",
  "If it rains on Easter Sunday, it will rain every Sunday for seven weeks.",
  "A ring around the moon means rain or snow soon.",
  "Seagull, seagull, sit on the sand; it's never good weather when you're on land.",
  "If March comes in like a lion, it will go out like a lamb."
];

function predictWithProverb(temperature, humidity) {
  const index = Math.floor(Math.random() * weatherProverbs.length);
  const proverb = weatherProverbs[index];
 
  
  let advice;
  if (temperature > 30 && humidity > 70) {
    advice = "It's hot and humid. Stay inside!";
  } else if (temperature < 0) {
    advice = "Brrr... It's freezing!";
  } else {
    advice = "Looks decent. Maybe go out with a jacket.";
  }

  return {
    proverb,
    advice
  };
}

module.exports = predictWithProverb;
