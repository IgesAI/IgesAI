import { ELEMENTS, COMBO_MULTIPLIERS } from '../constants/game-constants';

export const calculateDamage = ({
  attacker,
  defender,
  combo = 0,
  elementalMultiplier = 1
}) => {
  // Base damage using logarithmic scaling for better balance
  const baseDamage = Math.floor(
    (attacker.attack * (1 + Math.log10(attacker.agility + 1))) -
    (defender.defense * (1 + Math.log10(defender.vitality + 1)))
  );

  // Combo system with diminishing returns
  const comboMultiplier = 1 + (Math.log2(combo + 1) * 0.2);

  // Critical hit calculation
  const criticalMultiplier = Math.random() < attacker.criticalChance ? 1.5 : 1;

  // Elemental damage
  const elementalBonus = calculateElementalBonus(attacker.equipment, defender.equipment);

  // Final damage calculation with minimum damage
  return Math.max(
    5,
    Math.floor(
      baseDamage * 
      comboMultiplier * 
      criticalMultiplier * 
      elementalMultiplier *
      elementalBonus
    )
  );
};

const calculateElementalBonus = (attackerEquip, defenderEquip) => {
  const attackerElement = attackerEquip.weapon.element;
  const defenderElement = defenderEquip.weapon.element;

  if (attackerElement.weakness === defenderElement.name) {
    return 1.5; // Super effective
  } else if (defenderElement.weakness === attackerElement.name) {
    return 0.75; // Not very effective
  }
  return 1; // Normal effectiveness
};

export const calculateSpecialMoveChance = (equipment, combo) => {
  const baseChance = equipment.rarity === 'Legendary' ? 0.2 :
                    equipment.rarity === 'Epic' ? 0.15 :
                    equipment.rarity === 'Rare' ? 0.1 : 0.05;
  
  return Math.min(baseChance * (1 + (combo * 0.1)), 0.5);
}; 