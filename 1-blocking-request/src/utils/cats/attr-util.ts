import {
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
} from './attr-parser';

const parseCatAttributes = (cat: any) => {
  const affectionLevel = parseAffectionLevel(cat);
  const adaptability = parseAdaptability(cat);
  const childFriendly = parseChildFriendly(cat);
  const dogFriendly = parseDogFriendly(cat);
  const energyLevel = parseEnergyLevel(cat);
  const grooming = parseGrooming(cat);
  const healthIssues = parseHealthIssues(cat);
  const intelligence = parseIntelligence(cat);
  const sheddingLevel = parseSheddingLevel(cat);
  const socialNeeds = parseSocialNeeds(cat);
  const strangerFriendly = parseStrangerFriendly(cat);
  const vocalisation = parseVocalisation(cat);

  const parsedResult = {
    affectionLevel,
    adaptability,
    childFriendly,
    dogFriendly,
    energyLevel,
    grooming,
    healthIssues,
    intelligence,
    sheddingLevel,
    socialNeeds,
    strangerFriendly,
    vocalisation,
  };

  return parsedResult;
};

export { parseCatAttributes };
