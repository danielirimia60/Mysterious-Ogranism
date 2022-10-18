// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand
}

// Returns a new speciment object
const pAequorFactory = (uniqNo, arr) => {
  return {
    specimenNum: uniqNo,
    dna: arr,
    // Mutates the specimen by replacing one random base with another
    mutate() {
      let mutationIndex = Math.floor(Math.random() * this.dna.length);
      let random = returnRandBase();
      while(this.dna[mutationIndex] === random) {
        random = returnRandBase();
      }
      this.dna[mutationIndex] = random;
      return this.dna
    },
    // Compares two different specimens for DNA compatibility %
    compareDNA(par) {
      const commonBases = [];
      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] == par[i]) {
          commonBases.push(this.dna[i]);
        }
      }
      let percentage = (commonBases.length / this.dna.length) * 100;
      let result = `Specimen no ${this.specimenNum} and specimen no ${par.specimenNum} have ${percentage.toFixed(0)}% DNA in common.`;
      return result
    },
    // Returns true is the specimen will survive or false if it won't
    willLikelySurvive() {
      const cGBases = [];
      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] == 'C' || this.dna[i] == 'G') {
          cGBases.push(this.dna[i]);
        }
      }
      const percent = ((cGBases.length / this.dna.length) * 100).toFixed(0);
      if(percent >= 60) {
        return true
      } else {
        return false
      }
    }
  }
}

// Pushing 30 samples to the batch array where each sample has 60% or more chances of survival
const pushSpecimenToBarch = () => {
  const batch = [];
  let i = 0;
  while(batch.length < 30) {
    let sample = pAequorFactory((i + 1), mockUpStrand());
    if(sample.willLikelySurvive() == true) {
      batch.push(sample)
    }
    i++
  }
  return batch
}

const batch = pushSpecimenToBarch();
