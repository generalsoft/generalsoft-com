/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Milestone {
  year: string;
  title: string;
  description: string;
  category: 'foundation' | 'innovation' | 'global' | 'ipo';
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  iconName: string;
  accentColor: string;
  metric: string;
  metricLabel: string;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  quote: string;
  avatarUrl: string;
  department: 'Executive' | 'Engineering' | 'Product' | 'Operations';
}

export interface Solution {
  id: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  activeInstalls: string;
  satisfaction: string;
  techStack: string[];
}

export interface Office {
  city: string;
  country: string;
  timezone: string;
  x: number; // Percent from left on map
  y: number; // Percent from top on map
  isHQ: boolean;
  email: string;
  phone: string;
}

export interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  requirements: string[];
}
