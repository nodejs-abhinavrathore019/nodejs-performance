const validateLevelValue = (level: any) => {
  const levelValue = Number.parseInt(level, 10);

  if (Number.isNaN(levelValue) === true) {
    return 0;
  }

  if (levelValue < 0) {
    return 0;
  }

  return levelValue;
};

const parseAffectionLevel = (cat: any) => {
  let level = validateLevelValue(cat?.affection_level ?? 0);

  const stars = [];

  while (level) {
    level -= 1;
    stars.push('★');
  }

  return stars.join(' ');
};

const parseAdaptability = (cat: any) => {
  let level = validateLevelValue(cat?.adaptability ?? 0);

  const stars = [];

  while (level) {
    level -= 1;
    stars.push('★');
  }

  return stars.join(' ');
};

const parseChildFriendly = (cat: any) => {
  let level = validateLevelValue(cat?.child_friendly ?? 0);

  const stars = [];

  while (level) {
    level -= 1;
    stars.push('★');
  }

  return stars.join(' ');
};

const parseDogFriendly = (cat: any) => {
  let level = validateLevelValue(cat?.dog_friendly ?? 0);

  const stars = [];

  while (level) {
    level -= 1;
    stars.push('★');
  }

  return stars.join(' ');
};

const parseEnergyLevel = (cat: any) => {
  let level = validateLevelValue(cat?.energy_level ?? 0);

  const stars = [];

  while (level) {
    level -= 1;
    stars.push('★');
  }

  return stars.join(' ');
};

const parseGrooming = (cat: any) => {
  let level = validateLevelValue(cat?.grooming ?? 0);

  const stars = [];

  while (level) {
    level -= 1;
    stars.push('★');
  }

  return stars.join(' ');
};

const parseHealthIssues = (cat: any) => {
  let level = validateLevelValue(cat?.health_issues ?? 0);

  const stars = [];

  while (level) {
    level -= 1;
    stars.push('★');
  }

  return stars.join(' ');
};

const parseIntelligence = (cat: any) => {
  let level = validateLevelValue(cat?.intelligence ?? 0);

  const stars = [];

  while (level) {
    level -= 1;
    stars.push('★');
  }

  return stars.join(' ');
};

const parseSheddingLevel = (cat: any) => {
  let level = validateLevelValue(cat?.shedding_level ?? 0);

  const stars = [];

  while (level) {
    level -= 1;
    stars.push('★');
  }

  return stars.join(' ');
};

const parseSocialNeeds = (cat: any) => {
  let level = validateLevelValue(cat?.social_needs ?? 0);

  const stars = [];

  while (level) {
    level -= 1;
    stars.push('★');
  }

  return stars.join(' ');
};

const parseStrangerFriendly = (cat: any) => {
  let level = validateLevelValue(cat?.stranger_friendly ?? 0);

  const stars = [];

  while (level) {
    level -= 1;
    stars.push('★');
  }

  return stars.join(' ');
};

const parseVocalisation = (cat: any) => {
  let level = validateLevelValue(cat?.vocalisation ?? 0);

  const stars = [];

  while (level) {
    level -= 1;
    stars.push('★');
  }

  return stars.join(' ');
};

export {
  parseAffectionLevel,
  parseAdaptability,
  parseChildFriendly,
  parseDogFriendly,
  parseEnergyLevel,
  parseGrooming,
  parseHealthIssues,
  parseIntelligence,
  parseSheddingLevel,
  parseSocialNeeds,
  parseStrangerFriendly,
  parseVocalisation,
};
