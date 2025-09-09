import {
  ClipboardPen,
  HeartHandshake,
  Megaphone,
  Users,
  Trophy,
  Paintbrush,
  Rocket,
  GraduationCap,
  Laptop,
  Sparkles,
  BookOpen,
} from '@lucide/svelte';

import type { Component } from 'svelte';

const categoryIconMap: Record<string, Component> = {
	'training': ClipboardPen,
	'volunteer': HeartHandshake,
	'event': Users,
	'contest': Trophy,
	'art': Paintbrush,
	'hackathon': Rocket,
	'scholarship': GraduationCap,
	'bootcamp': Laptop,
	'new Release': Sparkles,
	'cohort': BookOpen
};

export function getIconForCategory(categoryName: string): Component {
	return categoryIconMap[categoryName] || Megaphone;
}
