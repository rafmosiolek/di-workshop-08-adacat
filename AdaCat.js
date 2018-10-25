class AdaCat {
  constructor(name, owner) {
    this.name = name
    this.owner = owner
    this.hunger = 5
    this.isSleeping = false
    this.size = 30
    this.fatigue = 0;
    this.message = '';
  }

  setHunger(newHunger) {
    if (newHunger < 0) {
      newHunger = 0
    }
    if (newHunger > 10) {
      newHunger = 10
    }
    this.hunger = newHunger
  }

  getDescription() {
    var sleepLine
    if (this.isSleeping) {
      sleepLine = 'Shh! ' + this.name + ' is sleeping.'
    } else {
      sleepLine = this.name + ' is awake.'
    }
    var lines = [
      this.name + ' is a cat. they belong to ' + this.owner + '.',
      'their hunger level is ' + this.hunger + '/10.',
      'they weigh ' + this.size + ' tonnes.',
      'their health is ' + this.getHealth() + '/30.',
      'their fatigue is ' + this.fatigue + '/15.',
      sleepLine,
      this.message
    ]

    return lines.join('\n')
  }

  feed() {
    if(this.isSleeping) {
      this.message = this.name + ' is sleeping! You cannot feed them now!';
      return false;
    }
    var hunger = this.hunger - 1
    this.setTiredness(1);

    if (hunger < 3) {
      this.size = this.size + 1
    }
    this.message = this.name + ' is eating';
    this.setHunger(hunger)
  }

  nap() {
    this.isSleeping = true
    this.fatigue = 0;
    this.message = this.name + ' is sleeping';
  }

  wakeUp() {
    this.isSleeping = false
    this.message = '';
  }

  play() {
    this.setTiredness(3);
    var hunger = this.hunger + 3
    if (hunger > 7) {
      this.size = this.size - 1
    }
    this.setHunger(hunger)
    this.message = this.name + ' is playing';
  }

  getHealth() {
    // the ideal weight for cats is 30
    // this futher they are from this, the less
    // healthy they are
    var sizeDifferenceFromIdeal = Math.abs(this.size - 30)

    // sizeScore starts at thirty, and gets
    // smaller as the cat's size gets further
    // from the ideal weight
    var sizeScore = 30 - sizeDifferenceFromIdeal

    // health score gets lower as the cat gets
    // more hungry
    var healthScore = sizeScore - this.hunger

    if (healthScore < 4) {
      this.message = 'Take your cat to the vet!';
    }

    // max returns the biggest value, so health
    // will never go below 0
    if (healthScore < 0) {
      healthScore = 0
    }
    return healthScore
  }

  setTiredness(value) {
    this.fatigue += value;

    if (this.fatigue <= 0) {
      this.fatigue = 0;
    }

    if (this.fatigue >= 15) {
      this.fatigue = 15;
    }
  }

  getTiredness() {
    return this.fatigue;
  }
}

module.exports = AdaCat
