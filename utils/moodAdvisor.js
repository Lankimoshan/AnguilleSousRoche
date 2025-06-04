function getMoodAdvice(temp) {
  if (temp >= 30) {
    return "It's hot. Dress like you're on vacation in Ibiza.";
  } else if (temp >= 20) {
    return "Perfect temp. Maybe a Hawaiian shirt and flip-flops?";
  } else if (temp >= 10) {
    return "It's a bit chilly. Hoodie and ironic sunglasses recommended.";
  } else if (temp >= 0) {
    return "Wear everything you own. Bonus: it makes a fashion statement.";
  } else {
    return "Cold AF. Stay inside. Or wear a blanket as a cape.";
  }
}

module.exports = getMoodAdvice;
