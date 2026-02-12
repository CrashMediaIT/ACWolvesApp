/**
 * Thin wrapper around FontAwesomeIcon for consistent sizing and color.
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import colors from '../theme/colors';

interface IconProps {
  icon: IconDefinition;
  size?: number;
  color?: string;
}

export default function Icon({ icon, size = 18, color = colors.primary }: IconProps) {
  return <FontAwesomeIcon icon={icon} size={size} color={color} />;
}
